"use client";

import { useEffect, useState } from "react";
import {
  BookOpen,
  Save,
  Loader2,
  RefreshCw,
  Sparkles,
  Copy,
  Check,
  AlertTriangle,
  GraduationCap,
  Target,
  Trophy,
  Compass,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/lib/supabase/client";
import { DEFAULT_ABOUT, type AboutData } from "@/lib/portfolio-defaults";
import { triggerRevalidation } from "@/lib/revalidate";
import { getErrorMessage } from "@/lib/utils";
import { toast } from "sonner";

export default function AdminAboutPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [tableMissing, setTableMissing] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);

  // Form State
  const [bio1, setBio1] = useState(DEFAULT_ABOUT.bio_paragraph_1);
  const [bio2, setBio2] = useState(DEFAULT_ABOUT.bio_paragraph_2);
  const [yearsExp, setYearsExp] = useState(DEFAULT_ABOUT.years_experience);
  const [projectsCount, setProjectsCount] = useState(DEFAULT_ABOUT.projects_count);
  const [gpa, setGpa] = useState(DEFAULT_ABOUT.gpa);
  const [educationDegree, setEducationDegree] = useState(DEFAULT_ABOUT.education_degree);
  const [educationUniversity, setEducationUniversity] = useState(DEFAULT_ABOUT.education_university);
  const [educationYears, setEducationYears] = useState(DEFAULT_ABOUT.education_years);
  const [careerObjective, setCareerObjective] = useState(DEFAULT_ABOUT.career_objective);
  const [currentFocus, setCurrentFocus] = useState(DEFAULT_ABOUT.current_focus);

  const fetchAbout = async () => {
    setLoading(true);
    setTableMissing(false);
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("about_content")
        .select("*")
        .maybeSingle();

      if (error) {
        if (error.code === "PGRST205" || error.message?.includes("not find the table")) {
          setTableMissing(true);
        }
        console.warn("[fetchAbout] Gunakan data default about:", error.message);
        return;
      }

      if (data) {
        setBio1(data.bio_paragraph_1 || DEFAULT_ABOUT.bio_paragraph_1);
        setBio2(data.bio_paragraph_2 ?? DEFAULT_ABOUT.bio_paragraph_2);
        setYearsExp(typeof data.years_experience === "number" ? data.years_experience : DEFAULT_ABOUT.years_experience);
        setProjectsCount(typeof data.projects_count === "number" ? data.projects_count : DEFAULT_ABOUT.projects_count);
        setGpa(data.gpa || DEFAULT_ABOUT.gpa);
        setEducationDegree(data.education_degree || DEFAULT_ABOUT.education_degree);
        setEducationUniversity(data.education_university || DEFAULT_ABOUT.education_university);
        setEducationYears(data.education_years || DEFAULT_ABOUT.education_years);
        setCareerObjective(data.career_objective || DEFAULT_ABOUT.career_objective);
        setCurrentFocus(data.current_focus || DEFAULT_ABOUT.current_focus);
      }
    } catch (err) {
      console.error("[fetchAbout] Error fetching:", err);
      toast.error("Gagal memuat data About.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAbout();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const supabase = createClient();
      const payload: AboutData = {
        id: "main",
        bio_paragraph_1: bio1.trim(),
        bio_paragraph_2: bio2.trim(),
        years_experience: Number(yearsExp) || 0,
        projects_count: Number(projectsCount) || 0,
        gpa: gpa.trim(),
        education_degree: educationDegree.trim(),
        education_university: educationUniversity.trim(),
        education_years: educationYears.trim(),
        career_objective: careerObjective.trim(),
        current_focus: currentFocus.trim(),
      };

      const { error } = await supabase
        .from("about_content")
        .upsert(payload, { onConflict: "id" });

      if (error) {
        if (error.code === "PGRST205" || error.message?.includes("not find the table")) {
          setTableMissing(true);
          toast.error("Tabel 'about_content' belum dibuat di Supabase.");
          return;
        }
        throw error;
      }

      await triggerRevalidation();
      toast.success("Konten About berhasil disimpan dan diperbarui!");
    } catch (err: unknown) {
      toast.error(getErrorMessage(err, "Gagal menyimpan konten About"));
    } finally {
      setSaving(false);
    }
  };

  const sqlCode = `-- Jalankan di SQL Editor dashboard Supabase Anda:
CREATE TABLE IF NOT EXISTS public.about_content (
    id TEXT PRIMARY KEY DEFAULT 'main',
    bio_paragraph_1 TEXT NOT NULL,
    bio_paragraph_2 TEXT DEFAULT '',
    years_experience INT DEFAULT 3,
    projects_count INT DEFAULT 10,
    gpa TEXT DEFAULT '3.75',
    education_degree TEXT DEFAULT 'S1 Sistem Informasi',
    education_university TEXT DEFAULT 'Telkom University',
    education_years TEXT DEFAULT '2022 – 2026',
    career_objective TEXT DEFAULT '',
    current_focus TEXT DEFAULT '',
    updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.about_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view about content" ON public.about_content FOR SELECT USING (true);
CREATE POLICY "CMS full access about content" ON public.about_content FOR ALL USING (true) WITH CHECK (true);
INSERT INTO public.about_content (id) VALUES ('main') ON CONFLICT (id) DO NOTHING;`;

  const copySql = () => {
    navigator.clipboard.writeText(sqlCode);
    setCopiedSql(true);
    toast.success("Skrip SQL berhasil disalin!");
    setTimeout(() => setCopiedSql(false), 2500);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-zinc-500" />
        <p className="text-sm font-mono text-zinc-400">Memuat konfigurasi section About...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16 max-w-5xl">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <BookOpen className="w-6 h-6 text-emerald-400" />
            About Section CMS
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Kelola narasi biografi, metrik pengalaman kerja, riwayat pendidikan, dan fokus karir Anda.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => fetchAbout()}
            className="border-zinc-700 bg-zinc-800 text-zinc-200 hover:bg-zinc-700 gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reload
          </Button>

          <Button
            onClick={handleSave}
            disabled={saving}
            size="sm"
            className="bg-emerald-600 text-white hover:bg-emerald-500 font-semibold gap-1.5 shadow-sm"
          >
            {saving ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Menyimpan...
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                Simpan Perubahan
              </>
            )}
          </Button>
        </div>
      </div>

      {/* SQL Missing Table Warning */}
      {tableMissing && (
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-950/40 border border-amber-800/80 text-amber-200 space-y-3">
          <div className="flex items-center gap-2 text-sm font-bold text-amber-300">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            Tabel &apos;about_content&apos; belum ada di Supabase
          </div>
          <p className="text-xs text-amber-200/80 leading-relaxed">
            Data saat ini menggunakan fallback default. Untuk mengaktifkan penyimpanan dinamis, silakan salin skrip SQL berikut dan jalankan di SQL Editor dashboard Supabase Anda:
          </p>
          <div className="relative rounded-xl bg-zinc-950 p-3 text-xs font-mono text-zinc-300 overflow-x-auto border border-zinc-800">
            <pre>{sqlCode}</pre>
            <Button
              onClick={copySql}
              size="sm"
              variant="outline"
              className="absolute top-2 right-2 border-zinc-700 bg-zinc-900 text-zinc-200 hover:bg-zinc-800 gap-1.5 text-xs h-8"
            >
              {copiedSql ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  Tersalin!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Salin SQL
                </>
              )}
            </Button>
          </div>
        </div>
      )}

      {/* Form Section 1: Biografi & Narasi */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 space-y-5">
        <div className="flex items-center gap-2 text-white font-bold text-base border-b border-zinc-800 pb-3">
          <Compass className="w-4 h-4 text-emerald-400" />
          Narasi Biografi & Perjalanan (My Journey)
        </div>

        <div className="space-y-2">
          <label className="text-xs font-mono text-zinc-400 uppercase font-semibold">
            Paragraf 1 (Pembuka & Minat Utama)
          </label>
          <Textarea
            rows={4}
            value={bio1}
            onChange={(e) => setBio1(e.target.value)}
            className="bg-zinc-950 border-zinc-700 text-zinc-100 text-xs sm:text-sm leading-relaxed"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-mono text-zinc-400 uppercase font-semibold">
            Paragraf 2 (Latar Akademik & Prinsip Kerja)
          </label>
          <Textarea
            rows={3}
            value={bio2}
            onChange={(e) => setBio2(e.target.value)}
            className="bg-zinc-950 border-zinc-700 text-zinc-100 text-xs sm:text-sm leading-relaxed"
          />
        </div>
      </div>

      {/* Form Section 2: Key Metrics & Statistik */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 space-y-5">
        <div className="flex items-center gap-2 text-white font-bold text-base border-b border-zinc-800 pb-3">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          Statistik & Angka Kunci
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-mono text-zinc-400 uppercase font-semibold">
              Tahun Pengalaman (Years Experience)
            </label>
            <Input
              type="number"
              value={yearsExp}
              onChange={(e) => setYearsExp(Number(e.target.value))}
              className="bg-zinc-950 border-zinc-700 text-zinc-100 h-10 text-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-zinc-400 uppercase font-semibold">
              Jumlah Proyek (Built Projects)
            </label>
            <Input
              type="number"
              value={projectsCount}
              onChange={(e) => setProjectsCount(Number(e.target.value))}
              className="bg-zinc-950 border-zinc-700 text-zinc-100 h-10 text-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-zinc-400 uppercase font-semibold">
              IPK Akademik (Academic GPA)
            </label>
            <Input
              type="text"
              value={gpa}
              onChange={(e) => setGpa(e.target.value)}
              placeholder="3.75"
              className="bg-zinc-950 border-zinc-700 text-zinc-100 h-10 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Form Section 3: Riwayat Pendidikan */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 space-y-5">
        <div className="flex items-center gap-2 text-white font-bold text-base border-b border-zinc-800 pb-3">
          <GraduationCap className="w-4 h-4 text-emerald-400" />
          Informasi Pendidikan
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-mono text-zinc-400 uppercase font-semibold">
              Program Studi / Gelar
            </label>
            <Input
              type="text"
              value={educationDegree}
              onChange={(e) => setEducationDegree(e.target.value)}
              className="bg-zinc-950 border-zinc-700 text-zinc-100 h-10 text-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-zinc-400 uppercase font-semibold">
              Universitas / Institusi
            </label>
            <Input
              type="text"
              value={educationUniversity}
              onChange={(e) => setEducationUniversity(e.target.value)}
              className="bg-zinc-950 border-zinc-700 text-zinc-100 h-10 text-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-zinc-400 uppercase font-semibold">
              Rentang Tahun (e.g. 2022 – 2026)
            </label>
            <Input
              type="text"
              value={educationYears}
              onChange={(e) => setEducationYears(e.target.value)}
              className="bg-zinc-950 border-zinc-700 text-zinc-100 h-10 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Form Section 4: Target & Fokus Karir */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 space-y-5">
        <div className="flex items-center gap-2 text-white font-bold text-base border-b border-zinc-800 pb-3">
          <Target className="w-4 h-4 text-emerald-400" />
          Fokus Karir & Sasaran Profesional
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-mono text-zinc-400 uppercase font-semibold">
              Career Objective
            </label>
            <Textarea
              rows={3}
              value={careerObjective}
              onChange={(e) => setCareerObjective(e.target.value)}
              className="bg-zinc-950 border-zinc-700 text-zinc-100 text-xs sm:text-sm leading-relaxed"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-zinc-400 uppercase font-semibold">
              Current Focus
            </label>
            <Textarea
              rows={3}
              value={currentFocus}
              onChange={(e) => setCurrentFocus(e.target.value)}
              className="bg-zinc-950 border-zinc-700 text-zinc-100 text-xs sm:text-sm leading-relaxed"
            />
          </div>
        </div>
      </div>

      {/* Bottom Save Bar */}
      <div className="flex justify-end pt-4">
        <Button
          onClick={handleSave}
          disabled={saving}
          className="bg-emerald-600 text-white hover:bg-emerald-500 font-semibold gap-2 h-11 px-6 shadow-md"
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Menyimpan Perubahan...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Simpan Konten About
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
