import type { IIngredient } from "./IIngredient";

export interface IRecipe {
  recipeId: number;
  recipeName: string;
  instructions: string;
  ingredients: IIngredient[];
}
