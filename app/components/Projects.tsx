"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ExternalLink, SlidersHorizontal } from "lucide-react";

interface ProjectItem {
  title: string;
  description: string;
  year: string;
  status: "Personal" | "Academic" | "Internship" | "Freelance";
  techStack: string[];
  github: string;
  demo: string;
  category: string;
}

const ALL_PROJECTS: ProjectItem[] = [
  {
    title: "Apex Warehouse & Inventory ERP",
    description: "Enterprise-grade warehouse management with multi-site inventory node synchronization, granular RBAC, and WebSockets.",
    year: "2026",
    status: "Academic",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL", "WebSockets"],
    github: "https://github.com",
    demo: "https://example.com",
    category: "Full Stack"
  },
  {
    title: "Aura Machine Learning Insights",
    description: "Analytics and predictive forecasting dashboard utilizing BigQuery ML forecasting models and ELT pipelines.",
    year: "2025",
    status: "Personal",
    techStack: ["Next.js", "BigQuery ML", "Tailwind CSS", "Recharts", "TypeScript"],
    github: "https://github.com",
    demo: "https://example.com",
    category: "Data Science"
  },
  {
    title: "Local Retail POS System",
    description: "Point of Sale (POS) client application focusing on quick local state storage and offline synchronization features.",
    year: "2024",
    status: "Freelance",
    techStack: ["React", "Node.js", "MongoDB", "Express", "Tailwind CSS"],
    github: "https://github.com",
    demo: "https://example.com",
    category: "Full Stack"
  },
  {
    title: "Enterprise Grading Portal",
    description: "Custom assignments portal for university laboratory courses featuring secure authentication states and CSV reporting.",
    year: "2024",
    status: "Academic",
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS"],
    github: "https://github.com",
    demo: "https://example.com",
    category: "Full Stack"
  },
  {
    title: "Industrial Stock Manager",
    description: "Multi-parameter client-side search dashboard for mechanical hardware stocks with quick CSV exports.",
    year: "2024",
    status: "Personal",
    techStack: ["React", "Tailwind CSS", "TypeScript"],
    github: "https://github.com",
    demo: "https://example.com",
    category: "Frontend"
  },
  {
    title: "SaaS Platform Concept",
    description: "Modern landing page design showcasing sleek layout transitions, custom typography, and backdrop-filter panels.",
    year: "2023",
    status: "Personal",
    techStack: ["HTML5", "CSS3", "JavaScript"],
    github: "https://github.com",
    demo: "https://example.com",
    category: "Frontend"
  },
  {
    title: "Interactive Calculator",
    description: "Neomorphic grid design interface with multi-history calculation caches using pure JavaScript events.",
    year: "2023",
    status: "Academic",
    techStack: ["HTML5", "CSS3", "JavaScript"],
    github: "https://github.com",
    demo: "https://example.com",
    category: "Frontend"
  },
  {
    title: "Local E-Commerce Portal",
    description: "Complete localized shopping cart website with integrated payment checkout options and dashboard pages.",
    year: "2024",
    status: "Freelance",
    techStack: ["React", "Express", "MongoDB", "Tailwind CSS"],
    github: "https://github.com",
    demo: "https://example.com",
    category: "Full Stack"
  }
];

export default function Projects() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [selectedTech, setSelectedTech] = useState<string>("All");

  // Get unique list of tech items for filter options
  const uniqueTechs = useMemo(() => {
    const techs = new Set<string>();
    ALL_PROJECTS.forEach((p) => p.techStack.forEach((t) => techs.add(t)));
    return ["All", ...Array.from(techs)];
  }, []);

  const filteredProjects = useMemo(() => {
    return ALL_PROJECTS.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = selectedStatus === "All" || project.status === selectedStatus;
      const matchesTech = selectedTech === "All" || project.techStack.includes(selectedTech);

      return matchesSearch && matchesStatus && matchesTech;
    });
  }, [searchQuery, selectedStatus, selectedTech]);

  return (
    <section id="projects" className="py-24 bg-black relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-3"
          >
            Catalog
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-white tracking-tight"
          >
            All Developed Projects
          </motion.h2>
        </div>

        {/* Filters Container */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-10 bg-zinc-950/40 p-4 border border-zinc-900 rounded-2xl">
          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search project names or descriptions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-zinc-900 border border-zinc-800 rounded-full text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-700 transition-colors"
            />
          </div>

          {/* Selector Filters */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Status Filter */}
            <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 rounded-full px-3 py-1">
              <span className="text-[10px] font-mono text-zinc-500 uppercase mr-1">Status:</span>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="bg-transparent text-xs text-zinc-300 font-medium focus:outline-none cursor-pointer pr-1"
              >
                <option value="All">All</option>
                <option value="Personal">Personal</option>
                <option value="Academic">Academic</option>
                <option value="Internship">Internship</option>
                <option value="Freelance">Freelance</option>
              </select>
            </div>

            {/* Tech Filter */}
            <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 rounded-full px-3 py-1">
              <span className="text-[10px] font-mono text-zinc-500 uppercase mr-1">Tech:</span>
              <select
                value={selectedTech}
                onChange={(e) => setSelectedTech(e.target.value)}
                className="bg-transparent text-xs text-zinc-300 font-medium focus:outline-none cursor-pointer pr-1"
              >
                {uniqueTechs.map((tech) => (
                  <option key={tech} value={tech}>
                    {tech}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Project Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="glass-card rounded-2xl p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="text-[10px] font-mono text-zinc-500">{project.year}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-medium border ${
                      project.status === "Freelance"
                        ? "bg-purple-950/20 border-purple-800/40 text-purple-400"
                        : project.status === "Academic"
                        ? "bg-blue-950/20 border-blue-800/40 text-blue-400"
                        : project.status === "Internship"
                        ? "bg-emerald-950/20 border-emerald-800/40 text-emerald-400"
                        : "bg-zinc-900 border-zinc-800 text-zinc-400"
                    }`}>
                      {project.status}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 leading-tight">{project.title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-6 line-clamp-3">{project.description}</p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.techStack.map((tech) => (
                      <span key={tech} className="text-[10px] font-mono text-zinc-500 bg-zinc-950 px-2 py-0.5 rounded border border-zinc-900">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 pt-4 border-t border-zinc-900">
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-white hover:text-zinc-300 transition-colors"
                    >
                      Demo
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
                      Code
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16 text-zinc-500 font-mono text-sm">
            No projects matched your active filters.
          </div>
        )}
      </div>
    </section>
  );
}
