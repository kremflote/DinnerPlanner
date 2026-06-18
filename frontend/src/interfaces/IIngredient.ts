export interface IIngredient {
  ingredientId: number;
  name: string;
  price: number | null;
  category: IngredientCategory;
  nutritionPer100: INutritionFacts | null;
  imageUrl: string | null;
}

export type IngredientCategory =
  | "Vegetable"
  | "Fruit"
  | "Dairy"
  | "Grain"
  | "Spice"
  | "Herb"
  | "Sauce"
  | "Pantry"
  | "Frozen"
  | "Other";

export interface INutritionFacts {
  calories: number | null;
  vitamins: string | null;
  dietaryFiberGrams: number | null;
}
