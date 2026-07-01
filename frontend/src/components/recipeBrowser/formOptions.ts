import type { IngredientCategory, MeasurementUnit } from "../../interfaces/IIngredient";
import type { Cuisine, DessertType, RecipeTag, RecipeType } from "../../interfaces/IRecipe";

export const recipeTypes: RecipeType[] = [
  "Dish",
  "Dessert",
  "Sauce",
  "Dip",
  "Side",
  "SpiceMix",
];

export const recipeTags: RecipeTag[] = [
  "Breakfast",
  "Lunch",
  "Dinner",
  "Bowl",
  "Grill",
  "Pasta",
  "Vegetarian",
  "Soup",
  "Stew",
  "Salad",
  "Pizza",
  "Sandwich",
  "Taco",
  "Curry",
  "Casserole",
  "Other",
];

export const cuisines: Cuisine[] = [
  "Asian",
  "Indian",
  "Mediterranean",
  "French",
  "Norwegian",
  "Mexican",
  "Italian",
  "Grill",
  "Other",
];

export const dessertTypes: DessertType[] = [
  "Cake",
  "Pastry",
  "IceCream",
  "Pudding",
  "Cookie",
  "Pie",
  "Tart",
  "Chocolate",
  "FruitDessert",
  "Other",
];

export const ingredientCategories: IngredientCategory[] = [
  "Vegetable",
  "Fruit",
  "Chicken",
  "Fish",
  "Beef",
  "Lamb",
  "Mince",
  "Dairy",
  "Grain",
  "Spice",
  "Herb",
  "Sauce",
  "Pantry",
  "Frozen",
  "Other",
];

export const measurementUnits: MeasurementUnit[] = [
  "Gram",
  "Kilogram",
  "Milliliter",
  "Liter",
  "Teaspoon",
  "Tablespoon",
  "Cup",
  "Piece",
  "Clove",
  "Pinch",
  "ToTaste",
];
