import type { IKitchenItem } from "./IKitchenItem";

export interface IDish extends IKitchenItem {
  type: string;
  cuisine: Cuisine;
}

export type Cuisine =
  | "Asian"
  | "Indian"
  | "Mediterranean"
  | "French"
  | "Norwegian"
  | "Mexican"
  | "Italian"
  | "Grill"
  | "Other";
