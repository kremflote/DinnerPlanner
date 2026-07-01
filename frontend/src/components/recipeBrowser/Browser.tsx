import { useEffect, useId, useMemo, useRef, useState, type ReactNode, type RefObject } from "react";
import IngredientThumbnail from "../IngredientThumbnail";
import RecipeThumbnail from "../RecipeThumbnail";
import { useCuisines, useIngredients, useRecipes } from "../../contexts";
import type { IIngredient, IngredientTag, INutritionFacts } from "../../interfaces/IIngredient";
import type { ICuisine } from "../../interfaces/ILookup";
import type { RecipeTag, RecipeType } from "../../interfaces/IRecipe";
import { ingredientService, recipeService } from "../../services";
import { getApiAssetUrl } from "../../services/apiClient";
import type { SiteTheme } from "../../styles/appStyles";
import BrowserFilterSection from "./BrowserFilterSection";
import IngredientCreateForm from "./IngredientCreateForm";
import RecipeCreateForm from "./RecipeCreateForm";
import { formatLabel, recipeBrowserStyles } from "./recipeBrowserStyles";
import type { BrowserMode, EnrichedRecipe } from "./types";

type BrowserProps = {
  mode: BrowserMode;
  theme: SiteTheme;
  headerActions: ReactNode;
};

function Browser({ mode, theme, headerActions }: BrowserProps) {
  const { cuisines } = useCuisines();
  const { recipes, recipeIsLoading, initError: recipeError } = useRecipes();
  const {
    ingredients,
    ingredientIsLoading,
    initError: ingredientError,
  } = useIngredients();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIngredientTags, setSelectedIngredientTags] = useState<IngredientTag[]>([]);
  const [selectedRecipeTypes, setSelectedRecipeTypes] = useState<RecipeType[]>([]);
  const [selectedRecipeTags, setSelectedRecipeTags] = useState<RecipeTag[]>([]);
  const [selectedCuisineIds, setSelectedCuisineIds] = useState<number[]>([]);
  const [selectedIngredientIds, setSelectedIngredientIds] = useState<number[]>([]);
  const [selectedDetail, setSelectedDetail] = useState<BrowserDetail | null>(null);
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
        matchesCuisines(recipe, selectedCuisineIds),
      ),
    [
      recipes,
      searchTerm,
      selectedIngredientIds,
      selectedRecipeTypes,
      selectedRecipeTags,
      selectedCuisineIds,
    ],
  );

  const filteredIngredients = useMemo(
    () =>
      ingredients.filter((ingredient) =>
        matchesIngredientSearch(ingredient, searchTerm) &&
        matchesIngredientTags(ingredient, selectedIngredientTags),
      ),
    [ingredients, searchTerm, selectedIngredientTags],
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
    setSelectedIngredientTags([]);
    setSelectedRecipeTypes([]);
    setSelectedRecipeTags([]);
    setSelectedCuisineIds([]);
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
          cuisines={cuisines}
          selectedCuisineIds={selectedCuisineIds}
          selectedRecipeTags={selectedRecipeTags}
          selectedIngredientTags={selectedIngredientTags}
          selectedIngredients={selectedIngredients}
          selectedRecipeTypes={selectedRecipeTypes}
          theme={theme}
          onClear={clearFilters}
          onRemoveCuisine={(value) =>
            setSelectedCuisineIds((currentValues) => currentValues.filter((currentValue) => currentValue !== value))
          }
          onRemoveRecipeTag={(value) =>
            setSelectedRecipeTags((currentValues) => currentValues.filter((currentValue) => currentValue !== value))
          }
          onRemoveIngredient={(ingredientId) =>
            setSelectedIngredientIds((currentIds) =>
              currentIds.filter((currentId) => currentId !== ingredientId),
            )
          }
          onRemoveIngredientTag={(value) =>
            setSelectedIngredientTags((currentValues) =>
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
          cuisines={cuisines}
          selectedCuisineIds={selectedCuisineIds}
          selectedRecipeTags={selectedRecipeTags}
          selectedIngredientTags={selectedIngredientTags}
          selectedRecipeTypes={selectedRecipeTypes}
          setSelectedCuisineIds={setSelectedCuisineIds}
          setSelectedRecipeTags={setSelectedRecipeTags}
          setSelectedIngredientTags={setSelectedIngredientTags}
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
                    onClick={() => setSelectedDetail({ kind: "ingredient", ingredient })}
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
                    imageUrl: recipe.imageUrl,
                    name: recipe.name,
                    subtitle: recipe.cuisine?.name ?? recipe.recipeType,
                  }}
                  onClick={() => setSelectedDetail({ kind: "recipe", recipe })}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {selectedDetail !== null && (
        <BrowserDetailModal
          detail={selectedDetail}
          theme={theme}
          onClose={() => setSelectedDetail(null)}
        />
      )}
    </>
  );
}

type BrowserDetail =
  | { kind: "recipe"; recipe: EnrichedRecipe }
  | { kind: "ingredient"; ingredient: IIngredient };

type BrowserDetailModalProps = {
  detail: BrowserDetail;
  theme: SiteTheme;
  onClose: () => void;
};

function BrowserDetailModal({ detail, theme, onClose }: BrowserDetailModalProps) {
  const editRecipeImageInputId = useId();
  const { refreshRecipes } = useRecipes();
  const { refreshIngredients } = useIngredients();
  const [isEditingRecipe, setIsEditingRecipe] = useState(false);
  const [isEditingIngredient, setIsEditingIngredient] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleRemove = async () => {
    const itemName = detail.kind === "recipe" ? detail.recipe.name : detail.ingredient.ingredientName;
    const itemLabel = detail.kind === "recipe" ? "recipe" : "ingredient";
    const confirmed = window.confirm(`Remove ${itemName}? This will delete the ${itemLabel}.`);
    if (!confirmed) {
      return;
    }

    setIsDeleting(true);
    setDeleteError(null);

    try {
      if (detail.kind === "recipe") {
        await recipeService.delete(detail.recipe.recipeId);
        await refreshRecipes();
      } else {
        await ingredientService.delete(detail.ingredient.ingredientId);
        await refreshIngredients();
        await refreshRecipes();
      }

      onClose();
    } catch (caughtError) {
      setDeleteError(caughtError instanceof Error ? caughtError.message : `Could not remove ${itemLabel}.`);
    } finally {
      setIsDeleting(false);
    }
  };

  if (detail.kind === "recipe" && isEditingRecipe) {
    return (
      <div className={recipeBrowserStyles.modalBackdrop} role="presentation" onMouseDown={onClose}>
        <section
          aria-modal="true"
          className={recipeBrowserStyles.modalPanel(theme)}
          role="dialog"
          onMouseDown={(event) => event.stopPropagation()}
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl font-bold leading-tight">Edit {detail.recipe.name}</h2>
            <button className={`${recipeBrowserStyles.modalCloseButton(theme)} ml-auto`} type="button" onClick={onClose}>
              Close
            </button>
          </div>

          <RecipeCreateForm
            imageInputId={editRecipeImageInputId}
            initialRecipe={detail.recipe}
            showRecipeDetails
            theme={theme}
            onCancel={() => setIsEditingRecipe(false)}
            onCreated={onClose}
          />
        </section>
      </div>
    );
  }

  if (detail.kind === "ingredient" && isEditingIngredient) {
    return (
      <div className={recipeBrowserStyles.modalBackdrop} role="presentation" onMouseDown={onClose}>
        <section
          aria-modal="true"
          className={recipeBrowserStyles.modalPanel(theme)}
          role="dialog"
          onMouseDown={(event) => event.stopPropagation()}
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl font-bold leading-tight">Edit {detail.ingredient.ingredientName}</h2>
            <button className={`${recipeBrowserStyles.modalCloseButton(theme)} ml-auto`} type="button" onClick={onClose}>
              Close
            </button>
          </div>

          <IngredientCreateForm
            initialIngredient={detail.ingredient}
            theme={theme}
            onCancel={() => setIsEditingIngredient(false)}
            onCreated={onClose}
          />
        </section>
      </div>
    );
  }

  return (
    <div className={recipeBrowserStyles.modalBackdrop} role="presentation" onMouseDown={onClose}>
      <section
        aria-modal="true"
        className={recipeBrowserStyles.modalPanel(theme)}
        role="dialog"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="grid gap-2">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="min-w-0 text-2xl font-bold leading-tight">
              {detail.kind === "recipe" ? detail.recipe.name : detail.ingredient.ingredientName}
            </h2>
            <button
              className={recipeBrowserStyles.detailHeaderEditButton(theme)}
              type="button"
              onClick={() => {
                if (detail.kind === "recipe") {
                  setIsEditingRecipe(true);
                } else {
                  setIsEditingIngredient(true);
                }
              }}
            >
              {detail.kind === "recipe"
                ? `Edit ${detail.recipe.recipeType === "Dish" ? "dish" : formatLabel(detail.recipe.recipeType).toLowerCase()}`
                : "Edit ingredient"}
            </button>
            <button
              className={recipeBrowserStyles.detailHeaderRemoveButton(theme)}
              disabled={isDeleting}
              type="button"
              onClick={handleRemove}
            >
              {isDeleting ? "Removing..." : "Remove"}
            </button>
            <button className={`${recipeBrowserStyles.modalCloseButton(theme)} ml-auto`} type="button" onClick={onClose}>
              Close
            </button>
          </div>
          <div>
            {detail.kind === "recipe" && (
              <div className="flex flex-wrap gap-2">
                {detail.recipe.tags.map((tag) => (
                  <span className={recipeBrowserStyles.filterChip(theme)} key={tag}>
                    {formatLabel(tag)}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {deleteError !== null && <p className={`mt-4 ${recipeBrowserStyles.statusError(theme)}`}>{deleteError}</p>}

        {detail.kind === "recipe" ? (
          <RecipeDetailContent recipe={detail.recipe} theme={theme} />
        ) : (
          <IngredientDetailContent ingredient={detail.ingredient} theme={theme} />
        )}
      </section>
    </div>
  );
}

type RecipeDetailContentProps = {
  recipe: EnrichedRecipe;
  theme: SiteTheme;
};

function RecipeDetailContent({ recipe, theme }: RecipeDetailContentProps) {
  const imageUrl = getApiAssetUrl(recipe.imageUrl);
  const nutrition = calculateRecipeNutrition(recipe);
  const [ingredientMultiplier, setIngredientMultiplier] = useState("1");
  const amountMultiplier = parseAmountMultiplier(ingredientMultiplier);

  return (
    <div className="mt-5 grid gap-5">
      <div className="grid grid-cols-[minmax(180px,260px)_minmax(0,1fr)] gap-5 max-md:grid-cols-1">
        <div className="aspect-square overflow-hidden rounded-md bg-neutral-800">
          {imageUrl ? (
            <img className="h-full w-full object-cover" src={imageUrl} alt={recipe.name} />
          ) : (
            <div className="flex h-full w-full items-center justify-center px-4 text-center text-sm font-bold text-neutral-400">
              No image
            </div>
          )}
        </div>

        <div className="grid content-start">
          <DetailTextWithMeta
            className="h-[260px] grid-rows-[auto_minmax(0,1fr)] max-md:h-auto"
            label="Description"
            meta={[
              formatLabel(recipe.recipeType),
              recipe.cuisine?.name,
              recipe.dessertType ? formatLabel(recipe.dessertType) : null,
            ].filter(Boolean).join(" · ")}
            theme={theme}
            value={recipe.description || "No description yet."}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
        <DetailSection
          title="Ingredients"
          theme={theme}
          headerAction={
            <label className="flex items-center gap-2">
              <span className={recipeBrowserStyles.helperText(theme)}>Scale</span>
              <span className={`${recipeBrowserStyles.numberField} w-20`}>
                <input
                  aria-label="Ingredient amount multiplier"
                  className={`${recipeBrowserStyles.compactTextField(theme)} w-full pr-6`}
                  min="0"
                  placeholder="1"
                  step="0.25"
                  type="number"
                  value={ingredientMultiplier}
                  onChange={(event) => setIngredientMultiplier(event.target.value)}
                />
                <span className={recipeBrowserStyles.numberFieldSuffix(theme)}>x</span>
              </span>
            </label>
          }
        >
          {recipe.ingredients.length === 0 ? (
            <p className={recipeBrowserStyles.helperText(theme)}>No ingredients added.</p>
          ) : (
            <div className="grid gap-2">
              {recipe.ingredients.map((recipeIngredient) => (
                <div
                  className={`${detailRowClass(theme)} flex-wrap`}
                  key={recipeIngredient.recipeIngredientId}
                >
                  <span className="min-w-0 font-bold">{recipeIngredient.ingredient.ingredientName}</span>
                  <span className="shrink-0">
                    {formatRecipeIngredientAmount(recipeIngredient.amount, recipeIngredient.unit, amountMultiplier)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </DetailSection>

        <DetailText
          label="Instructions"
          theme={theme}
          value={recipe.instructions || "No instructions yet."}
        />
      </div>

      <DetailSection title="Dietary information" theme={theme}>
        <NutritionGrid nutrition={nutrition} theme={theme} />
      </DetailSection>
    </div>
  );
}

type IngredientDetailContentProps = {
  ingredient: IIngredient;
  theme: SiteTheme;
};

function IngredientDetailContent({ ingredient, theme }: IngredientDetailContentProps) {
  return (
    <div className="mt-5 grid gap-5">
      <div className="grid gap-4">
        <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
          <MetadataRow label="Brand" theme={theme} value={ingredient.brand?.name ?? "No brand"} />
          <MetadataRow
            label="Price"
            theme={theme}
            value={ingredient.price === null ? "No price" : `${ingredient.price.toFixed(2)} per kg`}
          />
        </div>
        <ChipList label="Tags" theme={theme} values={ingredient.tags.map(formatLabel)} />
        <DetailText
          label="Description"
          theme={theme}
          value={ingredient.description || "No description yet."}
        />
      </div>

      <DetailSection title="Dietary information per 100g" theme={theme}>
        <NutritionGrid nutrition={ingredient.nutritionPer100} theme={theme} />
      </DetailSection>
    </div>
  );
}

type DetailSectionProps = {
  title: string;
  theme: SiteTheme;
  children: ReactNode;
  headerAction?: ReactNode;
};

function DetailSection({ title, theme, children, headerAction }: DetailSectionProps) {
  return (
    <section className={recipeBrowserStyles.detailsPanel(theme)}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-sm font-bold uppercase tracking-wide">{title}</h3>
        {headerAction}
      </div>
      {children}
    </section>
  );
}

type DetailTextProps = {
  label: string;
  theme: SiteTheme;
  value: string;
};

function DetailText({ label, theme, value }: DetailTextProps) {
  return (
      <DetailSection title={label} theme={theme}>
      <p className="self-start whitespace-pre-wrap text-left text-sm font-semibold leading-[1.55]">{value}</p>
    </DetailSection>
  );
}

type DetailTextWithMetaProps = DetailTextProps & {
  className?: string;
  meta: string;
};

function DetailTextWithMeta({ className = "", label, meta, theme, value }: DetailTextWithMetaProps) {
  return (
    <section className={`${recipeBrowserStyles.detailsPanel(theme)} min-h-0 overflow-hidden ${className}`}>
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h3 className="text-sm font-bold uppercase tracking-wide">{label}</h3>
        <span className={recipeBrowserStyles.helperText(theme)}>{meta}</span>
      </div>
      <p className="min-h-0 self-start overflow-y-auto whitespace-pre-wrap pr-1 text-left text-sm font-semibold leading-[1.55]">{value}</p>
    </section>
  );
}

type MetadataRowProps = {
  label: string;
  value: string;
  theme: SiteTheme;
};

function MetadataRow({ label, value, theme }: MetadataRowProps) {
  return (
    <div className={detailRowClass(theme)}>
      <span className="font-bold">{label}</span>
      <span>{value}</span>
    </div>
  );
}

type ChipListProps = {
  label: string;
  values: string[];
  theme: SiteTheme;
};

function ChipList({ label, values, theme }: ChipListProps) {
  return (
    <section className="grid gap-2">
      <span className={recipeBrowserStyles.label(theme)}>{label}</span>
      <div className="flex flex-wrap gap-2">
        {values.length === 0 ? (
          <span className={recipeBrowserStyles.helperText(theme)}>None</span>
        ) : (
          values.map((value) => (
            <span className={recipeBrowserStyles.filterChip(theme)} key={value}>
              {value}
            </span>
          ))
        )}
      </div>
    </section>
  );
}

type NutritionGridProps = {
  nutrition: INutritionFacts | null;
  theme: SiteTheme;
};

function NutritionGrid({ nutrition, theme }: NutritionGridProps) {
  if (nutrition === null) {
    return <p className={recipeBrowserStyles.helperText(theme)}>No dietary information yet.</p>;
  }

  const rows = [
    ["Calories", nutrition.calories === null ? null : `${nutrition.calories} kcal`],
    ["Carbs", formatGrams(nutrition.carbohydrateGrams)],
    ["Protein", formatGrams(nutrition.proteinGrams)],
    ["Salt", formatGrams(nutrition.saltGrams)],
    ["Fiber", formatGrams(nutrition.dietaryFiberGrams)],
    ["Saturated fats", formatGrams(nutrition.saturatedFatGrams)],
    ["Unsaturated fats", formatGrams(nutrition.unsaturatedFatGrams)],
    ["Monounsaturated fats", formatGrams(nutrition.monounsaturatedFatGrams)],
    ["Polyunsaturated fats", formatGrams(nutrition.polyunsaturatedFatGrams)],
    ["Vitamins", nutrition.vitamins.length === 0 ? null : nutrition.vitamins.map(formatLabel).join(", ")],
  ];

  return (
    <div className="grid grid-cols-2 gap-2 max-sm:grid-cols-1">
      {rows.map(([label, value]) => (
        <div className={detailRowClass(theme)} key={label}>
          <span className="font-bold">{label}</span>
          <span>{value ?? "Not set"}</span>
        </div>
      ))}
    </div>
  );
}

function calculateRecipeNutrition(recipe: EnrichedRecipe): INutritionFacts | null {
  const total = createEmptyNutrition();
  let hasNutrition = false;

  recipe.ingredients.forEach((recipeIngredient) => {
    const nutrition = recipeIngredient.ingredient.nutritionPer100;
    const grams = toGramAmount(recipeIngredient.amount, recipeIngredient.unit);

    if (nutrition === null || grams === null) {
      return;
    }

    hasNutrition = true;
    const factor = grams / 100;
    total.calories = addScaled(total.calories, nutrition.calories, factor);
    total.carbohydrateGrams = addScaled(total.carbohydrateGrams, nutrition.carbohydrateGrams, factor);
    total.proteinGrams = addScaled(total.proteinGrams, nutrition.proteinGrams, factor);
    total.saltGrams = addScaled(total.saltGrams, nutrition.saltGrams, factor);
    total.dietaryFiberGrams = addScaled(total.dietaryFiberGrams, nutrition.dietaryFiberGrams, factor);
    total.saturatedFatGrams = addScaled(total.saturatedFatGrams, nutrition.saturatedFatGrams, factor);
    total.unsaturatedFatGrams = addScaled(total.unsaturatedFatGrams, nutrition.unsaturatedFatGrams, factor);
    total.monounsaturatedFatGrams = addScaled(total.monounsaturatedFatGrams, nutrition.monounsaturatedFatGrams, factor);
    total.polyunsaturatedFatGrams = addScaled(total.polyunsaturatedFatGrams, nutrition.polyunsaturatedFatGrams, factor);
    total.vitamins = Array.from(new Set([...total.vitamins, ...nutrition.vitamins]));
  });

  return hasNutrition ? total : null;
}

function createEmptyNutrition(): INutritionFacts {
  return {
    calories: null,
    carbohydrateGrams: null,
    proteinGrams: null,
    saltGrams: null,
    dietaryFiberGrams: null,
    saturatedFatGrams: null,
    unsaturatedFatGrams: null,
    monounsaturatedFatGrams: null,
    polyunsaturatedFatGrams: null,
    vitamins: [],
  };
}

function addScaled(currentValue: number | null, value: number | null, factor: number) {
  if (value === null) {
    return currentValue;
  }

  return roundNutrition((currentValue ?? 0) + value * factor);
}

function roundNutrition(value: number) {
  return Math.round(value * 10) / 10;
}

function toGramAmount(amount: number | null, unit: string) {
  if (amount === null) {
    return null;
  }

  if (unit === "Gram") {
    return amount;
  }

  if (unit === "Kilogram") {
    return amount * 1000;
  }

  return null;
}

function parseAmountMultiplier(value: string) {
  const multiplier = Number(value);
  return Number.isFinite(multiplier) && multiplier >= 0 ? multiplier : 1;
}

function formatRecipeIngredientAmount(amount: number | null, unit: string, multiplier = 1) {
  if (amount === null) {
    return formatLabel(unit);
  }

  const scaledAmount = Math.round(amount * multiplier * 100) / 100;
  return `${scaledAmount} ${formatLabel(unit).toLowerCase()}`;
}

function formatGrams(value: number | null) {
  return value === null ? null : `${value} g`;
}

function detailRowClass(theme: SiteTheme) {
  return `flex items-center justify-between gap-3 rounded-md px-3 py-2 text-sm font-semibold ${
    theme === "dark"
      ? "bg-white/[0.05] text-neutral-200"
      : theme === "paletteLight"
        ? "bg-[#E5D5BC]/45 text-[#556145]"
        : "bg-neutral-100 text-neutral-700"
  }`;
}

type ActiveFilterChipsProps = {
  mode: BrowserMode;
  cuisines: ICuisine[];
  selectedIngredientTags: IngredientTag[];
  selectedRecipeTypes: RecipeType[];
  selectedRecipeTags: RecipeTag[];
  selectedCuisineIds: number[];
  selectedIngredients: IIngredient[];
  theme: SiteTheme;
  onClear: () => void;
  onRemoveIngredientTag: (value: IngredientTag) => void;
  onRemoveRecipeType: (value: RecipeType) => void;
  onRemoveRecipeTag: (value: RecipeTag) => void;
  onRemoveCuisine: (value: number) => void;
  onRemoveIngredient: (ingredientId: number) => void;
};

function ActiveFilterChips({
  mode,
  cuisines,
  selectedIngredientTags,
  selectedRecipeTypes,
  selectedRecipeTags,
  selectedCuisineIds,
  selectedIngredients,
  theme,
  onClear,
  onRemoveIngredientTag,
  onRemoveRecipeType,
  onRemoveRecipeTag,
  onRemoveCuisine,
  onRemoveIngredient,
}: ActiveFilterChipsProps) {
  const hasIngredientFilters = selectedIngredientTags.length > 0;
  const hasRecipeFilters =
    selectedIngredients.length > 0 ||
    selectedRecipeTypes.length > 0 ||
    selectedRecipeTags.length > 0 ||
    selectedCuisineIds.length > 0;

  const hasVisibleFilters = mode === "ingredients" ? hasIngredientFilters : hasRecipeFilters;

  return (
    <div className="mt-3 flex min-h-6 flex-wrap items-start gap-2">
      {!hasVisibleFilters && <span className="h-6" aria-hidden="true" />}
      {mode === "ingredients" &&
        selectedIngredientTags.map((tag) => (
          <FilterChip
            key={tag}
            label={formatLabel(tag)}
            theme={theme}
            onClick={() => onRemoveIngredientTag(tag)}
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
        selectedCuisineIds.map((cuisineId) => (
          <FilterChip
            key={cuisineId}
            label={cuisines.find((cuisine) => cuisine.cuisineId === cuisineId)?.name ?? "Cuisine"}
            theme={theme}
            onClick={() => onRemoveCuisine(cuisineId)}
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
    recipe.cuisine?.name,
    ...recipe.tags,
    ...recipe.ingredients.map((recipeIngredient) => recipeIngredient.ingredient.ingredientName),
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
    ...ingredient.tags,
    ingredient.brand?.name,
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

  return recipe.ingredients.some((recipeIngredient) =>
    selectedIngredientIds.includes(recipeIngredient.ingredient.ingredientId),
  );
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

function matchesCuisines(recipe: EnrichedRecipe, selectedCuisineIds: number[]) {
  if (selectedCuisineIds.length === 0) {
    return true;
  }

  return recipe.cuisineId !== null && selectedCuisineIds.includes(recipe.cuisineId);
}

function matchesIngredientTags(
  ingredient: IIngredient,
  selectedIngredientTags: IngredientTag[],
) {
  if (selectedIngredientTags.length === 0) {
    return true;
  }

  return ingredient.tags.some((tag) => selectedIngredientTags.includes(normalizeIngredientTag(tag)));
}

function normalizeIngredientTag(tag: IngredientTag | number | string): IngredientTag {
  if (typeof tag === "string" && ingredientTagByIndex.includes(tag as IngredientTag)) {
    return tag as IngredientTag;
  }

  if (typeof tag === "number" && ingredientTagByIndex[tag]) {
    return ingredientTagByIndex[tag];
  }

  return "Other";
}

const ingredientTagByIndex: IngredientTag[] = [
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
