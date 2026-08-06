"use client";

import { motion } from "framer-motion";
import { BookOpen, Trophy, Target, Sparkles } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-24 relative overflow-hidden bg-black">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-3"
          >
            About Me
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-white tracking-tight"
          >
            Behind the Code
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Biography Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-8 glass-card rounded-2xl p-8 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-zinc-400" />
                My Journey
              </h3>
              <p className="text-zinc-400 leading-relaxed mb-6">
                I am a passionate Full Stack Web Developer and an Information Systems student. My journey in tech started with a curiosity about how things work on the internet, which quickly evolved into a dedicated career path. I enjoy bridging the gap between elegant design and complex system architecture.
              </p>
              <p className="text-zinc-400 leading-relaxed">
                Whether designing a minimal frontend layout or architecting database systems, I prioritize scalability, reliability, and smooth user experiences. I focus on modern frameworks such as Next.js, React, and Node.js.
              </p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-8 pt-8 border-t border-zinc-800/60">
              <div>
                <p className="text-3xl font-extrabold text-white">4+</p>
                <p className="text-xs font-mono text-zinc-500 uppercase mt-1">Years of Learning</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-white">20+</p>
                <p className="text-xs font-mono text-zinc-500 uppercase mt-1">Projects Built</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-white">100%</p>
                <p className="text-xs font-mono text-zinc-500 uppercase mt-1">Commitment</p>
              </div>
            </div>
          </motion.div>

          {/* Side Info Cards */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Education Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="glass-card rounded-2xl p-6 flex-1 flex flex-col gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800">
                  <BookOpen className="w-5 h-5 text-zinc-400" />
                </div>
                <h4 className="font-semibold text-white">Education</h4>
              </div>
              <div>
                <p className="font-medium text-sm text-zinc-300">B.S. Information Systems</p>
                <p className="text-xs text-zinc-500 mt-0.5">Focus on Enterprise Architecture & Databases</p>
                <p className="text-xs text-zinc-600 mt-2">Expected Graduation: 2027</p>
              </div>
            </motion.div>

            {/* Career Objective Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass-card rounded-2xl p-6 flex-1 flex flex-col gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800">
                  <Target className="w-5 h-5 text-zinc-400" />
                </div>
                <h4 className="font-semibold text-white">Career Objective</h4>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed">
                To build next-generation applications as a Full Stack Web Developer. Aiming to design resilient web architectures that solve high-impact real-world needs.
              </p>
            </motion.div>

            {/* Current Focus Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="glass-card rounded-2xl p-6 flex-1 flex flex-col gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800">
                  <Trophy className="w-5 h-5 text-zinc-400" />
                </div>
                <h4 className="font-semibold text-white">Current Focus</h4>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Exploring Serverless functions, edge runtime optimization, and advanced patterns in NestJS/NextJS.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
