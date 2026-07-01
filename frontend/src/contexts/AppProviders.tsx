import type { IProviderProps } from "../interfaces/IProviderProps";
import { IngredientProvider } from "./IngredientContext";
import { MealPlanProvider } from "./MealPlanContext";
import { RecipeProvider } from "./RecipeContext";

export function AppProviders({ children }: IProviderProps) {
  return (
    <IngredientProvider>
      <RecipeProvider>
        <MealPlanProvider>{children}</MealPlanProvider>
      </RecipeProvider>
    </IngredientProvider>
  );
}
