import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { useLanguage } from "../contexts";
import type { IProductLookupNutrition, IProductLookupResult } from "../interfaces/IProductLookup";
import { productLookupService } from "../services";
import { getApiAssetUrl } from "../services/apiClient";
import { pageStyles, scannerStyles, type SiteTheme } from "../styles/appStyles";

type ScannerPageProps = {
  theme: SiteTheme;
};

type BarcodeDetectorShape = {
  detect: (source: HTMLVideoElement) => Promise<Array<{ rawValue?: string }>>;
};

type BarcodeDetectorConstructor = new (options?: {
  formats?: string[];
}) => BarcodeDetectorShape;

type WindowWithBarcodeDetector = Window &
  typeof globalThis & {
    BarcodeDetector?: BarcodeDetectorConstructor;
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
  const streamRef = useRef<MediaStream | null>(null);
  const scanFrameRef = useRef<number | null>(null);
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
    if (scanFrameRef.current !== null) {
      window.cancelAnimationFrame(scanFrameRef.current);
      scanFrameRef.current = null;
    }

    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    setIsCameraOpen(false);
  }, []);

  const startCamera = async () => {
    const detectorConstructor = (window as WindowWithBarcodeDetector).BarcodeDetector;
    if (!navigator.mediaDevices?.getUserMedia || detectorConstructor === undefined) {
      setError(t.scanner.cameraUnsupported);
      return;
    }

    setError(null);
    setCameraStatus(t.scanner.scannerReady);
    setIsCameraOpen(true);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: "environment" },
        },
        audio: false,
      });

      streamRef.current = stream;
      await new Promise<void>((resolve) => {
        window.requestAnimationFrame(() => resolve());
      });

      if (videoRef.current !== null) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      const detector = new detectorConstructor({
        formats: ["ean_13", "ean_8", "upc_a", "upc_e"],
      });

      const scan = async () => {
        const video = videoRef.current;
        if (video === null || streamRef.current === null) {
          return;
        }

        try {
          if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
            const barcodes = await detector.detect(video);
            const detectedEan = barcodes
              .map((barcode) => barcode.rawValue?.replace(/\D/g, "") ?? "")
              .find((value) => /^(\d{8}|\d{13})$/.test(value));

            if (detectedEan !== undefined && detectedEan !== lastScannedEanRef.current) {
              lastScannedEanRef.current = detectedEan;
              setEan(detectedEan);
              setCameraStatus(t.scanner.scannerFound(detectedEan));
              stopCamera();
              await lookupEan(detectedEan);
              return;
            }
          }
        } catch {
          setCameraStatus(t.scanner.scanningHint);
        }

        scanFrameRef.current = window.requestAnimationFrame(scan);
      };

      scanFrameRef.current = window.requestAnimationFrame(scan);
    } catch {
      setError(t.scanner.cameraPermissionDenied);
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
