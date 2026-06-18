using DinnerPlanner.Api.Models;

namespace DinnerPlanner.Api.Dtos;

public record DishRequest(
    string Name,
    string? ImageUrl,
    int? RecipeId,
    string Type,
    Cuisine Cuisine
);

public record DishDto(
    int Id,
    string Name,
    string? ImageUrl,
    int? RecipeId,
    string Type,
    Cuisine Cuisine
);
