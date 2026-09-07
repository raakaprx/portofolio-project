"use client";

import { useEffect, useState } from "react";
import {
  Award,
  Plus,
  Edit2,
  Trash2,
  Save,
  Loader2,
  RefreshCw,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { createClient } from "@/lib/supabase/client";
import { DEFAULT_CERTIFICATES, type CertificateItem } from "@/lib/portfolio-defaults";
import { getErrorMessage } from "@/lib/utils";
import { toast } from "sonner";

export default function AdminCertificatesPage() {
  const [certificates, setCertificates] = useState<CertificateItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [issuer, setIssuer] = useState("");
  const [date, setDate] = useState("");
  const [credentialId, setCredentialId] = useState("");
  const [credentialUrl, setCredentialUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [skillsText, setSkillsText] = useState("");

  const supabase = createClient();

  const fetchCertificates = async (isManualRefresh = false) => {
    if (isManualRefresh) setLoading(true);
    try {
      const { data, error } = await supabase
        .from("certificates")
        .select("*")
        .order("order_index", { ascending: true })
        .order("created_at", { ascending: false });

      if (error || !data || data.length === 0) {
        setCertificates(DEFAULT_CERTIFICATES);
      } else {
        setCertificates(
          data.map((c) => ({
            id: c.id,
            title: c.title,
            issuer: c.issuer,
            date: c.date,
            credentialId: c.credential_id || "",
            credentialUrl: c.credential_url || "",
            imageUrl: c.image_url || undefined,
            skillsVerified: c.skills_verified || [],
          }))
        );
      }
    } catch {
      toast.error("Gagal memuat sertifikat");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openCreateDialog = () => {
    setEditingId(null);
    setTitle("");
    setIssuer("");
    setDate("");
    setCredentialId("");
    setCredentialUrl("");
    setImageUrl("");
    setSkillsText("");
    setDialogOpen(true);
  };

  const openEditDialog = (c: CertificateItem) => {
    setEditingId(c.id || null);
    setTitle(c.title);
    setIssuer(c.issuer);
    setDate(c.date);
    setCredentialId(c.credentialId || "");
    setCredentialUrl(c.credentialUrl);
    setImageUrl(c.imageUrl || "");
    setSkillsText(c.skillsVerified.join(", "));
    setDialogOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !issuer.trim()) {
      toast.error("Nama Sertifikat dan Penerbit wajib diisi");
      return;
    }

    setSaving(true);
    try {
      const skillsVerified = skillsText
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const payload = {
        title,
        issuer,
        date,
        credential_id: credentialId,
        credential_url: credentialUrl,
        image_url: imageUrl,
        skills_verified: skillsVerified,
        updated_at: new Date().toISOString(),
      };

      if (!editingId) {
        const { error } = await supabase.from("certificates").insert(payload);
        if (error) throw error;
        toast.success("Sertifikat berhasil ditambahkan!");
      } else {
        const { error } = await supabase
          .from("certificates")
          .update(payload)
          .eq("id", editingId);
        if (error) throw error;
        toast.success("Sertifikat berhasil diperbarui!");
      }

      await fetch("/api/revalidate", { method: "POST" });
      setDialogOpen(false);
      fetchCertificates();
    } catch (err: unknown) {
      toast.error(getErrorMessage(err, "Gagal menyimpan sertifikat"));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id?: string, certTitle?: string) => {
    if (!id) {
      toast.error("Sertifikat default tidak dapat dihapus dari database lokal");
      return;
    }
    if (!confirm(`Hapus sertifikat "${certTitle}"?`)) return;

    try {
      const { error } = await supabase
        .from("certificates")
        .delete()
        .eq("id", id);
      if (error) throw error;
      toast.success("Sertifikat berhasil dihapus");
      fetch("/api/revalidate", { method: "POST" });
      fetchCertificates();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Gagal menghapus");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold font-mono text-white flex items-center gap-2.5">
            <Award className="w-5 h-5 text-amber-400" />
            <span>Manajemen Sertifikat & Kredensial</span>
          </h2>
          <p className="text-xs text-zinc-400 mt-1 font-mono">
            Kelola sertifikasi kompetensi, lisensi resmi, dan tautan verifikasi
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => fetchCertificates(true)}
            variant="outline"
            size="sm"
            className="rounded-xl border-zinc-700 bg-zinc-800 text-zinc-300 hover:text-white text-xs font-mono h-9 gap-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </Button>

          <Button
            onClick={openCreateDialog}
            size="sm"
            className="rounded-xl bg-white text-zinc-950 hover:bg-zinc-200 text-xs font-mono font-semibold h-9 gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Sertifikat</span>
          </Button>
        </div>
      </div>

      {/* List */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 overflow-hidden shadow-sm">
        {loading ? (
          <div className="py-16 flex flex-col items-center justify-center gap-3 text-zinc-400">
            <Loader2 className="w-6 h-6 animate-spin text-amber-400" />
            <span className="text-xs font-mono">Memuat sertifikat...</span>
          </div>
        ) : certificates.length === 0 ? (
          <div className="py-16 text-center text-zinc-500 font-mono text-xs">
            Belum ada sertifikat terdaftar.
          </div>
        ) : (
          <div className="divide-y divide-zinc-800/80">
            {certificates.map((c, idx) => (
              <div
                key={c.id || idx}
                className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-zinc-800/30 transition-colors"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-bold font-mono text-white">
                      {c.title}
                    </span>
                    {c.credentialId && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-zinc-800 text-zinc-400 border border-zinc-700">
                        {c.credentialId}
                      </span>
                    )}
                  </div>

                  <p className="text-xs font-mono text-zinc-400">
                    Penerbit: <strong className="text-zinc-300">{c.issuer}</strong> • {c.date}
                  </p>

                  {c.skillsVerified && c.skillsVerified.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {c.skillsVerified.map((s) => (
                        <span
                          key={s}
                          className="px-2 py-0.5 rounded-md bg-zinc-950 border border-zinc-800 text-[10px] font-mono text-zinc-400"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  {c.credentialUrl && (
                    <a
                      href={c.credentialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-xl bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors"
                      title="Buka Verifikasi"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}

                  <Button
                    onClick={() => openEditDialog(c)}
                    size="sm"
                    variant="outline"
                    className="h-8 rounded-xl border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-mono gap-1"
                  >
                    <Edit2 className="w-3 h-3" />
                    <span>Edit</span>
                  </Button>

                  {c.id && (
                    <Button
                      onClick={() => handleDelete(c.id, c.title)}
                      size="sm"
                      variant="outline"
                      className="h-8 rounded-xl border-red-900/60 bg-red-950/30 hover:bg-red-900/50 text-red-300 text-xs font-mono"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal Dialog Form */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-xl bg-zinc-900 border-zinc-800 text-white p-6 sm:p-8">
          <DialogHeader>
            <DialogTitle className="font-mono text-base font-bold">
              {editingId ? "Edit Sertifikat" : "Tambah Sertifikat Baru"}
            </DialogTitle>
            <DialogDescription className="text-xs text-zinc-400 font-mono">
              Kelola kredensial profesional dan lisensi kompetensi Anda
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSave} className="space-y-4 mt-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-medium text-zinc-300">
                Nama Sertifikat <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Sertifikat Kompetensi Pengembang Web (CWDev)"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-zinc-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-medium text-zinc-300">
                  Lembaga Penerbit <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={issuer}
                  onChange={(e) => setIssuer(e.target.value)}
                  placeholder="BNSP / Dicoding / AWS"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-zinc-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono font-medium text-zinc-300">
                  Tanggal Terbit
                </label>
                <input
                  type="text"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  placeholder="Jun 2026"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-zinc-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-medium text-zinc-300">
                  Credential ID (Opsional)
                </label>
                <input
                  type="text"
                  value={credentialId}
                  onChange={(e) => setCredentialId(e.target.value)}
                  placeholder="BNSP-CWDEV-62026"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-zinc-500 font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono font-medium text-zinc-300">
                  Tautan Verifikasi (Credential URL)
                </label>
                <input
                  type="url"
                  value={credentialUrl}
                  onChange={(e) => setCredentialUrl(e.target.value)}
                  placeholder="https://bnsp.go.id"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-zinc-500 font-mono"
                />
              </div>
            </div>

            {/* Certificate Image Upload */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-medium text-zinc-300">
                Upload File / Gambar Sertifikat (Opsional)
              </label>
              <ImageUploader
                value={imageUrl}
                onChange={(url) => setImageUrl(url)}
                bucket="portfolio-assets"
                folder="certificates"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono font-medium text-zinc-300">
                Keahlian yang Diverifikasi (Pisahkan dengan koma)
              </label>
              <input
                type="text"
                value={skillsText}
                onChange={(e) => setSkillsText(e.target.value)}
                placeholder="Web Development, Software Engineering, REST APIs"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-zinc-500"
              />
            </div>

            <div className="pt-4 border-t border-zinc-800 flex items-center justify-end gap-2.5">
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
                className="rounded-xl border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-mono h-9"
              >
                Batal
              </Button>
              <Button
                type="submit"
                disabled={saving}
                className="rounded-xl bg-white text-zinc-950 hover:bg-zinc-200 text-xs font-mono font-semibold h-9 gap-1.5"
              >
                {saving ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Save className="w-3.5 h-3.5" />
                )}
                <span>Simpan Sertifikat</span>
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
