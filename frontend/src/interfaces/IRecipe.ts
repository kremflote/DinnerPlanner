import type { IIngredient } from "./IIngredient";
import type { MeasurementUnit, PreparationType } from "./IKitchenItem";

export interface IRecipe {
  recipeId: number;
  name: string;
  imageUrl: string | null;
  description: string;
  instructions: string;
  ingredients: IRecipeIngredient[];
}

export interface IRecipeIngredient {
  recipeIngredientId: number;
  ingredientId: number;
  ingredient: IIngredient;
  amount: number | null;
  unit: MeasurementUnit | null;
  preparation: PreparationType | null;
}
