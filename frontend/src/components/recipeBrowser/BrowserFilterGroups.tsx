import type { SiteTheme } from "../../styles/appStyles";
import type { IngredientTagGroupKey } from "./formOptions";
import { formatLabel, recipeBrowserStyles } from "./recipeBrowserStyles";

export type NumberFilterOption = {
  disabled?: boolean;
  id: number;
  label: string;
};

type NumberFilterGroupProps = {
  title: string;
  values: readonly NumberFilterOption[];
  selectedValues: readonly number[];
  theme: SiteTheme;
  onToggle: (value: number) => void;
};

export function NumberFilterGroup({
  title,
  values,
  selectedValues,
  theme,
  onToggle,
}: NumberFilterGroupProps) {
  return (
    <fieldset className={recipeBrowserStyles.filterGroup(theme)}>
      <div className={recipeBrowserStyles.filterGroupHeader}>
        <legend className={recipeBrowserStyles.filterLegend(theme)}>{title}</legend>
      </div>
      <div className={recipeBrowserStyles.filterOptionList}>
        {values.map((value) => {
          const disabled = value.disabled === true;

          return (
            <label
              className={`${recipeBrowserStyles.checkboxLabel(theme)} ${
                disabled ? recipeBrowserStyles.disabledFilterOption(theme) : ""
              }`}
              key={value.id}
            >
              <input
                checked={disabled ? false : selectedValues.includes(value.id)}
                className={recipeBrowserStyles.checkbox}
                disabled={disabled}
                type="checkbox"
                onChange={() => onToggle(value.id)}
              />
              {value.label}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

type FilterGroupProps<TValue extends string> = {
  title: string;
  disabledValues?: readonly TValue[];
  formatValue?: (value: TValue) => string;
  values: readonly TValue[];
  selectedValues: readonly TValue[];
  theme: SiteTheme;
  onToggle: (value: TValue) => void;
};

export function FilterGroup<TValue extends string>({
  title,
  disabledValues = [],
  formatValue = formatLabel,
  values,
  selectedValues,
  theme,
  onToggle,
}: FilterGroupProps<TValue>) {
  return (
    <fieldset className={recipeBrowserStyles.filterGroup(theme)}>
      <div className={recipeBrowserStyles.filterGroupHeader}>
        <legend className={recipeBrowserStyles.filterLegend(theme)}>{title}</legend>
      </div>
      <div className={recipeBrowserStyles.filterOptionList}>
        {values.map((value) => {
          const disabled = disabledValues.includes(value);

          return (
            <label
              className={`${recipeBrowserStyles.checkboxLabel(theme)} ${
                disabled ? recipeBrowserStyles.disabledFilterOption(theme) : ""
              }`}
              key={value}
            >
              <input
                checked={disabled ? false : selectedValues.includes(value)}
                className={recipeBrowserStyles.checkbox}
                disabled={disabled}
                type="checkbox"
                onChange={() => onToggle(value)}
              />
              {formatValue(value)}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

type GroupedFilterGroupProps<TValue extends string> = {
  title: string;
  groups: readonly {
    key: IngredientTagGroupKey;
    values: readonly TValue[];
  }[];
  groupLabels: Record<string, string>;
  disabledValues?: readonly TValue[];
  formatValue?: (value: TValue) => string;
  selectedValues: readonly TValue[];
  theme: SiteTheme;
  onToggle: (value: TValue) => void;
};

export function GroupedFilterGroup<TValue extends string>({
  title,
  groups,
  groupLabels,
  disabledValues = [],
  formatValue = formatLabel,
  selectedValues,
  theme,
  onToggle,
}: GroupedFilterGroupProps<TValue>) {
  return (
    <fieldset className={recipeBrowserStyles.filterGroup(theme)}>
      <div className={recipeBrowserStyles.filterGroupHeader}>
        <legend className={recipeBrowserStyles.filterLegend(theme)}>{title}</legend>
      </div>
      <div className={recipeBrowserStyles.groupedFilterOptionList}>
        {groups.map((group) => (
          <section className={recipeBrowserStyles.groupedFilterSection(theme)} key={group.key}>
            <h3 className={recipeBrowserStyles.groupedTagTitle(theme)}>
              {groupLabels[group.key]}
            </h3>
            <div className={recipeBrowserStyles.filterOptionList}>
              {group.values.map((value) => {
                const disabled = disabledValues.includes(value);

                return (
                  <label
                    className={`${recipeBrowserStyles.checkboxLabel(theme)} ${
                      disabled ? recipeBrowserStyles.disabledFilterOption(theme) : ""
                    }`}
                    key={value}
                  >
                    <input
                      checked={disabled ? false : selectedValues.includes(value)}
                      className={recipeBrowserStyles.checkbox}
                      disabled={disabled}
                      type="checkbox"
                      onChange={() => onToggle(value)}
                    />
                    {formatValue(value)}
                  </label>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </fieldset>
  );
}
