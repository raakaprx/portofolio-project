"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  User,
  Save,
  Loader2,
  RefreshCw,
  Sparkles,
  ExternalLink,
  Code2,
  FileDown,
  ArrowRight,
  Briefcase,
  Layers,
  Database,
  Copy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { Github, Linkedin, GmailLogo, WhatsappLogo } from "@/components/icons";
import { createClient } from "@/lib/supabase/client";
import {
  DEFAULT_PROFILE,
  type ProfileHighlightCard,
} from "@/lib/portfolio-defaults";
import { triggerRevalidation } from "@/lib/revalidate";
import { getErrorMessage } from "@/lib/utils";
import { toast } from "sonner";

export default function AdminProfilePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [tableMissing, setTableMissing] = useState(false);

  // Form State
  const [name, setName] = useState(DEFAULT_PROFILE.name);
  const [role, setRole] = useState(DEFAULT_PROFILE.role);
  const [tagline, setTagline] = useState(DEFAULT_PROFILE.tagline);
  const [avatarUrl, setAvatarUrl] = useState(DEFAULT_PROFILE.avatar_url);
  const [statusBadge, setStatusBadge] = useState(DEFAULT_PROFILE.status_badge);
  const [isAvailable, setIsAvailable] = useState(DEFAULT_PROFILE.is_available);

  // CTA State
  const [ctaPrimaryText, setCtaPrimaryText] = useState(DEFAULT_PROFILE.cta_primary_text);
  const [ctaPrimaryUrl, setCtaPrimaryUrl] = useState(DEFAULT_PROFILE.cta_primary_url);
  const [ctaCvText, setCtaCvText] = useState(DEFAULT_PROFILE.cta_cv_text);
  const [ctaCvUrl, setCtaCvUrl] = useState(DEFAULT_PROFILE.cta_cv_url);
  const [ctaContactText, setCtaContactText] = useState(DEFAULT_PROFILE.cta_contact_text);
  const [ctaContactUrl, setCtaContactUrl] = useState(DEFAULT_PROFILE.cta_contact_url);

  // Socials State
  const [githubUrl, setGithubUrl] = useState(DEFAULT_PROFILE.github_url);
  const [linkedinUrl, setLinkedinUrl] = useState(DEFAULT_PROFILE.linkedin_url);
  const [whatsappUrl, setWhatsappUrl] = useState(DEFAULT_PROFILE.whatsapp_url);
  const [email, setEmail] = useState(DEFAULT_PROFILE.email);

  // Highlights Cards (3 Cards)
  const [highlights, setHighlights] = useState<ProfileHighlightCard[]>(
    DEFAULT_PROFILE.highlights
  );

  const fetchProfile = async () => {
    setLoading(true);
    setTableMissing(false);
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("profile")
        .select("*")
        .maybeSingle();

      if (error) {
        if (error.code === "PGRST205" || error.message?.includes("not find the table")) {
          setTableMissing(true);
        }
        console.warn("[fetchProfile] Gunakan data default profil:", error.message);
        return;
      }

      if (data) {
        setName(data.name || DEFAULT_PROFILE.name);
        setRole(data.role || DEFAULT_PROFILE.role);
        setTagline(data.tagline || DEFAULT_PROFILE.tagline);
        setAvatarUrl(
          (data.avatar_url ? data.avatar_url.split("?")[0] : "") || DEFAULT_PROFILE.avatar_url
        );

        setStatusBadge(data.status_badge || DEFAULT_PROFILE.status_badge);
        setIsAvailable(
          typeof data.is_available === "boolean"
            ? data.is_available
            : DEFAULT_PROFILE.is_available
        );

        setCtaPrimaryText(data.cta_primary_text || DEFAULT_PROFILE.cta_primary_text);
        setCtaPrimaryUrl(data.cta_primary_url || DEFAULT_PROFILE.cta_primary_url);
        setCtaCvText(data.cta_cv_text || DEFAULT_PROFILE.cta_cv_text);
        setCtaCvUrl(data.cta_cv_url || DEFAULT_PROFILE.cta_cv_url);
        setCtaContactText(data.cta_contact_text || DEFAULT_PROFILE.cta_contact_text);
        setCtaContactUrl(data.cta_contact_url || DEFAULT_PROFILE.cta_contact_url);

        setGithubUrl(data.github_url || DEFAULT_PROFILE.github_url);
        setLinkedinUrl(data.linkedin_url || DEFAULT_PROFILE.linkedin_url);
        setWhatsappUrl(data.whatsapp_url || DEFAULT_PROFILE.whatsapp_url);
        setEmail(data.email || DEFAULT_PROFILE.email);

        if (Array.isArray(data.highlights) && data.highlights.length > 0) {
          setHighlights(data.highlights as ProfileHighlightCard[]);
        }
      }
    } catch (err) {
      console.error("Error saat membaca profil:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleHighlightChange = (
    index: number,
    field: keyof ProfileHighlightCard,
    value: string
  ) => {
    setHighlights((prev) => {
      const updated = [...prev];
      if (updated[index]) {
        updated[index] = { ...updated[index], [field]: value };
      }
      return updated;
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Nama lengkap tidak boleh kosong");
      return;
    }

    setSaving(true);
    try {
      const supabase = createClient();
      const cleanAvatar = (avatarUrl || DEFAULT_PROFILE.avatar_url).split("?")[0].trim();

      const payload: Record<string, unknown> = {
        id: "main",
        name: name.trim(),
        role: role.trim(),
        tagline: tagline.trim(),
        avatar_url: cleanAvatar,
        status_badge: statusBadge.trim(),
        is_available: isAvailable,
        cta_primary_text: ctaPrimaryText.trim(),
        cta_primary_url: ctaPrimaryUrl.trim(),
        cta_cv_text: ctaCvText.trim(),
        cta_cv_url: ctaCvUrl.trim(),
        cta_contact_text: ctaContactText.trim(),
        cta_contact_url: ctaContactUrl.trim(),
        github_url: githubUrl.trim(),
        linkedin_url: linkedinUrl.trim(),
        whatsapp_url: whatsappUrl.trim(),
        email: email.trim(),
        highlights,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase.from("profile").upsert(payload, {
        onConflict: "id",
      });

      if (error) {
        if (error.code === "PGRST205" || error.message?.includes("not find the table")) {
          setTableMissing(true);
          toast.error("Tabel 'profile' belum dibuat di database Supabase.");
          return;
        }
        throw error;
      }

      // Revalidate homepage cache
      await triggerRevalidation("/");
      toast.success("Profil berhasil disimpan!");
      setTableMissing(false);
    } catch (err: unknown) {
      toast.error(getErrorMessage(err, "Gagal menyimpan profil"));
    } finally {
      setSaving(false);
    }
  };

  const copySqlMigration = () => {
    const sql = `-- Buat tabel public.profile jika belum pernah dibuat sama sekali
CREATE TABLE IF NOT EXISTS public.profile (
    id TEXT PRIMARY KEY DEFAULT 'main',
    name TEXT NOT NULL DEFAULT 'Muhammad Raka Pradana',
    role TEXT NOT NULL DEFAULT 'Full-Stack Web Developer',
    tagline TEXT NOT NULL DEFAULT 'Crafting scalable web architectures, robust transactional backends, and data-driven systems. Focused on clean system design, database query efficiency, and high-performance user experiences.',
    avatar_url TEXT NOT NULL DEFAULT '/profile-raka.jpg',
    status_badge TEXT DEFAULT 'Available for Engineering Projects',
    is_available BOOLEAN DEFAULT true,
    cta_primary_text TEXT DEFAULT 'Explore Projects',
    cta_primary_url TEXT DEFAULT '#projects',
    cta_cv_text TEXT DEFAULT 'Download CV',
    cta_cv_url TEXT DEFAULT '/cv.pdf',
    cta_contact_text TEXT DEFAULT 'Contact Me',
    cta_contact_url TEXT DEFAULT '#contact',
    github_url TEXT DEFAULT 'https://github.com/raakaprx',
    linkedin_url TEXT DEFAULT 'https://linkedin.com/in/rakaprx',
    whatsapp_url TEXT DEFAULT 'https://wa.me/6285156000636',
    email TEXT DEFAULT 'rakapradana.work@gmail.com',
    highlights JSONB DEFAULT '[
        {"label": "CURRENT ROLE", "title": "Web Developer", "subtitle": "PT Maxxima Innovative Engineering", "icon": "briefcase"},
        {"label": "CORE SPECIALTIES", "title": "Laravel & Next.js", "subtitle": "REST APIs & ML Pipelines", "icon": "layers"},
        {"label": "DATABASE FOCUS", "title": "PostgreSQL & MySQL", "subtitle": "ACID & Index Tuning", "icon": "database"}
    ]'::jsonb,
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Aktifkan RLS dan perizinan akses aman
ALTER TABLE public.profile ENABLE ROW LEVEL SECURITY;
GRANT SELECT ON TABLE public.profile TO anon;
GRANT ALL ON TABLE public.profile TO authenticated;

DROP POLICY IF EXISTS "Anon read profile" ON public.profile;
CREATE POLICY "Anon read profile" ON public.profile FOR SELECT TO anon USING (true);

DROP POLICY IF EXISTS "Authenticated manage profile" ON public.profile;
CREATE POLICY "Authenticated manage profile" ON public.profile FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Reload cache schema PostgREST Supabase
NOTIFY pgrst, 'reload schema';`;

    navigator.clipboard.writeText(sql);
    toast.success("Script SQL disalin ke clipboard!");
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        <p className="text-xs font-mono text-zinc-400">Memuat data profil...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-mono tracking-tight text-white flex items-center gap-2.5">
            <User className="w-6 h-6 text-blue-400" />
            Profile & Hero Configuration
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1 font-sans">
            Atur foto profil, bio, status ketersediaan, tautan sosial, dan kartu sorotan hero section.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={fetchProfile}
            disabled={loading}
            className="border-zinc-700 bg-zinc-800/80 hover:bg-zinc-700 text-zinc-200 text-xs font-mono gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Muat Ulang</span>
          </Button>

          <Button
            onClick={handleSave}
            disabled={saving}
            size="sm"
            className="bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-semibold gap-2 cursor-pointer shadow-md"
          >
            {saving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span>Simpan Perubahan</span>
          </Button>
        </div>
      </div>

      {/* Database Warning Alert if Table Not Created Yet */}
      {tableMissing && (
        <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-200 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-mono font-bold text-xs">
              <span>⚠️ Tabel &apos;public.profile&apos; belum dibuat di Supabase SQL Editor.</span>
            </div>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={copySqlMigration}
              className="h-7 text-xs font-mono border-amber-500/40 bg-amber-500/20 text-amber-200 hover:bg-amber-500/30 gap-1.5"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Salin SQL Migration</span>
            </Button>
          </div>
          <p className="text-xs text-amber-300/80 leading-relaxed font-sans">
            Tabel database untuk menyimpan profil secara online belum ada di proyek Supabase Anda. Anda dapat menyalin script SQL di atas dan menjalankannya di SQL Editor Supabase. Saat ini sistem tetap berjalan menggunakan data default.
          </p>
        </div>
      )}

      {/* Live Hero Preview (Miniature matching screenshot) */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8 space-y-6 relative overflow-hidden shadow-xl">
        <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-semibold flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            Live Hero Section Preview
          </span>
          <span className="text-[11px] font-mono text-zinc-500">
            Tampilan persis seperti di Landing Page
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Text, Badges, CTA */}
          <div className="lg:col-span-8 space-y-4">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/80 text-xs font-mono text-zinc-200">
              {isAvailable && (
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              )}
              <span>{statusBadge || "Available for Projects"}</span>
            </div>

            {/* Name */}
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {name || "Nama Anda"}
            </h1>

            {/* Role */}
            <div className="flex items-center gap-2 text-zinc-300 font-semibold text-base sm:text-lg">
              <Code2 className="w-4 h-4 text-blue-400" />
              <span>{role || "Profesi / Role"}</span>
            </div>

            {/* Tagline */}
            <p className="text-sm text-zinc-400 leading-relaxed max-w-xl">
              {tagline || "Deskripsi singkat mengenai fokus keahlian dan minat teknologi Anda."}
            </p>

            {/* Buttons Preview */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <div className="px-4 py-2 rounded-full bg-white text-zinc-950 font-semibold text-xs flex items-center gap-1.5 shadow-sm">
                <span>{ctaPrimaryText || "Explore Projects"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>

              <div className="px-3.5 py-2 rounded-full border border-zinc-700 bg-zinc-900 text-zinc-200 text-xs flex items-center gap-1.5">
                <FileDown className="w-3.5 h-3.5 text-emerald-400" />
                <span>{ctaCvText || "Download CV"}</span>
              </div>

              <div className="px-3.5 py-2 rounded-full border border-zinc-800 bg-zinc-950 text-zinc-400 text-xs">
                <span>{ctaContactText || "Contact Me"}</span>
              </div>

              {/* Social Icons */}
              <div className="flex items-center gap-1.5 pl-2">
                <div className="p-2 rounded-full border border-zinc-800 bg-zinc-900 text-zinc-400">
                  <Github className="w-3.5 h-3.5" />
                </div>
                <div className="p-2 rounded-full border border-zinc-800 bg-zinc-900 text-zinc-400">
                  <Linkedin className="w-3.5 h-3.5" />
                </div>
                <div className="p-2 rounded-full border border-zinc-800 bg-zinc-900 text-zinc-400">
                  <WhatsappLogo className="w-3.5 h-3.5" />
                </div>
                <div className="p-2 rounded-full border border-zinc-800 bg-zinc-900 text-zinc-400">
                  <GmailLogo className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </div>

          {/* Right: Circular Photo Preview */}
          <div className="lg:col-span-4 flex justify-center items-center">
            <div className="relative w-44 h-44 sm:w-52 sm:h-52 group">
              {/* Spinning dashed ring matching Hero section */}
              <div className="absolute inset-0 rounded-full border border-dashed border-zinc-600 animate-[spin_60s_linear_infinite]" />
              <div className="absolute inset-2 sm:inset-2.5 rounded-full border-2 border-zinc-700 bg-zinc-900 overflow-hidden shadow-2xl">
                <Image
                  src={avatarUrl || "/profile-raka.jpg"}
                  alt={name || "Avatar"}
                  fill
                  className="object-cover transition-transform duration-200"
                  sizes="208px"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 3 Highlights Bento Cards Preview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-zinc-800/80">
          {highlights.map((card, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl border border-zinc-800 bg-zinc-900/60"
            >
              <div className="flex items-center gap-1.5 text-zinc-400 text-[10px] font-mono font-semibold uppercase mb-1">
                {idx === 0 && <Briefcase className="w-3 h-3 text-blue-400" />}
                {idx === 1 && <Layers className="w-3 h-3 text-emerald-400" />}
                {idx === 2 && <Database className="w-3 h-3 text-amber-400" />}
                <span>{card.label}</span>
              </div>
              <p className="text-xs font-bold text-white leading-snug">
                {card.title}
              </p>
              <p className="text-[11px] text-zinc-400 mt-0.5 font-mono">
                {card.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Configuration Form */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* Section 1: Photo & Availability */}
        <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/60 space-y-6">
          <div className="border-b border-zinc-800 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-base font-mono font-bold text-white flex items-center gap-2">
                <User className="w-4 h-4 text-blue-400" />
                1. Foto Profil & Status
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5 font-sans">
                Unggah foto profil Anda. Anda dapat langsung menggeser posisi wajah dan mengatur zoom di dalam lingkaran seperti di WhatsApp / LinkedIn.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Avatar Uploader */}
            <div className="md:col-span-5 space-y-2">
              <label className="text-xs font-mono text-zinc-300 font-semibold block">
                Foto Profil (Interactive Circular Crop)
              </label>
              <ImageUploader
                value={avatarUrl}
                onChange={setAvatarUrl}
                bucket="portfolio-assets"
                folder="profile"
                previewShape="circle"
              />
              <p className="text-[11px] text-zinc-500 font-mono text-center sm:text-left">
                Maksimal 15MB. Foto otomatis di-crop 1:1 dan disimpan dalam format WebP berkualitas tinggi.
              </p>
            </div>

            {/* Status & Availability toggle */}
            <div className="md:col-span-7 space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-mono text-zinc-300 font-semibold">
                  Teks Status Badge
                </label>
                <Input
                  value={statusBadge}
                  onChange={(e) => setStatusBadge(e.target.value)}
                  placeholder="Contoh: Available for Engineering Projects"
                  className="bg-zinc-950 border-zinc-700 text-zinc-100 font-mono text-xs"
                />
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-xl border border-zinc-800 bg-zinc-950/70">
                <input
                  type="checkbox"
                  id="isAvailableToggle"
                  checked={isAvailable}
                  onChange={(e) => setIsAvailable(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 bg-zinc-900 border-zinc-700 cursor-pointer"
                />
                <label
                  htmlFor="isAvailableToggle"
                  className="text-xs font-mono text-zinc-200 cursor-pointer select-none"
                >
                  Aktifkan Indikator Ketersediaan Hijau (Live Ping Pulse)
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Personal Identity */}
        <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/60 space-y-4">
          <div className="border-b border-zinc-800 pb-3">
            <h3 className="text-base font-mono font-bold text-white flex items-center gap-2">
              <Code2 className="w-4 h-4 text-emerald-400" />
              2. Identitas Utama & Peran
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5 font-sans">
              Nama lengkap, profesi teknikal, dan ringkasan bio yang tampil di landing page.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-zinc-300 font-semibold">
                Nama Lengkap *
              </label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Muhammad Raka Pradana"
                required
                className="bg-zinc-950 border-zinc-700 text-zinc-100 text-sm font-semibold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-zinc-300 font-semibold">
                Peran / Profesi Utama *
              </label>
              <Input
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Full-Stack Web Developer"
                required
                className="bg-zinc-950 border-zinc-700 text-zinc-100 text-sm font-semibold"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-zinc-300 font-semibold">
              Tagline Bio / Ringkasan Keahlian
            </label>
            <Textarea
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              rows={3}
              placeholder="Deskripsi singkat keahlian arsitektur web, performa database, dsb..."
              className="bg-zinc-950 border-zinc-700 text-zinc-100 text-xs leading-relaxed"
            />
          </div>
        </div>

        {/* Section 3: Call to Action (CTA) Buttons & CV */}
        <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/60 space-y-4">
          <div className="border-b border-zinc-800 pb-3">
            <h3 className="text-base font-mono font-bold text-white flex items-center gap-2">
              <ArrowRight className="w-4 h-4 text-blue-400" />
              3. Tombol Aksi (CTA) & Tautan CV
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5 font-sans">
              Atur teks dan URL target untuk ketiga tombol utama di Hero section.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Primary CTA */}
            <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-950 space-y-2.5">
              <span className="text-[11px] font-mono text-zinc-400 uppercase font-semibold block">
                Tombol Utama (Explore)
              </span>
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-zinc-400">Label Teks</label>
                <Input
                  value={ctaPrimaryText}
                  onChange={(e) => setCtaPrimaryText(e.target.value)}
                  className="bg-zinc-900 border-zinc-700 text-xs font-mono"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-zinc-400">Target URL / Anchor</label>
                <Input
                  value={ctaPrimaryUrl}
                  onChange={(e) => setCtaPrimaryUrl(e.target.value)}
                  className="bg-zinc-900 border-zinc-700 text-xs font-mono"
                />
              </div>
            </div>

            {/* CV Download CTA */}
            <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-950 space-y-2.5">
              <span className="text-[11px] font-mono text-zinc-400 uppercase font-semibold block">
                Tombol CV (Download)
              </span>
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-zinc-400">Label Teks</label>
                <Input
                  value={ctaCvText}
                  onChange={(e) => setCtaCvText(e.target.value)}
                  className="bg-zinc-900 border-zinc-700 text-xs font-mono"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-zinc-400">File / URL CV</label>
                <Input
                  value={ctaCvUrl}
                  onChange={(e) => setCtaCvUrl(e.target.value)}
                  placeholder="/cv.pdf"
                  className="bg-zinc-900 border-zinc-700 text-xs font-mono"
                />
              </div>
            </div>

            {/* Contact CTA */}
            <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-950 space-y-2.5">
              <span className="text-[11px] font-mono text-zinc-400 uppercase font-semibold block">
                Tombol Kontak
              </span>
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-zinc-400">Label Teks</label>
                <Input
                  value={ctaContactText}
                  onChange={(e) => setCtaContactText(e.target.value)}
                  className="bg-zinc-900 border-zinc-700 text-xs font-mono"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-zinc-400">Target URL / Anchor</label>
                <Input
                  value={ctaContactUrl}
                  onChange={(e) => setCtaContactUrl(e.target.value)}
                  className="bg-zinc-900 border-zinc-700 text-xs font-mono"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Social Media & Contact Links */}
        <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/60 space-y-4">
          <div className="border-b border-zinc-800 pb-3">
            <h3 className="text-base font-mono font-bold text-white flex items-center gap-2">
              <ExternalLink className="w-4 h-4 text-purple-400" />
              4. Media Sosial & Kontak Terhubung
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5 font-sans">
              Ikon sosial pada hero section akan otomatis mengarah ke tautan yang Anda tentukan di bawah ini.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-zinc-300 font-semibold flex items-center gap-2">
                <Github className="w-3.5 h-3.5" />
                GitHub URL
              </label>
              <Input
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                placeholder="https://github.com/username"
                className="bg-zinc-950 border-zinc-700 text-xs font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-zinc-300 font-semibold flex items-center gap-2">
                <Linkedin className="w-3.5 h-3.5" />
                LinkedIn URL
              </label>
              <Input
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                placeholder="https://linkedin.com/in/username"
                className="bg-zinc-950 border-zinc-700 text-xs font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-zinc-300 font-semibold flex items-center gap-2">
                <WhatsappLogo className="w-3.5 h-3.5 text-emerald-400" />
                WhatsApp URL / Nomor
              </label>
              <Input
                value={whatsappUrl}
                onChange={(e) => setWhatsappUrl(e.target.value)}
                placeholder="https://wa.me/628..."
                className="bg-zinc-950 border-zinc-700 text-xs font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-zinc-300 font-semibold flex items-center gap-2">
                <GmailLogo className="w-3.5 h-3.5 text-red-400" />
                Email Address
              </label>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@domain.com"
                className="bg-zinc-950 border-zinc-700 text-xs font-mono"
              />
            </div>
          </div>
        </div>

        {/* Section 5: Bento Highlights Cards */}
        <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/60 space-y-4">
          <div className="border-b border-zinc-800 pb-3">
            <h3 className="text-base font-mono font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-400" />
              5. Tiga Kartu Sorotan Bento (Hero Highlights)
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5 font-sans">
              Kelola teks label, judul utama, dan sub-judul pada 3 kartu highlight di bagian bawah Hero section.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {highlights.map((card, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-zinc-800 bg-zinc-950 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-zinc-200 uppercase">
                    Kartu {idx + 1}
                  </span>
                  {idx === 0 && <Briefcase className="w-3.5 h-3.5 text-blue-400" />}
                  {idx === 1 && <Layers className="w-3.5 h-3.5 text-emerald-400" />}
                  {idx === 2 && <Database className="w-3.5 h-3.5 text-amber-400" />}
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-zinc-400 font-semibold">
                    Label Kategori
                  </label>
                  <Input
                    value={card.label}
                    onChange={(e) =>
                      handleHighlightChange(idx, "label", e.target.value)
                    }
                    placeholder="Contoh: CURRENT ROLE"
                    className="bg-zinc-900 border-zinc-700 text-xs font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-zinc-400 font-semibold">
                    Judul Utama
                  </label>
                  <Input
                    value={card.title}
                    onChange={(e) =>
                      handleHighlightChange(idx, "title", e.target.value)
                    }
                    placeholder="Contoh: Web Developer"
                    className="bg-zinc-900 border-zinc-700 text-xs font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-zinc-400 font-semibold">
                    Sub-Judul / Instansi
                  </label>
                  <Input
                    value={card.subtitle}
                    onChange={(e) =>
                      handleHighlightChange(idx, "subtitle", e.target.value)
                    }
                    placeholder="Contoh: PT Maxxima Innovative Engineering"
                    className="bg-zinc-900 border-zinc-700 text-xs font-mono"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Save Action Bar */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800">
          <Button
            type="submit"
            disabled={saving}
            size="lg"
            className="bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold gap-2 px-6 shadow-lg cursor-pointer"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Menyimpan & Memperbarui Cache...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Simpan Semua Pengaturan Profil</span>
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
