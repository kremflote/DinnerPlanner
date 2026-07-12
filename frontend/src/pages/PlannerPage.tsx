import { useEffect, useMemo, useState } from "react";
import MealCalendar from "../components/MealCalendar";
import ConfirmationDialog from "../components/ConfirmationDialog";
import GroceryExportDialog from "../components/GroceryExportDialog";
import PlannerControls from "../components/PlannerControls";
import PlannerRecipePickerModal from "../components/PlannerRecipePickerModal";
import PrepHelperDialog, { type PrepHelperItem } from "../components/PrepHelperDialog";
import { useLanguage, useMealPlan, useRecipes } from "../contexts";
import type { IngredientTag, MeasurementUnit } from "../interfaces/IIngredient";
import type { IGroceryList } from "../interfaces/IGroceryList";
import type { MealRecipeRole, MealSlot, PlannerViewMode } from "../interfaces/IMeal";
import type { IRecipe } from "../interfaces/IRecipe";
import { groceryListService } from "../services";
import { pageStyles, plannerControlsStyles, type SiteTheme } from "../styles/appStyles";

type PlannerPageProps = {
  theme: SiteTheme;
};

const visibleMealSlots: MealSlot[] = ["Breakfast", "Lunch", "Dinner"];

type SelectedPlannerSlot = {
  date: string;
  slot: MealSlot;
};

const PlannerPage = ({ theme }: PlannerPageProps) => {
  const { locale, t } = useLanguage();
  const [viewMode, setViewMode] = useState<PlannerViewMode>("week");
  const [anchorDate, setAnchorDate] = useState(() => stripTime(new Date()));
  const [selectedSlot, setSelectedSlot] = useState<SelectedPlannerSlot | null>(null);
  const [plannerAction, setPlannerAction] = useState<"clear" | "generate" | null>(null);
  const [pendingPlannerAction, setPendingPlannerAction] = useState<"clear" | "generate" | null>(null);
  const [plannerActionError, setPlannerActionError] = useState<string | null>(null);
  const [groceryListPreview, setGroceryListPreview] = useState<IGroceryList | null>(null);
  const [isGroceryListLoading, setIsGroceryListLoading] = useState(false);
  const [groceryListLoadError, setGroceryListLoadError] = useState<string | null>(null);
  const [isPrepHelperOpen, setIsPrepHelperOpen] = useState(false);
  const {
    mealPlanEntries,
    mealPlanIsLoading,
    initError,
    clearMealPlanRange,
    deleteMealPlanEntry,
    loadMealPlan,
    saveMealPlanEntry,
  } = useMealPlan();
  const { recipes } = useRecipes();

  const visibleRange = useMemo(
    () => getVisibleRange(anchorDate, viewMode),
    [anchorDate, viewMode],
  );

  const visibleDates = useMemo(
    () => getDatesInRange(visibleRange.fromDate, visibleRange.toDate),
    [visibleRange],
  );

  const recipesById = useMemo(
    () => new Map(recipes.map((recipe) => [recipe.recipeId, recipe])),
    [recipes],
  );

  const entriesByDateSlot = useMemo(
    () =>
      new Map(
        mealPlanEntries.map((entry) => [
          getMealPlanEntryKey(entry.date, entry.slot),
          entry,
        ]),
      ),
    [mealPlanEntries],
  );

  const prepRange = useMemo(() => getWeekRange(anchorDate), [anchorDate]);
  const prepHelperItems = useMemo(
    () =>
      buildPrepHelperItems(
        mealPlanEntries,
        recipesById,
        prepRange.from,
        prepRange.to,
        t.enums.ingredientPreparations,
        t.planner.prepActionLabels,
      ),
    [mealPlanEntries, prepRange.from, prepRange.to, recipesById, t],
  );

  useEffect(() => {
    void loadMealPlan(visibleRange.from, visibleRange.to);
  }, [loadMealPlan, visibleRange.from, visibleRange.to]);

  const getEntryForSlot = (date: string, slot: MealSlot) =>
    entriesByDateSlot.get(getMealPlanEntryKey(date, slot));

  const moveToPreviousRange = () => {
    setPlannerActionError(null);
    setAnchorDate((currentDate) => addCalendarRange(currentDate, viewMode, -1));
  };

  const moveToNextRange = () => {
    setPlannerActionError(null);
    setAnchorDate((currentDate) => addCalendarRange(currentDate, viewMode, 1));
  };

  const changeViewMode = (nextViewMode: PlannerViewMode) => {
    setPlannerActionError(null);
    setViewMode(nextViewMode);
  };

  const requestClearCurrentRange = () => {
    if (plannerAction !== null || mealPlanIsLoading) {
      return;
    }

    setPendingPlannerAction("clear");
  };

  const clearCurrentRange = async () => {
    const clearRange = getClearRange(anchorDate, viewMode);
    const rangeLabel = t.planner.rangeNames[viewMode];

    setPlannerAction("clear");
    setPendingPlannerAction(null);
    setPlannerActionError(null);

    try {
      await clearMealPlanRange(clearRange.from, clearRange.to);
    } catch (error) {
      setPlannerActionError(getPlannerActionError(error, t.planner.couldNotClear(rangeLabel)));
    } finally {
      setPlannerAction(null);
    }
  };

  const requestGenerateCurrentRange = () => {
    if (plannerAction !== null || mealPlanIsLoading) {
      return;
    }

    setPendingPlannerAction("generate");
  };

  const openGroceryExportDialog = async () => {
    if (plannerAction !== null || mealPlanIsLoading || isGroceryListLoading) {
      return;
    }

    setGroceryListPreview(createEmptyGroceryList(visibleRange.from, visibleRange.to));
    setIsGroceryListLoading(true);
    setGroceryListLoadError(null);
    setPlannerActionError(null);

    try {
      setGroceryListPreview(await groceryListService.preview(visibleRange.from, visibleRange.to));
    } catch (_error) {
      setGroceryListLoadError(t.planner.groceryExportCouldNotLoad);
    } finally {
      setIsGroceryListLoading(false);
    }
  };

  const closeGroceryExportDialog = () => {
    setGroceryListPreview(null);
    setGroceryListLoadError(null);
  };

  const generateCurrentRange = async () => {
    const generationDates = getGenerationDates(anchorDate, viewMode);
    const rangeLabel = t.planner.rangeNames[viewMode];

    const mainRecipes = recipes.filter((recipe) => recipe.recipeType === "Dish");
    const sideRecipes = recipes.filter(isGeneratedSideRecipe);

    if (mainRecipes.length === 0) {
      setPendingPlannerAction(null);
      setPlannerActionError(t.planner.noMainDishRecipesFound);
      return;
    }

    setPlannerAction("generate");
    setPendingPlannerAction(null);
    setPlannerActionError(null);

    try {
      for (const date of generationDates) {
        const dateKey = toDateInputValue(date);

        for (const slot of visibleMealSlots) {
          if (getEntryForSlot(dateKey, slot) !== undefined) {
            continue;
          }

          const mainRecipe = pickRandomItem(mainRecipes);
          const sideRecipe = sideRecipes.length > 0 ? pickRandomItem(sideRecipes) : null;

          await saveMealPlanEntry(null, {
            date: dateKey,
            slot,
            notes: null,
            recipes: [
              {
                recipeId: mainRecipe.recipeId,
                role: "Main",
                sortOrder: 0,
              },
              ...(sideRecipe === null
                ? []
                : [
                    {
                      recipeId: sideRecipe.recipeId,
                      role: getGeneratedSideRole(sideRecipe),
                      sortOrder: 1,
                    },
                  ]),
            ],
          });
        }
      }
    } catch (error) {
      setPlannerActionError(getPlannerActionError(error, t.planner.couldNotGenerate(rangeLabel)));
    } finally {
      setPlannerAction(null);
    }
  };

  return (
    <main className={pageStyles.shell}>
      {pageStyles.showColumnDebugOverlay && (
        <div className={pageStyles.columnDebugOverlay} aria-hidden="true">
          {Array.from({ length: 12 }, (_, index) => (
            <div className={pageStyles.columnDebugCell} key={index} />
          ))}
        </div>
      )}
      <PlannerControls
        anchorLabel={getAnchorLabel(anchorDate, viewMode, locale, t.planner.weekLabel)}
        anchorYear={getAnchorYear(anchorDate, locale)}
        isClearRangeRunning={plannerAction === "clear"}
        isExportRangeRunning={isGroceryListLoading}
        isGenerateRangeRunning={plannerAction === "generate"}
        isRangeBusy={mealPlanIsLoading}
        theme={theme}
        viewMode={viewMode}
        onClearRange={requestClearCurrentRange}
        onExportRange={openGroceryExportDialog}
        onGenerateRange={requestGenerateCurrentRange}
        onNextRange={moveToNextRange}
        onOpenPrepHelper={() => setIsPrepHelperOpen(true)}
        onPreviousRange={moveToPreviousRange}
        onViewModeChange={changeViewMode}
      />
      {plannerActionError !== null && (
        <p className={plannerControlsStyles.statusError(theme)}>{plannerActionError}</p>
      )}
      <MealCalendar
        anchorDate={anchorDate}
        dates={visibleDates}
        getEntryForSlot={getEntryForSlot}
        isLoading={mealPlanIsLoading}
        loadError={initError === null ? null : t.planner.couldNotLoadMealPlan}
        mealSlots={visibleMealSlots}
        onSlotClick={(date, slot) => setSelectedSlot({ date, slot })}
        recipesById={recipesById}
        theme={theme}
        viewMode={viewMode}
      />
      {selectedSlot !== null && (
        <PlannerRecipePickerModal
          date={selectedSlot.date}
          entry={getEntryForSlot(selectedSlot.date, selectedSlot.slot)}
          recipes={recipes}
          slot={selectedSlot.slot}
          theme={theme}
          onClose={() => setSelectedSlot(null)}
          onDelete={deleteMealPlanEntry}
          onSave={saveMealPlanEntry}
        />
      )}
      {groceryListPreview !== null && (
        <GroceryExportDialog
          groceryList={groceryListPreview}
          isLoading={isGroceryListLoading}
          loadError={groceryListLoadError}
          theme={theme}
          onClose={closeGroceryExportDialog}
        />
      )}
      {isPrepHelperOpen && (
        <PrepHelperDialog
          from={prepRange.from}
          items={prepHelperItems}
          theme={theme}
          to={prepRange.to}
          onClose={() => setIsPrepHelperOpen(false)}
        />
      )}
      {pendingPlannerAction !== null && (
        <ConfirmationDialog
          body={
            pendingPlannerAction === "clear"
              ? t.planner.clearRangeBody(t.planner.rangeNames[viewMode])
              : t.planner.generateRangeBody(t.planner.rangeNames[viewMode])
          }
          confirmLabel={pendingPlannerAction === "clear" ? t.common.clear : t.planner.generateMealPlan}
          isBusy={plannerAction !== null}
          theme={theme}
          title={
            pendingPlannerAction === "clear"
              ? t.planner.clearRange(t.planner.rangeNames[viewMode])
              : t.planner.generateCurrent(t.planner.rangeNames[viewMode])
          }
          tone={pendingPlannerAction === "clear" ? "danger" : "default"}
          onCancel={() => setPendingPlannerAction(null)}
          onConfirm={() => {
            if (pendingPlannerAction === "clear") {
              void clearCurrentRange();
              return;
            }

            void generateCurrentRange();
          }}
        />
      )}
    </main>
  );
};

function getMealPlanEntryKey(date: string, slot: MealSlot) {
  return `${date}::${slot}`;
}

function getVisibleRange(anchorDate: Date, viewMode: PlannerViewMode) {
  if (viewMode === "month") {
    const monthStart = new Date(anchorDate.getFullYear(), anchorDate.getMonth(), 1);
    const monthEnd = new Date(anchorDate.getFullYear(), anchorDate.getMonth() + 1, 0);
    const fromDate = getWeekStart(monthStart);
    const toDate = getWeekEnd(monthEnd);

    return {
      fromDate,
      toDate,
      from: toDateInputValue(fromDate),
      to: toDateInputValue(toDate),
    };
  }

  const fromDate = getWeekStart(anchorDate);
  const toDate = getWeekEnd(anchorDate);

  return {
    fromDate,
    toDate,
    from: toDateInputValue(fromDate),
    to: toDateInputValue(toDate),
  };
}

function getWeekRange(anchorDate: Date) {
  const fromDate = getWeekStart(anchorDate);
  const toDate = getWeekEnd(anchorDate);

  return {
    fromDate,
    toDate,
    from: toDateInputValue(fromDate),
    to: toDateInputValue(toDate),
  };
}

function getClearRange(anchorDate: Date, viewMode: PlannerViewMode) {
  if (viewMode === "month") {
    const fromDate = new Date(anchorDate.getFullYear(), anchorDate.getMonth(), 1);
    const toDate = new Date(anchorDate.getFullYear(), anchorDate.getMonth() + 1, 0);

    return {
      from: toDateInputValue(fromDate),
      to: toDateInputValue(toDate),
    };
  }

  return {
    from: toDateInputValue(getWeekStart(anchorDate)),
    to: toDateInputValue(getWeekEnd(anchorDate)),
  };
}

function getGenerationDates(anchorDate: Date, viewMode: PlannerViewMode) {
  if (viewMode === "month") {
    const fromDate = new Date(anchorDate.getFullYear(), anchorDate.getMonth(), 1);
    const toDate = new Date(anchorDate.getFullYear(), anchorDate.getMonth() + 1, 0);

    return getDatesInRange(fromDate, toDate);
  }

  return getDatesInRange(getWeekStart(anchorDate), getWeekEnd(anchorDate));
}

function createEmptyGroceryList(from: string, to: string): IGroceryList {
  return {
    from,
    to,
    generatedAt: new Date().toISOString(),
    sections: [],
  };
}

function getAnchorLabel(
  anchorDate: Date,
  viewMode: PlannerViewMode,
  locale: string,
  formatWeekLabel: (week: number) => string,
) {
  if (viewMode === "month") {
    return capitalizeFirstLetter(new Intl.DateTimeFormat(locale, {
      month: "long",
    }).format(anchorDate));
  }

  return formatWeekLabel(getIsoWeek(anchorDate));
}

function getAnchorYear(anchorDate: Date, locale: string) {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
  }).format(anchorDate);
}

function capitalizeFirstLetter(value: string) {
  return value.length === 0 ? value : value.charAt(0).toLocaleUpperCase() + value.slice(1);
}

function getDatesInRange(fromDate: Date, toDate: Date) {
  const dates: Date[] = [];
  let currentDate = stripTime(fromDate);

  while (currentDate <= toDate) {
    dates.push(currentDate);
    currentDate = addDays(currentDate, 1);
  }

  return dates;
}

function addCalendarRange(date: Date, viewMode: PlannerViewMode, direction: -1 | 1) {
  if (viewMode === "month") {
    return new Date(date.getFullYear(), date.getMonth() + direction, 1);
  }

  return addDays(date, direction * 7);
}

function getWeekStart(date: Date) {
  const nextDate = stripTime(date);
  const day = nextDate.getDay() || 7;
  return addDays(nextDate, 1 - day);
}

function getWeekEnd(date: Date) {
  return addDays(getWeekStart(date), 6);
}

function addDays(date: Date, days: number) {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + days);
  return stripTime(nextDate);
}

function stripTime(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function toDateInputValue(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getIsoWeek(date: Date) {
  const nextDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const day = nextDate.getUTCDay() || 7;
  nextDate.setUTCDate(nextDate.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(nextDate.getUTCFullYear(), 0, 1));

  return Math.ceil(((nextDate.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

function isGeneratedSideRecipe(recipe: IRecipe) {
  return recipe.recipeType === "Side" || recipe.recipeType === "Sauce" || recipe.recipeType === "Dip";
}

function getGeneratedSideRole(recipe: IRecipe): MealRecipeRole {
  if (recipe.recipeType === "Sauce" || recipe.recipeType === "Dip") {
    return "Sauce";
  }

  return "Side";
}

function pickRandomItem<TItem>(items: TItem[]) {
  return items[Math.floor(Math.random() * items.length)];
}

type PrepActionKey =
  | "chop"
  | "batons"
  | "crush"
  | "cube"
  | "dice"
  | "grate"
  | "julienne"
  | "mince"
  | "quarter"
  | "roughChop"
  | "shred"
  | "slice"
  | "wedge";

type PrepIngredientRow = {
  ingredientId: number;
  ingredientName: string;
  amount: number | null;
  unit: MeasurementUnit;
  actions: string[];
  sourceRecipe: string;
};

const prepIngredientTags: IngredientTag[] = ["Vegetable", "Fruit", "Herb", "LeafyGreen"];

const prepActionPatterns: Array<{
  key: PrepActionKey;
  patterns: RegExp[];
}> = [
  { key: "roughChop", patterns: [/\broughly chop\b/i, /\bgrovhakk/i] },
  { key: "mince", patterns: [/\bmince\b/i, /\bfinely chop\b/i, /\bfinhakk/i] },
  { key: "julienne", patterns: [/\bjulienne\b/i, /\bjulienned\b/i] },
  { key: "batons", patterns: [/\bbaton\b/i, /\bbatons\b/i, /\bbatonnet\b/i, /\bstaver\b/i] },
  { key: "crush", patterns: [/\bcrush\b/i, /\bknus/i] },
  { key: "shred", patterns: [/\bshred\b/i, /\bstriml/i] },
  { key: "quarter", patterns: [/\bquarter\b/i, /\bdelt i fire/i] },
  { key: "wedge", patterns: [/\bwedge\b/i, /\bbåt/i] },
  { key: "cube", patterns: [/\bcube\b/i, /\btern/i, /\bkutt i terning/i] },
  { key: "dice", patterns: [/\bdice\b/i, /\bfintern/i] },
  { key: "slice", patterns: [/\bslice\b/i, /\bskj[aæ]r\b/i, /\bskiv/i] },
  { key: "grate", patterns: [/\bgrate\b/i, /\briv\b/i] },
  { key: "chop", patterns: [/\bchop\b/i, /\bhakk/i] },
];

function buildPrepHelperItems(
  mealPlanEntries: Array<{ date: string; recipes: Array<{ recipeId: number }> }>,
  recipesById: Map<number, IRecipe>,
  from: string,
  to: string,
  preparationLabels: Record<IRecipe["ingredients"][number]["preparation"], string>,
  actionLabels: Record<string, string>,
): PrepHelperItem[] {
  const prepRows = mealPlanEntries
    .filter((entry) => entry.date >= from && entry.date <= to)
    .flatMap((entry) =>
      entry.recipes.flatMap((mealPlanRecipe) => {
        const recipe = recipesById.get(mealPlanRecipe.recipeId);

        if (recipe === undefined) {
          return [];
        }

        return recipe.ingredients
          .filter((recipeIngredient) => shouldPrepIngredient(recipeIngredient.ingredient.tags))
          .map((recipeIngredient): PrepIngredientRow => ({
            ingredientId: recipeIngredient.ingredient.ingredientId,
            ingredientName: recipeIngredient.ingredient.ingredientName,
            amount: recipeIngredient.amount,
            unit: recipeIngredient.unit,
            actions: recipeIngredient.preparation === "None"
              ? inferPrepActions(recipe.instructions, recipeIngredient.ingredient.ingredientName)
                  .map((actionKey) => actionLabels[actionKey] ?? actionKey)
              : [preparationLabels[recipeIngredient.preparation]],
            sourceRecipe: recipe.name,
          }));
      }),
    );

  return Array.from(
    prepRows
      .reduce((groups, row) => {
        const key = `${row.ingredientId}::${row.unit}::${row.actions.join(",")}`;
        const group = groups.get(key);

        if (group === undefined) {
          groups.set(key, {
            ...row,
            amount: row.amount,
            sourceRecipes: new Set([row.sourceRecipe]),
          });
          return groups;
        }

        group.amount = group.amount === null || row.amount === null
          ? null
          : group.amount + row.amount;
        row.actions.forEach((action) => {
          if (!group.actions.includes(action)) {
            group.actions.push(action);
          }
        });
        group.sourceRecipes.add(row.sourceRecipe);

        return groups;
      }, new Map<string, PrepIngredientRow & { sourceRecipes: Set<string> }>())
      .values(),
  )
    .filter((item) => item.actions.length > 0)
    .map((item) => ({
      ingredientId: item.ingredientId,
      ingredientName: item.ingredientName,
      amount: item.amount,
      unit: item.unit,
      actions: item.actions,
      sources: Array.from(item.sourceRecipes).sort((left, right) => left.localeCompare(right)),
    }))
    .sort((left, right) => left.ingredientName.localeCompare(right.ingredientName));
}

function shouldPrepIngredient(tags: IngredientTag[]) {
  return prepIngredientTags.some((tag) => tags.includes(tag));
}

function inferPrepActions(instructions: string | null, ingredientName: string): PrepActionKey[] {
  if (instructions === null || instructions.trim().length === 0) {
    return [];
  }

  const relevantText = getRelevantInstructionText(instructions, ingredientName);

  return prepActionPatterns
    .filter((action) => action.patterns.some((pattern) => pattern.test(relevantText)))
    .map((action) => action.key);
}

function getRelevantInstructionText(instructions: string, ingredientName: string) {
  const ingredientTerms = ingredientName
    .toLowerCase()
    .split(/\s+/)
    .filter((term) => term.length > 2);
  const sentences = instructions
    .split(/(?<=[.!?])\s+|\n+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);
  const matchingSentences = sentences.filter((sentence) => {
    const lowerSentence = sentence.toLowerCase();
    return ingredientTerms.some((term) => lowerSentence.includes(term));
  });

  return matchingSentences.length > 0
    ? matchingSentences.join(" ")
    : instructions;
}

function getPlannerActionError(_error: unknown, fallbackMessage: string) {
  return fallbackMessage;
}

export default PlannerPage;
