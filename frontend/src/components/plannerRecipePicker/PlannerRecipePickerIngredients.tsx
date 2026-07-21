import { useLanguage } from "../../contexts";
import type { IIngredient } from "../../interfaces/IIngredient";
import type { SiteTheme } from "../../styles/appStyles";
import { plannerPickerStyles } from "../../styles/appStyles";
import IngredientPickerPopover, { FilterIcon } from "../recipeBrowser/IngredientFilterPopover";
import FilterChip from "../recipeBrowser/FilterChip";
import { recipeBrowserStyles } from "../recipeBrowser/recipeBrowserStyles";

type IngredientFilterChipsProps = {
  selectedIngredients: IIngredient[];
  theme: SiteTheme;
  onClear: () => void;
  onRemoveIngredient: (ingredientId: number) => void;
};

export function IngredientFilterChips({
  selectedIngredients,
  theme,
  onClear,
  onRemoveIngredient,
}: IngredientFilterChipsProps) {
  const { t } = useLanguage();

  if (selectedIngredients.length === 0) {
    return null;
  }

  return (
    <div className={plannerPickerStyles.ingredientFilterChips}>
      {selectedIngredients.map((ingredient) => (
        <FilterChip
          key={ingredient.ingredientId}
          label={`${t.filters.includes}: ${ingredient.ingredientName}`}
          theme={theme}
          onClick={() => onRemoveIngredient(ingredient.ingredientId)}
        />
      ))}
      <button className={recipeBrowserStyles.clearFilterChip(theme)} type="button" onClick={onClear}>
        {t.common.clearFilters}
      </button>
    </div>
  );
}

export { FilterIcon };
export { IngredientPickerPopover };
