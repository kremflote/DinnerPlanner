import type { IDish } from "../IDish";

export interface IDishContext {
  showcases: IDish[];
  dishIsLoading: boolean;
  initError: string | null;
}
