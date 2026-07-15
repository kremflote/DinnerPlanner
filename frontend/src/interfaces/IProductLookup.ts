export interface IProductLookupResponse {
  ean: string;
  products: IProductLookupResult[];
}

export interface IProductLookupResult {
  ean: string;
  name: string;
  brand: string | null;
  vendor: string | null;
  description: string | null;
  ingredients: string | null;
  imageUrl: string | null;
  currentPrice: number | null;
  currentUnitPrice: number | null;
  weight: number | null;
  weightUnit: string | null;
  store: IProductLookupStore | null;
  nutritionPer100: IProductLookupNutrition | null;
  source: string;
}

export interface IProductLookupStore {
  name: string;
  url: string | null;
  logo: string | null;
}

export interface IProductLookupNutrition {
  calories: number | null;
  carbohydrateGrams: number | null;
  proteinGrams: number | null;
  saltGrams: number | null;
  dietaryFiberGrams: number | null;
  saturatedFatGrams: number | null;
  monounsaturatedFatGrams: number | null;
  polyunsaturatedFatGrams: number | null;
}
