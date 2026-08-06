"use client";

import { motion } from "framer-motion";
import { ArrowDown, CheckCircle2 } from "lucide-react";

interface JourneyYear {
  year: string;
  focus: string;
  projects: {
    title: string;
    details: string;
  }[];
}

const JOURNEY_STEPS: JourneyYear[] = [
  {
    year: "2023",
    focus: "Foundational Web & Static Sites",
    projects: [
      { title: "Calculator App", details: "Clean operations logic and interactive CSS grid layout." },
      { title: "SaaS Landing Page Mockup", details: "Responsive layouts built with pure semantic HTML & CSS." },
      { title: "Interactive Todo Web App", details: "Local storage persistence and active/completed filter states." }
    ]
  },
  {
    year: "2024",
    focus: "Single Page React Architectures",
    projects: [
      { title: "Developer Analytics Dashboard", details: "Clean data parsing from external webhooks using React states." },
      { title: "Retail Inventory Tracker", details: "Client-side search filters, data forms, and CSV exporting." },
      { title: "Point of Sale (POS) Client UI", details: "Fast calculations, item cart, and offline storage synchronization." }
    ]
  },
  {
    year: "2025",
    focus: "Advanced Data Systems & AI Integrations",
    projects: [
      { title: "Predictive Sales Forecasting", details: "BigQuery ML models forecasting quarterly target goals." },
      { title: "Clinical Trial Analytics Engine", details: "APIv2 data query tools extracting disease constraints and trial matches." }
    ]
  },
  {
    year: "2026",
    focus: "Enterprise Full Stack Systems",
    projects: [
      { title: "Apex Warehouse & Inventory ERP", details: "Multi-site inventory nodes, instant WebSockets syncing, granular RBAC permissions, and automated cron low-stock warning triggers." }
    ]
  }
];

export default function ProjectJourney() {
  return (
    <section id="journey" className="py-24 bg-black relative">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-3"
          >
            Evolution
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-white tracking-tight"
          >
            My Project Journey
          </motion.h2>
          <p className="text-zinc-500 text-sm max-w-md mt-4">
            Demonstrating continuous skill growth from static layouts to distributed enterprise architectures.
          </p>
        </div>

        <div className="flex flex-col items-center">
          {JOURNEY_STEPS.map((step, index) => {
            const isLast = index === JOURNEY_STEPS.length - 1;
            return (
              <div key={step.year} className="w-full flex flex-col items-center">
                {/* Year Block */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="w-full glass-card rounded-2xl p-6 md:p-8 border border-zinc-800/80 hover:border-zinc-700/80 transition-all duration-300 relative"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-zinc-900 pb-4">
                    <div>
                      <span className="text-2xl font-extrabold text-white font-mono">{step.year}</span>
                      <h3 className="text-base font-semibold text-zinc-300 mt-0.5">{step.focus}</h3>
                    </div>
                    <span className="px-2.5 py-1 text-xs font-mono rounded bg-zinc-900 border border-zinc-800/80 text-zinc-500 self-start md:self-center">
                      Phase {index + 1}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {step.projects.map((proj) => (
                      <div
                        key={proj.title}
                        className="bg-zinc-950/40 border border-zinc-900/80 rounded-xl p-4 flex flex-col gap-2 hover:bg-zinc-950/80 transition-colors"
                      >
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-zinc-500 shrink-0 mt-0.5" />
                          <h4 className="font-semibold text-sm text-white leading-tight">{proj.title}</h4>
                        </div>
                        <p className="text-xs text-zinc-500 leading-relaxed">{proj.details}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Arrow Down Connector */}
                {!isLast && (
                  <div className="py-8 flex flex-col items-center gap-1.5 opacity-40">
                    <div className="w-px h-10 bg-gradient-to-b from-zinc-800 to-transparent" />
                    <ArrowDown className="w-4 h-4 text-zinc-500" />
                    <div className="w-px h-10 bg-gradient-to-t from-zinc-850 to-transparent" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
