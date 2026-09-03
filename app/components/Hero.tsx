"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Terminal as TerminalIcon,
  Check,
  Copy,
  Mail,
  Code2,
} from "lucide-react";
import { Github, Linkedin } from "@/components/icons";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const [activeTab, setActiveTab] = useState<"stack" | "bio" | "experience">("stack");
  const [copied, setCopied] = useState(false);

  const commandText = "npx raka --info";

  const handleCopyCommand = () => {
    navigator.clipboard.writeText(commandText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const stackData = {
    developer: "Muhammad Raka Pradana",
    role: "Full-Stack Web Developer",
    currentCompany: "PT Maxxima Innovative Engineering",
    coreStack: {
      frontend: ["React.js", "Next.js", "Tailwind CSS", "TypeScript"],
      backend: ["Laravel", "PHP", "Node.js", "Express.js", "REST APIs"],
      database: ["PostgreSQL", "MySQL", "Prisma ORM"],
      dataML: ["Python", "Pandas", "Scikit-Learn"],
      devops: ["Docker", "Git / GitHub", "Vercel"],
    },
    status: "Available for high-impact projects & opportunities",
  };

  const bioData = {
    name: "Muhammad Raka Pradana",
    education: "S1 Information Systems — Telkom University",
    gpa: "3.75 / 4.00",
    location: "Bandung / Jakarta, Indonesia (Open to Remote)",
    focus: [
      "Scalable Web Architecture & API Design",
      "Database Optimization & Data Pipelines",
      "Applied Machine Learning & Predictive Modeling",
    ],
  };

  const experienceData = {
    current: {
      role: "Web Developer",
      company: "PT Maxxima Innovative Engineering",
      period: "2026 – Present",
      scope: "High-performance web systems, database optimization, and scalable full-stack features",
    },
    previous: {
      role: "Frontend Developer Intern",
      company: "PT Sundaya Indonesia",
      period: "2025",
      impact: "Reduced page load time by 40% & eliminated manual entry errors by 85%",
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-[95vh] flex items-center justify-center pt-28 pb-16 overflow-hidden grid-mesh"
    >
      {/* Background Radial Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-zinc-800/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Text & Hero Content & Interactive Terminal */}
          <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left">
            {/* Dynamic Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center self-center lg:self-start gap-2.5 px-3.5 py-1.5 rounded-full border border-zinc-800/90 bg-zinc-900/60 backdrop-blur-md mb-6 shadow-sm"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-mono font-medium text-zinc-300">
                Available for Projects
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-3">
                Muhammad Raka Pradana
              </h1>
              <div className="flex items-center justify-center lg:justify-start gap-2 text-zinc-400 mb-6 font-medium text-lg sm:text-xl">
                <Code2 className="w-5 h-5 text-zinc-500" />
                <span>Full-Stack Web Developer</span>
              </div>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-base sm:text-lg text-zinc-400 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed font-normal"
            >
              Crafting scalable web applications, robust backend architectures,
              and data-driven systems. Focused on clean system design, database
              efficiency, and high-performance user experiences.
            </motion.p>

            {/* CTA Buttons & Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10"
            >
              <Button
                asChild
                size="lg"
                className="rounded-full bg-white text-zinc-950 hover:bg-zinc-200 font-semibold px-6 h-12 shadow-lg shadow-white/5 transition-transform active:scale-95"
              >
                <a href="#projects">
                  Explore Projects
                  <ArrowRight className="w-4 h-4 ml-1" />
                </a>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 text-zinc-200 px-6 h-12"
              >
                <a href="#contact">Contact Me</a>
              </Button>

              <div className="flex items-center gap-2 pt-2 sm:pt-0 sm:ml-3">
                <a
                  href="https://github.com/raakaprx"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-full border border-zinc-800 bg-zinc-950/60 text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href="https://linkedin.com/in/rakaprx"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-full border border-zinc-800 bg-zinc-950/60 text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="mailto:rakapradana.work@gmail.com"
                  className="p-3 rounded-full border border-zinc-800 bg-zinc-950/60 text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors"
                  aria-label="Email Address"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </motion.div>

            {/* Interactive Mock Terminal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="rounded-2xl border border-zinc-800/90 bg-zinc-950/80 shadow-2xl backdrop-blur-xl overflow-hidden max-w-xl mx-auto lg:mx-0 w-full text-left"
            >
              {/* Terminal Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800/80 bg-zinc-900/40">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-zinc-700/60" />
                  <div className="w-3 h-3 rounded-full bg-zinc-700/60" />
                  <div className="w-3 h-3 rounded-full bg-zinc-700/60" />
                  <span className="ml-2 font-mono text-xs text-zinc-400 flex items-center gap-1.5">
                    <TerminalIcon className="w-3.5 h-3.5 text-zinc-500" />
                    raka@workstation:~
                  </span>
                </div>

                <button
                  onClick={handleCopyCommand}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono text-zinc-400 hover:text-zinc-200 bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 transition-colors cursor-pointer"
                  title="Copy command"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>{commandText}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Terminal Tabs */}
              <div className="flex items-center gap-1 px-4 pt-3 border-b border-zinc-900 bg-zinc-950/40">
                <button
                  onClick={() => setActiveTab("stack")}
                  className={`px-3 py-1.5 rounded-t-lg font-mono text-xs transition-colors cursor-pointer ${
                    activeTab === "stack"
                      ? "bg-zinc-900 text-white border-t border-x border-zinc-800"
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  stack.json
                </button>
                <button
                  onClick={() => setActiveTab("bio")}
                  className={`px-3 py-1.5 rounded-t-lg font-mono text-xs transition-colors cursor-pointer ${
                    activeTab === "bio"
                      ? "bg-zinc-900 text-white border-t border-x border-zinc-800"
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  bio.json
                </button>
                <button
                  onClick={() => setActiveTab("experience")}
                  className={`px-3 py-1.5 rounded-t-lg font-mono text-xs transition-colors cursor-pointer ${
                    activeTab === "experience"
                      ? "bg-zinc-900 text-white border-t border-x border-zinc-800"
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  career.json
                </button>
              </div>

              {/* Terminal Output */}
              <div className="p-5 font-mono text-xs leading-relaxed max-h-[260px] overflow-y-auto">
                <div className="flex items-center gap-2 text-zinc-500 mb-3 pb-2 border-b border-zinc-900">
                  <span className="text-emerald-400 font-bold">$</span>
                  <span>{commandText}</span>
                  <span className="px-1.5 py-0.5 rounded bg-zinc-900 text-zinc-400 text-[10px]">
                    --format=json
                  </span>
                </div>

                {activeTab === "stack" && (
                  <pre className="text-zinc-300 overflow-x-auto selection:bg-zinc-800 selection:text-white">
                    <code>
                      <span className="text-zinc-500">{"// Core Stack & Environments"}</span>
                      {"\n"}
                      {JSON.stringify(stackData, null, 2)}
                    </code>
                  </pre>
                )}

                {activeTab === "bio" && (
                  <pre className="text-zinc-300 overflow-x-auto selection:bg-zinc-800 selection:text-white">
                    <code>
                      <span className="text-zinc-500">{"// Developer Profile & Academic Focus"}</span>
                      {"\n"}
                      {JSON.stringify(bioData, null, 2)}
                    </code>
                  </pre>
                )}

                {activeTab === "experience" && (
                  <pre className="text-zinc-300 overflow-x-auto selection:bg-zinc-800 selection:text-white">
                    <code>
                      <span className="text-zinc-500">{"// Roles & Industry Impact"}</span>
                      {"\n"}
                      {JSON.stringify(experienceData, null, 2)}
                    </code>
                  </pre>
                )}
              </div>

              {/* Terminal Footer */}
              <div className="flex items-center justify-between px-4 py-2 bg-zinc-900/30 border-t border-zinc-900 text-[11px] font-mono text-zinc-500">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                  Status: Ready
                </span>
                <span>Node.js v20 • App Router</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Prominent Profile Photo Card from public/profile.jpg */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
              className="relative w-72 h-72 sm:w-88 sm:h-88 md:w-96 md:h-96 group"
            >
              {/* Outer animated dashed ring */}
              <div className="absolute inset-0 rounded-full border border-dashed border-zinc-700/80 animate-[spin_60s_linear_infinite]" />

              {/* Inner glowing circle with the profile image */}
              <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-zinc-950 to-zinc-900 border border-zinc-700/80 flex items-center justify-center overflow-hidden shadow-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/profile.jpg"
                  alt="Muhammad Raka Pradana"
                  className="w-full h-full object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Glowing floating ambient blobs */}
              <div className="absolute -top-4 -right-4 w-28 h-28 bg-white/5 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-4 -left-4 w-36 h-36 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
