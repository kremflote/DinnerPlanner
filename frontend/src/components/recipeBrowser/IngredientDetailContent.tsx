import type { IIngredient } from "../../interfaces/IIngredient";
import { useLanguage } from "../../contexts";
import IngredientThumbnail from "../IngredientThumbnail";
import type { SiteTheme } from "../../styles/appStyles";
import { DetailSection, DetailText, MetadataRow, NutritionGrid } from "./detailComponents";
import { recipeBrowserStyles } from "./recipeBrowserStyles";

type IngredientDetailContentProps = {
  ingredient: IIngredient;
  theme: SiteTheme;
};

function IngredientDetailContent({ ingredient, theme }: IngredientDetailContentProps) {
  const { t } = useLanguage();

  return (
    <div className={recipeBrowserStyles.detailShell}>
      <DetailSection title={t.cookbook.overview} theme={theme}>
        <IngredientThumbnail ingredient={ingredient} theme={theme} />
        <div className={recipeBrowserStyles.ingredientDetailMetaGrid}>
          <MetadataRow label={t.cookbook.brand} theme={theme} value={ingredient.brand?.name ?? ""} />
          <MetadataRow
            label={t.cookbook.price}
            theme={theme}
            value={ingredient.price === null ? t.cookbook.noPrice : `${ingredient.price.toFixed(2)} per kg`}
          />
        </div>
      </DetailSection>

      <DetailText
        label={t.cookbook.description}
        theme={theme}
        value={ingredient.description || t.cookbook.noDescription}
      />

      <DetailSection title={t.cookbook.dietaryInformationPer100g} theme={theme}>
        <NutritionGrid nutrition={ingredient.nutritionPer100} theme={theme} />
      </DetailSection>
    </div>
  );
}

export default IngredientDetailContent;
