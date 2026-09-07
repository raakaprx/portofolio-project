import { createClient } from "@/lib/supabase/server";
import {
  DEFAULT_PROJECTS,
  DEFAULT_EXPERIENCES,
  DEFAULT_CERTIFICATES,
  DEFAULT_TECH_GROUPS,
  type ProjectItem,
  type ProjectMetric,
  type ArchitectureFlowStep,
  type DatabaseSchemaTable,
  type CodeSnippet,
  type ExperienceItem,
  type CertificateItem,
  type TechGroup,
  type TechItem,
} from "./portfolio-defaults";

export * from "./portfolio-defaults";

// ==========================================
// SERVER-SIDE DATA FETCHING WITH SAFE FALLBACK
// ==========================================

export function mapProjectRow(item: any, idx: number = 0): ProjectItem {
  const fallbackItem = DEFAULT_PROJECTS.find(
    (p) => p.slug === item.slug || p.id === item.id || p.id === item.slug
  );

  const slug = item.slug || item.id || `project-${idx + 1}`;
  const title = item.title || fallbackItem?.title || "Untitled Project";
  const role = item.role || item.subtitle || fallbackItem?.role || "Full-stack Developer";

  const short_summary =
    item.short_summary ||
    item.summary ||
    (item.description ? item.description.slice(0, 180) : "") ||
    fallbackItem?.short_summary ||
    "";

  const full_description =
    item.full_description ||
    item.description ||
    fallbackItem?.full_description ||
    short_summary;

  const thumbnail_url =
    item.thumbnail_url ||
    item.image_url ||
    fallbackItem?.thumbnail_url ||
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop";

  const gallery_urls = Array.isArray(item.gallery_urls) && item.gallery_urls.length > 0
    ? item.gallery_urls
    : (fallbackItem?.gallery_urls || [thumbnail_url]);

  const tech_stacks = Array.isArray(item.tech_stacks) && item.tech_stacks.length > 0
    ? item.tech_stacks
    : (Array.isArray(item.tags) && item.tags.length > 0
      ? item.tags
      : (fallbackItem?.tech_stacks || ["Next.js", "TypeScript", "Tailwind CSS"]));

  const live_url = item.live_url || item.demo_url || fallbackItem?.live_url || "";
  const repo_url = item.repo_url || item.github_url || fallbackItem?.repo_url || "";
  const is_featured = Boolean(item.is_featured ?? item.featured ?? fallbackItem?.is_featured ?? false);
  const display_order = Number(item.display_order ?? item.order_index ?? idx + 1);

  return {
    id: item.id || slug,
    slug,
    title,
    role,
    short_summary,
    full_description,
    thumbnail_url,
    gallery_urls,
    tech_stacks,
    live_url,
    repo_url,
    is_featured,
    display_order,

    // Backward-compatible properties
    subtitle: role,
    description: full_description,
    summary: short_summary,
    category: item.category || fallbackItem?.category || "fullstack",
    techStack: tech_stacks,
    metrics: (item.metrics as ProjectMetric[]) || fallbackItem?.metrics || [],
    github: repo_url,
    demo: live_url,
    thumbnailUrl: thumbnail_url,
    featuredSpan: item.featured_span || fallbackItem?.featuredSpan || "lg:col-span-6",
    architectureFlow:
      (item.architecture_flow as ArchitectureFlowStep[]) || fallbackItem?.architectureFlow || [],
    databaseSchema:
      (item.database_schema as DatabaseSchemaTable[]) || fallbackItem?.databaseSchema || [],
    codeSnippet: (item.code_snippet as CodeSnippet) || fallbackItem?.codeSnippet || {
      language: "typescript",
      filename: "snippet.ts",
      code: "// Project source code available on GitHub",
    },
  };
}

export async function getProjects(): Promise<ProjectItem[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("display_order", { ascending: true })
      .order("order_index", { ascending: true })
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return DEFAULT_PROJECTS;
    }

    return data.map((item, idx) => mapProjectRow(item, idx));
  } catch {
    return DEFAULT_PROJECTS;
  }
}

export async function getProjectBySlug(slug: string): Promise<ProjectItem | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .or(`slug.eq.${slug},id.eq.${slug}`)
      .single();

    if (data && !error) {
      return mapProjectRow(data, 0);
    }
  } catch {
    // fallback below
  }

  // Fallback to static data
  const fallback = DEFAULT_PROJECTS.find(
    (p) => p.slug === slug || p.id === slug
  );
  return fallback || null;
}

export async function getExperiences(): Promise<ExperienceItem[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("experiences")
      .select("*")
      .order("order_index", { ascending: true });

    if (error || !data || data.length === 0) {
      return DEFAULT_EXPERIENCES;
    }

    return data.map((item) => ({
      id: item.id,
      company: item.company,
      role: item.role,
      duration: item.duration,
      status: item.status || "Active",
      type: item.type || "Industry",
      highlights: item.highlights || "",
      deliverables: item.deliverables || [],
      technologies: item.technologies || [],
      metrics: (item.metrics as { label: string; value: string }[]) || [],
    }));
  } catch {
    return DEFAULT_EXPERIENCES;
  }
}

export async function getCertificates(): Promise<CertificateItem[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("certificates")
      .select("*")
      .order("order_index", { ascending: true });

    if (error || !data || data.length === 0) {
      return DEFAULT_CERTIFICATES;
    }

    return data.map((item) => ({
      id: item.id,
      title: item.title,
      issuer: item.issuer,
      date: item.date,
      credentialUrl: item.credential_url || "",
      credentialId: item.credential_id || "",
      imageUrl: item.image_url || undefined,
      skillsVerified: item.skills_verified || [],
    }));
  } catch {
    return DEFAULT_CERTIFICATES;
  }
}

export async function getTechStacks(): Promise<TechGroup[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("tech_stacks")
      .select("*")
      .order("order_index", { ascending: true });

    if (error || !data || data.length === 0) {
      return DEFAULT_TECH_GROUPS;
    }

    const groupedMap: Record<string, TechItem[]> = {};
    data.forEach((item) => {
      const cat = item.category || "General";
      if (!groupedMap[cat]) {
        groupedMap[cat] = [];
      }
      groupedMap[cat].push({
        name: item.name,
        proficiency: item.proficiency || "Proficient",
      });
    });

    return Object.entries(groupedMap).map(([category, items]) => ({
      category,
      items,
    }));
  } catch {
    return DEFAULT_TECH_GROUPS;
  }
}
