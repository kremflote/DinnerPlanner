import { BrandProvider } from "./BrandContext";
import { CuisineProvider } from "./CuisineContext";
import type { IProviderProps } from "../interfaces/IProviderProps";
import { IngredientProvider } from "./IngredientContext";
import { MealPlanProvider } from "./MealPlanContext";
import { RecipeProvider } from "./RecipeContext";

export function AppProviders({ children }: IProviderProps) {
  return (
    <BrandProvider>
      <CuisineProvider>
        <IngredientProvider>
          <RecipeProvider>
            <MealPlanProvider>{children}</MealPlanProvider>
          </RecipeProvider>
        </IngredientProvider>
      </CuisineProvider>
    </BrandProvider>
  );
}
