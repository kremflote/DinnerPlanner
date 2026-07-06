import { useLanguage } from "../../contexts";
import type { SiteTheme } from "../../styles/appStyles";
import { recipeBrowserStyles } from "./recipeBrowserStyles";
import type { BrowserMode } from "./types";

type RecipeIngredientToggleProps = {
  value: BrowserMode;
  theme: SiteTheme;
  onChange: (value: BrowserMode) => void;
};

function RecipeIngredientToggle({ value, theme, onChange }: RecipeIngredientToggleProps) {
  const { t } = useLanguage();

  return (
    <div className={recipeBrowserStyles.tabs(theme)} aria-label={t.cookbook.cookbookSections}>
      <button
        className={recipeBrowserStyles.tab(theme, value === "recipes")}
        type="button"
        onClick={() => onChange("recipes")}
      >
        {t.cookbook.recipes}
      </button>
      <button
        className={recipeBrowserStyles.tab(theme, value === "ingredients")}
        type="button"
        onClick={() => onChange("ingredients")}
      >
        {t.cookbook.ingredients}
      </button>
    </div>
  );
}

export default RecipeIngredientToggle;
