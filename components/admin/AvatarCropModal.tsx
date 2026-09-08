"use client";

import { useState, useCallback } from "react";
import Cropper, { type Area, type Point } from "react-easy-crop";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, RotateCcw, Check, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface AvatarCropModalProps {
  imageSrc: string;
  isOpen: boolean;
  onClose: () => void;
  onCropComplete: (croppedBlob: Blob, previewUrl: string) => void;
}

/**
 * Ekstrak pixel hasil crop menjadi file Blob berkualitas tinggi (WebP 512x512)
 */
async function getCroppedImg(
  imageSrc: string,
  pixelCrop: Area,
  outputSize = 512
): Promise<{ blob: Blob; url: string }> {
  const image = new window.Image();
  image.src = imageSrc;
  image.crossOrigin = "anonymous";

  await new Promise<void>((resolve, reject) => {
    image.onload = () => resolve();
    image.onerror = (err) => reject(err);
  });

  const canvas = document.createElement("canvas");
  canvas.width = outputSize;
  canvas.height = outputSize;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Gagal menginisialisasi canvas context 2D");
  }

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    outputSize,
    outputSize
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          canvas.toBlob(
            (jpegBlob) => {
              if (!jpegBlob) {
                reject(new Error("Gagal membuat blob gambar"));
                return;
              }
              const url = URL.createObjectURL(jpegBlob);
              resolve({ blob: jpegBlob, url });
            },
            "image/jpeg",
            0.95
          );
          return;
        }
        const url = URL.createObjectURL(blob);
        resolve({ blob, url });
      },
      "image/webp",
      0.95
    );
  });
}

export function AvatarCropModal({
  imageSrc,
  isOpen,
  onClose,
  onCropComplete,
}: AvatarCropModalProps) {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [processing, setProcessing] = useState(false);

  const onCropChange = (location: Point) => {
    setCrop(location);
  };

  const onZoomChange = (newZoom: number) => {
    setZoom(newZoom);
  };

  const onCropAreaComplete = useCallback(
    (_croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const handleApply = async () => {
    if (!croppedAreaPixels || !imageSrc) {
      toast.error("Area crop belum siap");
      return;
    }

    setProcessing(true);
    try {
      const { blob, url } = await getCroppedImg(imageSrc, croppedAreaPixels);
      onCropComplete(blob, url);
      onClose();
    } catch (err) {
      console.error("Gagal melakukan crop gambar:", err);
      toast.error("Gagal memproses crop gambar");
    } finally {
      setProcessing(false);
    }
  };

  const handleReset = () => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md bg-zinc-950 border border-zinc-800 text-white p-6 rounded-2xl shadow-2xl space-y-4">
        <DialogHeader className="space-y-1 text-left">
          <DialogTitle className="text-lg font-mono font-bold text-white flex items-center gap-2">
            <span>Sesuaikan Foto Profil</span>
          </DialogTitle>
          <DialogDescription className="text-xs text-zinc-400 font-sans">
            Geser foto agar wajah berada tepat di dalam lingkaran, lalu atur zoom sesuai keinginan.
          </DialogDescription>
        </DialogHeader>

        {/* Cropper Container */}
        <div className="relative w-full h-72 sm:h-80 bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800">
          {imageSrc && (
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={1}
              cropShape="round"
              showGrid={false}
              onCropChange={onCropChange}
              onZoomChange={onZoomChange}
              onCropComplete={onCropAreaComplete}
              minZoom={1}
              maxZoom={3}
              classes={{
                containerClassName: "rounded-xl",
              }}
            />
          )}
        </div>

        {/* Zoom Controls */}
        <div className="space-y-2 pt-1">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-300">
            <span className="flex items-center gap-1 text-zinc-400">
              <ZoomOut className="w-3.5 h-3.5" />
              <span>Zoom</span>
            </span>
            <span className="text-blue-400 font-bold bg-blue-950/60 px-2 py-0.5 rounded border border-blue-800/40">
              {zoom.toFixed(2)}x
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setZoom((z) => Math.max(1, Number((z - 0.1).toFixed(2))))}
              className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 transition-colors cursor-pointer"
              title="Perkecil"
            >
              <ZoomOut className="w-4 h-4" />
            </button>

            <input
              type="range"
              value={zoom}
              min={1}
              max={3}
              step={0.02}
              aria-label="Zoom"
              onChange={(e) => setZoom(Number(e.target.value))}
              className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />

            <button
              type="button"
              onClick={() => setZoom((z) => Math.min(3, Number((z + 0.1).toFixed(2))))}
              className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 transition-colors cursor-pointer"
              title="Perbesar"
            >
              <ZoomIn className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer ml-1"
              title="Reset Posisi & Zoom"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-zinc-850">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onClose}
            disabled={processing}
            className="border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-mono text-xs cursor-pointer"
          >
            Batal
          </Button>

          <Button
            type="button"
            size="sm"
            onClick={handleApply}
            disabled={processing}
            className="bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-semibold gap-1.5 cursor-pointer shadow-md"
          >
            {processing ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Memproses...</span>
              </>
            ) : (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Terapkan Foto</span>
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
