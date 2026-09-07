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

export async function getProjects(): Promise<ProjectItem[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("order_index", { ascending: true })
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return DEFAULT_PROJECTS;
    }

    return data.map((item) => ({
      id: item.slug || item.id,
      title: item.title,
      slug: item.slug,
      subtitle: item.subtitle || "",
      description: item.description || item.summary || "",
      category: item.category || "fullstack",
      techStack: item.tags || [],
      metrics: (item.metrics as ProjectMetric[]) || [],
      github: item.github_url || "",
      demo: item.demo_url || undefined,
      thumbnailUrl: item.thumbnail_url || undefined,
      featuredSpan: item.featured_span || "lg:col-span-6",
      architectureFlow:
        (item.architecture_flow as ArchitectureFlowStep[]) || [],
      databaseSchema: (item.database_schema as DatabaseSchemaTable[]) || [],
      codeSnippet: (item.code_snippet as CodeSnippet) || {
        language: "typescript",
        filename: "snippet.ts",
        code: "// Project source code on GitHub",
      },
    }));
  } catch {
    return DEFAULT_PROJECTS;
  }
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
