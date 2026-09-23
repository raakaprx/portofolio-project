"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Copy,
  Check,
  ArrowUpRight,
  Send,
  Loader2,
  Mail,
  User as UserIcon,
  MessageSquare,
} from "lucide-react";
import { Github, Linkedin, WhatsappLogo, GmailLogo } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { DEFAULT_PROFILE, type ProfileData } from "@/lib/portfolio-defaults";

export default function Contact({
  initialProfile,
}: {
  initialProfile?: ProfileData;
}) {
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const profile = initialProfile || DEFAULT_PROFILE;
  const emailAddress = profile.email || DEFAULT_PROFILE.email || "rakapradana.work@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    toast.success("Email copied to clipboard!");
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Please enter your name.");
      return;
    }
    if (!senderEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(senderEmail)) {
      toast.error("Invalid email address format.");
      return;
    }
    if (!message.trim() || message.trim().length < 8) {
      toast.error("Message is too short (minimum 8 characters).");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: senderEmail.trim(),
          message: message.trim(),
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        toast.error(json.error || "Failed to send message.");
        return;
      }

      toast.success("Message sent! I will get back to you shortly.");
      setName("");
      setSenderEmail("");
      setMessage("");
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const githubHref = profile.github_url || DEFAULT_PROFILE.github_url;
  const linkedinHref = profile.linkedin_url || DEFAULT_PROFILE.linkedin_url;
  const whatsappHref = profile.whatsapp_url || DEFAULT_PROFILE.whatsapp_url;

  const socialLinks = [
    {
      label: "GitHub",
      handle: githubHref.replace(/^https?:\/\//, ""),
      href: githubHref,
      icon: Github,
      detail: "View open-source repositories & commits",
    },
    {
      label: "LinkedIn",
      handle: linkedinHref.replace(/^https?:\/\//, ""),
      href: linkedinHref,
      icon: Linkedin,
      detail: "Professional career updates & endorsements",
    },
    {
      label: "WhatsApp",
      handle: profile.phone || "+62 851-5600-0636",
      href: whatsappHref,
      icon: WhatsappLogo,
      detail: "Instant messaging for project inquiries",
    },
  ];

  return (
    <section id="contact" className="py-24 bg-background relative overflow-hidden transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <Badge
            variant="outline"
            className="mb-3 px-3.5 py-1 font-mono text-zinc-800 dark:text-zinc-300 border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xs"
          >
            Initiate Contact
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 dark:text-white tracking-tight">
            Let&apos;s Build Something Exceptional
          </h2>
          <p className="text-zinc-700 dark:text-zinc-300 text-sm max-w-md mt-3 font-normal">
            Whether you have an engineering opening, a scalable software challenge, or a contract project, my inbox is always open.
          </p>
        </div>

        {/* Bento Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Column: Direct Email & Social Channels */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Quick Email Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <Card className="p-6 sm:p-7 border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950/80 relative overflow-hidden shadow-xs hover:shadow-md transition-all">
                <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-white shadow-2xs">
                    <GmailLogo className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-mono text-zinc-600 dark:text-zinc-400 uppercase tracking-widest font-bold">
                      Direct Email
                    </p>
                    <h3 className="text-sm sm:text-base font-bold text-zinc-950 dark:text-white break-all">
                      {emailAddress}
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mb-5 font-normal">
                  Fast response time, usually within 24 hours. Copy the email address or use the form below.
                </p>

                <div className="flex items-center gap-2">
                  <Button
                    onClick={handleCopyEmail}
                    data-track-event="contact_click"
                    data-track-target="Copy Email"
                    size="sm"
                    className="flex-1 rounded-xl bg-zinc-950 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200 text-xs font-semibold gap-1.5 cursor-pointer shadow-xs"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        Copy Email
                      </>
                    )}
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="flex-1 rounded-xl border border-zinc-300 dark:border-zinc-750 bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-xs font-semibold gap-1.5"
                  >
                    <a
                      href={`mailto:${emailAddress}`}
                      data-track-event="contact_click"
                      data-track-target="Direct Email App"
                    >
                      Open App
                      <Send className="w-3 h-3" />
                    </a>
                  </Button>
                </div>
              </Card>
            </motion.div>

            {/* Social Channels List */}
            {socialLinks.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.05 * idx }}
                  data-track-event="contact_click"
                  data-track-target={item.label}
                  className="group rounded-2xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950/80 p-4 flex items-center justify-between hover:border-zinc-400 dark:hover:border-zinc-700 hover:shadow-xs transition-all duration-200 shadow-2xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 group-hover:border-zinc-400 dark:group-hover:border-zinc-700 transition-colors shadow-2xs">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-zinc-950 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {item.label}
                      </h4>
                      <p className="text-[11px] font-mono text-zinc-600 dark:text-zinc-400">{item.handle}</p>
                    </div>
                  </div>

                  <div className="p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-900/60 border border-zinc-300 dark:border-zinc-800 text-zinc-700 dark:text-zinc-400 group-hover:text-zinc-950 dark:group-hover:text-white transition-colors">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </motion.a>
              );
            })}
          </div>

          {/* Right Column: Interactive Message Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7 flex flex-col"
          >
            <Card className="h-full flex flex-col justify-between p-7 sm:p-8 border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950/80 relative overflow-hidden shadow-xs hover:shadow-md transition-all">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2 text-zinc-950 dark:text-white">
                  <MessageSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <h3 className="font-bold text-lg tracking-tight">Direct Message</h3>
                </div>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-normal">
                  Drop a message, collaboration proposal, or project inquiry directly here.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5">
                      <UserIcon className="w-3.5 h-3.5 text-zinc-500" />
                      Full Name
                    </label>
                    <Input
                      type="text"
                      placeholder="e.g. John Doe / Engineering Lead"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="bg-zinc-50/80 dark:bg-zinc-900/60 border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus-visible:ring-emerald-500 h-10 text-xs sm:text-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-zinc-500" />
                      Email Address
                    </label>
                    <Input
                      type="email"
                      placeholder="e.g. recruiter@company.com"
                      value={senderEmail}
                      onChange={(e) => setSenderEmail(e.target.value)}
                      required
                      className="bg-zinc-50/80 dark:bg-zinc-900/60 border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus-visible:ring-emerald-500 h-10 text-xs sm:text-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-zinc-500" />
                      Message & Requirements
                    </label>
                    <Textarea
                      rows={4}
                      placeholder="Describe your engineering opening, project scope, or technical challenges..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      className="bg-zinc-50/80 dark:bg-zinc-900/60 border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus-visible:ring-emerald-500 resize-none text-xs sm:text-sm p-3 min-h-[110px]"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-200 dark:border-zinc-850">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-xl bg-zinc-950 text-white hover:bg-zinc-800 dark:bg-emerald-600 dark:text-white dark:hover:bg-emerald-500 font-semibold gap-2 h-11 text-xs sm:text-sm cursor-pointer shadow-sm transition-all"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
