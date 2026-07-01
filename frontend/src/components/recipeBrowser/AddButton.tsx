import { useState } from "react";
import type { SiteTheme } from "../../styles/appStyles";
import IngredientCreateForm from "./IngredientCreateForm";
import { recipeBrowserStyles } from "./recipeBrowserStyles";
import RecipeCreateForm from "./RecipeCreateForm";
import type { BrowserAddTarget } from "./types";

type AddButtonProps = {
  target: BrowserAddTarget;
  theme: SiteTheme;
};

function AddButton({ target, theme }: AddButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTarget, setActiveTarget] = useState<BrowserAddTarget>(target);

  const openModal = () => {
    setActiveTarget(target);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  return (
    <>
      <button
        className={recipeBrowserStyles.addButton(theme)}
        type="button"
        onClick={openModal}
      >
        + Add
      </button>
      {isOpen && (
        <div className={recipeBrowserStyles.modalBackdrop} role="presentation">
          <section
            aria-modal="true"
            className={recipeBrowserStyles.modalPanel(theme)}
            role="dialog"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold leading-tight">Create</h2>
                <p className="mt-2 text-sm font-semibold leading-[1.5] opacity-75">
                  Add recipes, desserts, sauces, ingredients, and the rest of the kitchen library.
                </p>
              </div>
              <button
                aria-label="Close"
                className={recipeBrowserStyles.modalCloseButton(theme)}
                type="button"
                onClick={closeModal}
              >
                x
              </button>
            </div>

            <div className={recipeBrowserStyles.modalModeSwitch(theme)} aria-label="Choose what to create">
              <button
                className={recipeBrowserStyles.modalModeOption(theme, activeTarget === "recipe")}
                type="button"
                onClick={() => setActiveTarget("recipe")}
              >
                Recipe
              </button>
              <button
                className={recipeBrowserStyles.modalModeOption(theme, activeTarget === "ingredient")}
                type="button"
                onClick={() => setActiveTarget("ingredient")}
              >
                Ingredient
              </button>
            </div>

            {activeTarget === "recipe" ? (
              <RecipeCreateForm theme={theme} onCancel={closeModal} onCreated={closeModal} />
            ) : (
              <IngredientCreateForm theme={theme} onCancel={closeModal} onCreated={closeModal} />
            )}
          </section>
        </div>
      )}
    </>
  );
}

export default AddButton;
