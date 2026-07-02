import type { IIngredient } from "../interfaces/IIngredient";
import { colorPalette, type SiteTheme } from "../styles/appStyles";

type IngredientThumbnailProps = {
  ingredient: Pick<IIngredient, "ingredientName" | "tags" | "brand" | "color">;
  theme?: SiteTheme;
  selected?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
};

type IngredientTone = {
  background: string;
  dot: string;
  text: string;
};

function IngredientThumbnail({
  ingredient,
  theme = "dark",
  selected = false,
  disabled = false,
  className = "",
  onClick,
}: IngredientThumbnailProps) {
  const brandName = ingredient.brand?.name ?? "";
  const tone = getIngredientTone(ingredient.color, theme);
  const sharedClassName = `grid h-8 w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 rounded-md px-2 text-left transition ${className} ${
    selected ? "outline outline-2 outline-current" : ""
  } ${disabled ? "cursor-not-allowed" : onClick ? "cursor-pointer" : ""}`;
  const style = {
    backgroundColor: tone.background,
    color: tone.text,
  };

  const content = (
    <>
      <span
        aria-hidden="true"
        className="h-2.5 w-2.5 rounded-full"
        style={{ backgroundColor: tone.dot }}
      />
      <span className="min-w-0 truncate text-sm font-semibold leading-tight">
        {ingredient.ingredientName}
      </span>
      {brandName && (
        <span className="shrink-0 truncate text-[11px] font-semibold leading-tight">
          {brandName}
        </span>
      )}
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

function getIngredientTone(color: string | null, theme: SiteTheme): IngredientTone {
  const background =
    theme === "paletteLight"
      ? colorPalette.ivory
      : theme === "dark"
        ? "#171717"
        : "#F5F5F5";
  const dot = color ?? colorPalette.ingredientIconText;
  const text = colorPalette.ingredientIconText;

  return {
    background,
    dot,
    text,
  };
}

export default IngredientThumbnail;
