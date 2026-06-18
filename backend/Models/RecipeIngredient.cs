namespace DinnerPlanner.Api.Models;

public class RecipeIngredient
{
    public int RecipeIngredientId { get; set; }

    public int RecipeId { get; set; }
    public Recipe Recipe { get; set; } = null!;

    public int IngredientId { get; set; }
    public Ingredient Ingredient { get; set; } = null!;

    public decimal? Amount { get; set; }
    public MeasurementUnit? Unit { get; set; }
    public PreparationType? Preparation { get; set; }
}
