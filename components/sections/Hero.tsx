"use client";

import Image from "next/image";
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
import { DEFAULT_PROFILE, type ProfileData } from "@/lib/portfolio-defaults";
import { naturalTransition } from "@/lib/motion";

export const CV_URL = "/cv.pdf";

interface HeroProps {
  initialProfile?: ProfileData;
}

export default function Hero({ initialProfile }: HeroProps) {
  const profile = initialProfile || DEFAULT_PROFILE;
  const avatarSrc = profile.avatar_url?.split("?")[0] || "/profile-raka.jpg";

  const highlights =
    Array.isArray(profile.highlights) && profile.highlights.length > 0
      ? profile.highlights
      : DEFAULT_PROFILE.highlights;

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
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
              className="relative w-52 h-52 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full p-1.5 border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xl dark:shadow-2xl group"
            >
              <div className="relative w-full h-full rounded-full overflow-hidden bg-zinc-100 dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800">
                <Image
                  src={avatarSrc}
                  alt={profile.name}
                  fill
                  priority
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 256px, 320px"
                />
              </div>
            </motion.div>
          </div>

          {/* Text & Hero Content & Engineering Highlights */}
          <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left">
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={naturalTransition}
              className="inline-flex items-center self-center lg:self-start gap-2.5 px-3.5 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/80 shadow-2xs mb-5"
            >
              {profile.is_available && (
                <span className="w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-emerald-500/20 shrink-0" />
              )}
              <span className="text-xs font-sans font-medium text-zinc-800 dark:text-zinc-200">
                {profile.status_badge}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...naturalTransition, delay: 0.08 }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-950 dark:text-white leading-tight mb-3">
                {profile.name}
              </h1>
              <div className="flex items-center justify-center lg:justify-start gap-2.5 text-zinc-800 dark:text-zinc-300 mb-5 font-semibold text-lg sm:text-xl">
                <Code2 className="w-5 h-5 text-zinc-600 dark:text-zinc-400 shrink-0" />
                <span>{profile.role}</span>
              </div>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...naturalTransition, delay: 0.14 }}
              className="text-base sm:text-lg text-zinc-700 dark:text-zinc-300 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed font-normal"
            >
              {profile.tagline}
            </motion.p>

            {/* CTA Buttons & Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...naturalTransition, delay: 0.2 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3 w-full mb-8"
            >
              <Button
                asChild
                size="lg"
                className="rounded-full bg-zinc-950 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200 font-semibold px-6 h-11 text-sm shadow-sm transition-transform active:scale-95 w-full sm:w-auto justify-center cursor-pointer"
              >
                <a href={profile.cta_primary_url || "#projects"}>
                  {profile.cta_primary_text || "Explore Projects"}
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </a>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full border border-zinc-300 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/70 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-5 h-11 text-sm w-full sm:w-auto justify-center gap-2 font-semibold shadow-2xs"
              >
                <a
                  href={profile.cta_cv_url || CV_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  download="CV_Muhammad_Raka_Pradana.pdf"
                  data-track-event="cv_download"
                  data-track-target={`CV ${profile.name}`}
                  onClick={() => trackEvent("cv_download", `CV ${profile.name}`)}
                >
                  <FileDown className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>{profile.cta_cv_text || "Download CV"}</span>
                </a>
              </Button>

              <Button
                asChild
                variant="ghost"
                size="lg"
                className="rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-950/40 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-800 dark:text-zinc-200 px-4 h-11 text-sm w-full sm:w-auto justify-center font-medium"
              >
                <a href={profile.cta_contact_url || "#contact"}>
                  {profile.cta_contact_text || "Contact Me"}
                </a>
              </Button>

              {/* Social Icons row */}
              <div className="flex items-center justify-center gap-1.5 pt-1 sm:pt-0 sm:ml-1">
                {profile.github_url && (
                  <a
                    href={profile.github_url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors shadow-2xs"
                    aria-label="GitHub Profile"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
                {profile.linkedin_url && (
                  <a
                    href={profile.linkedin_url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors shadow-2xs"
                    aria-label="LinkedIn Profile"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
                {profile.whatsapp_url && (
                  <a
                    href={profile.whatsapp_url}
                    target="_blank"
                    rel="noreferrer"
                    data-track-event="contact_click"
                    data-track-target="WhatsApp Hero"
                    className="p-2.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 text-zinc-700 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-400 dark:hover:border-emerald-600 transition-colors shadow-2xs"
                    aria-label="Chat on WhatsApp"
                  >
                    <WhatsappLogo className="w-4 h-4" />
                  </a>
                )}
                {profile.email && (
                  <a
                    href={`mailto:${profile.email}`}
                    className="p-2.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors shadow-2xs"
                    aria-label="Email Address via Gmail"
                  >
                    <GmailLogo className="w-4 h-4" />
                  </a>
                )}
              </div>
            </motion.div>

            {/* Clean Engineering Highlights Bento Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...naturalTransition, delay: 0.26 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl mx-auto lg:mx-0 w-full text-left"
            >
              {highlights.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 sm:p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-900/50 shadow-2xs"
                >
                  <div className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400 mb-1 text-[11px] font-semibold uppercase tracking-wider">
                    {idx === 0 && <Briefcase className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-400" />}
                    {idx === 1 && <Layers className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-400" />}
                    {idx === 2 && <Database className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-400" />}
                    <span>{item.label}</span>
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-zinc-950 dark:text-white leading-snug">
                    {item.title}
                  </p>
                  <p className="text-[11px] text-zinc-600 dark:text-zinc-400 mt-0.5 font-sans">
                    {item.subtitle}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
