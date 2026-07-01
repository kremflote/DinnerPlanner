import { useEffect, useMemo, useRef, useState, type ReactNode, type RefObject } from "react";
import IngredientThumbnail from "../IngredientThumbnail";
import RecipeThumbnail from "../RecipeThumbnail";
import { useIngredients, useRecipes } from "../../contexts";
import type { IIngredient, IngredientCategory } from "../../interfaces/IIngredient";
import type { Cuisine, RecipeTag, RecipeType } from "../../interfaces/IRecipe";
import type { SiteTheme } from "../../styles/appStyles";
import BrowserFilterSection from "./BrowserFilterSection";
import { formatLabel, recipeBrowserStyles } from "./recipeBrowserStyles";
import type { BrowserMode, EnrichedRecipe } from "./types";

type BrowserProps = {
  mode: BrowserMode;
  theme: SiteTheme;
  headerActions: ReactNode;
};

function Browser({ mode, theme, headerActions }: BrowserProps) {
  const { recipes, recipeIsLoading, initError: recipeError } = useRecipes();
  const {
    ingredients,
    ingredientIsLoading,
    initError: ingredientError,
  } = useIngredients();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIngredientCategories, setSelectedIngredientCategories] = useState<IngredientCategory[]>([]);
  const [selectedRecipeTypes, setSelectedRecipeTypes] = useState<RecipeType[]>([]);
  const [selectedRecipeTags, setSelectedRecipeTags] = useState<RecipeTag[]>([]);
  const [selectedCuisines, setSelectedCuisines] = useState<Cuisine[]>([]);
  const [selectedIngredientIds, setSelectedIngredientIds] = useState<number[]>([]);
  const [ingredientPickerSearch, setIngredientPickerSearch] = useState("");
  const [ingredientPickerPosition, setIngredientPickerPosition] = useState<{ x: number; y: number } | null>(null);
  const ingredientFilterButtonRef = useRef<HTMLButtonElement | null>(null);
  const ingredientPickerRef = useRef<HTMLDivElement | null>(null);

  const filteredRecipes = useMemo(
    () =>
      recipes.filter((recipe) =>
        matchesRecipeSearch(recipe, searchTerm) &&
        matchesSelectedIngredients(recipe, selectedIngredientIds) &&
        matchesRecipeTypes(recipe, selectedRecipeTypes) &&
        matchesRecipeTags(recipe, selectedRecipeTags) &&
        matchesCuisines(recipe, selectedCuisines),
      ),
    [
      recipes,
      searchTerm,
      selectedIngredientIds,
      selectedRecipeTypes,
      selectedRecipeTags,
      selectedCuisines,
    ],
  );

  const filteredIngredients = useMemo(
    () =>
      ingredients.filter((ingredient) =>
        matchesIngredientSearch(ingredient, searchTerm) &&
        matchesIngredientCategories(ingredient, selectedIngredientCategories),
      ),
    [ingredients, searchTerm, selectedIngredientCategories],
  );

  const selectedIngredients = useMemo(
    () => ingredients.filter((ingredient) => selectedIngredientIds.includes(ingredient.ingredientId)),
    [ingredients, selectedIngredientIds],
  );

  const ingredientPickerOptions = useMemo(
    () =>
      ingredients
        .filter((ingredient) => matchesIngredientSearch(ingredient, ingredientPickerSearch))
        .sort((first, second) => first.ingredientName.localeCompare(second.ingredientName)),
    [ingredients, ingredientPickerSearch],
  );

  const clearFilters = () => {
    setSelectedIngredientCategories([]);
    setSelectedRecipeTypes([]);
    setSelectedRecipeTags([]);
    setSelectedCuisines([]);
    setSelectedIngredientIds([]);
  };

  useEffect(() => {
    if (ingredientPickerPosition === null) {
      return;
    }

    const handleOutsidePointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) {
        return;
      }

      if (
        ingredientPickerRef.current?.contains(target) ||
        ingredientFilterButtonRef.current?.contains(target)
      ) {
        return;
      }

      setIngredientPickerPosition(null);
    };

    document.addEventListener("pointerdown", handleOutsidePointerDown);

    return () => document.removeEventListener("pointerdown", handleOutsidePointerDown);
  }, [ingredientPickerPosition]);

  return (
    <>
      <header>
        <h1 className={recipeBrowserStyles.title(theme)}>
          {mode === "recipes" ? "All Recipes" : "All Ingredients"}
        </h1>
        <div className={recipeBrowserStyles.headerControlsRow}>
          <div className={recipeBrowserStyles.searchControls}>
            <input
              aria-label={mode === "recipes" ? "Search recipes" : "Search ingredients"}
              className={recipeBrowserStyles.searchInput(theme)}
              placeholder="search..."
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
            <div className={recipeBrowserStyles.filterButtonSlot}>
              {mode === "recipes" && (
              <button
                aria-label="Open ingredient filter"
                className={recipeBrowserStyles.filterButton(theme)}
                ref={ingredientFilterButtonRef}
                type="button"
                onClick={(event) =>
                  setIngredientPickerPosition((currentPosition) =>
                    currentPosition === null
                      ? {
                          x: event.clientX,
                          y: event.clientY,
                        }
                      : null,
                  )
                }
              >
                <FilterIcon />
              </button>
              )}
            </div>
          </div>

          <div className={recipeBrowserStyles.headerActions}>
            {headerActions}
          </div>
        </div>
        <ActiveFilterChips
          mode={mode}
          selectedCuisines={selectedCuisines}
          selectedRecipeTags={selectedRecipeTags}
          selectedIngredientCategories={selectedIngredientCategories}
          selectedIngredients={selectedIngredients}
          selectedRecipeTypes={selectedRecipeTypes}
          theme={theme}
          onClear={clearFilters}
          onRemoveCuisine={(value) =>
            setSelectedCuisines((currentValues) => currentValues.filter((currentValue) => currentValue !== value))
          }
          onRemoveRecipeTag={(value) =>
            setSelectedRecipeTags((currentValues) => currentValues.filter((currentValue) => currentValue !== value))
          }
          onRemoveIngredient={(ingredientId) =>
            setSelectedIngredientIds((currentIds) =>
              currentIds.filter((currentId) => currentId !== ingredientId),
            )
          }
          onRemoveIngredientCategory={(value) =>
            setSelectedIngredientCategories((currentValues) =>
              currentValues.filter((currentValue) => currentValue !== value),
            )
          }
          onRemoveRecipeType={(value) =>
            setSelectedRecipeTypes((currentValues) => currentValues.filter((currentValue) => currentValue !== value))
          }
        />
        {mode === "recipes" && ingredientPickerPosition !== null && (
          <IngredientPickerPopover
            ingredients={ingredientPickerOptions}
            popoverRef={ingredientPickerRef}
            searchTerm={ingredientPickerSearch}
            selectedIngredientIds={selectedIngredientIds}
            theme={theme}
            x={ingredientPickerPosition.x}
            y={ingredientPickerPosition.y}
            onSearchChange={setIngredientPickerSearch}
            onToggleIngredient={(ingredientId) =>
              setSelectedIngredientIds((currentIds) =>
                currentIds.includes(ingredientId)
                  ? currentIds.filter((currentId) => currentId !== ingredientId)
                  : [...currentIds, ingredientId],
              )
            }
          />
        )}
      </header>

      <section className="mt-3 grid grid-cols-12 gap-3">
        <BrowserFilterSection
          mode={mode}
          selectedCuisines={selectedCuisines}
          selectedRecipeTags={selectedRecipeTags}
          selectedIngredientCategories={selectedIngredientCategories}
          selectedRecipeTypes={selectedRecipeTypes}
          setSelectedCuisines={setSelectedCuisines}
          setSelectedRecipeTags={setSelectedRecipeTags}
          setSelectedIngredientCategories={setSelectedIngredientCategories}
          setSelectedRecipeTypes={setSelectedRecipeTypes}
          theme={theme}
        />

        <div className={recipeBrowserStyles.resultsWithFilters}>
          {mode === "ingredients" ? (
            ingredientIsLoading ? (
              <EmptyState theme={theme} title="Loading ingredients" body="Fetching the pantry." />
            ) : ingredientError !== null ? (
              <EmptyState theme={theme} title="Could not load ingredients" body={ingredientError} />
            ) : filteredIngredients.length === 0 ? (
              <EmptyState theme={theme} title="No ingredients found" body="Try changing search or filters." />
            ) : (
              <div className={recipeBrowserStyles.ingredientGrid}>
                {filteredIngredients.map((ingredient) => (
                  <IngredientThumbnail
                    ingredient={ingredient}
                    key={ingredient.ingredientId}
                    theme={theme}
                  />
                ))}
              </div>
            )
          ) : recipeIsLoading ? (
            <EmptyState theme={theme} title="Loading recipes" body="Fetching the cookbook." />
          ) : recipeError !== null ? (
            <EmptyState theme={theme} title="Could not load recipes" body={recipeError} />
          ) : filteredRecipes.length === 0 ? (
            <EmptyState theme={theme} title="No recipes found" body="Try changing search or filters." />
          ) : (
            <div className={recipeBrowserStyles.recipeGrid}>
              {filteredRecipes.map((recipe) => (
                <RecipeThumbnail
                  className={recipeBrowserStyles.recipeCard(theme)}
                  key={recipe.recipeId}
                  theme={theme}
                  recipe={{
                    ...recipe,
                    subtitle: recipe.cuisine ?? recipe.recipeType,
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

type ActiveFilterChipsProps = {
  mode: BrowserMode;
  selectedIngredientCategories: IngredientCategory[];
  selectedRecipeTypes: RecipeType[];
  selectedRecipeTags: RecipeTag[];
  selectedCuisines: Cuisine[];
  selectedIngredients: IIngredient[];
  theme: SiteTheme;
  onClear: () => void;
  onRemoveIngredientCategory: (value: IngredientCategory) => void;
  onRemoveRecipeType: (value: RecipeType) => void;
  onRemoveRecipeTag: (value: RecipeTag) => void;
  onRemoveCuisine: (value: Cuisine) => void;
  onRemoveIngredient: (ingredientId: number) => void;
};

function ActiveFilterChips({
  mode,
  selectedIngredientCategories,
  selectedRecipeTypes,
  selectedRecipeTags,
  selectedCuisines,
  selectedIngredients,
  theme,
  onClear,
  onRemoveIngredientCategory,
  onRemoveRecipeType,
  onRemoveRecipeTag,
  onRemoveCuisine,
  onRemoveIngredient,
}: ActiveFilterChipsProps) {
  const hasIngredientFilters = selectedIngredientCategories.length > 0;
  const hasRecipeFilters =
    selectedIngredients.length > 0 ||
    selectedRecipeTypes.length > 0 ||
    selectedRecipeTags.length > 0 ||
    selectedCuisines.length > 0;

  const hasVisibleFilters = mode === "ingredients" ? hasIngredientFilters : hasRecipeFilters;

  return (
    <div className="mt-3 flex min-h-6 flex-wrap items-start gap-2">
      {!hasVisibleFilters && <span className="h-6" aria-hidden="true" />}
      {mode === "ingredients" &&
        selectedIngredientCategories.map((category) => (
          <FilterChip
            key={category}
            label={formatLabel(category)}
            theme={theme}
            onClick={() => onRemoveIngredientCategory(category)}
          />
        ))}
      {mode === "recipes" &&
        selectedIngredients.map((ingredient) => (
          <FilterChip
            key={`ingredient-${ingredient.ingredientId}`}
            label={`includes: ${ingredient.ingredientName}`}
            theme={theme}
            onClick={() => onRemoveIngredient(ingredient.ingredientId)}
          />
        ))}
      {mode === "recipes" &&
        selectedRecipeTypes.map((type) => (
          <FilterChip
            key={type}
            label={formatLabel(type)}
            theme={theme}
            onClick={() => onRemoveRecipeType(type)}
          />
        ))}
      {mode === "recipes" &&
        selectedRecipeTags.map((tag) => (
          <FilterChip
            key={tag}
            label={formatLabel(tag)}
            theme={theme}
            onClick={() => onRemoveRecipeTag(tag)}
          />
        ))}
      {mode === "recipes" &&
        selectedCuisines.map((cuisine) => (
          <FilterChip
            key={cuisine}
            label={formatLabel(cuisine)}
            theme={theme}
            onClick={() => onRemoveCuisine(cuisine)}
          />
        ))}
      {hasVisibleFilters && (
        <button className={recipeBrowserStyles.clearFilterChip(theme)} type="button" onClick={onClear}>
          Clear filters
        </button>
      )}
    </div>
  );
}

type FilterChipProps = {
  label: string;
  theme: SiteTheme;
  onClick: () => void;
};

function FilterChip({ label, theme, onClick }: FilterChipProps) {
  return (
    <button className={recipeBrowserStyles.filterChip(theme)} type="button" onClick={onClick}>
      {label}
      <span aria-hidden="true">x</span>
    </button>
  );
}

type EmptyStateProps = {
  title: string;
  body: string;
  theme: SiteTheme;
};

function EmptyState({ title, body, theme }: EmptyStateProps) {
  return (
    <div className={recipeBrowserStyles.emptyState(theme)}>
      <h2 className="text-2xl font-bold leading-[1.15]">{title}</h2>
      <p className="mt-2 max-w-xl text-base leading-[1.5]">{body}</p>
    </div>
  );
}

type IngredientPickerPopoverProps = {
  ingredients: IIngredient[];
  popoverRef: RefObject<HTMLDivElement | null>;
  searchTerm: string;
  selectedIngredientIds: number[];
  theme: SiteTheme;
  x: number;
  y: number;
  onSearchChange: (value: string) => void;
  onToggleIngredient: (ingredientId: number) => void;
};

function IngredientPickerPopover({
  ingredients,
  popoverRef,
  searchTerm,
  selectedIngredientIds,
  theme,
  x,
  y,
  onSearchChange,
  onToggleIngredient,
}: IngredientPickerPopoverProps) {
  return (
    <div
      className={recipeBrowserStyles.ingredientPicker(theme)}
      ref={popoverRef}
      style={{
        left: `min(${x}px, calc(100vw - 304px))`,
        top: `min(${y + 8}px, calc(100vh - 360px))`,
      }}
    >
      <input
        aria-label="Search ingredients to include"
        className={recipeBrowserStyles.ingredientPickerSearch(theme)}
        placeholder="search ingredient..."
        type="search"
        value={searchTerm}
        onChange={(event) => onSearchChange(event.target.value)}
      />
      <div className="mt-3 flex max-h-72 flex-col gap-2 overflow-y-auto pr-1">
        {ingredients.length === 0 ? (
          <p className={recipeBrowserStyles.ingredientPickerEmpty(theme)}>No ingredients found</p>
        ) : (
          ingredients.map((ingredient) => (
            <IngredientThumbnail
              className="h-9 px-3"
              ingredient={ingredient}
              key={ingredient.ingredientId}
              selected={selectedIngredientIds.includes(ingredient.ingredientId)}
              theme={theme}
              onClick={() => onToggleIngredient(ingredient.ingredientId)}
            />
          ))
        )}
      </div>
    </div>
  );
}

function FilterIcon() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M4 5h16l-6.25 7.2v5.2l-3.5 1.9v-7.1L4 5Z"
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function matchesRecipeSearch(recipe: EnrichedRecipe, searchTerm: string) {
  const normalizedSearch = searchTerm.trim().toLowerCase();
  if (normalizedSearch.length === 0) {
    return true;
  }

  const searchableText = [
    recipe.name,
    recipe.description,
    recipe.instructions,
    recipe.recipeType,
    recipe.cuisine,
    ...recipe.tags,
    ...recipe.ingredients.map((ingredient) => ingredient.ingredientName),
  ]
    .filter((value): value is string => Boolean(value))
    .join(" ")
    .toLowerCase();

  return searchableText.includes(normalizedSearch);
}

function matchesIngredientSearch(ingredient: IIngredient, searchTerm: string) {
  const normalizedSearch = searchTerm.trim().toLowerCase();
  if (normalizedSearch.length === 0) {
    return true;
  }

  const searchableText = [
    ingredient.ingredientName,
    ingredient.category,
    ingredient.brand,
    ingredient.unit,
  ]
    .filter((value): value is string => Boolean(value))
    .join(" ")
    .toLowerCase();

  return searchableText.includes(normalizedSearch);
}

function matchesSelectedIngredients(recipe: EnrichedRecipe, selectedIngredientIds: number[]) {
  if (selectedIngredientIds.length === 0) {
    return true;
  }

  return recipe.ingredients.some((ingredient) => selectedIngredientIds.includes(ingredient.ingredientId));
}

function matchesRecipeTypes(recipe: EnrichedRecipe, selectedRecipeTypes: RecipeType[]) {
  if (selectedRecipeTypes.length === 0) {
    return true;
  }

  return selectedRecipeTypes.includes(recipe.recipeType);
}

function matchesRecipeTags(recipe: EnrichedRecipe, selectedRecipeTags: RecipeTag[]) {
  if (selectedRecipeTags.length === 0) {
    return true;
  }

  return recipe.tags.some((tag) => selectedRecipeTags.includes(tag));
}

function matchesCuisines(recipe: EnrichedRecipe, selectedCuisines: Cuisine[]) {
  if (selectedCuisines.length === 0) {
    return true;
  }

  return recipe.cuisine !== undefined && recipe.cuisine !== null && selectedCuisines.includes(recipe.cuisine);
}

function matchesIngredientCategories(
  ingredient: IIngredient,
  selectedIngredientCategories: IngredientCategory[],
) {
  if (selectedIngredientCategories.length === 0) {
    return true;
  }

  return selectedIngredientCategories.includes(normalizeIngredientCategory(ingredient.category));
}

function normalizeIngredientCategory(category: IngredientCategory | number | string): IngredientCategory {
  if (typeof category === "string" && ingredientCategoryByIndex.includes(category as IngredientCategory)) {
    return category as IngredientCategory;
  }

  if (typeof category === "number" && ingredientCategoryByIndex[category]) {
    return ingredientCategoryByIndex[category];
  }

  return "Other";
}

const ingredientCategoryByIndex: IngredientCategory[] = [
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

export default Browser;
