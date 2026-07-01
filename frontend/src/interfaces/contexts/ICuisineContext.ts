import type { ICuisine } from "../ILookup";

export interface ICuisineContext {
  cuisines: ICuisine[];
  cuisineIsLoading: boolean;
  initError: string | null;
  refreshCuisines: () => Promise<void>;
}
