"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FolderGit2,
  Plus,
  Edit2,
  Trash2,
  Star,
  ExternalLink,
  Loader2,
  RefreshCw,
  Search,
} from "lucide-react";
import { Github } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { DEFAULT_PROJECTS } from "@/lib/portfolio-defaults";
import { toast } from "sonner";

interface ProjectRecord {
  id: string;
  title: string;
  slug: string;
  subtitle?: string;
  role?: string;
  short_summary?: string;
  category?: string;
  tags?: string[];
  tech_stacks?: string[];
  featured?: boolean;
  is_featured?: boolean;
  demo_url?: string;
  github_url?: string;
  thumbnail_url?: string;
  order_index?: number;
  display_order?: number;
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const supabase = createClient();

  const fetchProjects = async (isManualRefresh = false) => {
    if (isManualRefresh) setLoading(true);
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("order_index", { ascending: true })
        .order("created_at", { ascending: false });

      if (error || !data || data.length === 0) {
        // Map default projects as initial view
        const fallbackList: ProjectRecord[] = DEFAULT_PROJECTS.map((p, idx) => ({
          id: p.id,
          title: p.title,
          slug: p.slug || p.id,
          subtitle: p.subtitle || p.role,
          role: p.role,
          category: p.category || "fullstack",
          tags: p.tech_stacks || p.techStack || [],
          featured: p.is_featured ?? true,
          demo_url: p.live_url || p.demo,
          github_url: p.repo_url || p.github,
          order_index: p.display_order ?? idx + 1,
        }));
        setProjects(fallbackList);
      } else {
        setProjects(data);
      }
    } catch {
      toast.error("Gagal memuat daftar project");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleToggleFeatured = async (p: ProjectRecord) => {
    const updatedStatus = !p.featured;
    try {
      const { error } = await supabase
        .from("projects")
        .update({ featured: updatedStatus })
        .eq("id", p.id);

      if (error) throw error;

      setProjects((prev) =>
        prev.map((item) =>
          item.id === p.id ? { ...item, featured: updatedStatus } : item
        )
      );
      toast.success(
        updatedStatus ? "Project ditandai Featured" : "Status Featured dicabut"
      );
      fetch("/api/revalidate", { method: "POST" });
    } catch {
      toast.error("Gagal mengubah status featured");
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Hapus project "${title}" secara permanen?`)) return;

    setDeletingId(id);
    try {
      const { error } = await supabase.from("projects").delete().eq("id", id);
      if (error) throw error;

      setProjects((prev) => prev.filter((item) => item.id !== id));
      toast.success(`Project "${title}" berhasil dihapus`);
      fetch("/api/revalidate", { method: "POST" });
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Gagal menghapus project");
    } finally {
      setDeletingId(null);
    }
  };

  const filtered = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.role && p.role.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (p.category && p.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (p.tags && p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))) ||
      (p.tech_stacks && p.tech_stacks.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  return (
    <div className="space-y-6">
      {/* Header and Add Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold font-mono text-white flex items-center gap-2.5">
            <FolderGit2 className="w-5 h-5 text-purple-400" />
            <span>Manajemen Project Portfolio</span>
          </h2>
          <p className="text-xs text-zinc-400 mt-1 font-mono">
            Kelola karya, repositori, tautan live demo, dan status unggulan (*featured*)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => fetchProjects(true)}
            variant="outline"
            size="sm"
            className="rounded-xl border-zinc-700 bg-zinc-800 text-zinc-300 hover:text-white text-xs font-mono h-9 gap-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </Button>

          <Button
            asChild
            size="sm"
            className="rounded-xl bg-white text-zinc-950 hover:bg-zinc-200 text-xs font-mono font-semibold h-9 gap-1.5"
          >
            <Link href="/admin/projects/new">
              <Plus className="w-4 h-4" />
              <span>Tambah Project</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Search Filter */}
      <div className="relative flex items-center max-w-md">
        <Search className="w-4 h-4 text-zinc-500 absolute left-3.5" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari judul project, kategori, atau tag teknologi..."
          className="w-full bg-zinc-900 border border-zinc-800 focus:border-zinc-500 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder:text-zinc-500 focus:outline-none"
        />
      </div>

      {/* Project Table / Cards */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 overflow-hidden shadow-sm">
        {loading ? (
          <div className="py-16 flex flex-col items-center justify-center gap-3 text-zinc-400">
            <Loader2 className="w-6 h-6 animate-spin text-purple-400" />
            <span className="text-xs font-mono">Memuat daftar project...</span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-zinc-500 font-mono text-xs">
            Tidak ada project yang ditemukan.
          </div>
        ) : (
          <div className="divide-y divide-zinc-800/80">
            {filtered.map((p) => (
              <div
                key={p.id}
                className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-zinc-800/30 transition-colors"
              >
                <div className="space-y-1.5 min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-bold text-white font-mono">
                      {p.title}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-medium uppercase tracking-wider bg-zinc-800 text-zinc-300 border border-zinc-700">
                      {p.category}
                    </span>
                    {p.featured && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-amber-950/80 text-amber-300 border border-amber-700/60 flex items-center gap-1">
                        <Star className="w-3 h-3 fill-amber-300" />
                        <span>Featured</span>
                      </span>
                    )}
                  </div>

                  {p.subtitle && (
                    <p className="text-xs text-zinc-400 line-clamp-1">
                      {p.subtitle}
                    </p>
                  )}

                  {p.tags && p.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {p.tags.slice(0, 5).map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded-md bg-zinc-950 border border-zinc-800 text-[10px] font-mono text-zinc-400"
                        >
                          {t}
                        </span>
                      ))}
                      {p.tags.length > 5 && (
                        <span className="text-[10px] text-zinc-500 font-mono self-center">
                          +{p.tags.length - 5} lainnya
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Actions & Links */}
                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  {p.demo_url && (
                    <a
                      href={p.demo_url}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-xl bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors"
                      title="Buka Demo"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {p.github_url && (
                    <a
                      href={p.github_url}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-xl bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors"
                      title="Buka GitHub"
                    >
                      <Github className="w-3.5 h-3.5" />
                    </a>
                  )}

                  <button
                    onClick={() => handleToggleFeatured(p)}
                    className={`p-2 rounded-xl transition-colors cursor-pointer ${
                      p.featured
                        ? "bg-amber-950/60 text-amber-300 border border-amber-800/60"
                        : "bg-zinc-800 text-zinc-500 hover:text-amber-400 hover:bg-zinc-700"
                    }`}
                    title={p.featured ? "Hapus dari Featured" : "Tandai Featured"}
                  >
                    <Star className="w-3.5 h-3.5" />
                  </button>

                  <Button
                    asChild
                    size="sm"
                    variant="outline"
                    className="h-8 rounded-xl border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-xs font-mono gap-1"
                  >
                    <Link href={`/projects/${p.slug || p.id}`} target="_blank" title="Lihat Halaman Publik">
                      <ExternalLink className="w-3 h-3 text-blue-400" />
                      <span className="hidden sm:inline">Preview</span>
                    </Link>
                  </Button>

                  <Button
                    asChild
                    size="sm"
                    variant="outline"
                    className="h-8 rounded-xl border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-mono gap-1"
                  >
                    <Link href={`/admin/projects/${p.id}`}>
                      <Edit2 className="w-3 h-3" />
                      <span>Edit</span>
                    </Link>
                  </Button>

                  <Button
                    onClick={() => handleDelete(p.id, p.title)}
                    disabled={deletingId === p.id}
                    size="sm"
                    variant="outline"
                    className="h-8 rounded-xl border-red-900/60 bg-red-950/30 hover:bg-red-900/50 text-red-300 text-xs font-mono"
                    title="Hapus"
                  >
                    {deletingId === p.id ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : (
                      <Trash2 className="w-3 h-3" />
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
