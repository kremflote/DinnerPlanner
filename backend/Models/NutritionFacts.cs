namespace DinnerPlanner.Api.Models;

public class NutritionFacts
{
    public int? Calories { get; set; }
    public decimal? CarbohydrateGrams { get; set; }
    public decimal? ProteinGrams { get; set; }
    public decimal? SaltGrams { get; set; }
    public decimal? DietaryFiberGrams { get; set; }
    public decimal? SaturatedFatGrams { get; set; }
    public decimal? UnsaturatedFatGrams { get; set; }
    public decimal? MonounsaturatedFatGrams { get; set; }
    public decimal? PolyunsaturatedFatGrams { get; set; }
    public List<Vitamin> Vitamins { get; set; } = [];
}
