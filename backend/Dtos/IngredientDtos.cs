using DinnerPlanner.Api.Models;

namespace DinnerPlanner.Api.Dtos;

public record IngredientRequest(
    string IngredientName,
    string? Brand,
    decimal? Price,
    decimal? Amount,
    MeasurementUnit Unit,
    IngredientCategory Category,
    NutritionFacts? NutritionPer100,
    string? Color
);

public record IngredientDto(
    int IngredientId,
    string IngredientName,
    string? Brand,
    decimal? Price,
    decimal? Amount,
    MeasurementUnit Unit,
    IngredientCategory Category,
    NutritionFacts? NutritionPer100,
    string? Color
);
