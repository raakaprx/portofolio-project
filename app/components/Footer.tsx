"use client";

import { ArrowUp } from "lucide-react";
import { Github, Linkedin, GmailLogo, RakaLogo } from "@/components/icons";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-12 bg-background border-t border-zinc-300 dark:border-zinc-850 relative z-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono text-zinc-600 dark:text-zinc-400">
        {/* Left: Branding & Status */}
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <RakaLogo className="w-5 h-5" />
            <span className="text-zinc-950 dark:text-zinc-200 font-bold tracking-wider">
              MUHAMMAD RAKA PRADANA
            </span>
          </div>
          <span className="hidden sm:inline text-zinc-400 dark:text-zinc-700">•</span>
          <span className="flex items-center gap-1.5 text-zinc-700 dark:text-zinc-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
            All systems operational
          </span>
        </div>

        {/* Middle: Socials with genuine brand logos */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/raakaprx"
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 text-zinc-700 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:border-zinc-400 dark:hover:border-zinc-700 transition-colors shadow-2xs"
            aria-label="GitHub"
          >
            <Github className="w-3.5 h-3.5" />
          </a>
          <a
            href="https://linkedin.com/in/rakaprx"
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 text-zinc-700 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:border-zinc-400 dark:hover:border-zinc-700 transition-colors shadow-2xs"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-3.5 h-3.5" />
          </a>
          <a
            href="mailto:rakapradana.work@gmail.com"
            className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 text-zinc-700 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:border-zinc-400 dark:hover:border-zinc-700 transition-colors shadow-2xs"
            aria-label="Gmail Dispatch"
          >
            <GmailLogo className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Right: Copyright & Back to Top */}
        <div className="flex items-center gap-4">
          <span className="text-zinc-600 dark:text-zinc-400">&copy; {currentYear} • Built with Next.js & Tailwind</span>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 p-2 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-zinc-800 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors cursor-pointer shadow-2xs"
            title="Back to Top"
            aria-label="Back to Top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
