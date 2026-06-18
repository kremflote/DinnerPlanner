using System.ComponentModel.DataAnnotations;

namespace DinnerPlanner.Api.Models;

public class Recipe
{
    [Key]
    public int RecipeId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? ImageUrl { get; set; }
    public string Description { get; set; } = string.Empty;
    public string Instructions { get; set; } = string.Empty;
    public ICollection<RecipeIngredient> Ingredients { get; set; } = [];
}
