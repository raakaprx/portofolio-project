"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Copy,
  Check,
  MessageSquare,
  ArrowUpRight,
  Send,
} from "lucide-react";
import { Github, Linkedin } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const emailAddress = "rakapradana.work@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const socialLinks = [
    {
      label: "GitHub Profile",
      handle: "github.com/raakaprx",
      href: "https://github.com/raakaprx",
      icon: Github,
      detail: "View open-source repositories & commits",
    },
    {
      label: "LinkedIn Network",
      handle: "linkedin.com/in/rakaprx",
      href: "https://linkedin.com/in/rakaprx",
      icon: Linkedin,
      detail: "Professional career updates & endorsements",
    },
    {
      label: "Direct WhatsApp",
      handle: "+62 851-5600-0636",
      href: "https://wa.me/6285156000636",
      icon: MessageSquare,
      detail: "Instant messaging for project inquiries",
    },
  ];

  return (
    <section id="contact" className="py-24 bg-black relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <Badge variant="outline" className="mb-3 px-3 py-1 font-mono text-zinc-400">
            Initiate Contact
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Let&apos;s Build Something Exceptional
          </h2>
          <p className="text-zinc-400 text-sm max-w-md mt-3">
            Whether you have an engineering opening, a scalable software challenge, or a contract project, my inbox is always open.
          </p>
        </div>

        {/* Minimalist Contact Bento Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Email Action Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 flex flex-col"
          >
            <Card className="h-full flex flex-col justify-between p-8 border-zinc-800/80 bg-zinc-950/80 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

              <div>
                <div className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 w-fit mb-6 text-zinc-300">
                  <Mail className="w-6 h-6" />
                </div>

                <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-1 font-semibold">
                  Direct Email Dispatch
                </p>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                  {emailAddress}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed max-w-md">
                  Expect a prompt response within 24 hours. Feel free to copy my address directly or launch your default mail client.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-8 mt-6 border-t border-zinc-900">
                <Button
                  onClick={handleCopyEmail}
                  className="rounded-xl bg-white text-zinc-950 hover:bg-zinc-200 font-semibold gap-2"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      Copied to Clipboard!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy Email Address
                    </>
                  )}
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="rounded-xl border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 text-zinc-200 gap-2"
                >
                  <a href={`mailto:${emailAddress}`}>
                    Open Mail App
                    <Send className="w-3.5 h-3.5" />
                  </a>
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Social Channels List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-5 flex flex-col gap-4"
          >
            {socialLinks.map((item) => {
              const Icon = item.icon;

              return (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group rounded-2xl border border-zinc-800/80 bg-zinc-950/60 p-5 flex items-center justify-between hover:border-zinc-700 hover:bg-zinc-900/40 transition-all duration-200"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 group-hover:text-white group-hover:border-zinc-700 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-zinc-200 transition-colors">
                        {item.label}
                      </h4>
                      <p className="text-xs font-mono text-zinc-500 mt-0.5">{item.handle}</p>
                    </div>
                  </div>

                  <div className="p-2 rounded-lg bg-zinc-900/50 border border-zinc-800/60 text-zinc-500 group-hover:text-white group-hover:border-zinc-700 transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </a>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
