import type { Cuisine, IRecipe } from "../interfaces/IRecipe";
import { getApiAssetUrl } from "../services/apiClient";
import { thumbnailStyles, type SiteTheme } from "../styles/appStyles";

type RecipeThumbnailProps = {
  recipe: Pick<IRecipe, "name" | "imageUrl"> & {
    cuisine?: Cuisine | string | null;
    subtitle?: string | null;
  };
  className?: string;
  theme?: SiteTheme;
};

function RecipeThumbnail({ recipe, className = "", theme = "dark" }: RecipeThumbnailProps) {
  const subtitle = recipe.subtitle ?? recipe.cuisine ?? "No cuisine";
  const imageUrl = getApiAssetUrl(recipe.imageUrl);

  return (
    <article
      className={`relative aspect-square w-full overflow-hidden rounded-md bg-neutral-800 ${className}`}
      aria-label={recipe.name}
    >
      {imageUrl ? (
        <img
          className="h-full w-full object-cover"
          src={imageUrl}
          alt={recipe.name}
          loading="lazy"
        />
      ) : (
        <div className="h-full w-full bg-neutral-700" aria-hidden="true" />
      )}

      <div className={`absolute inset-x-0 bottom-0 flex h-1/4 min-h-14 flex-col justify-center px-3 ${thumbnailStyles.recipeTitleBand(theme)}`}>
        <h3 className="truncate text-base font-bold leading-tight text-white">{recipe.name}</h3>
        <p className={`mt-1 truncate text-xs font-semibold leading-tight ${thumbnailStyles.recipeSubtitle(theme)}`}>{subtitle}</p>
      </div>
    </article>
  );
}

export default RecipeThumbnail;
