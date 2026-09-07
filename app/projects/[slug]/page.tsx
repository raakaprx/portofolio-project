import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import {
  ArrowLeft,
  ExternalLink,
  Calendar,
  Layers,
  Sparkles,
  CheckCircle2,
  Code2,
  Share2,
} from "lucide-react";
import { Github, getTechLogo } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { MarkdownView } from "@/components/ui/markdown-view";
import { getProjectBySlug, getProjects } from "@/lib/portfolio-data";
import { ProjectGallery } from "./ProjectGallery";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found | Muhammad Raka Pradana",
    };
  }

  return {
    title: `${project.title} | Muhammad Raka Pradana`,
    description: project.short_summary,
    openGraph: {
      title: `${project.title} - ${project.role}`,
      description: project.short_summary,
      images: [
        {
          url: project.thumbnail_url,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const allProjects = await getProjects();
  const otherProjects = allProjects
    .filter((p) => (p.slug || p.id) !== (project.slug || project.id))
    .slice(0, 3);

  const galleryImages =
    project.gallery_urls && project.gallery_urls.length > 0
      ? project.gallery_urls
      : [project.thumbnail_url];

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Navbar />

      <article className="pt-28 pb-24 max-w-5xl mx-auto px-6">
        {/* Top Navigation / Breadcrumb */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-xs font-mono font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Kembali ke Portfolio</span>
          </Link>

          <span className="text-xs font-mono text-zinc-500">
            Project Showcase
          </span>
        </div>

        {/* Header Title Section */}
        <header className="space-y-4 mb-10">
          <div className="flex flex-wrap items-center gap-2.5">
            <Badge
              variant="outline"
              className="text-xs font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-900/60 bg-blue-50/50 dark:bg-blue-950/40 px-3 py-1"
            >
              {project.role}
            </Badge>

            {project.is_featured && (
              <Badge className="bg-amber-500/10 text-amber-500 border border-amber-500/20 font-mono text-xs gap-1">
                <Sparkles className="w-3 h-3" />
                Featured Project
              </Badge>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-950 dark:text-white tracking-tight leading-tight">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal max-w-3xl">
            {project.short_summary}
          </p>

          {/* Quick Action Links */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 text-xs font-mono font-semibold transition-all shadow-md hover:shadow-lg"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Lihat Live Demo</span>
              </a>
            )}

            {project.repo_url && (
              <a
                href={project.repo_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-zinc-200 hover:text-black dark:hover:text-white hover:border-zinc-400 dark:hover:border-zinc-700 text-xs font-mono font-semibold transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>Source Code (GitHub)</span>
              </a>
            )}
          </div>
        </header>

        {/* Interactive Gallery & Featured Media */}
        <section className="mb-14">
          <ProjectGallery images={galleryImages} title={project.title} />
        </section>

        {/* Two-column Layout: Detailed Content + Sticky Sidebar Meta */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Content (8 cols) */}
          <div className="lg:col-span-8 space-y-10">
            {/* Rich Markdown Description */}
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/30 p-6 sm:p-8 shadow-xs">
              <MarkdownView content={project.full_description} />
            </div>

            {/* Architecture Metrics (if available) */}
            {project.metrics && project.metrics.length > 0 && (
              <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/30 p-6 sm:p-8 space-y-4">
                <h3 className="text-sm font-mono font-bold text-zinc-950 dark:text-white uppercase tracking-wider">
                  Engineering Benchmarks & Specifications
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {project.metrics.map((m, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800/80 text-center"
                    >
                      <span className="text-xs text-zinc-500 font-mono block mb-1">
                        {m.label}
                      </span>
                      <span className="text-sm sm:text-base font-bold text-zinc-950 dark:text-white font-mono">
                        {m.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sticky Sidebar Meta (4 cols) */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Tech Stack Box */}
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 p-6 shadow-xs space-y-4 sticky top-28">
              <h3 className="text-xs font-mono font-bold text-zinc-950 dark:text-zinc-200 uppercase tracking-wider flex items-center gap-2">
                <Code2 className="w-4 h-4 text-blue-500" />
                <span>Teknologi & Framework</span>
              </h3>

              <div className="flex flex-wrap gap-2">
                {project.tech_stacks.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/60 text-xs font-mono text-zinc-800 dark:text-zinc-200 shadow-xs hover:border-zinc-300 dark:hover:border-zinc-600 transition-colors"
                  >
                    <span className="shrink-0 flex items-center justify-center">
                      {getTechLogo(tech, "w-4 h-4")}
                    </span>
                    <span>{tech}</span>
                  </span>
                ))}
              </div>

              <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 space-y-2 text-xs font-mono text-zinc-500">
                <div className="flex justify-between">
                  <span>Role:</span>
                  <span className="text-zinc-800 dark:text-zinc-200 font-semibold">
                    {project.role}
                  </span>
                </div>
                {project.live_url && (
                  <div className="flex justify-between">
                    <span>Live Demo:</span>
                    <span className="text-emerald-500 font-semibold">Aktif</span>
                  </div>
                )}
                {project.repo_url && (
                  <div className="flex justify-between">
                    <span>Source Code:</span>
                    <span className="text-blue-500 font-semibold">Public Repo</span>
                  </div>
                )}
              </div>
            </div>
          </aside>
        </div>

        {/* Other Projects Recommendation Section */}
        {otherProjects.length > 0 && (
          <section className="mt-20 pt-12 border-t border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-zinc-950 dark:text-white tracking-tight">
                  Proyek Lainnya
                </h3>
                <p className="text-xs text-zinc-500 font-mono mt-1">
                  Eksplorasi karya dan sistem rekayasa lainnya
                </p>
              </div>

              <Link
                href="/#projects"
                className="text-xs font-mono text-blue-500 hover:underline inline-flex items-center gap-1 font-semibold"
              >
                <span>Lihat Semua</span>
                <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {otherProjects.map((p) => (
                <Link
                  key={p.slug || p.id}
                  href={`/projects/${p.slug || p.id}`}
                  className="group rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 p-4 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all hover:shadow-md"
                >
                  <div className="aspect-video w-full rounded-lg overflow-hidden bg-zinc-950 mb-3 border border-zinc-100 dark:border-zinc-800/60">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.thumbnail_url}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <span className="text-[10px] font-mono text-blue-500 uppercase font-semibold">
                    {p.role}
                  </span>
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-white mt-1 group-hover:text-blue-500 transition-colors line-clamp-1">
                    {p.title}
                  </h4>
                  <p className="text-xs text-zinc-500 line-clamp-2 mt-1">
                    {p.short_summary}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>

      <Footer />
    </main>
  );
}
