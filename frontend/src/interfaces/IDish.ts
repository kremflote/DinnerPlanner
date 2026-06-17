import type { IIngredient } from "./IIngredient";
import type { IRecipe } from "./IRecipe";

export interface IDish {
  dishId: number;
  dishName: string;
  dishImage: string | null;
  recipe: IRecipe | null;
  type: string;
  cuisine: string | null;
  ingredients: IIngredient[];
}
