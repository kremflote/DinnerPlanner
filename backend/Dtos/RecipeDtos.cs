using DinnerPlanner.Api.Models;
using System.ComponentModel.DataAnnotations;

namespace DinnerPlanner.Api.Dtos;

public enum RecipeType
{
    Dish,
    Dessert,
    Sauce,
    Dip,
    Side,
    SpiceMix
}

public record RecipeRequest(
    RecipeType RecipeType,
    [Required]
    [StringLength(30, MinimumLength = 1)]
    string Name,
    string? ImageUrl,
    [StringLength(600)]
    string? Description,
    string? Instructions,
    [Required]
    IReadOnlyCollection<RecipeIngredientRequest> Ingredients,
    [Required]
    IReadOnlyCollection<RecipeTag> Tags,
    IReadOnlyCollection<RecipeComponentRequest>? Components,
    int? CuisineId,
    DessertType? DessertType
);

public record RecipeIngredientRequest(
    int IngredientId,
    [Range(typeof(decimal), "0", "79228162514264337593543950335")]
    decimal? Amount,
    MeasurementUnit Unit,
    IngredientPreparation Preparation
);

public record RecipeComponentRequest(
    int RecipeId,
    int SortOrder
);

public record RecipeDto(
    int RecipeId,
    RecipeType RecipeType,
    string Name,
    string? ImageUrl,
    string? Description,
    string? Instructions,
    IReadOnlyCollection<RecipeIngredientDto> Ingredients,
    IReadOnlyCollection<RecipeTag> Tags,
    IReadOnlyCollection<RecipeComponentDto> Components,
    int? CuisineId,
    CuisineDto? Cuisine,
    DessertType? DessertType
);

public record RecipeIngredientDto(
    int RecipeIngredientId,
    IngredientDto Ingredient,
    decimal? Amount,
    MeasurementUnit Unit,
    IngredientPreparation Preparation
);

public record RecipeComponentDto(
    int RecipeId,
    RecipeType RecipeType,
    string Name,
    string? ImageUrl,
    int SortOrder,
    IReadOnlyCollection<RecipeIngredientDto> Ingredients
);
