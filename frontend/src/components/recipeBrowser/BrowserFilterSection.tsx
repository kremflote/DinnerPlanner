import type { Dispatch, SetStateAction } from "react";
import type { IngredientCategory } from "../../interfaces/IIngredient";
import type { Cuisine, RecipeTag, RecipeType } from "../../interfaces/IRecipe";
import type { SiteTheme } from "../../styles/appStyles";
import { formatLabel, recipeBrowserStyles } from "./recipeBrowserStyles";
import type { BrowserMode } from "./types";

const ingredientCategoryFilters: IngredientCategory[] = [
  "Vegetable",
  "Fruit",
  "Chicken",
  "Fish",
  "Beef",
  "Lamb",
  "Mince",
  "Dairy",
  "Grain",
  "Spice",
  "Herb",
  "Sauce",
  "Pantry",
  "Frozen",
  "Other",
];

const recipeTypeFilters: RecipeType[] = ["Dish", "Dessert", "Sauce", "Dip", "Side", "SpiceMix"];

const recipeTagFilters: RecipeTag[] = [
  "Breakfast",
  "Lunch",
  "Dinner",
  "Bowl",
  "Grill",
  "Pasta",
  "Vegetarian",
  "Soup",
  "Stew",
  "Salad",
  "Pizza",
  "Sandwich",
  "Taco",
  "Curry",
  "Casserole",
  "Other",
];

const cuisineFilters: Cuisine[] = [
  "Asian",
  "Indian",
  "Mediterranean",
  "French",
  "Norwegian",
  "Mexican",
  "Italian",
  "Grill",
  "Other",
];

type BrowserFilterSectionProps = {
  mode: BrowserMode;
  selectedIngredientCategories: IngredientCategory[];
  selectedRecipeTypes: RecipeType[];
  selectedRecipeTags: RecipeTag[];
  selectedCuisines: Cuisine[];
  theme: SiteTheme;
  setSelectedIngredientCategories: Dispatch<SetStateAction<IngredientCategory[]>>;
  setSelectedRecipeTypes: Dispatch<SetStateAction<RecipeType[]>>;
  setSelectedRecipeTags: Dispatch<SetStateAction<RecipeTag[]>>;
  setSelectedCuisines: Dispatch<SetStateAction<Cuisine[]>>;
};

function BrowserFilterSection({
  mode,
  selectedIngredientCategories,
  selectedRecipeTypes,
  selectedRecipeTags,
  selectedCuisines,
  theme,
  setSelectedIngredientCategories,
  setSelectedRecipeTypes,
  setSelectedRecipeTags,
  setSelectedCuisines,
}: BrowserFilterSectionProps) {
  return (
    <aside className={recipeBrowserStyles.filterRail(theme)} aria-label={`${mode} filters`}>
      {mode === "ingredients" ? (
        <FilterGroup
          selectedValues={selectedIngredientCategories}
          theme={theme}
          title="Ingredient Category"
          values={ingredientCategoryFilters}
          onToggle={(value) => toggleSelection(value, setSelectedIngredientCategories)}
        />
      ) : (
        <>
          <FilterGroup
            selectedValues={selectedRecipeTypes}
            theme={theme}
            title="Recipe Type"
            values={recipeTypeFilters}
            onToggle={(value) => toggleSelection(value, setSelectedRecipeTypes)}
          />
          <FilterGroup
            selectedValues={selectedRecipeTags}
            theme={theme}
            title="Tags"
            values={recipeTagFilters}
            onToggle={(value) => toggleSelection(value, setSelectedRecipeTags)}
          />
          <FilterGroup
            selectedValues={selectedCuisines}
            theme={theme}
            title="Cuisine"
            values={cuisineFilters}
            onToggle={(value) => toggleSelection(value, setSelectedCuisines)}
          />
        </>
      )}
    </aside>
  );
}

type FilterGroupProps<TValue extends string> = {
  title: string;
  values: readonly TValue[];
  selectedValues: readonly TValue[];
  theme: SiteTheme;
  onToggle: (value: TValue) => void;
};

function FilterGroup<TValue extends string>({
  title,
  values,
  selectedValues,
  theme,
  onToggle,
}: FilterGroupProps<TValue>) {
  return (
    <fieldset className={recipeBrowserStyles.filterGroup(theme)}>
      <div className="flex items-center justify-between gap-2">
        <legend className={recipeBrowserStyles.filterLegend(theme)}>{title}</legend>
      </div>
      <div className="mt-2 flex flex-col gap-1">
        {values.map((value) => (
          <label className={recipeBrowserStyles.checkboxLabel(theme)} key={value}>
            <input
              checked={selectedValues.includes(value)}
              className={recipeBrowserStyles.checkbox}
              type="checkbox"
              onChange={() => onToggle(value)}
            />
            {formatLabel(value)}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function toggleSelection<TValue extends string>(
  value: TValue,
  setSelectedValues: Dispatch<SetStateAction<TValue[]>>,
) {
  setSelectedValues((selectedValues) =>
    selectedValues.includes(value)
      ? selectedValues.filter((selectedValue) => selectedValue !== value)
      : [...selectedValues, value],
  );
}

export default BrowserFilterSection;
