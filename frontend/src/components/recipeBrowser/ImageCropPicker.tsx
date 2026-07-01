import { useEffect, useMemo, useState } from "react";
import type { SiteTheme } from "../../styles/appStyles";
import { recipeBrowserStyles } from "./recipeBrowserStyles";

type ImageCropPickerProps = {
  theme: SiteTheme;
  onCroppedFileChange: (file: File | null) => void;
};

const cropOutputSize = 800;

function ImageCropPicker({ theme, onCroppedFileChange }: ImageCropPickerProps) {
  const [sourceFile, setSourceFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    if (sourceFile === null) {
      setImageUrl(null);
      setPreviewUrl(null);
      onCroppedFileChange(null);
      return;
    }

    const objectUrl = URL.createObjectURL(sourceFile);
    setImageUrl(objectUrl);
    setPreviewUrl(null);
    onCroppedFileChange(null);

    return () => URL.revokeObjectURL(objectUrl);
  }, [sourceFile, onCroppedFileChange]);

  useEffect(() => {
    if (imageUrl === null || sourceFile === null) {
      return;
    }

    let isCurrent = true;
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = cropOutputSize;
      canvas.height = cropOutputSize;

      const context = canvas.getContext("2d");
      if (context === null) {
        return;
      }

      const naturalSize = Math.min(image.naturalWidth, image.naturalHeight);
      const sourceSize = naturalSize / zoom;
      const maxX = Math.max(0, image.naturalWidth - sourceSize);
      const maxY = Math.max(0, image.naturalHeight - sourceSize);
      const sourceX = clamp(maxX / 2 + (offsetX / 100) * (maxX / 2), 0, maxX);
      const sourceY = clamp(maxY / 2 + (offsetY / 100) * (maxY / 2), 0, maxY);

      context.drawImage(
        image,
        sourceX,
        sourceY,
        sourceSize,
        sourceSize,
        0,
        0,
        cropOutputSize,
        cropOutputSize,
      );

      const nextPreviewUrl = canvas.toDataURL("image/jpeg", 0.88);
      canvas.toBlob(
        (blob) => {
          if (!isCurrent || blob === null) {
            return;
          }

          setPreviewUrl(nextPreviewUrl);
          onCroppedFileChange(
            new File([blob], getCroppedFileName(sourceFile.name), { type: "image/jpeg" }),
          );
        },
        "image/jpeg",
        0.88,
      );
    };
    image.src = imageUrl;

    return () => {
      isCurrent = false;
    };
  }, [imageUrl, offsetX, offsetY, onCroppedFileChange, sourceFile, zoom]);

  const hasImage = useMemo(() => sourceFile !== null && previewUrl !== null, [previewUrl, sourceFile]);

  return (
    <div className="grid gap-3">
      <input
        accept="image/jpeg,image/png,image/webp"
        className={recipeBrowserStyles.fileInput(theme)}
        type="file"
        onChange={(event) => {
          setSourceFile(event.target.files?.[0] ?? null);
          setZoom(1);
          setOffsetX(0);
          setOffsetY(0);
        }}
      />

      <div className={recipeBrowserStyles.cropPreview(theme)}>
        {previewUrl ? (
          <img className="h-full w-full object-cover" src={previewUrl} alt="Recipe image crop preview" />
        ) : (
          <div className="flex h-full w-full items-center justify-center px-4 text-center text-sm font-semibold opacity-60">
            Image preview
          </div>
        )}
      </div>

      {hasImage && (
        <div className="grid gap-3">
          <SliderField label="Zoom" max={3} min={1} step={0.05} value={zoom} onChange={setZoom} />
          <SliderField label="Horizontal crop" max={100} min={-100} step={1} value={offsetX} onChange={setOffsetX} />
          <SliderField label="Vertical crop" max={100} min={-100} step={1} value={offsetY} onChange={setOffsetY} />
        </div>
      )}
    </div>
  );
}

type SliderFieldProps = {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
};

function SliderField({ label, min, max, step, value, onChange }: SliderFieldProps) {
  return (
    <label className="grid gap-1 text-xs font-bold">
      <span>{label}</span>
      <input
        max={max}
        min={min}
        step={step}
        type="range"
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}

function getCroppedFileName(fileName: string) {
  const fileNameWithoutExtension = fileName.replace(/\.[^.]+$/, "");
  return `${fileNameWithoutExtension || "recipe"}-square.jpg`;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export default ImageCropPicker;
