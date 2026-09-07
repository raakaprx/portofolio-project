"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Code2,
  FileDown,
  Database,
  Briefcase,
  Layers,
} from "lucide-react";
import { Github, Linkedin, GmailLogo, WhatsappLogo } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

export const CV_URL = "/cv.pdf";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex items-center justify-center pt-24 sm:pt-28 pb-16 overflow-hidden grid-mesh transition-colors duration-300"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[700px] h-[300px] sm:h-[450px] bg-blue-500/5 dark:bg-zinc-800/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-48 sm:w-72 h-48 sm:h-72 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Profile Photo Card */}
          <div className="lg:col-span-5 flex justify-center items-center order-first lg:order-last">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
              className="relative w-52 h-52 sm:w-68 sm:h-68 md:w-80 md:h-80 lg:w-96 lg:h-96 group"
            >
              {/* Outer animated dashed ring */}
              <div className="absolute inset-0 rounded-full border border-dashed border-zinc-400 dark:border-zinc-700/80 animate-[spin_60s_linear_infinite]" />

              {/* Inner glowing circle with profile image */}
              <div className="absolute inset-3 sm:inset-4 rounded-full bg-gradient-to-tr from-zinc-200 to-white dark:from-zinc-950 dark:to-zinc-900 border-2 border-zinc-300 dark:border-zinc-700/80 flex items-center justify-center overflow-hidden shadow-xl dark:shadow-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/profile.jpg"
                  alt="Muhammad Raka Pradana"
                  className="w-full h-full object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Ambient Glows */}
              <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 w-20 sm:w-28 h-20 sm:h-28 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 w-24 sm:w-36 h-24 sm:h-36 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            </motion.div>
          </div>

          {/* Text & Hero Content & Engineering Highlights */}
          <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left">
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center self-center lg:self-start gap-2 px-3.5 py-1.5 rounded-full border border-zinc-300 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/80 shadow-xs mb-5"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-mono font-semibold text-zinc-900 dark:text-zinc-200">
                Available for Engineering Projects
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-950 dark:text-white leading-tight mb-3">
                Muhammad Raka Pradana
              </h1>
              <div className="flex items-center justify-center lg:justify-start gap-2.5 text-zinc-800 dark:text-zinc-300 mb-5 font-semibold text-lg sm:text-xl">
                <Code2 className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
                <span>Full-Stack Web Developer</span>
              </div>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-base sm:text-lg text-zinc-700 dark:text-zinc-300 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed font-normal"
            >
              Crafting scalable web architectures, robust transactional backends,
              and data-driven systems. Focused on clean system design, database
              query efficiency, and high-performance user experiences.
            </motion.p>

            {/* CTA Buttons & Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 w-full sm:w-auto mb-10"
            >
              <Button
                asChild
                size="lg"
                className="rounded-full bg-zinc-950 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200 font-semibold px-6 h-12 shadow-sm transition-transform active:scale-95 w-full sm:w-auto justify-center cursor-pointer"
              >
                <a href="#projects">
                  Explore Projects
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </a>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full border-2 border-zinc-300 dark:border-zinc-700/80 bg-white/80 dark:bg-zinc-900/70 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-5 h-12 w-full sm:w-auto justify-center gap-2 font-semibold shadow-xs"
              >
                <a
                  href={CV_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  download="CV_Muhammad_Raka_Pradana.pdf"
                  data-track-event="cv_download"
                  data-track-target="CV Muhammad Raka Pradana"
                  onClick={() => trackEvent("cv_download", "CV Muhammad Raka Pradana")}
                >
                  <FileDown className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Download CV</span>
                </a>
              </Button>

              <Button
                asChild
                variant="ghost"
                size="lg"
                className="rounded-full border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/40 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-800 dark:text-zinc-200 px-5 h-12 w-full sm:w-auto justify-center font-medium"
              >
                <a href="#contact">Contact Me</a>
              </Button>

              {/* Social Icons row */}
              <div className="flex items-center justify-center gap-2 pt-2 sm:pt-0 sm:ml-2">
                <a
                  href="https://github.com/raakaprx"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-full border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950/60 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors shadow-2xs"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href="https://linkedin.com/in/rakaprx"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-full border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950/60 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors shadow-2xs"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="https://wa.me/6285156000636?text=Halo%20Raka%2C%20saya%20tertarik%20dengan%20portofolio%20anda"
                  target="_blank"
                  rel="noreferrer"
                  data-track-event="contact_click"
                  data-track-target="WhatsApp Hero"
                  className="p-3 rounded-full border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950/60 text-zinc-700 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-400 dark:hover:border-emerald-600 transition-colors shadow-2xs"
                  aria-label="Chat on WhatsApp"
                >
                  <WhatsappLogo className="w-4 h-4" />
                </a>
                <a
                  href="mailto:rakapradana.work@gmail.com"
                  className="p-3 rounded-full border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950/60 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors shadow-2xs"
                  aria-label="Email Address via Gmail"
                >
                  <GmailLogo className="w-4 h-4" />
                </a>
              </div>
            </motion.div>

            {/* Clean Engineering Highlights (Replaces the JSON biodata terminal) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 max-w-xl mx-auto lg:mx-0 w-full text-left"
            >
              <div className="p-4 rounded-xl border border-zinc-300 dark:border-zinc-800/90 bg-white dark:bg-zinc-900/60 shadow-xs">
                <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 mb-1 font-mono text-[11px] font-semibold uppercase">
                  <Briefcase className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  Current Role
                </div>
                <p className="text-xs sm:text-sm font-bold text-zinc-950 dark:text-white leading-snug">
                  Web Developer
                </p>
                <p className="text-[11px] text-zinc-600 dark:text-zinc-400 mt-0.5 font-mono">
                  PT Maxxima Innovative Engineering
                </p>
              </div>

              <div className="p-4 rounded-xl border border-zinc-300 dark:border-zinc-800/90 bg-white dark:bg-zinc-900/60 shadow-xs">
                <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 mb-1 font-mono text-[11px] font-semibold uppercase">
                  <Layers className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  Core Specialties
                </div>
                <p className="text-xs sm:text-sm font-bold text-zinc-950 dark:text-white leading-snug">
                  Laravel & Next.js
                </p>
                <p className="text-[11px] text-zinc-600 dark:text-zinc-400 mt-0.5 font-mono">
                  REST APIs & ML Pipelines
                </p>
              </div>

              <div className="p-4 rounded-xl border border-zinc-300 dark:border-zinc-800/90 bg-white dark:bg-zinc-900/60 shadow-xs">
                <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 mb-1 font-mono text-[11px] font-semibold uppercase">
                  <Database className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                  Database Focus
                </div>
                <p className="text-xs sm:text-sm font-bold text-zinc-950 dark:text-white leading-snug">
                  PostgreSQL & MySQL
                </p>
                <p className="text-[11px] text-zinc-600 dark:text-zinc-400 mt-0.5 font-mono">
                  ACID & Index Tuning
                </p>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
