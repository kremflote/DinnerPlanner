namespace backend.Interfaces;

interface IIngredient
{
    public int IngredientId { get; set; }
    public string IngredientName { get; set; }
    public string IngredientColor { get; set; }
}