"use client";

import { ArrowUp, Mail } from "lucide-react";
import { Github, Linkedin } from "@/components/icons";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-12 bg-black border-t border-zinc-900 relative z-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono text-zinc-500">
        {/* Left: Branding & Status */}
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <span className="text-zinc-300 font-bold tracking-wider">
            MUHAMMAD RAKA PRADANA
          </span>
          <span className="hidden sm:inline text-zinc-700">•</span>
          <span className="flex items-center gap-1.5 text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
            All systems operational
          </span>
        </div>

        {/* Middle: Socials */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/raakaprx"
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-lg bg-zinc-950 border border-zinc-850 text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-3.5 h-3.5" />
          </a>
          <a
            href="https://linkedin.com/in/rakaprx"
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-lg bg-zinc-950 border border-zinc-850 text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-3.5 h-3.5" />
          </a>
          <a
            href="mailto:rakapradana.work@gmail.com"
            className="p-2 rounded-lg bg-zinc-950 border border-zinc-850 text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors"
            aria-label="Email"
          >
            <Mail className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Right: Copyright & Back to Top */}
        <div className="flex items-center gap-4">
          <span>&copy; {currentYear} • Built with Next.js & Tailwind</span>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 p-2 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            title="Back to Top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
