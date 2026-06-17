namespace backend.Interfaces;

interface IDish
{
    public int DishId { get; set; }
    public string DishName { get; set; } 
    public string DishImage { get; set; } 
    public IRecipe Recipe { get; set; } 
    public string GitHub_Link { get; set; } 
}