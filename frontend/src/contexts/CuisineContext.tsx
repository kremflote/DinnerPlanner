import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ICuisine } from "../interfaces/ILookup";
import type { ICuisineContext } from "../interfaces/contexts/ICuisineContext";
import type { IProviderProps } from "../interfaces/IProviderProps";
import { cuisineService } from "../services";
import { getErrorMessage } from "./contextHelpers";

const CuisineContext = createContext<ICuisineContext | null>(null);

export function CuisineProvider({ children }: IProviderProps) {
  const [cuisines, setCuisines] = useState<ICuisine[]>([]);
  const [cuisineIsLoading, setCuisineIsLoading] = useState(true);
  const [initError, setInitError] = useState<string | null>(null);

  const refreshCuisines = useCallback(async () => {
    setCuisineIsLoading(true);
    setInitError(null);

    try {
      setCuisines(await cuisineService.getAll());
    } catch (error) {
      setInitError(getErrorMessage(error));
    } finally {
      setCuisineIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void refreshCuisines();
  }, [refreshCuisines]);

  const value = useMemo<ICuisineContext>(
    () => ({
      cuisines,
      cuisineIsLoading,
      initError,
      refreshCuisines,
    }),
    [cuisines, cuisineIsLoading, initError, refreshCuisines],
  );

  return <CuisineContext.Provider value={value}>{children}</CuisineContext.Provider>;
}

export function useCuisines() {
  const context = useContext(CuisineContext);
  if (context === null) {
    throw new Error("useCuisines must be used inside CuisineProvider.");
  }

  return context;
}
