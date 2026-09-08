"use client";

import { useEffect, useState } from "react";
import {
  Layers,
  Plus,
  Trash2,
  Save,
  Loader2,
  RefreshCw,
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
import { DEFAULT_TECH_GROUPS } from "@/lib/portfolio-defaults";
import { getErrorMessage } from "@/lib/utils";
import { getTechLogo } from "@/components/icons";
import { triggerRevalidation } from "@/lib/revalidate";
import { toast } from "sonner";

interface TechRecord {
  id?: string;
  name: string;
  category: string;
  proficiency: "Advanced" | "Proficient";
}

export default function AdminTechStackPage() {
  const [techList, setTechList] = useState<TechRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Frontend Development");
  const [proficiency, setProficiency] = useState<"Advanced" | "Proficient">(
    "Advanced"
  );

  const supabase = createClient();

  const fetchTechStack = async (isManualRefresh = false) => {
    if (isManualRefresh) setLoading(true);
    try {
      const { data, error } = await supabase
        .from("tech_stacks")
        .select("*")
        .order("order_index", { ascending: true });

      if (error || !data || data.length === 0) {
        // Flatten DEFAULT_TECH_GROUPS
        const flattened: TechRecord[] = [];
        DEFAULT_TECH_GROUPS.forEach((grp) => {
          grp.items.forEach((it) => {
            flattened.push({
              name: it.name,
              category: grp.category,
              proficiency: it.proficiency,
            });
          });
        });
        setTechList(flattened);
      } else {
        setTechList(
          data.map((item) => ({
            id: item.id,
            name: item.name,
            category: item.category,
            proficiency: item.proficiency || "Proficient",
          }))
        );
      }
    } catch (err: unknown) {
      toast.error(getErrorMessage(err, "Gagal memuat tech stack"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTechStack();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Nama teknologi wajib diisi");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        name,
        category,
        proficiency,
        created_at: new Date().toISOString(),
      };

      const { error } = await supabase.from("tech_stacks").insert(payload);
      if (error) throw error;

      toast.success(`Teknologi "${name}" berhasil ditambahkan!`);
      await triggerRevalidation("/");
      setName("");
      setDialogOpen(false);
      fetchTechStack();
    } catch (err: unknown) {
      toast.error(getErrorMessage(err, "Gagal menyimpan teknologi"));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id?: string, techName?: string) => {
    if (!id) {
      toast.error("Teknologi default bawaan tidak dapat dihapus dari database lokal");
      return;
    }
    if (!confirm(`Hapus "${techName}" dari Tech Stack?`)) return;

    try {
      const { error } = await supabase.from("tech_stacks").delete().eq("id", id);
      if (error) throw error;
      toast.success(`"${techName}" berhasil dihapus`);
      await triggerRevalidation("/");
      fetchTechStack();
    } catch (err: unknown) {
      toast.error(getErrorMessage(err, "Gagal menghapus teknologi"));
    }
  };

  // Group by category
  const categories = [
    "Frontend Development",
    "Backend & Systems",
    "Databases & Storage",
    "AI / Data Science & Tools",
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold font-mono text-white flex items-center gap-2.5">
            <Layers className="w-5 h-5 text-emerald-400" />
            <span>Manajemen Tech Stack & Keahlian</span>
          </h2>
          <p className="text-xs text-zinc-400 mt-1 font-mono">
            Atur bahasa pemrograman, framework, database, dan tools yang Anda kuasai
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => fetchTechStack(true)}
            variant="outline"
            size="sm"
            className="rounded-xl border-zinc-700 bg-zinc-800 text-zinc-300 hover:text-white text-xs font-mono h-9 gap-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </Button>

          <Button
            onClick={() => setDialogOpen(true)}
            size="sm"
            className="rounded-xl bg-white text-zinc-950 hover:bg-zinc-200 text-xs font-mono font-semibold h-9 gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Teknologi</span>
          </Button>
        </div>
      </div>

      {/* Categories Grid */}
      {loading ? (
        <div className="py-16 flex flex-col items-center justify-center gap-3 text-zinc-400">
          <Loader2 className="w-6 h-6 animate-spin text-emerald-400" />
          <span className="text-xs font-mono">Memuat tech stack...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((cat) => {
            const items = techList.filter((it) => it.category === cat);
            return (
              <div
                key={cat}
                className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4 shadow-sm"
              >
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                  <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-white">
                    {cat}
                  </h3>
                  <span className="text-[11px] font-mono text-zinc-500">
                    {items.length} teknologi
                  </span>
                </div>

                {items.length === 0 ? (
                  <p className="text-xs text-zinc-500 font-mono py-4 text-center">
                    Belum ada item di kategori ini.
                  </p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {items.map((it, idx) => (
                      <div
                        key={it.id || idx}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-mono group"
                      >
                        <span className="shrink-0 flex items-center justify-center">
                          {getTechLogo(it.name, "w-3.5 h-3.5")}
                        </span>
                        <span className="text-zinc-200 font-medium">{it.name}</span>
                        <span
                          className={`text-[9px] px-1.5 py-0.5 rounded ${
                            it.proficiency === "Advanced"
                              ? "bg-emerald-950 text-emerald-400 border border-emerald-800/60"
                              : "bg-blue-950 text-blue-400 border border-blue-800/60"
                          }`}
                        >
                          {it.proficiency}
                        </span>
                        {it.id && (
                          <button
                            onClick={() => handleDelete(it.id, it.name)}
                            className="text-zinc-500 hover:text-red-400 ml-1 cursor-pointer"
                            title="Hapus"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Modal Dialog Form */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md bg-zinc-900 border-zinc-800 text-white p-6">
          <DialogHeader>
            <DialogTitle className="font-mono text-base font-bold">
              Tambah Teknologi Baru
            </DialogTitle>
            <DialogDescription className="text-xs text-zinc-400 font-mono">
              Masukkan nama teknologi, kategori rumpun, dan tingkat kemahiran
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSave} className="space-y-4 mt-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-medium text-zinc-300">
                Nama Teknologi / Alat <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Go, Supabase, Tailwind CSS, Redis"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-zinc-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono font-medium text-zinc-300">
                Kategori Rumpun
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
              >
                <option value="Frontend Development">Frontend Development</option>
                <option value="Backend & Systems">Backend & Systems</option>
                <option value="Databases & Storage">Databases & Storage</option>
                <option value="AI / Data Science & Tools">AI / Data Science & Tools</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono font-medium text-zinc-300">
                Tingkat Kemahiran (Proficiency)
              </label>
              <select
                value={proficiency}
                onChange={(e) =>
                  setProficiency(e.target.value as "Advanced" | "Proficient")
                }
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
              >
                <option value="Advanced">Advanced (Mahir / Berpengalaman Tinggi)</option>
                <option value="Proficient">Proficient (Kompeten / Produktif)</option>
              </select>
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
                <span>Simpan</span>
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
