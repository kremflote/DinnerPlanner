import type { IProductLookupResponse } from "../interfaces/IProductLookup";
import { apiRequest } from "./apiClient";

export const productLookupService = {
  lookupByEan: (ean: string) =>
    apiRequest<IProductLookupResponse>(`/api/product-lookup/ean/${encodeURIComponent(ean)}`),
};
