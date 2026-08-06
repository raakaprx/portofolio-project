"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Server,
  Database,
  Layers,
  Wrench,
  Cloud,
  Terminal,
  Cpu
} from "lucide-react";

interface SkillItem {
  name: string;
  level: number; // 0 to 100
}

interface SkillGroup {
  category: string;
  icon: any;
  skills: SkillItem[];
}

const SKILL_GROUPS: SkillGroup[] = [
  {
    category: "Programming Languages",
    icon: Code2,
    skills: [
      { name: "TypeScript", level: 90 },
      { name: "JavaScript", level: 95 },
      { name: "Python", level: 75 },
      { name: "SQL", level: 85 },
    ],
  },
  {
    category: "Frontend",
    icon: Cpu,
    skills: [
      { name: "React", level: 92 },
      { name: "Next.js", level: 90 },
      { name: "HTML5 & CSS3", level: 95 },
      { name: "Vue.js", level: 60 },
    ],
  },
  {
    category: "Backend",
    icon: Server,
    skills: [
      { name: "Node.js (Express)", level: 88 },
      { name: "NestJS", level: 80 },
      { name: "REST APIs", level: 90 },
      { name: "GraphQL", level: 70 },
    ],
  },
  {
    category: "Database",
    icon: Database,
    skills: [
      { name: "PostgreSQL", level: 85 },
      { name: "MongoDB", level: 80 },
      { name: "Redis", level: 70 },
      { name: "Prisma", level: 88 },
    ],
  },
  {
    category: "UI Framework",
    icon: Layers,
    skills: [
      { name: "Tailwind CSS", level: 95 },
      { name: "shadcn/ui", level: 92 },
      { name: "Framer Motion", level: 85 },
      { name: "Material UI", level: 75 },
    ],
  },
  {
    category: "DevOps",
    icon: Cloud,
    skills: [
      { name: "Docker", level: 75 },
      { name: "Vercel / Netlify", level: 90 },
      { name: "GitHub Actions", level: 70 },
      { name: "AWS (S3/EC2)", level: 65 },
    ],
  },
  {
    category: "Tools & Others",
    icon: Wrench,
    skills: [
      { name: "Git & GitHub", level: 92 },
      { name: "Postman", level: 90 },
      { name: "Linux CLI", level: 80 },
      { name: "Figma", level: 75 },
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 bg-black relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-3"
          >
            Capabilities
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-white tracking-tight"
          >
            Skills & Expertise
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SKILL_GROUPS.map((group, groupIdx) => {
            const Icon = group.icon;
            return (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: groupIdx * 0.05 }}
                className="glass-card rounded-2xl p-6 flex flex-col"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-white text-base">{group.category}</h3>
                </div>

                <div className="flex flex-col gap-4 flex-1 justify-center">
                  {group.skills.map((skill) => (
                    <div key={skill.name} className="flex flex-col gap-2">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-zinc-300 font-medium">{skill.name}</span>
                        <span className="text-zinc-500">{skill.level}%</span>
                      </div>
                      
                      {/* Skill visual level bar */}
                      <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden border border-zinc-800/40">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="h-full bg-white rounded-full relative"
                        >
                          <div className="absolute right-0 top-0 bottom-0 w-2 bg-zinc-300 animate-pulse" />
                        </motion.div>
                      </div>
                    </div>
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
