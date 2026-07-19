import { useLanguage } from "../../contexts";
import type { SiteTheme } from "../../styles/appStyles";
import type { Vitamin } from "../../interfaces/IIngredient";
import { vitamins } from "./formOptions";
import { formatLabel, recipeBrowserStyles } from "./recipeBrowserStyles";

export type NutritionEditorValues = {
  calories: string;
  carbohydrateGrams: string;
  proteinGrams: string;
  saltGrams: string;
  dietaryFiberGrams: string;
  saturatedFatGrams: string;
  unsaturatedFatGrams: string;
  monounsaturatedFatGrams: string;
  polyunsaturatedFatGrams: string;
};

type NutritionEditorProps = {
  selectedVitamins: Vitamin[];
  theme: SiteTheme;
  values: NutritionEditorValues;
  onChange: (key: keyof NutritionEditorValues, value: string) => void;
  onVitaminsChange: (vitamins: Vitamin[]) => void;
};

function NutritionEditor({
  selectedVitamins,
  theme,
  values,
  onChange,
  onVitaminsChange,
}: NutritionEditorProps) {
  const { t } = useLanguage();

  return (
    <div className={recipeBrowserStyles.detailsPanel(theme)}>
      <div className={recipeBrowserStyles.formGrid}>
        <NutritionNumberField
          label={t.cookbook.caloriesPer100g}
          step="1"
          theme={theme}
          unit="kcal"
          value={values.calories}
          onChange={(value) => onChange("calories", value)}
        />
        <NutritionNumberField
          label={t.cookbook.carbsPer100g}
          theme={theme}
          value={values.carbohydrateGrams}
          onChange={(value) => onChange("carbohydrateGrams", value)}
        />
        <NutritionNumberField
          label={t.cookbook.proteinPer100g}
          theme={theme}
          value={values.proteinGrams}
          onChange={(value) => onChange("proteinGrams", value)}
        />
        <NutritionNumberField
          label={t.cookbook.saltPer100g}
          step="0.01"
          theme={theme}
          value={values.saltGrams}
          onChange={(value) => onChange("saltGrams", value)}
        />
        <NutritionNumberField
          label={t.cookbook.fiberPer100g}
          theme={theme}
          value={values.dietaryFiberGrams}
          onChange={(value) => onChange("dietaryFiberGrams", value)}
        />
        <NutritionNumberField
          className={recipeBrowserStyles.nutritionSecondRowStart}
          label={t.cookbook.saturatedFatsPer100g}
          theme={theme}
          value={values.saturatedFatGrams}
          onChange={(value) => onChange("saturatedFatGrams", value)}
        />
        <NutritionNumberField
          label={t.cookbook.unsaturatedFatsPer100g}
          theme={theme}
          value={values.unsaturatedFatGrams}
          onChange={(value) => onChange("unsaturatedFatGrams", value)}
        />
        <NutritionNumberField
          label={t.cookbook.monounsaturatedFatsPer100g}
          theme={theme}
          value={values.monounsaturatedFatGrams}
          onChange={(value) => onChange("monounsaturatedFatGrams", value)}
        />
        <NutritionNumberField
          label={t.cookbook.polyunsaturatedFatsPer100g}
          theme={theme}
          value={values.polyunsaturatedFatGrams}
          onChange={(value) => onChange("polyunsaturatedFatGrams", value)}
        />
      </div>

      <section className={recipeBrowserStyles.field}>
        <span className={recipeBrowserStyles.label(theme)}>{t.cookbook.vitamins}</span>
        <div className={`${recipeBrowserStyles.tagCheckboxGrid} ${recipeBrowserStyles.checkboxGridPanel(theme)}`}>
          {vitamins.map((vitamin) => (
            <label className={recipeBrowserStyles.checkboxLabel(theme)} key={vitamin}>
              <input
                checked={selectedVitamins.includes(vitamin)}
                className={recipeBrowserStyles.checkbox}
                type="checkbox"
                onChange={() => onVitaminsChange(toggleValue(selectedVitamins, vitamin))}
              />
              {formatLabel(vitamin)}
            </label>
          ))}
        </div>
      </section>
    </div>
  );
}

type NutritionNumberFieldProps = {
  label: string;
  theme: SiteTheme;
  value: string;
  className?: string;
  step?: string;
  unit?: string;
  onChange: (value: string) => void;
};

function NutritionNumberField({
  label,
  theme,
  value,
  className = "",
  step = "0.1",
  unit = "g",
  onChange,
}: NutritionNumberFieldProps) {
  return (
    <label className={`${recipeBrowserStyles.field} ${className}`}>
      <span className={recipeBrowserStyles.label(theme)}>{label}</span>
      <span className={recipeBrowserStyles.numberField}>
        <input
          className={recipeBrowserStyles.numberFieldInput(theme)}
          min="0"
          step={step}
          type="number"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
        <span className={recipeBrowserStyles.numberFieldSuffix(theme)}>{unit}</span>
      </span>
    </label>
  );
}

function toggleValue<TValue>(values: TValue[], value: TValue) {
  return values.includes(value)
    ? values.filter((currentValue) => currentValue !== value)
    : [...values, value];
}

export default NutritionEditor;
