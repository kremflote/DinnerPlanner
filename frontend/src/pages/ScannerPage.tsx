import type { IScannerControls } from "@zxing/browser";
import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { useLanguage } from "../contexts";
import type { IProductLookupNutrition, IProductLookupResult } from "../interfaces/IProductLookup";
import { productLookupService } from "../services";
import { getApiAssetUrl } from "../services/apiClient";
import { pageStyles, scannerStyles, type SiteTheme } from "../styles/appStyles";

type ScannerPageProps = {
  theme: SiteTheme;
};

function ScannerPage({ theme }: ScannerPageProps) {
  const { t } = useLanguage();
  const [ean, setEan] = useState("");
  const [products, setProducts] = useState<IProductLookupResult[]>([]);
  const [lookedUpEan, setLookedUpEan] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [cameraStatus, setCameraStatus] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const scannerControlsRef = useRef<IScannerControls | null>(null);
  const lastScannedEanRef = useRef<string | null>(null);

  const lookupEan = useCallback(async (rawEan: string) => {
    const normalizedEan = rawEan.replace(/\D/g, "");
    if (!/^(\d{8}|\d{13})$/.test(normalizedEan)) {
      setError(t.scanner.invalidEan);
      setProducts([]);
      setLookedUpEan(null);
      return false;
    }

    setIsLoading(true);
    setError(null);
    setProducts([]);
    setLookedUpEan(normalizedEan);

    try {
      const response = await productLookupService.lookupByEan(normalizedEan);
      setProducts(response.products);
      return true;
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : t.scanner.lookupFailed);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [t.scanner.invalidEan, t.scanner.lookupFailed]);

  const lookupProduct = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await lookupEan(ean);
  };

  const stopCamera = useCallback(() => {
    scannerControlsRef.current?.stop();
    scannerControlsRef.current = null;
    setIsCameraOpen(false);
  }, []);

  const startCamera = async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setError(t.scanner.cameraUnsupported);
      return;
    }

    setError(null);
    setCameraStatus(t.scanner.scannerReady);
    setIsCameraOpen(true);

    try {
      await new Promise<void>((resolve) => {
        window.requestAnimationFrame(() => resolve());
      });

      if (videoRef.current === null) {
        throw new Error("Scanner video element was not ready.");
      }

      const { BrowserMultiFormatReader } = await import("@zxing/browser");
      const scanner = new BrowserMultiFormatReader();
      const controls = await scanner.decodeFromVideoDevice(undefined, videoRef.current, (result) => {
        const detectedEan = result?.getText().replace(/\D/g, "");
        if (detectedEan === undefined || !/^(\d{8}|\d{13})$/.test(detectedEan)) {
          return;
        }

        if (detectedEan !== lastScannedEanRef.current) {
          lastScannedEanRef.current = detectedEan;
          setEan(detectedEan);
          setCameraStatus(t.scanner.scannerFound(detectedEan));
          controls.stop();
          scannerControlsRef.current = null;
          setIsCameraOpen(false);
          void lookupEan(detectedEan);
        }
      });

      scannerControlsRef.current = controls;
    } catch (caughtError) {
      const errorName = caughtError instanceof DOMException ? caughtError.name : "";
      setError(
        errorName === "NotAllowedError" || errorName === "PermissionDeniedError"
          ? t.scanner.cameraPermissionDenied
          : t.scanner.cameraUnsupported
      );
      setCameraStatus(null);
      stopCamera();
    }
  };

  useEffect(() => stopCamera, [stopCamera]);

  return (
    <main className={pageStyles.shell}>
      <section className={scannerStyles.shell}>
        <header className={scannerStyles.header}>
          <h1 className={scannerStyles.title(theme)}>{t.scanner.pageTitle}</h1>
          <p className={scannerStyles.intro(theme)}>{t.scanner.pageIntro}</p>
        </header>

        <section className={scannerStyles.panel(theme)}>
          <form className={scannerStyles.lookupForm} onSubmit={lookupProduct}>
            <label className={scannerStyles.field}>
              <span className={scannerStyles.label}>{t.scanner.eanLabel}</span>
              <input
                className={scannerStyles.input(theme)}
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder={t.scanner.eanPlaceholder}
                value={ean}
                onChange={(event) => setEan(event.target.value)}
              />
            </label>
            <button
              className={scannerStyles.submitButton(theme)}
              disabled={isLoading}
              type="submit"
            >
              {isLoading ? t.scanner.searching : t.scanner.lookup}
            </button>
          </form>

          <div className={scannerStyles.scannerActions}>
            <button
              className={scannerStyles.cameraButton(theme)}
              disabled={isLoading}
              onClick={isCameraOpen ? stopCamera : startCamera}
              type="button"
            >
              {isCameraOpen ? t.scanner.cameraStop : t.scanner.cameraStart}
            </button>
            <span className={scannerStyles.cameraStatus(theme)}>
              {cameraStatus ?? t.scanner.scanningHint}
            </span>
          </div>

          {isCameraOpen && (
            <div className={scannerStyles.cameraFrame(theme)}>
              <video
                className={scannerStyles.cameraVideo}
                muted
                playsInline
                ref={videoRef}
              />
              <div aria-hidden="true" className={scannerStyles.cameraGuide} />
            </div>
          )}

          {error !== null && <p className={scannerStyles.statusError(theme)}>{error}</p>}
        </section>

        {isLoading && (
          <div className={scannerStyles.emptyState(theme)}>{t.scanner.searching}</div>
        )}

        {!isLoading && lookedUpEan !== null && products.length === 0 && error === null && (
          <div className={scannerStyles.emptyState(theme)}>
            {t.scanner.noProductsFound(lookedUpEan)}
          </div>
        )}

        {products.length > 0 && (
          <section className={scannerStyles.resultList} aria-label={t.scanner.resultsLabel}>
            {products.map((product, index) => (
              <ProductLookupCard
                key={`${product.ean}-${product.store?.name ?? "store"}-${index}`}
                product={product}
                theme={theme}
              />
            ))}
          </section>
        )}
      </section>
    </main>
  );
}

function ProductLookupCard({
  product,
  theme,
}: {
  product: IProductLookupResult;
  theme: SiteTheme;
}) {
  const { t } = useLanguage();
  const imageUrl = getApiAssetUrl(product.imageUrl);

  return (
    <article className={scannerStyles.productCard(theme)}>
      <div className={scannerStyles.productImageFrame(theme)}>
        {imageUrl === null ? (
          <div className={scannerStyles.productImageFallback(theme)}>{t.scanner.noImage}</div>
        ) : (
          <img className={scannerStyles.productImage} src={imageUrl} alt="" />
        )}
      </div>

      <div className={scannerStyles.productMain}>
        <div>
          <h2 className={scannerStyles.productTitle}>{product.name}</h2>
          <p className={scannerStyles.productMeta(theme)}>
            {[product.brand, product.vendor].filter(Boolean).join(" / ") || t.scanner.unknownBrand}
          </p>
        </div>

        <div className={scannerStyles.chipRow}>
          <span className={scannerStyles.chip(theme)}>{product.source}</span>
          {product.store?.name && <span className={scannerStyles.chip(theme)}>{product.store.name}</span>}
          {product.weight !== null && product.weightUnit !== null && (
            <span className={scannerStyles.chip(theme)}>
              {product.weight} {product.weightUnit}
            </span>
          )}
        </div>

        {product.nutritionPer100 !== null && (
          <NutritionSummary nutrition={product.nutritionPer100} theme={theme} />
        )}
      </div>

      <div className={scannerStyles.priceBlock}>
        <span className={scannerStyles.price(theme)}>
          {product.currentPrice === null ? t.scanner.noPrice : t.scanner.price(product.currentPrice)}
        </span>
        {product.currentUnitPrice !== null && (
          <span className={scannerStyles.unitPrice(theme)}>
            {t.scanner.unitPrice(product.currentUnitPrice)}
          </span>
        )}
      </div>
    </article>
  );
}

function NutritionSummary({
  nutrition,
  theme,
}: {
  nutrition: IProductLookupNutrition;
  theme: SiteTheme;
}) {
  const { t } = useLanguage();
  const items = [
    [t.scanner.calories, nutrition.calories === null ? null : `${nutrition.calories} kcal`],
    [t.scanner.carbs, nutrition.carbohydrateGrams],
    [t.scanner.protein, nutrition.proteinGrams],
    [t.scanner.salt, nutrition.saltGrams],
  ] as const;

  return (
    <dl className={scannerStyles.nutritionGrid}>
      {items.map(([label, value]) => (
        value !== null && (
          <div className={scannerStyles.nutritionItem(theme)} key={label}>
            <dt>{label}</dt>
            <dd>{typeof value === "number" ? `${value} g` : value}</dd>
          </div>
        )
      ))}
    </dl>
  );
}

export default ScannerPage;
