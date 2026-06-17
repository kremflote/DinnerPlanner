using System.ComponentModel.DataAnnotations;
using backend.Interfaces;
using System;

namespace backend.Models;

public class Showcase : IDish
{
    [Key]
    public int DishId { get; set; }
    public string DishName { get; set; } = string.Empty;
    public string DishImage { get; set; } = null;
    public object Recipe { get; set; } = null;
    public string Type { get; set; } = string.Empty;
    public string Cuisine { get; set; } = null;
    internal IIngredient[] Ingredients { get; set; } = Array.Empty<IIngredient>();
}