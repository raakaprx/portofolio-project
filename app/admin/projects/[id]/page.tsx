"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Loader2,
  Plus,
  X,
  Link as LinkIcon,
} from "lucide-react";
import { Github } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { createClient } from "@/lib/supabase/client";
import { DEFAULT_PROJECTS } from "@/lib/portfolio-defaults";
import { getErrorMessage } from "@/lib/utils";
import { toast } from "sonner";

export default function ProjectFormPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.id as string;
  const isNew = projectId === "new";

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);

  // Form states
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [category, setCategory] = useState("fullstack");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [featured, setFeatured] = useState(false);
  const [demoUrl, setDemoUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [metrics, setMetrics] = useState<Array<{ label: string; value: string }>>([
    { label: "Status", value: "Production" },
  ]);

  const supabase = createClient();

  // Helper to generate slug from title
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (isNew) {
      setSlug(generateSlug(val));
    }
  };

  const handleAddTag = () => {
    if (!tagInput.trim()) return;
    if (!tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
    }
    setTagInput("");
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handleAddMetric = () => {
    setMetrics([...metrics, { label: "", value: "" }]);
  };

  const handleMetricChange = (index: number, field: "label" | "value", val: string) => {
    const updated = [...metrics];
    updated[index][field] = val;
    setMetrics(updated);
  };

  const handleRemoveMetric = (index: number) => {
    setMetrics(metrics.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (isNew) return;

    const loadProject = async () => {
      setLoading(true);
      try {
        // Try fetching from Supabase first
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .or(`id.eq.${projectId},slug.eq.${projectId}`)
          .single();

        if (data && !error) {
          setTitle(data.title || "");
          setSlug(data.slug || "");
          setSubtitle(data.subtitle || "");
          setCategory(data.category || "fullstack");
          setDescription(data.description || data.summary || "");
          setTags(data.tags || []);
          setFeatured(Boolean(data.featured));
          setDemoUrl(data.demo_url || "");
          setGithubUrl(data.github_url || "");
          setThumbnailUrl(data.thumbnail_url || "");
          if (Array.isArray(data.metrics) && data.metrics.length > 0) {
            setMetrics(data.metrics);
          }
        } else {
          // Fallback to static default data
          const fallback = DEFAULT_PROJECTS.find(
            (p) => p.id === projectId || p.slug === projectId
          );
          if (fallback) {
            setTitle(fallback.title);
            setSlug(fallback.id);
            setSubtitle(fallback.subtitle);
            setCategory(fallback.category);
            setDescription(fallback.description);
            setTags(fallback.techStack);
            setFeatured(true);
            setDemoUrl(fallback.demo || "");
            setGithubUrl(fallback.github || "");
            setMetrics(fallback.metrics || []);
          }
        }
      } catch {
        toast.error("Gagal mengambil data project");
      } finally {
        setLoading(false);
      }
    };

    loadProject();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId, isNew]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !slug.trim()) {
      toast.error("Judul dan Slug wajib diisi");
      return;
    }

    setSaving(true);
    try {
      const payload: Record<string, any> = {
        title,
        slug,
        subtitle,
        category,
        description,
        summary: description.slice(0, 180),
        tags,
        featured,
        demo_url: demoUrl,
        github_url: githubUrl,
        thumbnail_url: thumbnailUrl,
        metrics: metrics.filter((m) => m.label.trim() && m.value.trim()),
      };

      if (isNew) {
        const { error } = await supabase.from("projects").insert(payload);
        if (error) throw error;
        toast.success("Project baru berhasil ditambahkan!");
      } else {
        const { data, error } = await supabase
          .from("projects")
          .update(payload)
          .or(`id.eq.${projectId},slug.eq.${projectId}`)
          .select();
        if (error) throw error;
        if (!data || data.length === 0) {
          const { error: insertErr } = await supabase.from("projects").insert(payload);
          if (insertErr) throw insertErr;
        }
        toast.success("Project berhasil diperbarui!");
      }

      // Trigger instant revalidation of public landing page
      await fetch("/api/revalidate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: "/" }),
      });

      router.push("/admin/projects");
      router.refresh();
    } catch (err: unknown) {
      toast.error(getErrorMessage(err, "Gagal menyimpan data project"));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center gap-3 text-zinc-400">
        <Loader2 className="w-6 h-6 animate-spin text-purple-400" />
        <span className="text-xs font-mono">Mengambil data project...</span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/projects"
          className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Daftar Project</span>
        </Link>
        <span className="text-xs font-mono text-zinc-500">
          {isNew ? "Mode: Tambah Project Baru" : `Editing: ${slug}`}
        </span>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="p-6 sm:p-8 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-6 shadow-sm"
      >
        <div className="border-b border-zinc-800 pb-4">
          <h2 className="text-lg font-bold font-mono text-white">
            {isNew ? "Tambah Project Baru" : "Edit Detail Project"}
          </h2>
          <p className="text-xs text-zinc-400 mt-1 font-mono">
            Isi informasi project untuk ditampilkan di bagian Showcase Portfolio
          </p>
        </div>

        {/* Title & Slug */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-mono font-medium text-zinc-300">
              Judul Project <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Contoh: Alumni Tracer & Career Network Portal"
              className="w-full bg-zinc-950 border border-zinc-800 focus:border-zinc-500 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-zinc-600 focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono font-medium text-zinc-300">
              URL Slug <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              required
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="alumni-tracer-portal"
              className="w-full bg-zinc-950 border border-zinc-800 focus:border-zinc-500 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-zinc-600 focus:outline-none font-mono"
            />
          </div>
        </div>

        {/* Subtitle & Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-mono font-medium text-zinc-300">
              Subtitle Singkat
            </label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="Contoh: Enterprise Relational Management System"
              className="w-full bg-zinc-950 border border-zinc-800 focus:border-zinc-500 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-zinc-600 focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono font-medium text-zinc-300">
              Kategori Tab
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 focus:border-zinc-500 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none"
            >
              <option value="fullstack">Full-Stack Development</option>
              <option value="machine-learning">Machine Learning & AI</option>
              <option value="laravel">Laravel & PHP Ecosystem</option>
              <option value="all">Umum / Semua</option>
            </select>
          </div>
        </div>

        {/* Thumbnail Image Uploader */}
        <div className="space-y-1.5">
          <label className="text-xs font-mono font-medium text-zinc-300">
            Gambar Thumbnail Project
          </label>
          <ImageUploader
            value={thumbnailUrl}
            onChange={(url) => setThumbnailUrl(url)}
            bucket="portfolio-assets"
            folder="projects"
          />
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <label className="text-xs font-mono font-medium text-zinc-300">
            Deskripsi Lengkap
          </label>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Jelaskan tujuan, permasalahan yang diselesaikan, dan arsitektur sistem dari project ini..."
            className="w-full bg-zinc-950 border border-zinc-800 focus:border-zinc-500 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-zinc-600 focus:outline-none leading-relaxed"
          />
        </div>

        {/* Tags / Tech Stack Chips */}
        <div className="space-y-2">
          <label className="text-xs font-mono font-medium text-zinc-300">
            Teknologi yang Digunakan (Tags)
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddTag();
                }
              }}
              placeholder="Ketik teknologi lalu tekan Enter atau tombol Tambah (contoh: Next.js, PostgreSQL)"
              className="flex-1 bg-zinc-950 border border-zinc-800 focus:border-zinc-500 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-zinc-600 focus:outline-none"
            />
            <Button
              type="button"
              onClick={handleAddTag}
              size="sm"
              className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-mono h-9 px-4"
            >
              Tambah
            </Button>
          </div>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-950 border border-zinc-800 text-xs font-mono text-zinc-200"
              >
                <span>{tag}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="text-zinc-500 hover:text-red-400"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Demo and GitHub Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-mono font-medium text-zinc-300 flex items-center gap-1.5">
              <LinkIcon className="w-3.5 h-3.5 text-blue-400" />
              <span>Live Demo URL (Opsional)</span>
            </label>
            <input
              type="url"
              value={demoUrl}
              onChange={(e) => setDemoUrl(e.target.value)}
              placeholder="https://myproject.com"
              className="w-full bg-zinc-950 border border-zinc-800 focus:border-zinc-500 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-zinc-600 focus:outline-none font-mono"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono font-medium text-zinc-300 flex items-center gap-1.5">
              <Github className="w-3.5 h-3.5 text-zinc-400" />
              <span>GitHub Repository URL</span>
            </label>
            <input
              type="url"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              placeholder="https://github.com/raakaprx/my-repo"
              className="w-full bg-zinc-950 border border-zinc-800 focus:border-zinc-500 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-zinc-600 focus:outline-none font-mono"
            />
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="space-y-2 pt-2 border-t border-zinc-800/80">
          <div className="flex items-center justify-between">
            <label className="text-xs font-mono font-medium text-zinc-300">
              Key Metrics / Indikator Hasil
            </label>
            <button
              type="button"
              onClick={handleAddMetric}
              className="text-xs font-mono text-purple-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Metrik</span>
            </button>
          </div>

          <div className="space-y-2">
            {metrics.map((m, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="text"
                  value={m.label}
                  onChange={(e) => handleMetricChange(idx, "label", e.target.value)}
                  placeholder="Label (contoh: Accuracy)"
                  className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-white placeholder:text-zinc-600 focus:outline-none"
                />
                <input
                  type="text"
                  value={m.value}
                  onChange={(e) => handleMetricChange(idx, "value", e.target.value)}
                  placeholder="Value (contoh: 88.4%)"
                  className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-white placeholder:text-zinc-600 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveMetric(idx)}
                  className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-zinc-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Checkbox */}
        <div className="pt-3 border-t border-zinc-800 flex items-center gap-3">
          <input
            type="checkbox"
            id="featured"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
            className="w-4 h-4 rounded border-zinc-700 bg-zinc-950 text-purple-600 focus:ring-0 cursor-pointer"
          />
          <label htmlFor="featured" className="text-xs font-mono text-zinc-300 cursor-pointer">
            Tandai sebagai <strong>Featured Project</strong> (akan diprioritaskan di baris atas showcase)
          </label>
        </div>

        {/* Form Actions */}
        <div className="pt-4 border-t border-zinc-800 flex items-center justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/projects")}
            className="rounded-xl border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-mono h-10 px-4"
          >
            Batal
          </Button>

          <Button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-white text-zinc-950 hover:bg-zinc-200 text-xs font-mono font-semibold h-10 px-5 gap-2 shadow-sm"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Menyimpan...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Simpan Project</span>
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
