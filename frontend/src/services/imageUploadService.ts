import { apiRequest } from "./apiClient";

export interface ImageUploadResponse {
  fileName: string;
  url: string;
}

export type ImageFolder = "general" | "ingredients" | "recipes";

export const imageUploadService = {
  upload: async (file: File, folder: ImageFolder = "general"): Promise<ImageUploadResponse> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    return apiRequest<ImageUploadResponse>("/api/imageuploads", {
      method: "POST",
      body: formData,
    });
  },
};
