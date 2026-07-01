import type { IIngredient } from "./IIngredient";

export interface IRecipe {
  recipeId: number;
  recipeType: RecipeType;
  name: string;
  imageUrl: string | null;
  description: string | null;
  instructions: string | null;
  ingredients: IIngredient[];
  tags: RecipeTag[];
  cuisine: Cuisine | null;
  dessertType: DessertType | null;
}

export type RecipeType =
  | "Dish"
  | "Dessert"
  | "Sauce"
  | "Dip"
  | "Side"
  | "SpiceMix";

export type RecipeTag =
  | "Breakfast"
  | "Lunch"
  | "Dinner"
  | "Bowl"
  | "Grill"
  | "Pasta"
  | "Vegetarian"
  | "Soup"
  | "Stew"
  | "Salad"
  | "Pizza"
  | "Sandwich"
  | "Taco"
  | "Curry"
  | "Casserole"
  | "Other";

export type Cuisine =
  | "Asian"
  | "Indian"
  | "Mediterranean"
  | "French"
  | "Norwegian"
  | "Mexican"
  | "Italian"
  | "Grill"
  | "Other";

export type DessertType =
  | "Cake"
  | "Pastry"
  | "IceCream"
  | "Pudding"
  | "Cookie"
  | "Pie"
  | "Tart"
  | "Chocolate"
  | "FruitDessert"
  | "Other";
