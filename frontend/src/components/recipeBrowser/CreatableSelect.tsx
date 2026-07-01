import { useState } from "react";
import type { SiteTheme } from "../../styles/appStyles";
import { recipeBrowserStyles } from "./recipeBrowserStyles";

export type CreatableOption = {
  id: number;
  name: string;
};

type CreatableSelectProps = {
  label: string;
  value: number | null;
  options: CreatableOption[];
  theme: SiteTheme;
  required?: boolean;
  placeholder?: string;
  createLabel?: string;
  onChange: (value: number | null) => void;
  onCreate: (name: string) => Promise<CreatableOption>;
};

const createNewValue = "__create_new__";

function CreatableSelect({
  label,
  value,
  options,
  theme,
  required = false,
  placeholder = "Select option",
  createLabel = "Create New",
  onChange,
  onCreate,
}: CreatableSelectProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const saveNewOption = async () => {
    const trimmedName = name.trim();
    if (trimmedName.length === 0) {
      setError("Name is required.");
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      const created = await onCreate(trimmedName);
      onChange(created.id);
      setName("");
      setIsCreating(false);
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Could not create option.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <label className={recipeBrowserStyles.field}>
      <span className={recipeBrowserStyles.label(theme)}>
        {label}
        {required && <span className={recipeBrowserStyles.requiredMark(theme)}> *</span>}
      </span>
      <select
        className={recipeBrowserStyles.textField(theme)}
        required={required}
        value={value ?? ""}
        onChange={(event) => {
          if (event.target.value === createNewValue) {
            setIsCreating(true);
            return;
          }

          onChange(event.target.value ? Number(event.target.value) : null);
        }}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
        <option value={createNewValue}>{createLabel}</option>
      </select>

      {isCreating && (
        <div className={recipeBrowserStyles.createOptionPanel(theme)}>
          {error !== null && <p className={recipeBrowserStyles.statusError(theme)}>{error}</p>}
          <input
            className={recipeBrowserStyles.textField(theme)}
            maxLength={120}
            placeholder={label}
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <div className="flex items-center justify-end gap-3">
            <button
              className={recipeBrowserStyles.secondaryButton(theme)}
              disabled={isSaving}
              type="button"
              onClick={() => {
                setIsCreating(false);
                setError(null);
                setName("");
              }}
            >
              Cancel
            </button>
            <button
              className={recipeBrowserStyles.primaryButton(theme)}
              disabled={isSaving}
              type="button"
              onClick={saveNewOption}
            >
              {isSaving ? "Saving..." : "Create"}
            </button>
          </div>
        </div>
      )}
    </label>
  );
}

export default CreatableSelect;
