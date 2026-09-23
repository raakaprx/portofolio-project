"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Inbox,
  Mail,
  MailOpen,
  Trash2,
  Clock,
  Search,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  User,
  AtSign,
} from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ContactMessage } from "./page";

interface Props {
  initialMessages: ContactMessage[];
}

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(iso));
}

export default function MessagesClient({ initialMessages }: Props) {
  const [messages, setMessages] = useState<ContactMessage[]>(initialMessages);
  const [search, setSearch] = useState("");
  const [filterUnread, setFilterUnread] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const unreadCount = messages.filter((m) => !m.is_read).length;

  const filtered = messages.filter((m) => {
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      m.name.toLowerCase().includes(q) ||
      m.email.toLowerCase().includes(q) ||
      m.message.toLowerCase().includes(q);
    const matchesFilter = !filterUnread || !m.is_read;
    return matchesSearch && matchesFilter;
  });

  const handleToggle = async (msg: ContactMessage) => {
    const isExpanding = expandedId !== msg.id;
    setExpandedId(isExpanding ? msg.id : null);

    // Mark as read when opening an unread message
    if (isExpanding && !msg.is_read) {
      startTransition(async () => {
        try {
          const res = await fetch(`/api/contact/${msg.id}/read`, {
            method: "PATCH",
          });
          if (res.ok) {
            setMessages((prev) =>
              prev.map((m) => (m.id === msg.id ? { ...m, is_read: true } : m))
            );
          }
        } catch {
          // silent – non-critical
        }
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this message? This action cannot be undone.")) return;

    startTransition(async () => {
      try {
        const res = await fetch(`/api/contact/${id}`, { method: "DELETE" });
        if (!res.ok) throw new Error("Failed");
        setMessages((prev) => prev.filter((m) => m.id !== id));
        if (expandedId === id) setExpandedId(null);
        toast.success("Message deleted");
      } catch {
        toast.error("Failed to delete message");
      }
    });
  };

  const handleMarkAllRead = async () => {
    startTransition(async () => {
      try {
        const res = await fetch("/api/contact/read-all", { method: "PATCH" });
        if (!res.ok) throw new Error("Failed");
        setMessages((prev) => prev.map((m) => ({ ...m, is_read: true })));
        toast.success("All messages marked as read");
      } catch {
        toast.error("Failed to update messages");
      }
    });
  };

  const handleRefresh = async () => {
    startTransition(async () => {
      try {
        const res = await fetch("/api/contact", { method: "GET" });
        if (!res.ok) throw new Error("Failed");
        const json = await res.json();
        setMessages(json.messages || []);
        toast.success("Messages refreshed");
      } catch {
        toast.error("Failed to refresh messages");
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <Inbox className="w-5 h-5 text-emerald-500" />
            <h1 className="text-xl font-bold text-white font-mono">
              Messages
            </h1>
            {unreadCount > 0 && (
              <Badge className="bg-emerald-600 text-white text-[10px] px-2 py-0.5 rounded-full font-mono">
                {unreadCount} new
              </Badge>
            )}
          </div>
          <p className="text-xs text-zinc-400 mt-0.5 font-mono">
            {messages.length} total messages
          </p>
        </div>

        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <Button
              size="sm"
              variant="ghost"
              onClick={handleMarkAllRead}
              disabled={isPending}
              className="text-xs text-zinc-400 hover:text-white hover:bg-zinc-800 font-mono"
            >
              <MailOpen className="w-3.5 h-3.5 mr-1.5" />
              Mark all as read
            </Button>
          )}
          <Button
            size="sm"
            variant="ghost"
            onClick={handleRefresh}
            disabled={isPending}
            className="text-xs text-zinc-400 hover:text-white hover:bg-zinc-800"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isPending ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
          <Input
            placeholder="Search by name, email, or message content..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-9 bg-zinc-900 border-zinc-700 text-zinc-200 placeholder:text-zinc-600 text-xs focus-visible:ring-emerald-500"
          />
        </div>
        <Button
          size="sm"
          variant={filterUnread ? "default" : "outline"}
          onClick={() => setFilterUnread((v) => !v)}
          className={`text-xs font-mono h-9 ${
            filterUnread
              ? "bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-600"
              : "border-zinc-700 text-zinc-400 hover:text-white hover:bg-zinc-800 bg-transparent"
          }`}
        >
          <Mail className="w-3.5 h-3.5 mr-1.5" />
          Unread only
        </Button>
      </div>

      {/* Messages list */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-zinc-500">
          <Inbox className="w-10 h-10 mb-3 opacity-30" />
          <p className="text-sm font-mono">
            {messages.length === 0
              ? "No messages received yet."
              : "No messages match your search."}
          </p>
        </div>
      ) : (
        <ul className="space-y-2">
          <AnimatePresence initial={false}>
            {filtered.map((msg) => {
              const isOpen = expandedId === msg.id;
              return (
                <motion.li
                  key={msg.id}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className={`rounded-xl border transition-colors ${
                    msg.is_read
                      ? "border-zinc-800 bg-zinc-900/60"
                      : "border-emerald-800/60 bg-emerald-950/20"
                  }`}
                >
                  {/* Row header */}
                  <button
                    className="w-full text-left px-5 py-4 flex items-center gap-4 group"
                    onClick={() => handleToggle(msg)}
                  >
                    {/* Read indicator */}
                    <div
                      className={`shrink-0 w-2 h-2 rounded-full mt-0.5 ${
                        msg.is_read ? "bg-zinc-700" : "bg-emerald-500"
                      }`}
                    />

                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <span
                          className={`text-sm font-semibold font-mono truncate ${
                            msg.is_read ? "text-zinc-300" : "text-white"
                          }`}
                        >
                          {msg.name}
                        </span>
                        <span className="text-[11px] text-zinc-500 font-mono truncate">
                          {msg.email}
                        </span>
                      </div>
                      {!isOpen && (
                        <p className="text-xs text-zinc-500 truncate mt-0.5 max-w-lg">
                          {msg.message}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="flex items-center gap-1 text-[11px] text-zinc-500 font-mono">
                        <Clock className="w-3 h-3" />
                        <span>{formatDate(msg.created_at)}</span>
                      </div>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
                      )}
                    </div>
                  </button>

                  {/* Expanded body */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 pt-1 border-t border-zinc-800 space-y-4">
                          {/* Meta */}
                          <div className="flex flex-wrap gap-4 text-xs font-mono text-zinc-400">
                            <span className="flex items-center gap-1.5">
                              <User className="w-3.5 h-3.5 text-zinc-600" />
                              {msg.name}
                            </span>
                            <a
                              href={`mailto:${msg.email}`}
                              className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
                            >
                              <AtSign className="w-3.5 h-3.5 text-zinc-600" />
                              {msg.email}
                            </a>
                          </div>

                          {/* Message body */}
                          <p className="text-sm text-zinc-200 leading-relaxed whitespace-pre-wrap bg-zinc-800/40 rounded-lg p-4">
                            {msg.message}
                          </p>

                          {/* Actions */}
                          <div className="flex items-center gap-2 pt-1">
                            <Button
                              size="sm"
                              asChild
                              className="text-xs bg-emerald-700 hover:bg-emerald-600 text-white font-mono h-8"
                            >
                              <a href={`mailto:${msg.email}?subject=Re: Portfolio Inquiry`}>
                                <Mail className="w-3.5 h-3.5 mr-1.5" />
                                Reply via Email
                              </a>
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDelete(msg.id)}
                              disabled={isPending}
                              className="text-xs text-red-400 hover:text-red-300 hover:bg-red-950/30 font-mono h-8"
                            >
                              <Trash2 className="w-3.5 h-3.5 mr-1.5" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>
      )}
    </div>
  );
}
