import type { IngredientCategory, IIngredient } from "../interfaces/IIngredient";
import { colorPalette, type SiteTheme } from "../styles/appStyles";

type IngredientThumbnailProps = {
  ingredient: Pick<IIngredient, "ingredientName" | "category" | "color">;
  theme?: SiteTheme;
  selected?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
};

type IngredientTone = {
  main: string;
  background: string;
};

function IngredientThumbnail({
  ingredient,
  theme = "dark",
  selected = false,
  disabled = false,
  className = "",
  onClick,
}: IngredientThumbnailProps) {
  const category = normalizeIngredientCategory(ingredient.category);
  const tone = getIngredientTone(category, ingredient.color, theme);
  const sharedClassName = `flex h-10 w-full items-center justify-between gap-4 rounded-md border px-4 text-left transition-colors ${className} ${
    selected ? "ring-2 ring-white/30" : ""
  } ${disabled ? "cursor-not-allowed opacity-50" : onClick ? "cursor-pointer hover:bg-white/[0.06]" : ""}`;
  const style = {
    borderColor: tone.main,
    backgroundColor: tone.background,
    color: tone.main,
  };

  const content = (
    <>
      <span className="min-w-0 truncate text-base font-semibold leading-tight">
        {ingredient.ingredientName}
      </span>
      <span className="shrink-0 truncate text-sm font-semibold leading-tight opacity-75">
        {formatIngredientCategory(category)}
      </span>
    </>
  );

  if (onClick) {
    return (
      <button
        aria-pressed={selected}
        className={sharedClassName}
        disabled={disabled}
        style={style}
        type="button"
        onClick={onClick}
      >
        {content}
      </button>
    );
  }

  return (
    <article className={sharedClassName} style={style} aria-label={ingredient.ingredientName}>
      {content}
    </article>
  );
}

function getIngredientTone(
  category: IngredientCategory,
  color: string | null,
  theme: SiteTheme,
): IngredientTone {
  const main =
    theme === "paletteLight"
      ? paletteLightIngredientCategoryColors[category]
      : color ?? ingredientCategoryColors[category] ?? ingredientCategoryColors.Other;
  const background =
    theme === "dark"
      ? `${main}14`
      : theme === "paletteLight"
        ? `${colorPalette.olive}66`
        : `${main}1f`;

  return {
    main,
    background,
  };
}

function normalizeIngredientCategory(category: IngredientCategory | number | string): IngredientCategory {
  if (typeof category === "string" && category in ingredientCategoryColors) {
    return category as IngredientCategory;
  }

  if (typeof category === "number" && ingredientCategoryByIndex[category]) {
    return ingredientCategoryByIndex[category];
  }

  return "Other";
}

function formatIngredientCategory(category: IngredientCategory) {
  return category.replace(/([a-z])([A-Z])/g, "$1 $2");
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

const ingredientCategoryColors: Record<IngredientCategory, string> = {
  Vegetable: "#00d83b",
  Fruit: "#c9d83a",
  Chicken: "#f3c47a",
  Fish: "#69a7d8",
  Beef: "#c95151",
  Lamb: "#c26a75",
  Mince: "#c95c55",
  Dairy: "#f4ead2",
  Grain: "#c9a86b",
  Spice: "#d69a3a",
  Herb: "#7fb35b",
  Sauce: "#d18a60",
  Pantry: "#a8a29e",
  Frozen: "#89c4d4",
  Other: "#b8b8b8",
};

const paletteLightIngredientCategoryColors: Record<IngredientCategory, string> = {
  Vegetable: "#007A2D",
  Fruit: "#8A7600",
  Chicken: "#A56314",
  Fish: "#1D6A9E",
  Beef: "#9E2F2F",
  Lamb: "#9A4051",
  Mince: "#A7352D",
  Dairy: colorPalette.ivory,
  Grain: "#8A641E",
  Spice: "#9B5D00",
  Herb: "#3D7A25",
  Sauce: "#9B542B",
  Pantry: colorPalette.stone,
  Frozen: "#397E91",
  Other: colorPalette.champagne,
};

export default IngredientThumbnail;
