import type { IRecipe } from "../IRecipe";

export interface IRecipeContext {
  showcases: IRecipe[];
  recipeIsLoading: boolean;
  initError: string | null;
}
