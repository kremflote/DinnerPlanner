import { useLanguage } from "../../contexts";
import type { SiteTheme } from "../../styles/appStyles";
import { plannerPickerStyles } from "../../styles/appStyles";

type PlannerRecipePickerSelectionProps = {
  mainLabel: string | null;
  supplementaryLabels: string[];
  theme: SiteTheme;
};

function PlannerRecipePickerSelection({
  mainLabel,
  supplementaryLabels,
  theme,
}: PlannerRecipePickerSelectionProps) {
  const { t } = useLanguage();
  const summary = t.planner.selectedMealSummary(
    mainLabel,
    supplementaryLabels,
  );

  return <p className={plannerPickerStyles.selectedSummary(theme)}>{summary}</p>;
}

export default PlannerRecipePickerSelection;
