"use client";

import { useEffect, useState } from "react";
import {
  Briefcase,
  Plus,
  Edit2,
  Trash2,
  Save,
  Loader2,
  RefreshCw,
  Building2,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { createClient } from "@/lib/supabase/client";
import { DEFAULT_EXPERIENCES, type ExperienceItem } from "@/lib/portfolio-defaults";
import { getErrorMessage } from "@/lib/utils";
import { toast } from "sonner";

export default function AdminExperiencesPage() {
  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [duration, setDuration] = useState("");
  const [status, setStatus] = useState<"Active" | "Completed">("Active");
  const [type, setType] = useState<"Industry" | "Internship" | "Organization">("Industry");
  const [isCurrent, setIsCurrent] = useState(true);
  const [highlights, setHighlights] = useState("");
  const [deliverablesText, setDeliverablesText] = useState("");
  const [technologiesText, setTechnologiesText] = useState("");

  const supabase = createClient();

  const fetchExperiences = async (isManualRefresh = false) => {
    if (isManualRefresh) setLoading(true);
    try {
      const { data, error } = await supabase
        .from("experiences")
        .select("*")
        .order("order_index", { ascending: true })
        .order("created_at", { ascending: false });

      if (error || !data || data.length === 0) {
        setExperiences(DEFAULT_EXPERIENCES);
      } else {
        setExperiences(
          data.map((item) => ({
            id: item.id,
            company: item.company,
            role: item.role,
            duration: item.duration,
            status: item.status || "Active",
            type: item.type || "Industry",
            highlights: item.highlights || "",
            deliverables: item.deliverables || [],
            technologies: item.technologies || [],
          }))
        );
      }
    } catch {
      toast.error("Gagal memuat riwayat pengalaman");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openCreateDialog = () => {
    setEditingId(null);
    setCompany("");
    setRole("");
    setDuration("");
    setStatus("Active");
    setType("Industry");
    setIsCurrent(true);
    setHighlights("");
    setDeliverablesText("");
    setTechnologiesText("");
    setDialogOpen(true);
  };

  const openEditDialog = (exp: ExperienceItem) => {
    setEditingId(exp.id || null);
    setCompany(exp.company);
    setRole(exp.role);
    setDuration(exp.duration);
    setStatus(exp.status);
    setType(exp.type);
    setIsCurrent(exp.status === "Active");
    setHighlights(exp.highlights);
    setDeliverablesText(exp.deliverables.join("\n"));
    setTechnologiesText(exp.technologies.join(", "));
    setDialogOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!company.trim() || !role.trim() || !duration.trim()) {
      toast.error("Nama Perusahaan, Posisi, dan Durasi wajib diisi");
      return;
    }

    setSaving(true);
    try {
      const deliverables = deliverablesText
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean);

      const technologies = technologiesText
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const payload: Record<string, any> = {
        company,
        role,
        duration,
        status,
        type,
        is_current: isCurrent,
        start_date: "2024-01-01",
        highlights,
        deliverables,
        technologies,
      };

      if (!editingId) {
        // Create new
        const { error } = await supabase.from("experiences").insert(payload);
        if (error) throw error;
        toast.success("Pengalaman kerja berhasil ditambahkan!");
      } else {
        // Update
        const { data, error } = await supabase
          .from("experiences")
          .update(payload)
          .eq("id", editingId)
          .select();
        if (error) throw error;
        if (!data || data.length === 0) {
          const { error: insertErr } = await supabase.from("experiences").insert(payload);
          if (insertErr) throw insertErr;
        }
        toast.success("Pengalaman kerja berhasil diperbarui!");
      }

      await fetch("/api/revalidate", { method: "POST" });
      setDialogOpen(false);
      fetchExperiences();
    } catch (err: unknown) {
      toast.error(getErrorMessage(err, "Gagal menyimpan pengalaman"));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id?: string, compName?: string) => {
    if (!id) {
      toast.error("Pengalaman default tidak dapat dihapus dari database lokal");
      return;
    }
    if (!confirm(`Hapus pengalaman di "${compName}"?`)) return;

    try {
      const { error } = await supabase.from("experiences").delete().eq("id", id);
      if (error) throw error;
      toast.success("Pengalaman kerja berhasil dihapus");
      fetch("/api/revalidate", { method: "POST" });
      fetchExperiences();
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
            <Briefcase className="w-5 h-5 text-blue-400" />
            <span>Manajemen Riwayat Pengalaman Kerja</span>
          </h2>
          <p className="text-xs text-zinc-400 mt-1 font-mono">
            Kelola perusahaan, peran, periode, dan capaian tanggung jawab teknis
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => fetchExperiences(true)}
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
            <span>Tambah Pengalaman</span>
          </Button>
        </div>
      </div>

      {/* List */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 overflow-hidden shadow-sm">
        {loading ? (
          <div className="py-16 flex flex-col items-center justify-center gap-3 text-zinc-400">
            <Loader2 className="w-6 h-6 animate-spin text-blue-400" />
            <span className="text-xs font-mono">Memuat riwayat kerja...</span>
          </div>
        ) : experiences.length === 0 ? (
          <div className="py-16 text-center text-zinc-500 font-mono text-xs">
            Belum ada riwayat pengalaman.
          </div>
        ) : (
          <div className="divide-y divide-zinc-800/80">
            {experiences.map((exp, idx) => (
              <div
                key={exp.id || idx}
                className="p-5 flex flex-col md:flex-row md:items-start justify-between gap-4 hover:bg-zinc-800/30 transition-colors"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="text-sm font-bold font-mono text-white">
                      {exp.role}
                    </span>
                    <span className="text-zinc-500">•</span>
                    <span className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5 font-mono">
                      <Building2 className="w-3.5 h-3.5 text-zinc-400" />
                      {exp.company}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase ${
                        exp.status === "Active"
                          ? "bg-emerald-950/80 text-emerald-400 border border-emerald-800/60"
                          : "bg-zinc-800 text-zinc-400 border border-zinc-700"
                      }`}
                    >
                      {exp.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{exp.duration}</span>
                    <span>•</span>
                    <span className="text-zinc-500">{exp.type}</span>
                  </div>

                  {exp.highlights && (
                    <p className="text-xs text-zinc-300 leading-relaxed max-w-3xl">
                      {exp.highlights}
                    </p>
                  )}

                  {exp.technologies && exp.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {exp.technologies.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded-md bg-zinc-950 border border-zinc-800 text-[10px] font-mono text-zinc-400"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0 self-end md:self-start">
                  <Button
                    onClick={() => openEditDialog(exp)}
                    size="sm"
                    variant="outline"
                    className="h-8 rounded-xl border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-mono gap-1"
                  >
                    <Edit2 className="w-3 h-3" />
                    <span>Edit</span>
                  </Button>

                  {exp.id && (
                    <Button
                      onClick={() => handleDelete(exp.id, exp.company)}
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
        <DialogContent className="max-w-2xl bg-zinc-900 border-zinc-800 text-white p-6 sm:p-8">
          <DialogHeader>
            <DialogTitle className="font-mono text-base font-bold">
              {editingId ? "Edit Pengalaman Kerja" : "Tambah Pengalaman Baru"}
            </DialogTitle>
            <DialogDescription className="text-xs text-zinc-400 font-mono">
              Kelola entri pekerjaan profesional untuk ditampilkan di timeline karir
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSave} className="space-y-4 mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-medium text-zinc-300">
                  Nama Perusahaan / Organisasi <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="PT Maxxima Innovative Engineering"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-zinc-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono font-medium text-zinc-300">
                  Posisi / Jabatan <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="Web Developer"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-zinc-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-medium text-zinc-300">
                  Periode Durasi <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="2026 – Sekarang"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-zinc-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono font-medium text-zinc-300">
                  Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as "Active" | "Completed")}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                >
                  <option value="Active">Active (Masih Bekerja)</option>
                  <option value="Completed">Completed (Selesai)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono font-medium text-zinc-300">
                  Tipe Pengalaman
                </label>
                <select
                  value={type}
                  onChange={(e) =>
                    setType(e.target.value as "Industry" | "Internship" | "Organization")
                  }
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                >
                  <option value="Industry">Industry</option>
                  <option value="Internship">Internship / Magang</option>
                  <option value="Organization">Organization</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono font-medium text-zinc-300">
                Deskripsi Singkat / Highlights
              </label>
              <textarea
                rows={2}
                value={highlights}
                onChange={(e) => setHighlights(e.target.value)}
                placeholder="Rangkuman peran, kontribusi sistem, dan teknologi yang difokuskan..."
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-zinc-500 leading-relaxed"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono font-medium text-zinc-300">
                Deliverables / Poin Tanggung Jawab (Pisahkan per baris baru)
              </label>
              <textarea
                rows={3}
                value={deliverablesText}
                onChange={(e) => setDeliverablesText(e.target.value)}
                placeholder="Membangun sistem web performa tinggi menggunakan Next.js...&#10;Melakukan optimasi query database PostgreSQL..."
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-zinc-500 font-mono text-[11px]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono font-medium text-zinc-300">
                Teknologi yang Dipakai (Pisahkan dengan koma)
              </label>
              <input
                type="text"
                value={technologiesText}
                onChange={(e) => setTechnologiesText(e.target.value)}
                placeholder="Next.js, TypeScript, PostgreSQL, Docker"
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
                <span>Simpan Pengalaman</span>
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
