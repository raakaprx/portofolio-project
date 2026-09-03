"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, Code2, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Tech Stack", href: "#techstack" },
  { label: "Certificates", href: "#certificates" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = NAV_ITEMS.map((item) => {
        const id = item.href.substring(1);
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          return { id, top: rect.top, height: rect.height };
        }
        return null;
      }).filter(Boolean);

      const current = sections.find((sec) => {
        if (!sec) return false;
        return sec.top <= 140 && sec.top + sec.height > 140;
      });

      if (current) {
        setActiveSection(current.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-3.5 bg-black/80 backdrop-blur-xl border-b border-zinc-800/80 shadow-lg shadow-black/40"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#home" className="flex items-center gap-2 group">
          <div className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 group-hover:border-zinc-700 transition-colors">
            <Code2 className="w-4 h-4 text-zinc-300 group-hover:text-white transition-colors" />
          </div>
          <span className="font-mono text-sm font-bold tracking-tight text-white transition-colors duration-200">
            RAKA<span className="text-zinc-500 group-hover:text-zinc-300">.DEV</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 bg-zinc-950/70 border border-zinc-800/80 rounded-full px-2 py-1 backdrop-blur-md">
          {NAV_ITEMS.map((item) => {
            const id = item.href.substring(1);
            const isActive = activeSection === id;

            return (
              <a
                key={item.href}
                href={item.href}
                className={`relative px-3.5 py-1.5 text-xs font-mono font-medium rounded-full transition-colors duration-200 ${
                  isActive ? "text-white" : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNav"
                    className="absolute inset-0 bg-zinc-800/90 border border-zinc-700/60 rounded-full -z-10 shadow-sm"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Quick Action Button */}
        <div className="hidden md:flex items-center gap-2.5">
          <Button
            asChild
            variant="outline"
            size="sm"
            className="rounded-full border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-300 hover:text-white px-3.5 h-9 text-xs gap-1.5"
          >
            <a href="/cv.pdf" target="_blank" rel="noopener noreferrer" download="CV_Muhammad_Raka_Pradana.pdf">
              <FileDown className="w-3.5 h-3.5 text-emerald-400" />
              <span>CV</span>
            </a>
          </Button>

          <Button
            asChild
            size="sm"
            className="rounded-full bg-white text-zinc-950 hover:bg-zinc-200 font-semibold px-4 h-9 shadow-sm text-xs"
          >
            <a href="#contact">
              Let&apos;s Talk
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </a>
          </Button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 bg-zinc-950/95 border-b border-zinc-800 px-6 py-6 lg:hidden flex flex-col gap-3 backdrop-blur-2xl"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-mono font-medium text-zinc-300 hover:text-white py-2 border-b border-zinc-900 transition-colors"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-2 flex flex-col gap-2.5">
              <Button
                asChild
                variant="outline"
                className="w-full rounded-xl border-zinc-800 bg-zinc-900/80 text-zinc-200 hover:text-white h-11 justify-center gap-2"
              >
                <a
                  href="/cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  download="CV_Muhammad_Raka_Pradana.pdf"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FileDown className="w-4 h-4 text-emerald-400" />
                  <span>Download CV</span>
                </a>
              </Button>

              <Button
                asChild
                className="w-full rounded-xl bg-white text-zinc-950 hover:bg-zinc-200 font-semibold h-11 justify-center"
              >
                <a href="#contact" onClick={() => setMobileMenuOpen(false)}>
                  Let&apos;s Talk
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
