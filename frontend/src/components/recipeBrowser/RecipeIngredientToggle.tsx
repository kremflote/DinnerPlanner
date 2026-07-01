import type { SiteTheme } from "../../styles/appStyles";
import { recipeBrowserStyles } from "./recipeBrowserStyles";
import type { BrowserMode } from "./types";

type RecipeIngredientToggleProps = {
  value: BrowserMode;
  theme: SiteTheme;
  onChange: (value: BrowserMode) => void;
};

function RecipeIngredientToggle({ value, theme, onChange }: RecipeIngredientToggleProps) {
  return (
    <div className={recipeBrowserStyles.tabs(theme)} aria-label="Cookbook sections">
      <button
        className={recipeBrowserStyles.tab(theme, value === "recipes")}
        type="button"
        onClick={() => onChange("recipes")}
      >
        Recipes
      </button>
      <button
        className={recipeBrowserStyles.tab(theme, value === "ingredients")}
        type="button"
        onClick={() => onChange("ingredients")}
      >
        Ingredients
      </button>
    </div>
  );
}

export default RecipeIngredientToggle;
