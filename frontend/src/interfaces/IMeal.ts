import type { MeasurementUnit } from "./IIngredient";

export interface IMealPlanEntry {
  mealPlanEntryId: number;
  date: string;
  slot: MealSlot;
  notes: string | null;
  recipes: IMealPlanRecipe[];
}

export interface IMealPlanRecipe {
  mealPlanRecipeId: number;
  recipeId: number | null;
  ingredientId: number | null;
  role: MealRecipeRole;
  sortOrder: number;
  portions: number | null;
  amount: number | null;
  unit: MeasurementUnit | null;
}

export type MealSlot = "Breakfast" | "Lunch" | "Dinner" | "Snack1" | "Snack2";

export type MealRecipeRole = "Main" | "Sauce" | "Side" | "Extra";

export type PlannerViewMode = "week" | "month";

export interface IWeeklyPrepSummary {
  vegetables: IIngredientPrepItem[];
  shoppingList: IIngredientPrepItem[];
}

export interface IIngredientPrepItem {
  ingredientId: number;
  amount: number | null;
}
