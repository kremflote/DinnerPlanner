import type { IBrand } from "../ILookup";

export interface IBrandContext {
  brands: IBrand[];
  brandIsLoading: boolean;
  initError: string | null;
  refreshBrands: () => Promise<void>;
}
