"use client";

import { motion } from "framer-motion";
import { Laptop, Database, Cpu, HardDrive, ShieldAlert, Code } from "lucide-react";

interface TechItem {
  name: string;
  isStrong?: boolean;
}

interface TechCategory {
  title: string;
  icon: any;
  items: TechItem[];
}

const TECH_CATALOG: TechCategory[] = [
  {
    title: "Languages",
    icon: Code,
    items: [
      { name: "TypeScript", isStrong: true },
      { name: "JavaScript", isStrong: true },
      { name: "Python" },
      { name: "HTML5 / CSS3", isStrong: true },
      { name: "SQL", isStrong: true }
    ]
  },
  {
    title: "Frontend Stack",
    icon: Laptop,
    items: [
      { name: "React", isStrong: true },
      { name: "Next.js", isStrong: true },
      { name: "Framer Motion", isStrong: true },
      { name: "Tailwind CSS", isStrong: true },
      { name: "shadcn/ui", isStrong: true }
    ]
  },
  {
    title: "Backend Stack",
    icon: Cpu,
    items: [
      { name: "Node.js (Express)", isStrong: true },
      { name: "NestJS", isStrong: true },
      { name: "REST APIs", isStrong: true },
      { name: "GraphQL" }
    ]
  },
  {
    title: "Databases & ORMs",
    icon: Database,
    items: [
      { name: "PostgreSQL", isStrong: true },
      { name: "MongoDB", isStrong: true },
      { name: "Prisma ORM", isStrong: true },
      { name: "Redis" }
    ]
  },
  {
    title: "DevOps & Cloud",
    icon: HardDrive,
    items: [
      { name: "Docker", isStrong: true },
      { name: "GitHub Actions" },
      { name: "Vercel / Netlify", isStrong: true },
      { name: "AWS S3 / EC2" }
    ]
  }
];

export default function TechStack() {
  return (
    <section id="techstack" className="py-24 bg-black relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-3"
          >
            Stack
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-white tracking-tight"
          >
            Complete Stack & Tools
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TECH_CATALOG.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="glass-card rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-zinc-950 border border-zinc-900 text-zinc-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-white text-base">{cat.title}</h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <span
                      key={item.name}
                      className={`px-3 py-1.5 rounded-full text-xs font-mono border ${
                        item.isStrong
                          ? "bg-white text-black font-semibold border-white"
                          : "bg-zinc-950 text-zinc-400 border-zinc-800"
                      }`}
                    >
                      {item.name}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
