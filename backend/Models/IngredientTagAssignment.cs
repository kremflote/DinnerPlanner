namespace DinnerPlanner.Api.Models;

public class IngredientTagAssignment
{
    public int IngredientId { get; set; }
    public Ingredient Ingredient { get; set; } = null!;
    public IngredientTag Tag { get; set; }
}
