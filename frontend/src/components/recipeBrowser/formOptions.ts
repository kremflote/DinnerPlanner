import type { IngredientTag, MeasurementUnit, Vitamin } from "../../interfaces/IIngredient";
import type { DessertType, IngredientPreparation, RecipeTag, RecipeType } from "../../interfaces/IRecipe";

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

export const ingredientTags: IngredientTag[] = [
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
  "LeafyGreen",
];

export type IngredientTagGroupKey = "produce" | "protein" | "pantry" | "other";

export const ingredientTagGroups: Array<{
  key: IngredientTagGroupKey;
  values: IngredientTag[];
}> = [
  {
    key: "produce",
    values: ["Vegetable", "Fruit", "LeafyGreen", "Herb"],
  },
  {
    key: "protein",
    values: ["Chicken", "Fish", "Beef", "Lamb", "Mince", "Dairy"],
  },
  {
    key: "pantry",
    values: ["Grain", "Spice", "Sauce", "Pantry", "Frozen"],
  },
  {
    key: "other",
    values: ["Other"],
  },
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

export const ingredientPreparations: IngredientPreparation[] = [
  "None",
  "Quartered",
  "Wedged",
  "Chopped",
  "RoughlyChopped",
  "FinelyChopped",
  "Diced",
  "Cubed",
  "Julienned",
  "Batons",
  "Sliced",
  "Minced",
  "Grated",
  "Shredded",
  "Crushed",
];

export const vitamins: Vitamin[] = [
  "VitaminA",
  "VitaminB",
  "VitaminB12",
  "VitaminC",
  "VitaminD",
  "VitaminE",
  "VitaminK",
];
