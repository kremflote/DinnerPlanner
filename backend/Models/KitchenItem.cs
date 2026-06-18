using System.ComponentModel.DataAnnotations;

namespace DinnerPlanner.Api.Models;

public abstract class KitchenItem
{
    [Key]
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? ImageUrl { get; set; }
    public int? RecipeId { get; set; }
    public Recipe? Recipe { get; set; }
}
public class Dish : KitchenItem
{
    public string Type { get; set; } = string.Empty;
    public Cuisine Cuisine { get; set; } = Cuisine.Other;
}
public class Dessert : KitchenItem
{
    public string Type { get; set; } = string.Empty;

}
public class Sauce : KitchenItem;


public class Dip : KitchenItem;

public class Side : KitchenItem;



public class Marinade : KitchenItem;

public class SpiceMix : KitchenItem;
