import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { IBrand } from "../interfaces/ILookup";
import type { IBrandContext } from "../interfaces/contexts/IBrandContext";
import type { IProviderProps } from "../interfaces/IProviderProps";
import { brandService } from "../services";
import { getErrorMessage } from "./contextHelpers";

const BrandContext = createContext<IBrandContext | null>(null);

export function BrandProvider({ children }: IProviderProps) {
  const [brands, setBrands] = useState<IBrand[]>([]);
  const [brandIsLoading, setBrandIsLoading] = useState(true);
  const [initError, setInitError] = useState<string | null>(null);

  const refreshBrands = useCallback(async () => {
    setBrandIsLoading(true);
    setInitError(null);

    try {
      setBrands(await brandService.getAll());
    } catch (error) {
      setInitError(getErrorMessage(error));
    } finally {
      setBrandIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void refreshBrands();
  }, [refreshBrands]);

  const value = useMemo<IBrandContext>(
    () => ({
      brands,
      brandIsLoading,
      initError,
      refreshBrands,
    }),
    [brands, brandIsLoading, initError, refreshBrands],
  );

  return <BrandContext.Provider value={value}>{children}</BrandContext.Provider>;
}

export function useBrands() {
  const context = useContext(BrandContext);
  if (context === null) {
    throw new Error("useBrands must be used inside BrandProvider.");
  }

  return context;
}
