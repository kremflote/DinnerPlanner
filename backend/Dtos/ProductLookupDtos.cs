namespace DinnerPlanner.Api.Dtos;

public record ProductLookupResponseDto(
    string Ean,
    IReadOnlyCollection<ProductLookupResultDto> Products
);

public record ProductLookupResultDto(
    string Ean,
    string Name,
    string? Brand,
    string? Vendor,
    string? Description,
    string? Ingredients,
    string? ImageUrl,
    decimal? CurrentPrice,
    decimal? CurrentUnitPrice,
    decimal? Weight,
    string? WeightUnit,
    ProductLookupStoreDto? Store,
    ProductLookupNutritionDto? NutritionPer100,
    string Source
);

public record ProductLookupStoreDto(
    string Name,
    string? Url,
    string? Logo
);

public record ProductLookupNutritionDto(
    decimal? Calories,
    decimal? CarbohydrateGrams,
    decimal? ProteinGrams,
    decimal? SaltGrams,
    decimal? DietaryFiberGrams,
    decimal? SaturatedFatGrams,
    decimal? MonounsaturatedFatGrams,
    decimal? PolyunsaturatedFatGrams
);
