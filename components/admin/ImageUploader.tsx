"use client";

import { useState, useRef } from "react";
import { Upload, X, Loader2, Link as LinkIcon } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  bucket?: string;
  folder?: string;
}

export function ImageUploader({
  value,
  onChange,
  bucket = "portfolio-assets",
  folder = "projects",
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Ukuran file maksimal 5MB");
      return;
    }

    setUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
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
      toast.error("Upload gagal: " + msg, {
        description: "Tips: Anda juga bisa menempelkan link/URL gambar langsung.",
      });
      setShowUrlInput(true);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleApplyUrl = () => {
    if (!urlInput.trim()) return;
    onChange(urlInput.trim());
    setUrlInput("");
    setShowUrlInput(false);
    toast.success("URL Gambar diterapkan!");
  };

  return (
    <div className="space-y-3">
      {value ? (
        <div className="relative group rounded-xl overflow-hidden border border-zinc-700 bg-zinc-950 max-w-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt="Uploaded Preview"
            className="w-full h-44 object-cover object-center"
          />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 hover:bg-red-600 text-white transition-colors"
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
                  <p className="text-[11px] text-zinc-500 mt-0.5">
                    PNG, JPG, WebP (maks. 5MB)
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between text-[11px] text-zinc-400">
            <button
              type="button"
              onClick={() => setShowUrlInput(!showUrlInput)}
              className="flex items-center gap-1 text-blue-400 hover:underline cursor-pointer"
            >
              <LinkIcon className="w-3 h-3" />
              <span>{showUrlInput ? "Tutup input URL" : "Atau masukkan URL gambar langsung"}</span>
            </button>
          </div>

          {showUrlInput && (
            <div className="flex items-center gap-2 pt-1">
              <input
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://example.com/image.png"
                className="flex-1 bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-1.5 text-xs text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-400"
              />
              <Button
                type="button"
                onClick={handleApplyUrl}
                size="sm"
                className="h-8 text-xs bg-white text-zinc-950 hover:bg-zinc-200 font-semibold"
              >
                Terapkan
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
