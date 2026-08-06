"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#featured" },
  { label: "Journey", href: "#journey" },
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

      // Simple active section detection
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
        // If element is in view (approx)
        return sec.top <= 120 && sec.top + sec.height > 120;
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
        scrolled ? "py-4 bg-black/60 backdrop-blur-md border-b border-zinc-800/80" : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2 group">
          <span className="font-mono text-xl font-bold tracking-tight text-white transition-colors duration-300">
            RAKA<span className="text-zinc-500 group-hover:text-white transition-colors duration-300">.DEV</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-zinc-900/40 border border-zinc-800/50 rounded-full px-2 py-1 backdrop-blur-sm">
          {NAV_ITEMS.map((item) => {
            const id = item.href.substring(1);
            const isActive = activeSection === id || (id === "featured" && activeSection === "projects");
            return (
              <a
                key={item.href}
                href={item.href}
                className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
                  isActive ? "text-white" : "text-zinc-400 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNav"
                    className="absolute inset-0 bg-zinc-800/80 rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-black font-medium text-sm hover:bg-zinc-200 transition-colors duration-200"
          >
            Let's Talk
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-zinc-400 hover:text-white transition-colors"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 bg-black/95 border-b border-zinc-800 px-6 py-6 md:hidden flex flex-col gap-4 backdrop-blur-lg"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium text-zinc-400 hover:text-white transition-colors py-1"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-white text-black font-semibold hover:bg-zinc-200 transition-colors"
            >
              Let's Talk
              <ArrowRight className="w-4.5 h-4.5" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
