import type { IBrand } from "../interfaces/ILookup";
import { apiRequest } from "./apiClient";

export interface LookupRequest {
  name: string;
}

export const brandService = {
  getAll: () => apiRequest<IBrand[]>("/api/brands"),
  create: (brand: LookupRequest) =>
    apiRequest<IBrand>("/api/brands", {
      method: "POST",
      body: brand,
    }),
};
