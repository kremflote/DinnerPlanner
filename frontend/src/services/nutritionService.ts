import type { INutritionProfilePreference, INutritionSummary } from "../interfaces/INutrition";
import { apiRequest } from "./apiClient";

export const nutritionService = {
  getWeeklySummary: (from: string, to: string, profileId: string) =>
    apiRequest<INutritionSummary>(
      `/api/nutrition/weekly?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&profileId=${encodeURIComponent(profileId)}`,
    ),
  getProfilePreference: () => apiRequest<INutritionProfilePreference>("/api/nutrition/profile-preference"),
  updateProfilePreference: (profileId: string) =>
    apiRequest<INutritionProfilePreference>("/api/nutrition/profile-preference", {
      method: "PUT",
      body: { profileId },
    }),
};
