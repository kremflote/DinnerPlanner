import { useCallback, useId, useState, type FormEvent } from "react";
import { useBrands, useIngredientTagCategories, useIngredients, useLanguage, useRecipes, useStores } from "../../contexts";
import type { IIngredient, IngredientTag, Vitamin } from "../../interfaces/IIngredient";
import { brandService, imageUploadService, ingredientPriceService, ingredientService, ingredientTagCategoryService, storeService } from "../../services";
import type { SiteTheme } from "../../styles/appStyles";
import { normalizePriceInput, todayInputValue } from "../../utils/priceFormatting";
import {
  formatIngredientTagCategoryName,
  getIngredientTagGroupsWithCustomTags,
  ingredientTagGroups,
} from "./formOptions";
import { GroupedCheckboxPanel } from "./BrowserFilterGroups";
import CreatableSelect from "./CreatableSelect";
import ImageCropPicker from "./ImageCropPicker";
import IngredientTagCreateDialog from "./IngredientTagCreateDialog";
import NutritionEditor, { type NutritionEditorValues } from "./NutritionEditor";
import { formatLabel, recipeBrowserStyles } from "./recipeBrowserStyles";

type IngredientCreateFormProps = {
  initialIngredient?: IIngredient | null;
  theme: SiteTheme;
  onCreated: () => void;
  onCancel: () => void;
};

const INGREDIENT_NAME_MAX_LENGTH = 30;

function IngredientCreateForm({
  initialIngredient = null,
  theme,
  onCreated,
  onCancel,
}: IngredientCreateFormProps) {
  const isEditing = initialIngredient !== null;
  const { t } = useLanguage();
  const { brands, refreshBrands } = useBrands();
  const { stores, refreshStores } = useStores();
  const { ingredients, refreshIngredients } = useIngredients();
  const { ingredientTagCategories, refreshIngredientTagCategories } = useIngredientTagCategories();
  const { refreshRecipes } = useRecipes();
  const imageInputId = useId();
  const [ingredientName, setIngredientName] = useState(initialIngredient?.ingredientName ?? "");
  const [brandId, setBrandId] = useState<number | null>(initialIngredient?.brandId ?? null);
  const [croppedImageFile, setCroppedImageFile] = useState<File | null>(null);
  const [selectedTags, setSelectedTags] = useState<IngredientTag[]>(
    initialIngredient && initialIngredient.tags.length > 0 ? [...initialIngredient.tags] : ["Vegetable"],
  );
  const [isTagCreateOpen, setIsTagCreateOpen] = useState(false);
  const [calories, setCalories] = useState(numberToInputValue(initialIngredient?.nutritionPer100?.calories));
  const [carbohydrateGrams, setCarbohydrateGrams] = useState(
    numberToInputValue(initialIngredient?.nutritionPer100?.carbohydrateGrams),
  );
  const [proteinGrams, setProteinGrams] = useState(numberToInputValue(initialIngredient?.nutritionPer100?.proteinGrams));
  const [saltGrams, setSaltGrams] = useState(numberToInputValue(initialIngredient?.nutritionPer100?.saltGrams));
  const [dietaryFiberGrams, setDietaryFiberGrams] = useState(
    numberToInputValue(initialIngredient?.nutritionPer100?.dietaryFiberGrams),
  );
  const [saturatedFatGrams, setSaturatedFatGrams] = useState(
    numberToInputValue(initialIngredient?.nutritionPer100?.saturatedFatGrams),
  );
  const [unsaturatedFatGrams, setUnsaturatedFatGrams] = useState(
    numberToInputValue(initialIngredient?.nutritionPer100?.unsaturatedFatGrams),
  );
  const [monounsaturatedFatGrams, setMonounsaturatedFatGrams] = useState(
    numberToInputValue(initialIngredient?.nutritionPer100?.monounsaturatedFatGrams),
  );
  const [polyunsaturatedFatGrams, setPolyunsaturatedFatGrams] = useState(
    numberToInputValue(initialIngredient?.nutritionPer100?.polyunsaturatedFatGrams),
  );
  const [selectedVitamins, setSelectedVitamins] = useState<Vitamin[]>(
    initialIngredient?.nutritionPer100?.vitamins ?? [],
  );
  const [showNutrition, setShowNutrition] = useState(false);
  const [showPriceInformation, setShowPriceInformation] = useState(false);
  const [priceStoreId, setPriceStoreId] = useState<number | null>(null);
  const [priceValue, setPriceValue] = useState("");
  const [priceDate, setPriceDate] = useState(todayInputValue());
  const [priceNote, setPriceNote] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const knownIngredientTags = (ingredientTagCategories.length === 0
    ? ingredientTagGroups.flatMap((group) => group.values)
    : ingredientTagCategories.flatMap((category) => category.tags)) as IngredientTag[];
  const existingCustomTags = ingredients
    .flatMap((ingredient) => ingredient.tags)
    .filter((tag) => !knownIngredientTags.includes(tag));
  const customTags = Array.from(new Set([
    ...existingCustomTags,
    ...selectedTags.filter((tag) => !knownIngredientTags.includes(tag)),
  ]));
  const groupedTags = getIngredientTagGroupsWithCustomTags(customTags, "pantry", ingredientTagCategories);
  const groupLabels = ingredientTagCategories.length === 0
    ? t.filters.ingredientTagGroups
    : Object.fromEntries(
        ingredientTagCategories.map((category) => [
          category.ingredientTagCategoryId.toString(),
          formatIngredientTagCategoryName(category.name, t.filters.ingredientTagGroups),
        ]),
      );
  const handleCroppedFileChange = useCallback((file: File | null) => {
    setCroppedImageFile(file);
  }, []);

  const submitIngredient = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedName = ingredientName.trim();

    if (trimmedName.length === 0) {
      setError(t.cookbook.ingredientNeedsName);
      return;
    }

    if (trimmedName.length > INGREDIENT_NAME_MAX_LENGTH) {
      setError(t.cookbook.ingredientNameTooLong(INGREDIENT_NAME_MAX_LENGTH));
      return;
    }

    if (selectedTags.length === 0) {
      setError(t.cookbook.chooseAtLeastOneIngredientTag);
      return;
    }

    const parsedPricePointValue = nullableNumber(priceValue);
    if (
      showPriceInformation &&
      (priceStoreId === null || parsedPricePointValue === null || parsedPricePointValue <= 0 || priceDate.trim().length === 0)
    ) {
      setError(t.prices.couldNotSave);
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      const upload = croppedImageFile === null
        ? null
        : await imageUploadService.upload(croppedImageFile, "ingredients");
      const request = {
        ingredientName: trimmedName,
        description: initialIngredient?.description ?? null,
        brandId,
        imageUrl: upload?.url ?? initialIngredient?.imageUrl ?? null,
        price: initialIngredient?.price ?? null,
        tags: selectedTags,
        nutritionPer100: {
          calories: nullableNumber(calories),
          carbohydrateGrams: nullableNumber(carbohydrateGrams),
          proteinGrams: nullableNumber(proteinGrams),
          saltGrams: nullableNumber(saltGrams),
          dietaryFiberGrams: nullableNumber(dietaryFiberGrams),
          saturatedFatGrams: nullableNumber(saturatedFatGrams),
          unsaturatedFatGrams: nullableNumber(unsaturatedFatGrams),
          monounsaturatedFatGrams: nullableNumber(monounsaturatedFatGrams),
          polyunsaturatedFatGrams: nullableNumber(polyunsaturatedFatGrams),
          vitamins: selectedVitamins,
        },
        color: initialIngredient?.color ?? null,
      };

      let ingredientId = initialIngredient?.ingredientId ?? null;
      if (isEditing) {
        await ingredientService.update(initialIngredient.ingredientId, request);
        ingredientId = initialIngredient.ingredientId;
      } else {
        const createdIngredient = await ingredientService.create(request);
        ingredientId = createdIngredient.ingredientId;
      }

      if (showPriceInformation) {
        await ingredientPriceService.create({
          ingredientId: ingredientId!,
          storeId: priceStoreId!,
          price: parsedPricePointValue!,
          date: priceDate,
          note: priceNote.trim().length === 0 ? null : priceNote.trim(),
        });
      }

      await refreshIngredients();
      await refreshRecipes();
      onCreated();
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : t.cookbook.couldNotSaveIngredient);
    } finally {
      setIsSaving(false);
    }
  };

  const nutritionValues: NutritionEditorValues = {
    calories,
    carbohydrateGrams,
    proteinGrams,
    saltGrams,
    dietaryFiberGrams,
    saturatedFatGrams,
    unsaturatedFatGrams,
    monounsaturatedFatGrams,
    polyunsaturatedFatGrams,
  };
  const updateNutritionValue = (key: keyof NutritionEditorValues, value: string) => {
    const setters: Record<keyof NutritionEditorValues, (value: string) => void> = {
      calories: setCalories,
      carbohydrateGrams: setCarbohydrateGrams,
      proteinGrams: setProteinGrams,
      saltGrams: setSaltGrams,
      dietaryFiberGrams: setDietaryFiberGrams,
      saturatedFatGrams: setSaturatedFatGrams,
      unsaturatedFatGrams: setUnsaturatedFatGrams,
      monounsaturatedFatGrams: setMonounsaturatedFatGrams,
      polyunsaturatedFatGrams: setPolyunsaturatedFatGrams,
    };

    setters[key](value);
  };
  const nutritionPanel = (
    <NutritionEditor
      selectedVitamins={selectedVitamins}
      theme={theme}
      values={nutritionValues}
      onChange={updateNutritionValue}
      onVitaminsChange={setSelectedVitamins}
    />
  );

  const priceInformationPanel = showPriceInformation && (
    <section className={`${recipeBrowserStyles.ingredientPricePanel} ${recipeBrowserStyles.detailsPanel(theme)}`}>
      <div className={recipeBrowserStyles.ingredientPriceGrid}>
        <CreatableSelect
          createLabel={t.common.createNew}
          label={t.prices.store}
          options={stores.map((store) => ({ id: store.storeId, name: store.name }))}
          placeholder={t.prices.selectStore}
          theme={theme}
          value={priceStoreId}
          onChange={setPriceStoreId}
          onCreate={async (name) => {
            const store = await storeService.create({ name });
            await refreshStores();
            return { id: store.storeId, name: store.name };
          }}
        />
        <label className={recipeBrowserStyles.field}>
          <span className={recipeBrowserStyles.label(theme)}>{t.prices.price}</span>
          <input
            className={recipeBrowserStyles.textField(theme)}
            inputMode="decimal"
            placeholder={t.prices.pricePlaceholder}
            type="text"
            value={priceValue}
            onChange={(event) => setPriceValue(normalizePriceInput(event.target.value))}
          />
          <span className={recipeBrowserStyles.labelSubtitle(theme)}>{t.prices.priceUnitSubtitle}</span>
        </label>
      </div>
      <div className={recipeBrowserStyles.ingredientPriceSecondaryGrid}>
        <label className={recipeBrowserStyles.field}>
          <span className={recipeBrowserStyles.label(theme)}>{t.prices.date}</span>
          <input
            className={recipeBrowserStyles.textField(theme)}
            type="date"
            value={priceDate}
            onChange={(event) => setPriceDate(event.target.value)}
          />
        </label>
        <label className={recipeBrowserStyles.field}>
          <span className={recipeBrowserStyles.label(theme)}>{t.prices.note}</span>
          <input
            className={recipeBrowserStyles.textField(theme)}
            maxLength={500}
            placeholder={t.prices.notePlaceholder}
            value={priceNote}
            onChange={(event) => setPriceNote(event.target.value)}
          />
        </label>
      </div>
    </section>
  );

  return (
    <form className={recipeBrowserStyles.form} onSubmit={submitIngredient}>
      <div className={recipeBrowserStyles.formBodyScrollArea}>
        {error !== null && <p className={recipeBrowserStyles.statusError(theme)}>{error}</p>}

        <div className={recipeBrowserStyles.ingredientCreateScrollArea(theme)}>
          <div className={recipeBrowserStyles.createFormTopGrid}>
            <div className={recipeBrowserStyles.createFormPrimaryFields}>
              <label className={recipeBrowserStyles.field}>
                <span className={recipeBrowserStyles.label(theme)}>
                    {t.cookbook.name}<span className={recipeBrowserStyles.requiredMark(theme)}> *</span>
                  <span className={recipeBrowserStyles.inlineHint(theme)}>
                    {ingredientName.length}/{INGREDIENT_NAME_MAX_LENGTH}
                  </span>
                </span>
                <input
                  className={recipeBrowserStyles.textField(theme)}
                  maxLength={INGREDIENT_NAME_MAX_LENGTH}
                  required
                  type="text"
                  value={ingredientName}
                  onChange={(event) => setIngredientName(event.target.value)}
                />
              </label>

              <div className={recipeBrowserStyles.ingredientBrandPriceRow}>
                <CreatableSelect
                  createLabel={t.common.createNew}
                  label={t.cookbook.brand}
                  options={brands.map((brand) => ({ id: brand.brandId, name: brand.name }))}
                  placeholder={t.cookbook.selectBrand}
                  theme={theme}
                  value={brandId}
                  onChange={setBrandId}
                  onCreate={async (name) => {
                    const brand = await brandService.create({ name });
                    await refreshBrands();
                    return { id: brand.brandId, name: brand.name };
                  }}
                  onDeleteOption={async (option) => {
                    await brandService.delete(option.id);
                    await refreshBrands();
                    await refreshIngredients();
                    await refreshRecipes();
                  }}
                />

                <section className={recipeBrowserStyles.ingredientPriceToggleField}>
                  <span className={recipeBrowserStyles.label(theme)}>{t.prices.priceInformation}</span>
                  <button
                    aria-expanded={showPriceInformation}
                    className={recipeBrowserStyles.ingredientPriceToggleButton(theme)}
                    type="button"
                    onClick={() => setShowPriceInformation((currentValue) => !currentValue)}
                  >
                    {showPriceInformation ? t.common.close : t.prices.addPrice}
                  </button>
                </section>
              </div>

              {priceInformationPanel}

              <section className={recipeBrowserStyles.field}>
                <span className={recipeBrowserStyles.label(theme)}>{t.cookbook.nutrition}</span>
                <button
                  aria-expanded={showNutrition}
                  className={recipeBrowserStyles.detailsToggleFull(theme)}
                  type="button"
                  onClick={() => setShowNutrition((currentValue) => !currentValue)}
                >
                  {showNutrition ? t.cookbook.hideNutrition : t.cookbook.addNutrition}
                </button>
                {showNutrition && <div className="md:hidden">{nutritionPanel}</div>}
              </section>
            </div>

            <section className={recipeBrowserStyles.createImageField}>
              <span className={`${recipeBrowserStyles.label(theme)} ${recipeBrowserStyles.createImageLabel}`}>
                {t.cookbook.image}
              </span>
              <div className={recipeBrowserStyles.createImageControl}>
                <ImageCropPicker
                  inputId={imageInputId}
                  initialImageUrl={initialIngredient?.imageUrl}
                  theme={theme}
                  onCroppedFileChange={handleCroppedFileChange}
                />
              </div>
            </section>
          </div>

          {showNutrition && <div className="max-md:hidden">{nutritionPanel}</div>}

          <section className={recipeBrowserStyles.field}>
            <span className={recipeBrowserStyles.label(theme)}>
              {t.cookbook.tags}<span className={recipeBrowserStyles.requiredMark(theme)}> *</span>
              <span className={recipeBrowserStyles.inlineHint(theme)}>{t.cookbook.pickOneOrMore}</span>
            </span>
            <GroupedCheckboxPanel
              addActionLabel={t.common.manageTags}
              formatValue={(value) => t.enums.ingredientTags[value] ?? formatLabel(value)}
              groupLabels={groupLabels}
              groups={groupedTags}
              panelClassName={`${recipeBrowserStyles.groupedTagPanel} ${recipeBrowserStyles.checkboxGridPanel(theme)}`}
              selectedValues={selectedTags}
              theme={theme}
              onAddTag={() => setIsTagCreateOpen(true)}
              onToggle={(value) => setSelectedTags((currentTags) => toggleValue(currentTags, value))}
            />
          </section>
        </div>

      </div>

      {isTagCreateOpen && (
        <IngredientTagCreateDialog
          categories={ingredientTagCategories}
          existingTags={[...knownIngredientTags, ...customTags]}
          theme={theme}
          onCancel={() => setIsTagCreateOpen(false)}
          onCreate={async (tag, categoryId) => {
            await ingredientTagCategoryService.createTag(categoryId, { name: tag });
            await refreshIngredientTagCategories();
            setSelectedTags((currentTags) => currentTags.includes(tag) ? currentTags : [...currentTags, tag]);
            setIsTagCreateOpen(false);
          }}
          onCreateCategory={async (name) => {
            const category = await ingredientTagCategoryService.create({ name });
            await refreshIngredientTagCategories();
            return { id: category.ingredientTagCategoryId, name: category.name };
          }}
          onUpdateCategory={async (category) => {
            await ingredientTagCategoryService.update(category.id, { name: category.name });
            await refreshIngredientTagCategories();
          }}
          onDeleteCategory={async (category) => {
            await ingredientTagCategoryService.delete(category.id);
            await refreshIngredientTagCategories();
            await refreshIngredients();
            await refreshRecipes();
          }}
          onUpdateTag={async (tagName, nextName) => {
            await ingredientTagCategoryService.updateTag(tagName, { name: nextName });
            await refreshIngredientTagCategories();
            await refreshIngredients();
            await refreshRecipes();
          }}
          onDeleteTag={async (tagName) => {
            await ingredientTagCategoryService.deleteTag(tagName);
            await refreshIngredientTagCategories();
            await refreshIngredients();
            await refreshRecipes();
          }}
        />
      )}

      <div className={recipeBrowserStyles.formActions}>
        <button className={`${recipeBrowserStyles.secondaryButton(theme)} ${recipeBrowserStyles.formActionButton}`} disabled={isSaving} type="button" onClick={onCancel}>
          {t.common.cancel}
        </button>
        <button className={`${recipeBrowserStyles.primaryButton(theme)} ${recipeBrowserStyles.formActionButton}`} disabled={isSaving} type="submit">
          {isSaving ? t.common.saving : isEditing ? t.cookbook.saveIngredient : t.cookbook.createIngredient}
        </button>
      </div>
    </form>
  );
}

function nullableNumber(value: string) {
  const trimmedValue = value.trim();
  if (trimmedValue.length === 0) {
    return null;
  }

  const parsedValue = Number(trimmedValue);
  return Number.isFinite(parsedValue) ? parsedValue : null;
}

function numberToInputValue(value: number | null | undefined) {
  return value === null || value === undefined ? "" : value.toString();
}

function toggleValue<TValue>(values: TValue[], value: TValue) {
  return values.includes(value)
    ? values.filter((currentValue) => currentValue !== value)
    : [...values, value];
}

export default IngredientCreateForm;
