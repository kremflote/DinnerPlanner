using DinnerPlanner.Api.Dtos;
using DinnerPlanner.Api.Models;
using System.Net;
using System.Net.Http.Headers;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace DinnerPlanner.Api.Services;

public class KassalappProductLookupService(
    HttpClient httpClient,
    IConfiguration configuration,
    MatvaretabellenNutritionLookupService matvaretabellenNutritionLookup
)
{
    private static readonly JsonSerializerOptions JsonOptions = new(JsonSerializerDefaults.Web);

    public async Task<ProductLookupResponseDto> LookupByEanAsync(string ean, CancellationToken cancellationToken)
    {
        var apiKey = configuration["Kassalapp:ApiKey"];
        if (string.IsNullOrWhiteSpace(apiKey))
        {
            throw new ProductLookupConfigurationException("Kassalapp API key is not configured.");
        }

        var baseUrl = configuration["Kassalapp:BaseUrl"]?.Trim();
        httpClient.BaseAddress = new Uri(string.IsNullOrWhiteSpace(baseUrl) ? "https://kassal.app/api/v1/" : EnsureTrailingSlash(baseUrl));
        httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", apiKey.Trim());
        httpClient.DefaultRequestHeaders.Accept.Clear();
        httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

        using var response = await httpClient.GetAsync($"products/ean/{Uri.EscapeDataString(ean)}", cancellationToken);
        if (response.StatusCode == HttpStatusCode.NotFound)
        {
            return new ProductLookupResponseDto(ean, []);
        }

        if (response.StatusCode == HttpStatusCode.Unauthorized)
        {
            throw new ProductLookupConfigurationException("Kassalapp API key was rejected.");
        }

        if (response.StatusCode == HttpStatusCode.TooManyRequests)
        {
            throw new ProductLookupRateLimitException("Kassalapp rate limit was reached.");
        }

        response.EnsureSuccessStatusCode();

        await using var stream = await response.Content.ReadAsStreamAsync(cancellationToken);
        using var payload = await JsonDocument.ParseAsync(stream, cancellationToken: cancellationToken);
        var kassalappPayload = ReadPayload(payload.RootElement, ean);

        var productTasks = kassalappPayload.Products
            .Where(product => !string.IsNullOrWhiteSpace(product.Name))
            .Select(product => ToProductLookupResultAsync(product, kassalappPayload.Ean, kassalappPayload.Nutrition, cancellationToken))
            .ToList();
        var products = (await Task.WhenAll(productTasks))
            .OrderBy(product => product.CurrentPrice is null)
            .ThenBy(product => product.CurrentPrice)
            .ThenBy(product => product.Name)
            .ToList();

        return new ProductLookupResponseDto(ean, products);
    }

    private static KassalappLookupPayload ReadPayload(JsonElement root, string fallbackEan)
    {
        if (!root.TryGetProperty("data", out var data))
        {
            return new KassalappLookupPayload(fallbackEan, [], []);
        }

        if (data.ValueKind == JsonValueKind.Array)
        {
            var products = data
                .EnumerateArray()
                .Select(element => element.Deserialize<KassalappProduct>(JsonOptions))
                .OfType<KassalappProduct>()
                .ToList();

            return new KassalappLookupPayload(fallbackEan, products, []);
        }

        if (data.ValueKind == JsonValueKind.Object)
        {
            var ean = data.TryGetProperty("ean", out var eanElement) && eanElement.ValueKind == JsonValueKind.String
                ? eanElement.GetString() ?? fallbackEan
                : fallbackEan;

            var nutrition = data.TryGetProperty("nutrition", out var nutritionElement) && nutritionElement.ValueKind == JsonValueKind.Array
                ? nutritionElement
                    .EnumerateArray()
                    .Select(element => element.Deserialize<KassalappNutritionalContent>(JsonOptions))
                    .OfType<KassalappNutritionalContent>()
                    .ToList()
                : [];

            if (data.TryGetProperty("products", out var productsElement) && productsElement.ValueKind == JsonValueKind.Array)
            {
                var products = productsElement
                    .EnumerateArray()
                    .Select(element => element.Deserialize<KassalappProduct>(JsonOptions))
                    .OfType<KassalappProduct>()
                    .ToList();

                return new KassalappLookupPayload(ean, products, nutrition);
            }

            var product = data.Deserialize<KassalappProduct>(JsonOptions);
            return product is null
                ? new KassalappLookupPayload(ean, [], nutrition)
                : new KassalappLookupPayload(ean, [product], nutrition);
        }

        return new KassalappLookupPayload(fallbackEan, [], []);
    }

    private async Task<ProductLookupResultDto> ToProductLookupResultAsync(
        KassalappProduct product,
        string ean,
        IReadOnlyCollection<KassalappNutritionalContent> nutrition,
        CancellationToken cancellationToken
    )
    {
        var kassalappNutrition = ToNutrition(product.NutritionalContents ?? nutrition);
        var matvaretabellenMatch = await matvaretabellenNutritionLookup.FindBestMatchAsync(
            product.Name ?? string.Empty,
            product.Brand,
            product.Ingredients,
            kassalappNutrition,
            cancellationToken
        );
        var nutritionPer100 = matvaretabellenMatch?.Nutrition ?? kassalappNutrition;
        var nutritionSource = matvaretabellenMatch is not null
            ? NutritionDataSource.Matvaretabellen
            : kassalappNutrition is null
                ? NutritionDataSource.None
                : NutritionDataSource.Kassalapp;

        return new ProductLookupResultDto(
            product.Ean ?? ean,
            product.Name ?? string.Empty,
            product.Brand,
            product.Vendor,
            product.Description,
            product.Ingredients,
            product.Image,
            product.CurrentPrice?.Price,
            product.CurrentPrice?.UnitPrice,
            product.Weight,
            product.WeightUnit,
            product.Store is null ? null : new ProductLookupStoreDto(product.Store.Name ?? string.Empty, product.Store.Url, product.Store.Logo),
            nutritionPer100,
            nutritionSource,
            nutritionSource == NutritionDataSource.None ? null : nutritionSource.ToString(),
            matvaretabellenMatch?.FoodId,
            matvaretabellenMatch?.Url,
            matvaretabellenMatch?.FoodName,
            matvaretabellenMatch?.Confidence,
            "Kassalapp"
        );
    }

    private static ProductLookupNutritionDto? ToNutrition(IReadOnlyCollection<KassalappNutritionalContent>? contents)
    {
        if (contents is null || contents.Count == 0)
        {
            return null;
        }

        var calories = FindNutrient(contents, ["energy-kcal", "energy_kcal", "kcal", "kalori"]);
        var carbs = FindNutrient(contents, ["carbohydrate", "karbohydrat"]);
        var protein = FindNutrient(contents, ["protein"]);
        var salt = FindNutrient(contents, ["salt"]);
        var fiber = FindNutrient(contents, ["fiber", "fibre", "kostfiber"]);
        var saturatedFat = FindNutrient(contents, ["saturated", "mettede"]);
        var transFat = FindNutrient(contents, ["trans"]);
        var monounsaturatedFat = FindNutrient(contents, ["monounsaturated", "enumettet"]);
        var polyunsaturatedFat = FindNutrient(contents, ["polyunsaturated", "flerumettet"]);
        var omega3 = FindNutrient(contents, ["omega-3", "omega 3"]);
        var omega6 = FindNutrient(contents, ["omega-6", "omega 6"]);
        var cholesterol = FindNutrient(contents, ["cholesterol", "kolesterol"]);

        if (calories is null
            && carbs is null
            && protein is null
            && salt is null
            && fiber is null
            && saturatedFat is null
            && transFat is null
            && monounsaturatedFat is null
            && polyunsaturatedFat is null
            && omega3 is null
            && omega6 is null
            && cholesterol is null)
        {
            return null;
        }

        return new ProductLookupNutritionDto(
            calories,
            carbs,
            protein,
            salt,
            fiber,
            saturatedFat,
            transFat,
            monounsaturatedFat,
            polyunsaturatedFat,
            omega3,
            omega6,
            cholesterol,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
        );
    }

    private static decimal? FindNutrient(IReadOnlyCollection<KassalappNutritionalContent> contents, IReadOnlyCollection<string> terms)
    {
        var match = contents.FirstOrDefault(content =>
        {
            var searchableText = $"{content.Code} {content.DisplayName}".ToLowerInvariant();
            return terms.Any(term => searchableText.Contains(term, StringComparison.OrdinalIgnoreCase));
        });

        return match?.Amount;
    }

    private static string EnsureTrailingSlash(string value) =>
        value.EndsWith('/') ? value : $"{value}/";
}

public class ProductLookupConfigurationException(string message) : Exception(message);

public class ProductLookupRateLimitException(string message) : Exception(message);

public record KassalappLookupPayload(
    string Ean,
    IReadOnlyCollection<KassalappProduct> Products,
    IReadOnlyCollection<KassalappNutritionalContent> Nutrition
);

public record KassalappProduct(
    [property: JsonPropertyName("name")]
    string? Name,
    [property: JsonPropertyName("brand")]
    string? Brand,
    [property: JsonPropertyName("vendor")]
    string? Vendor,
    [property: JsonPropertyName("description")]
    string? Description,
    [property: JsonPropertyName("ingredients")]
    string? Ingredients,
    [property: JsonPropertyName("image")]
    string? Image,
    [property: JsonPropertyName("current_price")]
    KassalappCurrentPrice? CurrentPrice,
    [property: JsonPropertyName("weight")]
    decimal? Weight,
    [property: JsonPropertyName("weight_unit")]
    string? WeightUnit,
    [property: JsonPropertyName("ean")]
    string? Ean,
    [property: JsonPropertyName("store")]
    KassalappStore? Store,
    [property: JsonPropertyName("nutritional_contents")]
    IReadOnlyCollection<KassalappNutritionalContent>? NutritionalContents
);

public record KassalappCurrentPrice(
    [property: JsonPropertyName("price")]
    decimal? Price,
    [property: JsonPropertyName("unit_price")]
    decimal? UnitPrice,
    [property: JsonPropertyName("date")]
    DateTimeOffset? Date
);

public record KassalappStore(
    [property: JsonPropertyName("name")]
    string? Name,
    [property: JsonPropertyName("url")]
    string? Url,
    [property: JsonPropertyName("logo")]
    string? Logo
);

public record KassalappNutritionalContent(
    [property: JsonPropertyName("display_name")]
    string? DisplayName,
    [property: JsonPropertyName("amount")]
    decimal? Amount,
    [property: JsonPropertyName("unit")]
    string? Unit,
    [property: JsonPropertyName("code")]
    string? Code
);
