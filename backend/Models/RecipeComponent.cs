namespace DinnerPlanner.Api.Models;

public class RecipeComponent
{
    public int ParentRecipeId { get; set; }
    public Recipe ParentRecipe { get; set; } = null!;

    public int ChildRecipeId { get; set; }
    public Recipe ChildRecipe { get; set; } = null!;

    public int SortOrder { get; set; }
}
