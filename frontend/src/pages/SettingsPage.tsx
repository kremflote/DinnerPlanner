import { useLanguage } from "../contexts";
import { supportedLanguages } from "../i18n";
import { pageStyles, settingsStyles, type SiteTheme } from "../styles/appStyles";

type SettingsPageProps = {
  theme: SiteTheme;
};

const SettingsPage = ({ theme }: SettingsPageProps) => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <main className={pageStyles.shell}>
      <section className={settingsStyles.shell}>
        <h1 className={settingsStyles.title(theme)}>{t.settings.pageTitle}</h1>
        <div className={settingsStyles.panel(theme)}>
          <div>
            <h2 className={settingsStyles.panelTitle}>{t.settings.languageTitle}</h2>
            <p className={settingsStyles.panelBody(theme)}>{t.settings.languageBody}</p>
          </div>
          <div className={settingsStyles.languageOptions}>
            {supportedLanguages.map((languageOption) => (
              <button
                aria-pressed={language === languageOption}
                className={settingsStyles.languageButton(theme, language === languageOption)}
                key={languageOption}
                type="button"
                onClick={() => setLanguage(languageOption)}
              >
                <span className={settingsStyles.languageName}>
                  {languageOption === "en" ? t.language.english : t.language.norwegian}
                </span>
                <span className={settingsStyles.languageCode}>{languageOption}</span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default SettingsPage;
