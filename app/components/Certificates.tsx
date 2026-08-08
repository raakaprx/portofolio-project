"use client";

import { motion } from "framer-motion";
import { Award, ExternalLink, ShieldCheck } from "lucide-react";

interface Certificate {
  title: string;
  issuer: string;
  date: string;
  credentialUrl: string;
  skillsVerified: string[];
}

const CERTIFICATES: Certificate[] = [
  {
    title: "Sertifikat Kompetensi - Pengembang Web Bersertifikat (CWDev)",
    issuer: "Badan Nasional Sertifikasi Profesi (BNSP)",
    date: "Jun 2026",
    credentialUrl: "https://bnsp.go.id",
    skillsVerified: ["Pengembangan Perangkat Lunak", "Pemrograman", "Web Development"]
  }
];

export default function Certificates() {
  return (
    <section id="certificates" className="py-24 bg-black relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-3"
          >
            Credentials
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-white tracking-tight"
          >
            Certificates & Accreditation
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CERTIFICATES.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="glass-card rounded-2xl p-6 flex flex-col justify-between hover:bg-zinc-950/20 group"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-900 text-zinc-400 group-hover:text-white transition-colors">
                    <Award className="w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-mono text-zinc-500">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Verified</span>
                  </div>
                </div>

                <h3 className="font-bold text-white text-base leading-snug mb-2 group-hover:text-zinc-300 transition-colors">
                  {cert.title}
                </h3>
                <p className="text-zinc-400 font-medium text-xs mb-1">{cert.issuer}</p>
                <p className="text-[10px] font-mono text-zinc-650">{cert.date}</p>
              </div>

              <div className="mt-8 pt-4 border-t border-zinc-900">
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {cert.skillsVerified.map((skill) => (
                    <span
                      key={skill}
                      className="text-[9px] font-mono text-zinc-500 bg-zinc-950 px-2 py-0.5 rounded border border-zinc-900"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-white group-hover:text-zinc-300 transition-colors"
                >
                  View Credential
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
