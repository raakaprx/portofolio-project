"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden grid-mesh"
    >
      {/* Background Radial Glow */}
      <div className="absolute inset-0 pointer-events-none radial-glow" />

      {/* Grid background mask */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Text Content */}
        <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center self-center lg:self-start gap-2 px-3 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm mb-6"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-medium text-zinc-400 font-mono">
              Available for Freelance & Full-time Roles
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]"
          >
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400">Raka</span>
            <br />
            <span className="text-zinc-500">Full Stack Developer</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-zinc-400 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
          >
            I am an Information Systems Student and Full Stack Web Developer. I specialize in building highly performant, accessible, and clean digital experiences. Eager to solve complex scaling challenges and write elegant code.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
          >
            <a
              href="#featured"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white text-black font-semibold hover:bg-zinc-200 transition-colors duration-200 group"
            >
              View Projects
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="/cv.pdf"
              download
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-zinc-800 bg-zinc-900/40 text-zinc-300 font-medium hover:bg-zinc-900 hover:text-white transition-colors duration-200"
            >
              Download CV
              <Download className="w-4 h-4" />
            </a>

            <div className="flex items-center gap-3 mt-4 sm:mt-0 sm:ml-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-full border border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors"
                aria-label="GitHub Profile"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-full border border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors"
                aria-label="LinkedIn Profile"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Profile Image & Premium Decorative Graphics */}
        <div className="lg:col-span-5 flex justify-center items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
            className="relative w-72 h-72 sm:w-96 sm:h-96"
          >
            {/* Outer animated ring */}
            <div className="absolute inset-0 rounded-full border border-dashed border-zinc-800 animate-[spin_60s_linear_infinite]" />

            {/* Inner glowing circle */}
            <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-zinc-950 to-zinc-900 border border-zinc-800 flex items-center justify-center overflow-hidden shadow-2xl">
              {/* Premium Placeholder Graphic representing full-stack code */}
              <div className="relative w-full h-full flex flex-col justify-center items-center p-6 text-left font-mono text-[10px] text-zinc-600 select-none">
                <div className="absolute inset-0 bg-radial-gradient(circle, transparent 20%, #000 90%) opacity-30 pointer-events-none" />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="w-full flex flex-col gap-1.5 opacity-40"
                >
                  <p className="text-zinc-500">const developer = &#123;</p>
                  <p className="pl-4">name: "Raka",</p>
                  <p className="pl-4">role: "Full Stack Engineer",</p>
                  <p className="pl-4 text-zinc-400">skills: ["Next.js", "TypeScript", "Tailwind", "Node.js"],</p>
                  <p className="pl-4">passion: "Clean Architecture",</p>
                  <p className="pl-4">status: "Building the Future"</p>
                  <p className="text-zinc-500">&#125;;</p>
                  <p className="text-emerald-700 mt-2">// Ready to deploy code</p>
                </motion.div>
                
                {/* Visual design element representing tech structure */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-48 h-48 rounded-full border border-white/5 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full border border-white/[0.03] flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-white/[0.02] border border-white/[0.01]" />
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-6 text-center text-xs tracking-widest text-zinc-500 font-sans uppercase">
                  raka // dev
                </div>
              </div>
            </div>

            {/* Glowing floating blobs */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/5 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-zinc-500/5 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
