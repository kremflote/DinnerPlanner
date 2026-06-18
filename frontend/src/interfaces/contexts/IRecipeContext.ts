import type { IRecipe } from "../IRecipe";

export interface IRecipeContext {
  recipes: IRecipe[];
  recipeIsLoading: boolean;
  initError: string | null;
}
