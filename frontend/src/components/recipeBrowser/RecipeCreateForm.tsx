import { useCallback, useMemo, useState, type FormEvent } from "react";
import IngredientThumbnail from "../IngredientThumbnail";
import { useIngredients, useRecipes } from "../../contexts";
import type { IIngredient } from "../../interfaces/IIngredient";
import type { Cuisine, DessertType, RecipeTag, RecipeType } from "../../interfaces/IRecipe";
import { imageUploadService, recipeService } from "../../services";
import type { SiteTheme } from "../../styles/appStyles";
import {
  cuisines,
  dessertTypes,
  recipeTags,
  recipeTypes,
} from "./formOptions";
import ImageCropPicker from "./ImageCropPicker";
import { formatLabel, recipeBrowserStyles } from "./recipeBrowserStyles";

type RecipeCreateFormProps = {
  theme: SiteTheme;
  onCreated: () => void;
  onCancel: () => void;
};

function RecipeCreateForm({ theme, onCreated, onCancel }: RecipeCreateFormProps) {
  const { ingredients } = useIngredients();
  const { refreshRecipes } = useRecipes();
  const [recipeType, setRecipeType] = useState<RecipeType>("Dish");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [instructions, setInstructions] = useState("");
  const [selectedIngredientIds, setSelectedIngredientIds] = useState<number[]>([]);
  const [selectedTags, setSelectedTags] = useState<RecipeTag[]>(["Dinner"]);
  const [cuisine, setCuisine] = useState<Cuisine>("Other");
  const [dessertType, setDessertType] = useState<DessertType>("Other");
  const [ingredientSearch, setIngredientSearch] = useState("");
  const [croppedImageFile, setCroppedImageFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const visibleIngredients = useMemo(
    () =>
      ingredients.filter((ingredient) =>
        ingredient.ingredientName.toLowerCase().includes(ingredientSearch.trim().toLowerCase()),
      ),
    [ingredientSearch, ingredients],
  );

  const handleCroppedFileChange = useCallback((file: File | null) => {
    setCroppedImageFile(file);
  }, []);

  const submitRecipe = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedName = name.trim();

    if (trimmedName.length === 0) {
      setError("Recipe needs a name.");
      return;
    }

    if (croppedImageFile === null) {
      setError("Recipe needs an image.");
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      const upload = await imageUploadService.upload(croppedImageFile, "recipes");
      await recipeService.create({
        recipeType,
        name: trimmedName,
        imageUrl: upload.url,
        description: nullableText(description),
        instructions: nullableText(instructions),
        ingredientIds: selectedIngredientIds,
        tags: selectedTags,
        cuisine: recipeType === "Dish" ? cuisine : null,
        dessertType: recipeType === "Dessert" ? dessertType : null,
      });

      await refreshRecipes();
      onCreated();
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Could not create recipe.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form className={recipeBrowserStyles.form} onSubmit={submitRecipe}>
      {error !== null && <p className={recipeBrowserStyles.statusError(theme)}>{error}</p>}

      <div className={recipeBrowserStyles.formGrid}>
        <label className={recipeBrowserStyles.field}>
          <span className={recipeBrowserStyles.label(theme)}>Recipe type</span>
          <select
            className={recipeBrowserStyles.textField(theme)}
            value={recipeType}
            onChange={(event) => setRecipeType(event.target.value as RecipeType)}
          >
            {recipeTypes.map((type) => (
              <option key={type} value={type}>
                {formatLabel(type)}
              </option>
            ))}
          </select>
        </label>

        <label className={recipeBrowserStyles.field}>
          <span className={recipeBrowserStyles.label(theme)}>Name</span>
          <input
            className={recipeBrowserStyles.textField(theme)}
            maxLength={160}
            required
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>

        {recipeType === "Dish" && (
          <label className={recipeBrowserStyles.field}>
            <span className={recipeBrowserStyles.label(theme)}>Cuisine</span>
            <select
              className={recipeBrowserStyles.textField(theme)}
              value={cuisine}
              onChange={(event) => setCuisine(event.target.value as Cuisine)}
            >
              {cuisines.map((value) => (
                <option key={value} value={value}>
                  {formatLabel(value)}
                </option>
              ))}
            </select>
          </label>
        )}

        {recipeType === "Dessert" && (
          <label className={recipeBrowserStyles.field}>
            <span className={recipeBrowserStyles.label(theme)}>Dessert type</span>
            <select
              className={recipeBrowserStyles.textField(theme)}
              value={dessertType}
              onChange={(event) => setDessertType(event.target.value as DessertType)}
            >
              {dessertTypes.map((value) => (
                <option key={value} value={value}>
                  {formatLabel(value)}
                </option>
              ))}
            </select>
          </label>
        )}
      </div>

      <label className={recipeBrowserStyles.field}>
        <span className={recipeBrowserStyles.label(theme)}>Image</span>
        <ImageCropPicker theme={theme} onCroppedFileChange={handleCroppedFileChange} />
      </label>

      <div className={recipeBrowserStyles.formGrid}>
        <label className={recipeBrowserStyles.field}>
          <span className={recipeBrowserStyles.label(theme)}>Description</span>
          <textarea
            className={recipeBrowserStyles.textArea(theme)}
            maxLength={600}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </label>

        <label className={recipeBrowserStyles.field}>
          <span className={recipeBrowserStyles.label(theme)}>Instructions</span>
          <textarea
            className={recipeBrowserStyles.textArea(theme)}
            value={instructions}
            onChange={(event) => setInstructions(event.target.value)}
          />
        </label>
      </div>

      <section className={recipeBrowserStyles.field}>
        <span className={recipeBrowserStyles.label(theme)}>Tags</span>
        <div className={`${recipeBrowserStyles.checkboxGrid} ${recipeBrowserStyles.checkboxGridPanel(theme)}`}>
          {recipeTags.map((tag) => (
            <CheckboxRow
              checked={selectedTags.includes(tag)}
              key={tag}
              label={formatLabel(tag)}
              theme={theme}
              onChange={() => setSelectedTags((currentTags) => toggleValue(currentTags, tag))}
            />
          ))}
        </div>
      </section>

      <section className={recipeBrowserStyles.field}>
        <span className={recipeBrowserStyles.label(theme)}>Ingredients</span>
        <input
          className={recipeBrowserStyles.textField(theme)}
          placeholder="search ingredients..."
          type="search"
          value={ingredientSearch}
          onChange={(event) => setIngredientSearch(event.target.value)}
        />
        <div className={`${recipeBrowserStyles.checkboxGrid} ${recipeBrowserStyles.checkboxGridPanel(theme)}`}>
          {visibleIngredients.length === 0 ? (
            <p className={recipeBrowserStyles.helperText(theme)}>No ingredients found.</p>
          ) : (
            visibleIngredients.map((ingredient) => (
              <IngredientPickerRow
                ingredient={ingredient}
                key={ingredient.ingredientId}
                selected={selectedIngredientIds.includes(ingredient.ingredientId)}
                theme={theme}
                onToggle={() =>
                  setSelectedIngredientIds((currentIds) =>
                    toggleValue(currentIds, ingredient.ingredientId),
                  )
                }
              />
            ))
          )}
        </div>
      </section>

      <div className={recipeBrowserStyles.formActions}>
        <button className={recipeBrowserStyles.secondaryButton(theme)} disabled={isSaving} type="button" onClick={onCancel}>
          Cancel
        </button>
        <button className={recipeBrowserStyles.primaryButton(theme)} disabled={isSaving} type="submit">
          {isSaving ? "Saving..." : "Create recipe"}
        </button>
      </div>
    </form>
  );
}

type CheckboxRowProps = {
  checked: boolean;
  label: string;
  theme: SiteTheme;
  onChange: () => void;
};

function CheckboxRow({ checked, label, theme, onChange }: CheckboxRowProps) {
  return (
    <label className={recipeBrowserStyles.checkboxLabel(theme)}>
      <input
        checked={checked}
        className={recipeBrowserStyles.checkbox}
        type="checkbox"
        onChange={onChange}
      />
      {label}
    </label>
  );
}

type IngredientPickerRowProps = {
  ingredient: IIngredient;
  selected: boolean;
  theme: SiteTheme;
  onToggle: () => void;
};

function IngredientPickerRow({ ingredient, selected, theme, onToggle }: IngredientPickerRowProps) {
  return (
    <div className="flex items-center gap-2">
      <input
        aria-label={`Select ${ingredient.ingredientName}`}
        checked={selected}
        className={recipeBrowserStyles.checkbox}
        type="checkbox"
        onChange={onToggle}
      />
      <IngredientThumbnail
        className="h-8 px-3"
        ingredient={ingredient}
        selected={selected}
        theme={theme}
        onClick={onToggle}
      />
    </div>
  );
}

function toggleValue<T>(values: T[], value: T) {
  return values.includes(value)
    ? values.filter((currentValue) => currentValue !== value)
    : [...values, value];
}

function nullableText(value: string) {
  const trimmedValue = value.trim();
  return trimmedValue.length === 0 ? null : trimmedValue;
}

export default RecipeCreateForm;
