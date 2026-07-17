import { apiRequest } from "./apiClient";

export interface ImageUploadResponse {
  fileName: string;
  url: string;
}

export type ImageFolder = "general" | "ingredients" | "recipes";

const compressionThresholdBytes = 1.5 * 1024 * 1024;
const backendUploadLimitBytes = 5 * 1024 * 1024;
const maxImageEdgePixels = 1200;
const compressedImageQuality = 0.82;

export const imageUploadService = {
  upload: async (file: File, folder: ImageFolder = "general"): Promise<ImageUploadResponse> => {
    const uploadFile = await compressImageForUpload(file);
    const formData = new FormData();
    formData.append("file", uploadFile);
    formData.append("folder", folder);

    return apiRequest<ImageUploadResponse>("/api/imageuploads", {
      method: "POST",
      body: formData,
    });
  },
};

async function compressImageForUpload(file: File) {
  if (!file.type.startsWith("image/")) {
    return file;
  }

  try {
    const image = await loadImage(file);
    const scale = Math.min(1, maxImageEdgePixels / Math.max(image.width, image.height));
    const shouldCompress = file.size > compressionThresholdBytes || scale < 1;

    if (!shouldCompress) {
      closeLoadedImage(image);
      return file;
    }

    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(image.width * scale));
    canvas.height = Math.max(1, Math.round(image.height * scale));

    const context = canvas.getContext("2d");
    if (context === null) {
      closeLoadedImage(image);
      return file;
    }

    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    closeLoadedImage(image);

    const blob = await canvasToBlob(canvas, "image/jpeg", compressedImageQuality);
    if (blob === null) {
      return file;
    }

    if (blob.size >= file.size && file.size <= backendUploadLimitBytes) {
      return file;
    }

    return new File([blob], getCompressedFileName(file.name), {
      lastModified: Date.now(),
      type: "image/jpeg",
    });
  } catch {
    return file;
  }
}

async function loadImage(file: File): Promise<ImageBitmap | HTMLImageElement> {
  if ("createImageBitmap" in window) {
    return createImageBitmap(file, { imageOrientation: "from-image" });
  }

  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const image = new Image();

    image.onload = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Image could not be loaded."));
    };
    image.src = objectUrl;
  });
}

function canvasToBlob(canvas: HTMLCanvasElement, type: string, quality: number) {
  return new Promise<Blob | null>((resolve) => {
    canvas.toBlob(resolve, type, quality);
  });
}

function closeLoadedImage(image: ImageBitmap | HTMLImageElement) {
  if ("close" in image) {
    image.close();
  }
}

function getCompressedFileName(fileName: string) {
  const fileNameWithoutExtension = fileName.replace(/\.[^.]+$/, "");
  return `${fileNameWithoutExtension || "image"}-compressed.jpg`;
}
