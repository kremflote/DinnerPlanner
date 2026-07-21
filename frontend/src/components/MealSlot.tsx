import { useLanguage } from "../contexts";
import type { IIngredient } from "../interfaces/IIngredient";
import type { IMealPlanEntry } from "../interfaces/IMeal";
import type { IRecipe } from "../interfaces/IRecipe";
import { mealCalendarStyles, type SiteTheme } from "../styles/appStyles";
import { getApiAssetUrl } from "../services/apiClient";

type MealSlotProps = {
  entry?: IMealPlanEntry;
  ingredientsById: Map<number, IIngredient>;
  onClick: () => void;
  recipesById: Map<number, IRecipe>;
  theme?: SiteTheme;
};

function MealSlot({ entry, ingredientsById, onClick, recipesById, theme = "dark" }: MealSlotProps) {
  const { t } = useLanguage();
  const plannedItems =
    entry?.recipes
      .slice()
      .sort((firstRecipe, secondRecipe) => firstRecipe.sortOrder - secondRecipe.sortOrder)
      .map((plannedRecipe) => ({
        ...plannedRecipe,
        recipe: plannedRecipe.recipeId === null ? undefined : recipesById.get(plannedRecipe.recipeId),
        ingredient: plannedRecipe.ingredientId === null ? undefined : ingredientsById.get(plannedRecipe.ingredientId),
      })) ?? [];
  const mainItem = plannedItems.find((plannedRecipe) => plannedRecipe.role === "Main") ?? plannedItems[0];
  const supplementaryItems = plannedItems.filter((plannedRecipe) => plannedRecipe !== mainItem);
  const mainName = mainItem?.recipe?.name ?? mainItem?.ingredient?.ingredientName;
  const mainImageUrl = mainItem?.recipe?.imageUrl ?? mainItem?.ingredient?.imageUrl ?? null;

  return (
    <button
      aria-label={t.planner.openMealSlot}
      className={`${mealCalendarStyles.mealSlot(theme)} ${mealCalendarStyles.mealSlotButton}`}
      type="button"
      onClick={onClick}
    >
      {plannedItems.length > 0 ? (
        <div className={mealCalendarStyles.mealSlotContent}>
          {mainName !== undefined ? (
            <>
              <div className={mealCalendarStyles.mealSlotImageFrame(theme)}>
                {getApiAssetUrl(mainImageUrl) ? (
                  <img
                    alt=""
                    className={mealCalendarStyles.mealSlotImage}
                    src={getApiAssetUrl(mainImageUrl) ?? undefined}
                  />
                ) : (
                  <div className={mealCalendarStyles.mealSlotImageFallback(theme)} aria-hidden="true" />
                )}
              </div>
              <div className={mealCalendarStyles.mealSlotDetails}>
                <h3 className={mealCalendarStyles.mealSlotTitle(theme)}>
                  {mainName}
                </h3>
                {mainItem?.portions !== null && mainItem?.portions !== undefined && (
                  <span className={mealCalendarStyles.mealSlotPortions(theme)}>
                    {mainItem.portions}x
                  </span>
                )}
                <div className={mealCalendarStyles.mealSlotRecipeList}>
                  {supplementaryItems.map((plannedRecipe) => {
                    const name = plannedRecipe.recipe?.name ?? plannedRecipe.ingredient?.ingredientName ?? t.planner.recipeFallback(plannedRecipe.recipeId ?? plannedRecipe.ingredientId ?? 0);

                    return (
                    <div
                      className={mealCalendarStyles.mealSlotRecipe(theme)}
                      key={`${plannedRecipe.mealPlanRecipeId}-${plannedRecipe.recipeId ?? plannedRecipe.ingredientId}`}
                      title={name}
                    >
                      {name}
                    </div>
                    );
                  })}
                </div>
              </div>
            </>
          ) : (
            <div className={mealCalendarStyles.mealSlotInner(theme)} />
          )}
        </div>
      ) : (
        <div className={mealCalendarStyles.mealSlotInner(theme)} />
      )}
    </button>
  );
}

export default MealSlot;
