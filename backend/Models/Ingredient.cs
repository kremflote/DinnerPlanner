using System.ComponentModel.DataAnnotations;

namespace DinnerPlanner.Api.Models;

public class Ingredient
{
    [Key]
    public int IngredientId { get; set; }
    public string IngredientName { get; set; } = string.Empty;
    public string? Brand { get; set; }
    public decimal? Price { get; set; }
    public decimal? Amount { get; set; }
    public MeasurementUnit Unit { get; set; }
    public IngredientCategory Category { get; set; } = IngredientCategory.Other;
    public NutritionFacts? NutritionPer100 { get; set; }
    public string? Color { get; set; }
}
