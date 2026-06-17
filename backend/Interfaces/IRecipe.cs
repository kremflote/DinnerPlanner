namespace backend.Interfaces;

interface IRecipe
{
    public int RecipeId { get; set; }
    public string RecipeName { get; set; }
    public string Instructions { get; set; }
    public IIngredient[] Ingredients { get; set; }

}