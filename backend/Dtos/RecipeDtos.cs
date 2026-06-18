using DinnerPlanner.Api.Models;

namespace DinnerPlanner.Api.Dtos;

public record RecipeRequest(
    string Name,
    string? ImageUrl,
    string Description,
    string Instructions,
    IReadOnlyCollection<RecipeIngredientRequest> Ingredients
);

public record RecipeIngredientRequest(
    int IngredientId,
    decimal? Amount,
    MeasurementUnit? Unit,
    PreparationType? Preparation
);

public record RecipeDto(
    int RecipeId,
    string Name,
    string? ImageUrl,
    string Description,
    string Instructions,
    IReadOnlyCollection<RecipeIngredientDto> Ingredients
);

public record RecipeIngredientDto(
    int RecipeIngredientId,
    int IngredientId,
    IngredientDto? Ingredient,
    decimal? Amount,
    MeasurementUnit? Unit,
    PreparationType? Preparation
);
