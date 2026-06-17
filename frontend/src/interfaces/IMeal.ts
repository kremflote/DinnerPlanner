import type { IDish } from "./IDish";

export interface IMeal {
  mealId: number;
  dish: IDish | null;
  sides: IDish[];
}
