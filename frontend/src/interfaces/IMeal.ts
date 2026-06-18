import type { IDish } from "./IDish";
import type { IKitchenItem } from "./IKitchenItem";
import type { IRecipeIngredient } from "./IRecipe";
import type { IRecipe } from "./IRecipe";

export interface IMeal {
  mealId: number;
  dish: IDish | null;
  sides: IDish[];
}

export interface IWeeklyMealPlan {
  weekStartsOn: string;
  days: IDayMealPlan[];
}

export interface IDayMealPlan {
  date: string;
  breakfast: IMealSlot;
  lunch: IMealSlot;
  dinner: IDinnerSlot;
}

export interface IMealSlot {
  recipe: IRecipe | null;
  notes: string;
}

export interface IDinnerSlot {
  dish: IDish | null;
  sauce: IKitchenItem | null;
  side: IKitchenItem | null;
  notes: string;
}

export interface IWeeklyPrepSummary {
  vegetables: IRecipeIngredient[];
  shoppingList: IRecipeIngredient[];
}
