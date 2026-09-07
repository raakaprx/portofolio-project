"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Loader2,
  Plus,
  Trash2,
  Image as ImageIcon,
  Link as LinkIcon,
  Sparkles,
  ExternalLink,
  Eye,
  Edit3,
} from "lucide-react";
import { Github } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { MarkdownView } from "@/components/ui/markdown-view";
import { createClient } from "@/lib/supabase/client";
import { DEFAULT_PROJECTS } from "@/lib/portfolio-defaults";
import { getErrorMessage } from "@/lib/utils";
import { toast } from "sonner";

const COMMON_TECH_STACKS = [
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Tailwind CSS",
  "Node.js",
  "Express",
  "PHP",
  "Laravel",
  "PostgreSQL",
  "MySQL",
  "Supabase",
  "Prisma ORM",
  "Docker",
  "Python",
  "Scikit-Learn",
  "Pandas",
  "Git",
  "Midtrans Payment Gateway",
  "Socket.IO",
  "Redis",
];

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
  const [role, setRole] = useState("Full-stack Developer");
  const [category, setCategory] = useState("fullstack");
  const [shortSummary, setShortSummary] = useState("");
  const [fullDescription, setFullDescription] = useState("");
  const [markdownTab, setMarkdownTab] = useState<"edit" | "preview">("edit");

  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [galleryUrls, setGalleryUrls] = useState<string[]>([]);
  const [newGalleryInput, setNewGalleryInput] = useState("");

  const [techStacks, setTechStacks] = useState<string[]>([]);
  const [techInput, setTechInput] = useState("");

  const [liveUrl, setLiveUrl] = useState("");
  const [repoUrl, setRepoUrl] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [displayOrder, setDisplayOrder] = useState(1);

  const supabase = createClient();

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

  const handleAddTech = (tech: string) => {
    const trimmed = tech.trim();
    if (!trimmed) return;
    if (!techStacks.includes(trimmed)) {
      setTechStacks([...techStacks, trimmed]);
    }
    setTechInput("");
  };

  const handleRemoveTech = (techToRemove: string) => {
    setTechStacks(techStacks.filter((t) => t !== techToRemove));
  };

  const handleAddGalleryUrl = () => {
    if (!newGalleryInput.trim()) return;
    setGalleryUrls([...galleryUrls, newGalleryInput.trim()]);
    setNewGalleryInput("");
    toast.success("Gambar galeri ditambahkan!");
  };

  const handleRemoveGalleryUrl = (index: number) => {
    setGalleryUrls(galleryUrls.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (isNew) return;

    const loadProject = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .or(`id.eq.${projectId},slug.eq.${projectId}`)
          .single();

        if (data && !error) {
          setTitle(data.title || "");
          setSlug(data.slug || "");
          setRole(data.role || data.subtitle || "Full-stack Developer");
          setCategory(data.category || "fullstack");
          setShortSummary(data.short_summary || data.summary || (data.description ? data.description.slice(0, 180) : ""));
          setFullDescription(data.full_description || data.description || "");
          setThumbnailUrl(data.thumbnail_url || data.image_url || "");
          setGalleryUrls(Array.isArray(data.gallery_urls) ? data.gallery_urls : []);
          setTechStacks(
            Array.isArray(data.tech_stacks) && data.tech_stacks.length > 0
              ? data.tech_stacks
              : (Array.isArray(data.tags) ? data.tags : [])
          );
          setLiveUrl(data.live_url || data.demo_url || "");
          setRepoUrl(data.repo_url || data.github_url || "");
          setIsFeatured(Boolean(data.is_featured ?? data.featured));
          setDisplayOrder(Number(data.display_order ?? data.order_index ?? 1));
        } else {
          // Fallback to static data
          const fallback = DEFAULT_PROJECTS.find(
            (p) => p.id === projectId || p.slug === projectId
          );
          if (fallback) {
            setTitle(fallback.title);
            setSlug(fallback.slug || fallback.id);
            setRole(fallback.role);
            setCategory(fallback.category || "fullstack");
            setShortSummary(fallback.short_summary);
            setFullDescription(fallback.full_description);
            setThumbnailUrl(fallback.thumbnail_url);
            setGalleryUrls(fallback.gallery_urls || []);
            setTechStacks(fallback.tech_stacks || fallback.techStack || []);
            setLiveUrl(fallback.live_url || fallback.demo || "");
            setRepoUrl(fallback.repo_url || fallback.github || "");
            setIsFeatured(fallback.is_featured);
            setDisplayOrder(fallback.display_order);
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
    if (!shortSummary.trim()) {
      toast.error("Ringkasan Singkat (Short Summary) wajib diisi");
      return;
    }

    setSaving(true);
    try {
      const fullPayload: Record<string, any> = {
        title: title.trim(),
        slug: slug.trim(),
        role: role.trim(),
        short_summary: shortSummary.trim(),
        full_description: fullDescription.trim(),
        thumbnail_url: thumbnailUrl.trim(),
        gallery_urls: galleryUrls,
        tech_stacks: techStacks,
        live_url: liveUrl.trim(),
        repo_url: repoUrl.trim(),
        is_featured: isFeatured,
        display_order: Number(displayOrder),

        // Dual-field compatibility with existing database columns
        summary: shortSummary.trim(),
        description: fullDescription.trim() || shortSummary.trim(),
        subtitle: role.trim(),
        category,
        tags: techStacks,
        demo_url: liveUrl.trim(),
        github_url: repoUrl.trim(),
        featured: isFeatured,
        order_index: Number(displayOrder),
      };

      const fallbackPayload: Record<string, any> = {
        title: title.trim(),
        slug: slug.trim(),
        summary: shortSummary.trim(),
        description: fullDescription.trim() || shortSummary.trim(),
        subtitle: role.trim(),
        category,
        tags: techStacks,
        demo_url: liveUrl.trim(),
        github_url: repoUrl.trim(),
        thumbnail_url: thumbnailUrl.trim(),
        featured: isFeatured,
        order_index: Number(displayOrder),
      };

      const executeSave = async (payloadToUse: Record<string, any>) => {
        if (isNew) {
          const { error } = await supabase.from("projects").insert(payloadToUse);
          if (error) throw error;
          toast.success("Project baru berhasil ditambahkan!");
        } else {
          const { data, error } = await supabase
            .from("projects")
            .update(payloadToUse)
            .or(`id.eq.${projectId},slug.eq.${projectId}`)
            .select();
          if (error) throw error;
          if (!data || data.length === 0) {
            const { error: insertErr } = await supabase.from("projects").insert(payloadToUse);
            if (insertErr) throw insertErr;
          }
          toast.success("Project berhasil diperbarui!");
        }
      };

      try {
        await executeSave(fullPayload);
      } catch (saveErr: any) {
        if (
          saveErr?.message?.toLowerCase().includes("column") ||
          saveErr?.message?.toLowerCase().includes("schema cache")
        ) {
          await executeSave(fallbackPayload);
        } else {
          throw saveErr;
        }
      }

      // Revalidate public landing page and project page
      try {
        await fetch("/api/revalidate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ path: "/" }),
        });
      } catch {
        // ignore
      }

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
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/projects"
          className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Daftar Project</span>
        </Link>
        <div className="flex items-center gap-2">
          {!isNew && slug && (
            <Link
              href={`/projects/${slug}`}
              target="_blank"
              className="inline-flex items-center gap-1 text-xs font-mono text-blue-400 hover:underline"
            >
              <span>Lihat Halaman Publik</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          )}
          <span className="text-xs font-mono text-zinc-500">
            {isNew ? "Mode: Tambah Project Baru" : `Editing: ${slug}`}
          </span>
        </div>
      </div>

      {/* Form Container */}
      <form
        onSubmit={handleSubmit}
        className="p-6 sm:p-8 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-8 shadow-sm"
      >
        {/* SECTION 1: Identitas Utama */}
        <div className="space-y-4">
          <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider pb-2 border-b border-zinc-800 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <span>Informasi Pokok Proyek</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-mono font-medium text-zinc-300">
                Judul Proyek <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Contoh: Smart Material Management System (SMMS)"
                required
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 font-sans"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono font-medium text-zinc-300">
                URL Slug <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(generateSlug(e.target.value))}
                placeholder="smart-material-management-system"
                required
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-300 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 font-mono"
              />
              <p className="text-[11px] text-zinc-500 font-mono">
                Akan diakses melalui /projects/{slug || "slug-anda"}
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono font-medium text-zinc-300">
                Peran / Role <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Contoh: Lead Full-Stack Developer"
                required
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500"
              />
            </div>
          </div>
        </div>

        {/* SECTION 2: Ringkasan Singkat (Short Summary) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-mono font-medium text-zinc-300">
              Ringkasan Singkat (Short Summary) <span className="text-red-400">*</span>
            </label>
            <span
              className={`text-xs font-mono ${
                shortSummary.length > 200
                  ? "text-red-400 font-bold"
                  : shortSummary.length >= 150
                  ? "text-emerald-400 font-medium"
                  : "text-zinc-500"
              }`}
            >
              {shortSummary.length} / 200 karakter (Rekomendasi: 150–200)
            </span>
          </div>
          <textarea
            rows={3}
            value={shortSummary}
            onChange={(e) => setShortSummary(e.target.value)}
            placeholder="Tulis ringkasan 1-2 kalimat padat yang menjelaskan nilai inti dan arsitektur proyek untuk kartu showcase..."
            required
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 leading-relaxed font-sans"
          />
          <p className="text-[11px] text-zinc-500 font-mono">
            Ditampilkan di Landing Page Card Grid & Modal Quick Preview.
          </p>
        </div>

        {/* SECTION 3: Deskripsi Lengkap (Markdown Editor & Live Preview) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
            <div>
              <label className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                Deskripsi Lengkap Proyek (Markdown / Rich-Text)
              </label>
              <p className="text-[11px] text-zinc-400 font-mono mt-0.5">
                Mendukung sintaks Markdown: ## Heading, **Bold**, - List, dan ```code
              </p>
            </div>

            <div className="flex items-center gap-1 bg-zinc-950 p-1 rounded-xl border border-zinc-800">
              <button
                type="button"
                onClick={() => setMarkdownTab("edit")}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors cursor-pointer flex items-center gap-1.5 ${
                  markdownTab === "edit"
                    ? "bg-zinc-800 text-white font-semibold"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
              <button
                type="button"
                onClick={() => setMarkdownTab("preview")}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors cursor-pointer flex items-center gap-1.5 ${
                  markdownTab === "preview"
                    ? "bg-zinc-800 text-white font-semibold"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Live Preview</span>
              </button>
            </div>
          </div>

          {markdownTab === "edit" ? (
            <div className="space-y-2">
              <textarea
                rows={12}
                value={fullDescription}
                onChange={(e) => setFullDescription(e.target.value)}
                placeholder="## Ringkasan Proyek&#10;Jelaskan gambaran umum proyek...&#10;&#10;## Masalah & Solusi&#10;- Permasalahan yang dihadapi...&#10;- Solusi rekayasa perangkat lunak...&#10;&#10;## Fitur Utama & Arsitektur&#10;Detail modul teknis..."
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-xs sm:text-sm font-mono text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 leading-relaxed"
              />
              <div className="flex flex-wrap gap-2 text-[11px] font-mono text-zinc-500">
                <span>Tips Cepat:</span>
                <code className="text-zinc-400">## Judul Bagian</code>
                <code className="text-zinc-400">**Teks Tebal**</code>
                <code className="text-zinc-400">- Butir Daftar</code>
                <code className="text-zinc-400">```typescript ... ```</code>
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-xl bg-zinc-950 border border-zinc-800 min-h-[250px]">
              {fullDescription ? (
                <MarkdownView content={fullDescription} />
              ) : (
                <p className="text-xs font-mono text-zinc-500 italic">
                  Belum ada konten deskripsi untuk dipratinjau.
                </p>
              )}
            </div>
          )}
        </div>

        {/* SECTION 4: Thumbnail & Multi-Image Gallery */}
        <div className="space-y-6 pt-4 border-t border-zinc-800">
          <div>
            <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-emerald-400" />
              <span>Media Gambar (Thumbnail & Galeri)</span>
            </h3>
            <p className="text-xs text-zinc-400 font-mono mt-1">
              Upload gambar atau tempelkan tautan URL gambar resolusi tinggi
            </p>
          </div>

          {/* Thumbnail Utama */}
          <div className="space-y-2">
            <label className="text-xs font-mono font-medium text-zinc-300">
              Gambar Thumbnail Utama <span className="text-red-400">*</span>
            </label>
            <ImageUploader
              value={thumbnailUrl}
              onChange={setThumbnailUrl}
              folder="projects"
            />
          </div>

          {/* Galeri Gambar Pendukung (Multiple Images) */}
          <div className="space-y-3 pt-3">
            <label className="text-xs font-mono font-medium text-zinc-300">
              Galeri Gambar Pendukung (Multiple Gallery Images)
            </label>

            <div className="flex items-center gap-2">
              <input
                type="url"
                value={newGalleryInput}
                onChange={(e) => setNewGalleryInput(e.target.value)}
                placeholder="https://example.com/screenshot-2.png"
                className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2 text-xs text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 font-mono"
              />
              <Button
                type="button"
                onClick={handleAddGalleryUrl}
                size="sm"
                className="rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-mono h-9 gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Foto</span>
              </Button>
            </div>

            {/* Gallery Preview List */}
            {galleryUrls.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                {galleryUrls.map((url, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-video rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950 group"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={url}
                      alt={`Gallery ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveGalleryUrl(idx)}
                      className="absolute top-1.5 right-1.5 p-1 rounded-full bg-black/80 hover:bg-red-600 text-white transition-colors"
                      title="Hapus foto ini"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* SECTION 5: Tech Stacks (Multi-select / Tag Input) */}
        <div className="space-y-4 pt-4 border-t border-zinc-800">
          <div>
            <label className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Teknologi & Tools (Tech Stacks) <span className="text-red-400">*</span>
            </label>
            <p className="text-xs text-zinc-400 font-mono mt-0.5">
              Klik pill di bawah untuk menambah cepat, atau ketik nama tools manual
            </p>
          </div>

          {/* Quick-add Pills */}
          <div className="flex flex-wrap gap-1.5">
            {COMMON_TECH_STACKS.map((tech) => {
              const selected = techStacks.includes(tech);
              return (
                <button
                  key={tech}
                  type="button"
                  onClick={() =>
                    selected ? handleRemoveTech(tech) : handleAddTech(tech)
                  }
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-colors cursor-pointer border ${
                    selected
                      ? "bg-blue-600 text-white border-blue-500 font-semibold"
                      : "bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700"
                  }`}
                >
                  {selected ? "✓ " : "+ "}
                  {tech}
                </button>
              );
            })}
          </div>

          {/* Manual Input */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddTech(techInput);
                }
              }}
              placeholder="Ketik teknologi kustom lalu tekan Enter..."
              className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2 text-xs text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 font-mono"
            />
            <Button
              type="button"
              onClick={() => handleAddTech(techInput)}
              size="sm"
              className="rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-mono h-9 gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah</span>
            </Button>
          </div>

          {/* Selected Tags Display */}
          <div className="flex flex-wrap gap-2 pt-1">
            {techStacks.map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-zinc-800 border border-zinc-700 text-xs font-mono text-zinc-200"
              >
                <span>{t}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveTech(t)}
                  className="hover:text-red-400 text-zinc-400 transition-colors"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* SECTION 6: Tautan Eksternal & Urutan Tampilan */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-zinc-800">
          <div className="space-y-1.5">
            <label className="text-xs font-mono font-medium text-zinc-300">
              Live Demo URL
            </label>
            <input
              type="url"
              value={liveUrl}
              onChange={(e) => setLiveUrl(e.target.value)}
              placeholder="https://myproject.com"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 font-mono"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono font-medium text-zinc-300">
              Repository URL (GitHub)
            </label>
            <input
              type="url"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              placeholder="https://github.com/raakaprx/my-repo"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 font-mono"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono font-medium text-zinc-300">
              Urutan Tampilan (Display Order)
            </label>
            <input
              type="number"
              min={1}
              value={displayOrder}
              onChange={(e) => setDisplayOrder(Number(e.target.value))}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 font-mono"
            />
          </div>

          {/* Toggle Featured */}
          <div className="flex items-center gap-3 pt-6">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              <span className="ml-3 text-xs font-mono font-medium text-zinc-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Jadikan Proyek Unggulan (Featured)</span>
              </span>
            </label>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="pt-6 border-t border-zinc-800 flex items-center justify-end gap-3">
          <Link
            href="/admin/projects"
            className="px-5 py-2.5 rounded-xl border border-zinc-800 bg-zinc-950 text-xs font-mono text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors"
          >
            Batal
          </Link>

          <Button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-white text-zinc-950 hover:bg-zinc-200 text-xs font-mono font-semibold h-10 px-6 gap-2"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Menyimpan...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>{isNew ? "Buat Proyek" : "Simpan Perubahan"}</span>
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
