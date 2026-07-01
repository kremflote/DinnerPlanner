import { useState } from "react";
import RecipeBrowser, { type BrowserMode } from "../components/recipeBrowser";
import type { SiteTheme } from "../styles/appStyles";

type CookbookPageProps = {
  theme: SiteTheme;
};

function CookbookPage({ theme }: CookbookPageProps) {
  const [browserMode, setBrowserMode] = useState<BrowserMode>("recipes");

  return (
    <RecipeBrowser
      mode={browserMode}
      theme={theme}
      onModeChange={setBrowserMode}
    />
  );
}

export default CookbookPage;
