"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, ChevronRight } from "lucide-react";

interface ExperienceItem {
  company: string;
  role: string;
  duration: string;
  type: "Internship" | "Freelance" | "Academic" | "Organization";
  responsibilities: string[];
  technologies: string[];
}

const EXPERIENCES: ExperienceItem[] = [
  {
    company: "PT. Sundaya",
    role: "Frontend Developer Intern",
    duration: "Jan – Mar 2025",
    type: "Internship",
    responsibilities: [
      "Mengembangkan dan merancang responsive warehouse management web application yang mendukung 50+ concurrent users di seluruh site distribusi.",
      "Membangun reusable React.js components dengan optimized state management, serta mengimplementasikan lazy loading dan code-splitting untuk mengurangi page load times hingga 40%.",
      "Mengintegrasikan frontend dengan REST APIs untuk mengaktifkan pelacakan inventaris real-time, mengurangi kesalahan entri data manual hingga 85%.",
      "Berkolaborasi dengan stakeholder gudang untuk merancang UI/UX yang intuitif demi mencapai tingkat adopsi pengguna 95%."
    ],
    technologies: ["React.js", "JavaScript", "HTML5", "CSS3", "REST APIs"],
  },
  {
    company: "Campus Election Committee (PEMIRA)",
    role: "Public Relations Staff",
    duration: "2024",
    type: "Organization",
    responsibilities: [
      "Berkoordinasi dalam mengorganisir stakeholder communication untuk kampanye student election dengan strategi komunikasi yang efektif dan responsif terhadap berbagai stakeholder."
    ],
    technologies: ["Communication", "Stakeholder Management", "Public Relations"],
  },
  {
    company: "Transformation The Nation",
    role: "Fundraising Division",
    duration: "2023",
    type: "Organization",
    responsibilities: [
      "Mengembangkan donor engagement strategies yang berhasil meningkatkan pencapaian target fundraising sebesar 30% melalui strategi komunikasi yang strategic, relationship building yang efektif, dan proposal development yang compelling."
    ],
    technologies: ["Fundraising", "Strategic Communication", "Proposal Development"],
  }
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 bg-black relative">
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-3"
          >
            History
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-white tracking-tight"
          >
            Work & Projects Experience
          </motion.h2>
        </div>

        {/* Timeline container */}
        <div className="relative border-l border-zinc-800/80 ml-4 md:ml-6 flex flex-col gap-12">
          {EXPERIENCES.map((exp, index) => (
            <motion.div
              key={`${exp.company}-${exp.role}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative pl-8 md:pl-10 group"
            >
              {/* Point on timeline */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-black border border-zinc-700 group-hover:border-white transition-colors duration-300 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-600 group-hover:bg-white transition-colors duration-300" />
              </div>

              <div className="glass-card rounded-2xl p-6 md:p-8 hover:bg-zinc-950/30 transition-all duration-300">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-medium border border-zinc-800 bg-zinc-900/50 text-zinc-400 mb-2">
                      {exp.type}
                    </span>
                    <h3 className="text-xl font-bold text-white leading-tight">{exp.role}</h3>
                    <p className="text-zinc-400 font-medium text-sm mt-0.5">{exp.company}</p>
                  </div>
                  
                  <div className="flex items-center gap-1.5 text-zinc-500 font-mono text-xs">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{exp.duration}</span>
                  </div>
                </div>

                <ul className="flex flex-col gap-2.5 text-zinc-400 text-sm mb-6 pl-1">
                  {exp.responsibilities.map((resp, idx) => (
                    <li key={idx} className="flex gap-2 leading-relaxed">
                      <ChevronRight className="w-4 h-4 text-zinc-600 shrink-0 mt-1" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 rounded bg-zinc-950 border border-zinc-800/80 text-zinc-500 font-mono text-xs hover:text-white hover:border-zinc-700 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
