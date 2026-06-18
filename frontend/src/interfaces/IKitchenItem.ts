export interface IKitchenItem {
  id: number;
  name: string;
  imageUrl: string | null;
  recipeId: number | null;
}

export type MeasurementUnit =
  | "Gram"
  | "Kilogram"
  | "Milliliter"
  | "Liter"
  | "Teaspoon"
  | "Tablespoon"
  | "Cup"
  | "Piece"
  | "Clove"
  | "Pinch"
  | "ToTaste";

export type PreparationType =
  | "Whole"
  | "Diced"
  | "Chopped"
  | "Sliced"
  | "Minced"
  | "Grated"
  | "Crushed"
  | "Peeled"
  | "Boiled"
  | "Fried"
  | "Baked"
  | "Roasted"
  | "Steamed"
  | "Sauteed"
  | "Grilled"
  | "Toasted"
  | "Raw";
