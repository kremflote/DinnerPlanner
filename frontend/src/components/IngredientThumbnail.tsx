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
  text: string;
  background: string;
};

function IngredientThumbnail({
  ingredient,
  theme: _theme = "dark",
  selected = false,
  disabled = false,
  className = "",
  onClick,
}: IngredientThumbnailProps) {
  const brandName = ingredient.brand?.name ?? "";
  const tone = getIngredientTone();
  const sharedClassName = `inline-flex h-7 max-w-full items-center justify-center gap-2 rounded-md px-3 text-center transition ${className} ${
    selected ? "outline outline-2 outline-current" : ""
  } ${disabled ? "cursor-not-allowed" : onClick ? "cursor-pointer" : ""}`;
  const style = {
    backgroundColor: tone.background,
    color: tone.text,
  };

  const content = (
    <>
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

function getIngredientTone(): IngredientTone {
  const text = colorPalette.ingredientIconText;
  const background = colorPalette.ingredientIcon;

  return {
    text,
    background,
  };
}

export default IngredientThumbnail;
