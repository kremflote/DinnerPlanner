import { useState, type FormEvent } from "react";
import { useIngredients } from "../../contexts";
import type { IngredientCategory, MeasurementUnit } from "../../interfaces/IIngredient";
import { ingredientService } from "../../services";
import type { SiteTheme } from "../../styles/appStyles";
import { ingredientCategories, measurementUnits } from "./formOptions";
import { formatLabel, recipeBrowserStyles } from "./recipeBrowserStyles";

type IngredientCreateFormProps = {
  theme: SiteTheme;
  onCreated: () => void;
  onCancel: () => void;
};

function IngredientCreateForm({ theme, onCreated, onCancel }: IngredientCreateFormProps) {
  const { refreshIngredients } = useIngredients();
  const [ingredientName, setIngredientName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [amount, setAmount] = useState("");
  const [unit, setUnit] = useState<MeasurementUnit>("Piece");
  const [category, setCategory] = useState<IngredientCategory>("Vegetable");
  const [calories, setCalories] = useState("");
  const [vitamins, setVitamins] = useState("");
  const [dietaryFiberGrams, setDietaryFiberGrams] = useState("");
  const [color, setColor] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const submitIngredient = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedName = ingredientName.trim();

    if (trimmedName.length === 0) {
      setError("Ingredient needs a name.");
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      await ingredientService.create({
        ingredientName: trimmedName,
        brand: nullableText(brand),
        price: nullableNumber(price),
        amount: nullableNumber(amount),
        unit,
        category,
        nutritionPer100: {
          calories: nullableNumber(calories),
          vitamins: nullableText(vitamins),
          dietaryFiberGrams: nullableNumber(dietaryFiberGrams),
        },
        color: nullableText(color),
      });

      await refreshIngredients();
      onCreated();
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Could not create ingredient.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form className={recipeBrowserStyles.form} onSubmit={submitIngredient}>
      {error !== null && <p className={recipeBrowserStyles.statusError(theme)}>{error}</p>}

      <div className={recipeBrowserStyles.formGrid}>
        <label className={recipeBrowserStyles.field}>
          <span className={recipeBrowserStyles.label(theme)}>Name</span>
          <input
            className={recipeBrowserStyles.textField(theme)}
            maxLength={160}
            required
            type="text"
            value={ingredientName}
            onChange={(event) => setIngredientName(event.target.value)}
          />
        </label>

        <label className={recipeBrowserStyles.field}>
          <span className={recipeBrowserStyles.label(theme)}>Category</span>
          <select
            className={recipeBrowserStyles.textField(theme)}
            value={category}
            onChange={(event) => setCategory(event.target.value as IngredientCategory)}
          >
            {ingredientCategories.map((value) => (
              <option key={value} value={value}>
                {formatLabel(value)}
              </option>
            ))}
          </select>
        </label>

        <label className={recipeBrowserStyles.field}>
          <span className={recipeBrowserStyles.label(theme)}>Brand</span>
          <input
            className={recipeBrowserStyles.textField(theme)}
            maxLength={120}
            type="text"
            value={brand}
            onChange={(event) => setBrand(event.target.value)}
          />
        </label>

        <label className={recipeBrowserStyles.field}>
          <span className={recipeBrowserStyles.label(theme)}>Color</span>
          <input
            className={recipeBrowserStyles.textField(theme)}
            placeholder="#00d83b"
            type="text"
            value={color}
            onChange={(event) => setColor(event.target.value)}
          />
        </label>

        <label className={recipeBrowserStyles.field}>
          <span className={recipeBrowserStyles.label(theme)}>Amount</span>
          <input
            className={recipeBrowserStyles.textField(theme)}
            min="0"
            step="0.01"
            type="number"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          />
        </label>

        <label className={recipeBrowserStyles.field}>
          <span className={recipeBrowserStyles.label(theme)}>Unit</span>
          <select
            className={recipeBrowserStyles.textField(theme)}
            value={unit}
            onChange={(event) => setUnit(event.target.value as MeasurementUnit)}
          >
            {measurementUnits.map((value) => (
              <option key={value} value={value}>
                {formatLabel(value)}
              </option>
            ))}
          </select>
        </label>

        <label className={recipeBrowserStyles.field}>
          <span className={recipeBrowserStyles.label(theme)}>Price</span>
          <input
            className={recipeBrowserStyles.textField(theme)}
            min="0"
            step="0.01"
            type="number"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          />
        </label>

        <label className={recipeBrowserStyles.field}>
          <span className={recipeBrowserStyles.label(theme)}>Calories per 100</span>
          <input
            className={recipeBrowserStyles.textField(theme)}
            min="0"
            step="1"
            type="number"
            value={calories}
            onChange={(event) => setCalories(event.target.value)}
          />
        </label>

        <label className={recipeBrowserStyles.field}>
          <span className={recipeBrowserStyles.label(theme)}>Dietary fiber grams</span>
          <input
            className={recipeBrowserStyles.textField(theme)}
            min="0"
            step="0.1"
            type="number"
            value={dietaryFiberGrams}
            onChange={(event) => setDietaryFiberGrams(event.target.value)}
          />
        </label>

        <label className={recipeBrowserStyles.field}>
          <span className={recipeBrowserStyles.label(theme)}>Vitamins</span>
          <input
            className={recipeBrowserStyles.textField(theme)}
            type="text"
            value={vitamins}
            onChange={(event) => setVitamins(event.target.value)}
          />
        </label>
      </div>

      <p className={recipeBrowserStyles.helperText(theme)}>
        Nutrition fields are optional and stored per 100 units.
      </p>

      <div className={recipeBrowserStyles.formActions}>
        <button className={recipeBrowserStyles.secondaryButton(theme)} disabled={isSaving} type="button" onClick={onCancel}>
          Cancel
        </button>
        <button className={recipeBrowserStyles.primaryButton(theme)} disabled={isSaving} type="submit">
          {isSaving ? "Saving..." : "Create ingredient"}
        </button>
      </div>
    </form>
  );
}

function nullableText(value: string) {
  const trimmedValue = value.trim();
  return trimmedValue.length === 0 ? null : trimmedValue;
}

function nullableNumber(value: string) {
  const trimmedValue = value.trim();
  if (trimmedValue.length === 0) {
    return null;
  }

  const parsedValue = Number(trimmedValue);
  return Number.isFinite(parsedValue) ? parsedValue : null;
}

export default IngredientCreateForm;
