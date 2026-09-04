"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Building2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getTechLogo } from "@/components/icons";

interface ExperienceItem {
  company: string;
  role: string;
  duration: string;
  status: "Active" | "Completed";
  type: "Industry" | "Internship" | "Organization";
  highlights: string;
  deliverables: string[];
  technologies: string[];
  metrics?: { label: string; value: string }[];
}

const EXPERIENCES: ExperienceItem[] = [
  {
    company: "PT Maxxima Innovative Engineering",
    role: "Web Developer",
    duration: "2026 – Present",
    status: "Active",
    type: "Industry",
    highlights:
      "Developing high-performance web systems, database optimization, and scalable full-stack features for enterprise-grade digital platforms.",
    deliverables: [
      "Architecting and optimizing modern web systems and spatial data interfaces using Next.js, React, and TypeScript.",
      "Conducting extensive database query optimization, indexing, and schema design for complex multi-tenant operations in PostgreSQL.",
      "Developing resilient backend services and high-throughput RESTful APIs with strict error handling and automated validation.",
      "Collaborating with cross-functional engineering teams to implement scalable UI components and state-management pipelines.",
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "PostgreSQL",
      "Prisma ORM",
      "Docker",
      "RESTful APIs",
    ],
    metrics: [
      { label: "Role Status", value: "Active / Current" },
      { label: "Core Focus", value: "Full-Stack Architecture" },
      { label: "Stack", value: "TypeScript & Next.js" },
    ],
  },
  {
    company: "PT Sundaya Indonesia",
    role: "Frontend Developer Intern",
    duration: "Jan 2025 – Mar 2025",
    status: "Completed",
    type: "Internship",
    highlights:
      "Engineered real-time Material Management System (SMMS) web platform, replacing error-prone spreadsheets with automated digital workflows.",
    deliverables: [
      "Architected responsive web frontend with React, Vite, and Tailwind CSS, reducing internal page load latency by 40%.",
      "Integrated secure authentication with stateless JSON Web Tokens (JWT) and multi-level role-based authorization.",
      "Developed real-time status updates and multi-tier approval flows using Node.js, Express, and Socket.IO.",
      "Implemented comprehensive audit logs, reducing inventory recording discrepancies and manual input errors by 85%.",
    ],
    technologies: [
      "React",
      "Node.js",
      "Express.js",
      "Tailwind CSS",
      "MySQL",
      "Socket.IO",
      "Docker",
    ],
    metrics: [
      { label: "Performance", value: "40% Faster Load" },
      { label: "Error Reduction", value: "85% Manual Errors Cut" },
      { label: "Architecture", value: "Real-Time Sockets" },
    ],
  },
];

export default function Experience() {
  const [expandedIndices, setExpandedIndices] = useState<number[]>([0]);

  const toggleExpand = (index: number) => {
    setExpandedIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <TooltipProvider delayDuration={50}>
      <section id="experience" className="py-24 bg-background relative overflow-hidden transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-16">
            <Badge
              variant="outline"
              className="mb-3 px-3.5 py-1 font-mono text-zinc-800 dark:text-zinc-300 border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xs"
            >
              Career & Trajectory
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 dark:text-white tracking-tight">
              Professional Experience
            </h2>
            <p className="text-zinc-700 dark:text-zinc-300 text-sm max-w-lg mt-3">
              Hands-on engineering roles in enterprise web applications, real-time logistics systems, and technical mentorship.
            </p>
          </div>

          {/* Experience Timeline Cards */}
          <div className="space-y-8">
            {EXPERIENCES.map((exp, index) => {
              const isCurrent = exp.status === "Active";
              const isExpanded = expandedIndices.includes(index);
              const validTechStack = exp.technologies.filter((t) => Boolean(getTechLogo(t)));

              return (
                <motion.div
                  key={exp.company}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card
                    className={`overflow-hidden transition-all duration-300 bg-white dark:bg-zinc-950/80 ${
                      isCurrent
                        ? "border-2 border-emerald-500/50 dark:border-emerald-500/30 shadow-md shadow-emerald-500/5"
                        : "border border-zinc-300 dark:border-zinc-800 shadow-sm hover:shadow-md"
                    }`}
                  >
                    <div className="p-6 sm:p-8">
                      {/* Top Row: Meta Badge & Duration */}
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                        <div className="flex items-center gap-2">
                          {isCurrent ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-100 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-400 shadow-2xs">
                              <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
                              </span>
                              Current Role (2026 – Present)
                            </span>
                          ) : (
                            <Badge variant="secondary" className="font-mono text-zinc-800 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-850 border border-zinc-300 dark:border-zinc-700">
                              {exp.type}
                            </Badge>
                          )}
                          <Badge variant="outline" className="font-mono text-zinc-700 dark:text-zinc-400 hidden sm:inline-flex border-zinc-300 dark:border-zinc-800">
                            {exp.duration}
                          </Badge>
                        </div>

                        <div className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 font-mono text-xs">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{exp.duration}</span>
                        </div>
                      </div>

                      {/* Role & Company */}
                      <div className="mb-4">
                        <h3 className="text-xl sm:text-2xl font-extrabold text-zinc-950 dark:text-white tracking-tight flex items-center gap-2">
                          {exp.role}
                        </h3>
                        <div className="flex items-center gap-2 mt-1 text-zinc-800 dark:text-zinc-300 font-semibold text-sm sm:text-base">
                          <Building2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          <span>{exp.company}</span>
                        </div>
                      </div>

                      {/* Highlight Description */}
                      <p className="text-zinc-800 dark:text-zinc-300 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                        {exp.highlights}
                      </p>

                      {/* Key Metrics Bento row */}
                      {exp.metrics && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6 p-4 rounded-xl bg-zinc-100/90 dark:bg-zinc-900/60 border border-zinc-300 dark:border-zinc-800/80 shadow-2xs">
                          {exp.metrics.map((m, i) => (
                            <div key={i}>
                              <p className="text-xs font-mono text-zinc-600 dark:text-zinc-400 uppercase font-semibold">{m.label}</p>
                              <p className="text-sm sm:text-base font-extrabold text-zinc-950 dark:text-zinc-100 mt-0.5">{m.value}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Tech Stack - Genuine Logos Only */}
                      <div className="flex flex-wrap items-center gap-2.5 mb-6">
                        {validTechStack.map((tech) => {
                          const logo = getTechLogo(tech, "w-5 h-5 sm:w-6 sm:h-6");
                          if (!logo) return null;

                          return (
                            <Tooltip key={tech}>
                              <TooltipTrigger asChild>
                                <div
                                  aria-label={tech}
                                  className="p-2 sm:p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 hover:border-zinc-500 dark:hover:border-zinc-500 hover:scale-110 transition-all duration-200 cursor-pointer shadow-xs flex items-center justify-center"
                                >
                                  {logo}
                                </div>
                              </TooltipTrigger>
                              <TooltipContent side="top" className="border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-2.5 py-1 text-xs font-mono text-zinc-950 dark:text-white shadow-md">
                                {tech}
                              </TooltipContent>
                            </Tooltip>
                          );
                        })}
                      </div>

                      {/* Drawer Toggle Button */}
                      <div className="pt-4 border-t border-zinc-200 dark:border-zinc-900 flex items-center justify-between">
                        <span className="text-xs font-mono text-zinc-600 dark:text-zinc-400">
                          {isExpanded ? "Hide key deliverables" : "View deliverables & technical scope"}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleExpand(index)}
                          className="text-xs font-mono text-zinc-900 dark:text-zinc-200 hover:text-blue-600 dark:hover:text-white gap-1.5 cursor-pointer font-semibold"
                        >
                          {isExpanded ? (
                            <>
                              Collapse
                              <ChevronUp className="w-3.5 h-3.5" />
                            </>
                          ) : (
                            <>
                              Expand Deliverables
                              <ChevronDown className="w-3.5 h-3.5" />
                            </>
                          )}
                        </Button>
                      </div>

                      {/* Expandable Deliverables Drawer */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden pt-4 mt-2"
                          >
                            <div className="p-4 rounded-xl bg-zinc-100/90 dark:bg-zinc-950/80 border border-zinc-300 dark:border-zinc-800/80 space-y-2.5 shadow-2xs">
                              <p className="text-xs font-mono text-zinc-700 dark:text-zinc-400 uppercase tracking-wider mb-2 font-bold">
                                Key Technical Deliverables & Architecture:
                              </p>
                              <ul className="space-y-2 text-zinc-900 dark:text-zinc-200 text-sm font-normal">
                                {exp.deliverables.map((item, idx) => (
                                  <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-500 shrink-0 mt-0.5" />
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </TooltipProvider>
  );
}
