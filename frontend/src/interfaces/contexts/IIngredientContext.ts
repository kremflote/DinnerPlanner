import type { IIngredient } from "../IIngredient";

export interface IIngredientContext {
  showcases: IIngredient[];
  ingredientIsLoading: boolean;
  initError: string | null;
}
