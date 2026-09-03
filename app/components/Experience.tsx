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
      "Designed and deployed a responsive warehouse inventory web application serving 50+ concurrent distribution operators.",
    deliverables: [
      "Engineered reusable React.js modules and implemented lazy loading and code-splitting, slashing initial page load times by 40%.",
      "Integrated front-end dashboards with backend REST APIs for synchronized inventory tracking, reducing manual data entry mistakes by 85%.",
      "Partnered with warehouse ground supervisors to design user-centric interfaces achieving a 95% user adoption benchmark.",
    ],
    technologies: ["React.js", "JavaScript", "HTML5", "CSS3", "REST APIs", "Git"],
    metrics: [
      { label: "Page Load Reduction", value: "-40%" },
      { label: "Error Reduction", value: "-85%" },
      { label: "User Adoption", value: "95%" },
    ],
  },
];

export default function Experience() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <TooltipProvider delayDuration={50}>
      <section id="experience" className="py-24 bg-black relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <Badge variant="outline" className="mb-3 px-3 py-1 font-mono text-zinc-400">
            Professional Experience
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Career Journey & Engineering Impact
          </h2>
          <p className="text-zinc-400 text-sm max-w-lg mt-3">
            Building reliable software systems, optimizing performance, and translating complex
            business requirements into maintainable applications.
          </p>
        </div>

        {/* Bento Timeline Container */}
        <div className="grid grid-cols-1 gap-8">
          {EXPERIENCES.map((exp, index) => {
            const isExpanded = expandedIndex === index;
            const isCurrent = exp.status === "Active";

            return (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  className={`overflow-hidden transition-all duration-300 ${
                    isCurrent
                      ? "border-zinc-700/80 bg-gradient-to-b from-zinc-900/60 to-zinc-950/80 shadow-lg shadow-zinc-950/40"
                      : "border-zinc-800/80 bg-zinc-950/50"
                  }`}
                >
                  <div className="p-6 sm:p-8">
                    {/* Top Row: Meta Badge & Duration */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                      <div className="flex items-center gap-2">
                        {isCurrent ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-emerald-950/50 border border-emerald-800/80 text-emerald-400">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            Current Role (2026 – Present)
                          </span>
                        ) : (
                          <Badge variant="secondary" className="font-mono text-zinc-400">
                            {exp.type}
                          </Badge>
                        )}
                        <Badge variant="outline" className="font-mono text-zinc-500 hidden sm:inline-flex">
                          {exp.duration}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-1.5 text-zinc-500 font-mono text-xs">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{exp.duration}</span>
                      </div>
                    </div>

                    {/* Role & Company */}
                    <div className="mb-4">
                      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                        {exp.role}
                      </h3>
                      <div className="flex items-center gap-2 mt-1 text-zinc-400 font-medium text-sm sm:text-base">
                        <Building2 className="w-4 h-4 text-zinc-500" />
                        <span>{exp.company}</span>
                      </div>
                    </div>

                    {/* Highlight Description */}
                    <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                      {exp.highlights}
                    </p>

                    {/* Key Metrics Bento row if available */}
                    {exp.metrics && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6 p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/60">
                        {exp.metrics.map((m, i) => (
                          <div key={i}>
                            <p className="text-xs font-mono text-zinc-500 uppercase">{m.label}</p>
                            <p className="text-sm sm:text-base font-bold text-zinc-200 mt-0.5">{m.value}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tech Stack - Large Official Logos Only */}
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                      {exp.technologies.map((tech) => {
                        const logo = getTechLogo(tech, "w-6 h-6 sm:w-7 sm:h-7");
                        return (
                          <Tooltip key={tech}>
                            <TooltipTrigger asChild>
                              <div
                                aria-label={tech}
                                className="p-2.5 sm:p-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-500 hover:bg-zinc-850 hover:scale-110 transition-all duration-200 cursor-pointer shadow-sm flex items-center justify-center"
                              >
                                {logo || <span className="text-xs font-mono text-zinc-400">{tech}</span>}
                              </div>
                            </TooltipTrigger>
                            <TooltipContent side="top" className="border-zinc-800 bg-zinc-950 px-2.5 py-1 text-xs font-mono text-white">
                              {tech}
                            </TooltipContent>
                          </Tooltip>
                        );
                      })}
                    </div>

                    {/* Drawer Toggle Button */}
                    <div className="pt-4 border-t border-zinc-900 flex items-center justify-between">
                      <span className="text-xs font-mono text-zinc-500">
                        {isExpanded ? "Hide key deliverables" : "View deliverables & technical scope"}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleExpand(index)}
                        className="text-xs font-mono text-zinc-300 hover:text-white gap-1.5"
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
                          <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800/80 space-y-2.5">
                            <p className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2 font-semibold">
                              Key Technical Deliverables & Architecture:
                            </p>
                            <ul className="space-y-2 text-zinc-400 text-sm">
                              {exp.deliverables.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
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
