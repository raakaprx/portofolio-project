"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Upload, X, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  bucket?: string;
  folder?: string;
  previewShape?: "rounded" | "circle";
  imageStyle?: React.CSSProperties;
}

export function ImageUploader({
  value,
  onChange,
  bucket = "portfolio-assets",
  folder = "projects",
  previewShape = "rounded",
  imageStyle,
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Ukuran file maksimal 10MB");
      return;
    }

    setUploading(true);
    try {
      const fileExt = file.name.split(".").pop() || "jpg";
      const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;

      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        throw error;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from(bucket).getPublicUrl(data.path);

      onChange(publicUrl);
      toast.success("Gambar berhasil di-upload!");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal upload gambar";
      toast.error("Upload gagal: " + msg);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-3">
      {value ? (
        <div
          className={`relative group overflow-hidden border border-zinc-700 bg-zinc-950 ${
            previewShape === "circle"
              ? "rounded-full w-36 h-36 mx-auto"
              : "rounded-xl max-w-sm h-44 w-full"
          }`}
        >
          <Image
            src={value}
            alt="Uploaded Preview"
            fill
            className={`object-cover transition-transform duration-200 ${
              imageStyle?.objectPosition
                ? ""
                : previewShape === "circle"
                ? "object-[center_20%]"
                : "object-center"
            }`}
            style={imageStyle}
            sizes="384px"
          />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-2 right-2 p-1.5 rounded-full bg-black/75 hover:bg-red-600 text-white transition-colors z-10 cursor-pointer shadow-md"
            title="Hapus gambar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-zinc-700 hover:border-zinc-500 rounded-xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer bg-zinc-900/50 hover:bg-zinc-800/40 transition-colors"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
              disabled={uploading}
            />
            {uploading ? (
              <div className="flex flex-col items-center gap-2 text-zinc-400">
                <Loader2 className="w-6 h-6 animate-spin text-white" />
                <span className="text-xs font-mono">Mengupload gambar...</span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 text-zinc-400">
                <div className="p-3 rounded-full bg-zinc-800 text-zinc-200">
                  <Upload className="w-5 h-5" />
                </div>
                <div className="text-center">
                  <p className="text-xs font-semibold text-zinc-200">
                    Klik untuk upload gambar
                  </p>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    Format bebas: JPG, PNG, WebP, SVG, GIF, AVIF (maks. 10MB)
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
