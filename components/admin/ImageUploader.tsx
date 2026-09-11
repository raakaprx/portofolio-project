"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Upload, X, Loader2, Crop } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { AvatarCropModal } from "@/components/admin/AvatarCropModal";
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
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [cropImageSrc, setCropImageSrc] = useState<string>("");
  const [urlInput, setUrlInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    if (file.size > 15 * 1024 * 1024) {
      toast.error("Ukuran file maksimal 15MB");
      return;
    }

    // Jika mode avatar lingkaran: buka AvatarCropModal terlebih dahulu
    if (previewShape === "circle") {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setCropImageSrc(reader.result);
          setCropModalOpen(true);
        }
      };
      reader.readAsDataURL(file);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    // Alur upload normal untuk gambar proyek / banner
    await uploadDirectFile(file);
  };

  const uploadDirectFile = async (file: File) => {
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

  const handleCroppedUpload = async (croppedBlob: Blob) => {
    setUploading(true);
    try {
      const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2, 8)}.webp`;

      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(fileName, croppedBlob, {
          contentType: "image/webp",
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
      toast.success("Foto profil berhasil di-crop & disimpan!");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal menyimpan foto hasil crop";
      toast.error("Upload gagal: " + msg);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-3">
      {/* Crop Modal untuk Avatar Lingkaran */}
      {previewShape === "circle" && (
        <AvatarCropModal
          imageSrc={cropImageSrc}
          isOpen={cropModalOpen}
          onClose={() => {
            setCropModalOpen(false);
            setCropImageSrc("");
          }}
          onCropComplete={handleCroppedUpload}
        />
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
        disabled={uploading}
      />

      {value ? (
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div
            className={`relative group overflow-hidden border border-zinc-700 bg-zinc-950 shrink-0 ${
              previewShape === "circle"
                ? "rounded-full w-36 h-36"
                : "rounded-xl max-w-sm h-44 w-full"
            }`}
          >
            <Image
              src={value}
              alt="Uploaded Preview"
              fill
              className="object-cover transition-transform duration-200"
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

          <div className="space-y-2 text-center sm:text-left">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="px-4 py-2 rounded-xl text-xs font-mono font-semibold bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border border-zinc-700 transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
            >
              {uploading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
                  <span>Mengunggah foto...</span>
                </>
              ) : (
                <>
                  <Crop className="w-4 h-4 text-emerald-400" />
                  <span>Ganti / Crop Foto Baru</span>
                </>
              )}
            </button>
            <p className="text-[11px] text-zinc-400 font-sans">
              Format bebas: JPG, PNG, WebP, dll. Otomatis dipotong rapi melingkar.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-zinc-700 hover:border-zinc-500 rounded-xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer bg-zinc-900/50 hover:bg-zinc-800/40 transition-colors"
          >
            {uploading ? (
              <div className="flex flex-col items-center gap-2 text-zinc-400">
                <Loader2 className="w-6 h-6 animate-spin text-white" />
                <span className="text-xs font-mono">Memproses foto...</span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 text-zinc-400">
                <div className="p-3 rounded-full bg-zinc-800 text-zinc-200">
                  <Upload className="w-5 h-5" />
                </div>
                <div className="text-center">
                  <p className="text-xs font-semibold text-zinc-200">
                    Klik untuk upload & sesuaikan foto profil
                  </p>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    Format bebas (JPG, PNG, WebP). Anda bisa geser wajah & zoom seperti di WhatsApp/LinkedIn.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Manual URL Input Option */}
      <div className="flex items-center gap-2 pt-1">
        <input
          type="url"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          placeholder="Atau tempelkan URL gambar (https://...)"
          className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 font-mono"
        />
        <button
          type="button"
          onClick={() => {
            if (urlInput.trim()) {
              onChange(urlInput.trim());
              toast.success("URL gambar berhasil diterapkan!");
              setUrlInput("");
            }
          }}
          className="px-3.5 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-xs font-mono font-medium text-zinc-200 cursor-pointer transition-colors"
        >
          Terapkan
        </button>
      </div>
    </div>
  );
}
