"use client";

import React, { useState, useMemo } from "react";
import {
  TrendingUp,
  BarChart3,
  Monitor,
  Smartphone,
  Eye,
  FileDown,
  FolderGit2,
  MessageSquare,
  Layers,
  Sparkles,
} from "lucide-react";

export interface AnalyticsEventRecord {
  id: string;
  event_type: string;
  page_path?: string;
  target_name?: string;
  device_type?: string;
  referrer?: string;
  user_agent?: string;
  ip_address?: string;
  created_at: string;
}

interface AnalyticsChartsProps {
  events: AnalyticsEventRecord[];
  dateFilter: "today" | "7d" | "30d" | "all";
  loading?: boolean;
}

interface TimeBucket {
  key: string;
  label: string;
  fullLabel: string;
  views: number;
  cvs: number;
  projects: number;
  contacts: number;
  total: number;
}

export function AnalyticsCharts({ events, dateFilter, loading = false }: AnalyticsChartsProps) {
  const [activeCategory, setActiveCategory] = useState<"all" | "page_view" | "cv_download" | "project_click" | "contact_click">("all");
  const [hoveredBucketIdx, setHoveredBucketIdx] = useState<number | null>(null);

  // 1. Time-series data grouping based on dateFilter
  const timeBuckets = useMemo<TimeBucket[]>(() => {
    if (!events) return [];

    const now = new Date();

    if (dateFilter === "today") {
      // 6 time blocks of 4 hours each today: 00-04, 04-08, 08-12, 12-16, 16-20, 20-24
      const buckets: TimeBucket[] = [
        { key: "h0", label: "00:00", fullLabel: "Pukul 00:00 - 03:59", views: 0, cvs: 0, projects: 0, contacts: 0, total: 0 },
        { key: "h4", label: "04:00", fullLabel: "Pukul 04:00 - 07:59", views: 0, cvs: 0, projects: 0, contacts: 0, total: 0 },
        { key: "h8", label: "08:00", fullLabel: "Pukul 08:00 - 11:59", views: 0, cvs: 0, projects: 0, contacts: 0, total: 0 },
        { key: "h12", label: "12:00", fullLabel: "Pukul 12:00 - 15:59", views: 0, cvs: 0, projects: 0, contacts: 0, total: 0 },
        { key: "h16", label: "16:00", fullLabel: "Pukul 16:00 - 19:59", views: 0, cvs: 0, projects: 0, contacts: 0, total: 0 },
        { key: "h20", label: "20:00", fullLabel: "Pukul 20:00 - 23:59", views: 0, cvs: 0, projects: 0, contacts: 0, total: 0 },
      ];

      events.forEach((ev) => {
        try {
          const evDate = new Date(ev.created_at);
          const hour = evDate.getHours();
          const bucketIdx = Math.min(Math.floor(hour / 4), 5);
          const b = buckets[bucketIdx];

          b.total += 1;
          if (ev.event_type === "page_view") b.views += 1;
          else if (ev.event_type === "cv_download") b.cvs += 1;
          else if (ev.event_type === "project_click") b.projects += 1;
          else if (ev.event_type === "contact_click") b.contacts += 1;
        } catch {
          // ignore date parse errors
        }
      });

      return buckets;
    }

    // Days count: 7 for 7d, 14 for 30d/all to keep chart spacious and legible
    const numDays = dateFilter === "7d" ? 7 : dateFilter === "30d" ? 14 : 10;
    const buckets: TimeBucket[] = [];

    for (let i = numDays - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(now.getDate() - i);
      d.setHours(0, 0, 0, 0);

      const key = d.toISOString().split("T")[0];
      const weekday = d.toLocaleDateString("id-ID", { weekday: "short" });
      const dayNum = d.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
      const fullLabel = d.toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      buckets.push({
        key,
        label: numDays <= 7 ? `${weekday} ${d.getDate()}` : dayNum,
        fullLabel,
        views: 0,
        cvs: 0,
        projects: 0,
        contacts: 0,
        total: 0,
      });
    }

    events.forEach((ev) => {
      try {
        const evKey = new Date(ev.created_at).toISOString().split("T")[0];
        const match = buckets.find((b) => b.key === evKey);
        if (match) {
          match.total += 1;
          if (ev.event_type === "page_view") match.views += 1;
          else if (ev.event_type === "cv_download") match.cvs += 1;
          else if (ev.event_type === "project_click") match.projects += 1;
          else if (ev.event_type === "contact_click") match.contacts += 1;
        }
      } catch {
        // ignore date parse errors
      }
    });

    return buckets;
  }, [events, dateFilter]);

  // 2. Metrics & Event Breakdown Calculations
  const stats = useMemo(() => {
    const total = events.length;
    const views = events.filter((e) => e.event_type === "page_view").length;
    const cvs = events.filter((e) => e.event_type === "cv_download").length;
    const projects = events.filter((e) => e.event_type === "project_click").length;
    const contacts = events.filter((e) => e.event_type === "contact_click").length;

    // Devices
    const desktop = events.filter((e) => (e.device_type || "").toLowerCase().includes("desktop")).length;
    const mobile = events.filter((e) => (e.device_type || "").toLowerCase().includes("mobile")).length;
    const other = Math.max(0, total - (desktop + mobile));

    // Conversion rate: (CV + Contacts) / Views
    const cvRate = views > 0 ? ((cvs / views) * 100).toFixed(1) : "0.0";
    const contactRate = views > 0 ? ((contacts / views) * 100).toFixed(1) : "0.0";

    // Top Action Targets
    const targetMap: Record<string, { count: number; type: string }> = {};
    events.forEach((ev) => {
      const name = ev.target_name || ev.page_path || "Beranda Portfolio";
      if (!targetMap[name]) {
        targetMap[name] = { count: 0, type: ev.event_type };
      }
      targetMap[name].count += 1;
    });

    const topTargets = Object.entries(targetMap)
      .map(([name, val]) => ({ name, count: val.count, type: val.type }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    return {
      total,
      views,
      cvs,
      projects,
      contacts,
      desktop,
      mobile,
      other,
      cvRate,
      contactRate,
      topTargets,
    };
  }, [events]);

  // Max value calculation for chart scaling
  const maxBucketValue = useMemo(() => {
    const values = timeBuckets.map((b) => {
      if (activeCategory === "all") return b.total;
      if (activeCategory === "page_view") return b.views;
      if (activeCategory === "cv_download") return b.cvs;
      if (activeCategory === "project_click") return b.projects;
      return b.contacts;
    });
    return Math.max(...values, 4);
  }, [timeBuckets, activeCategory]);

  const getActiveBucketCount = (b: TimeBucket) => {
    if (activeCategory === "all") return b.total;
    if (activeCategory === "page_view") return b.views;
    if (activeCategory === "cv_download") return b.cvs;
    if (activeCategory === "project_click") return b.projects;
    return b.contacts;
  };

  const getBarColor = (type: string, isHovered: boolean) => {
    if (isHovered) return "bg-blue-400 shadow-[0_0_12px_rgba(96,165,250,0.4)]";
    switch (type) {
      case "page_view":
        return "bg-blue-500/90 hover:bg-blue-400";
      case "cv_download":
        return "bg-emerald-500/90 hover:bg-emerald-400";
      case "project_click":
        return "bg-purple-500/90 hover:bg-purple-400";
      case "contact_click":
        return "bg-amber-500/90 hover:bg-amber-400";
      default:
        return "bg-blue-500/90 hover:bg-blue-400";
    }
  };

  if (loading) {
    return (
      <div className="p-8 rounded-2xl bg-zinc-900 border border-zinc-800 text-center font-mono text-xs text-zinc-500 animate-pulse">
        Memuat data visualisasi analitik...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ─── 1. Main Timeline Activity Chart ─────────────────────────── */}
      <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-sm">
        {/* Header with Title and Category Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-800/80">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-blue-950/60 border border-blue-800/60 text-blue-400">
                <TrendingUp className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold font-mono text-white">
                Tren Interaksi & Frekuensi Aktivitas
              </h3>
            </div>
            <p className="text-xs text-zinc-400 font-mono mt-1">
              {dateFilter === "today"
                ? "Distribusi per rentang jam aktivitas hari ini"
                : `Tren aktivitas pengunjung (${timeBuckets.length} periode waktu terakhir)`}
            </p>
          </div>

          {/* Interactive Event Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-mono">
            <button
              type="button"
              onClick={() => setActiveCategory("all")}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                activeCategory === "all"
                  ? "bg-zinc-800 text-white font-semibold border border-zinc-700/80"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Semua ({stats.total})
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory("page_view")}
              className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
                activeCategory === "page_view"
                  ? "bg-blue-950 text-blue-300 font-semibold border border-blue-800"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              Views ({stats.views})
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory("cv_download")}
              className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
                activeCategory === "cv_download"
                  ? "bg-emerald-950 text-emerald-300 font-semibold border border-emerald-800"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              CV ({stats.cvs})
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory("project_click")}
              className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
                activeCategory === "project_click"
                  ? "bg-purple-950 text-purple-300 font-semibold border border-purple-800"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              Projects ({stats.projects})
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory("contact_click")}
              className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
                activeCategory === "contact_click"
                  ? "bg-amber-950 text-amber-300 font-semibold border border-amber-800"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              Kontak ({stats.contacts})
            </button>
          </div>
        </div>

        {/* Visual Bar Canvas */}
        <div className="pt-6">
          <div className="relative">
            {/* Background Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-8">
              <div className="border-b border-zinc-800/60 w-full flex justify-between text-[10px] font-mono text-zinc-600">
                <span>Puncak ({maxBucketValue})</span>
              </div>
              <div className="border-b border-zinc-800/40 w-full flex justify-between text-[10px] font-mono text-zinc-600">
                <span>{Math.round(maxBucketValue / 2)}</span>
              </div>
              <div className="border-b border-zinc-800/80 w-full flex justify-between text-[10px] font-mono text-zinc-600">
                <span>0</span>
              </div>
            </div>

            {/* Bars Column */}
            <div className="h-52 flex items-end justify-between gap-1.5 sm:gap-3 pt-6 pb-8 relative z-10 px-1 sm:px-2">
              {timeBuckets.map((b, idx) => {
                const count = getActiveBucketCount(b);
                const heightPercent = maxBucketValue > 0 ? (count / maxBucketValue) * 100 : 0;
                const isHovered = hoveredBucketIdx === idx;

                return (
                  <div
                    key={b.key}
                    className="flex-1 flex flex-col items-center justify-end h-full group relative cursor-pointer"
                    onMouseEnter={() => setHoveredBucketIdx(idx)}
                    onMouseLeave={() => setHoveredBucketIdx(null)}
                  >
                    {/* Tooltip Box */}
                    {isHovered && (
                      <div className="absolute -top-20 z-30 px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-700 text-white text-[11px] font-mono shadow-2xl whitespace-nowrap pointer-events-none animate-in fade-in zoom-in-95 duration-150">
                        <p className="font-bold text-white mb-1">{b.fullLabel}</p>
                        <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 text-[10px]">
                          <span className="text-blue-400">Views: {b.views}</span>
                          <span className="text-emerald-400">CV: {b.cvs}</span>
                          <span className="text-purple-400">Projects: {b.projects}</span>
                          <span className="text-amber-400">Kontak: {b.contacts}</span>
                        </div>
                        <p className="mt-1 pt-1 border-t border-zinc-800 text-[10px] text-zinc-400">
                          Total Event: <strong className="text-white">{b.total}</strong>
                        </p>
                      </div>
                    )}

                    {/* Bar Component */}
                    <div className="w-full max-w-[48px] flex items-end justify-center h-full">
                      <div
                        style={{ height: `${Math.max(heightPercent, 4)}%` }}
                        className={`w-full rounded-t-md transition-all duration-300 ease-out ${
                          count === 0
                            ? "bg-zinc-800 group-hover:bg-zinc-700"
                            : getBarColor(activeCategory, isHovered)
                        }`}
                      />
                    </div>

                    {/* X-Axis Label */}
                    <div className="absolute -bottom-1 w-full text-center">
                      <span
                        className={`text-[10px] font-mono transition-colors duration-150 block truncate ${
                          isHovered ? "text-blue-300 font-bold" : "text-zinc-400 group-hover:text-zinc-200"
                        }`}
                      >
                        {b.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ─── 2. Row of Analytical Cards (Funnel, Devices, Top Targets) ─── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono">
        {/* Card A: Event Breakdown & Conversion Funnel */}
        <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 pb-4 border-b border-zinc-800">
              <Layers className="w-4 h-4 text-emerald-400" />
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Proporsi Interaksi & Konversi
              </h4>
            </div>

            <div className="space-y-3.5 mt-4 text-xs">
              {/* Page Views Bar */}
              <div>
                <div className="flex justify-between text-zinc-300 mb-1">
                  <span className="flex items-center gap-1.5 text-blue-400">
                    <Eye className="w-3.5 h-3.5" />
                    <span>Page Views</span>
                  </span>
                  <span className="font-semibold text-white">
                    {stats.views} ({stats.total > 0 ? Math.round((stats.views / stats.total) * 100) : 0}%)
                  </span>
                </div>
                <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${stats.total > 0 ? (stats.views / stats.total) * 100 : 0}%` }}
                  />
                </div>
              </div>

              {/* CV Downloads Bar */}
              <div>
                <div className="flex justify-between text-zinc-300 mb-1">
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <FileDown className="w-3.5 h-3.5" />
                    <span>Unduh CV</span>
                  </span>
                  <span className="font-semibold text-white">
                    {stats.cvs} ({stats.total > 0 ? Math.round((stats.cvs / stats.total) * 100) : 0}%)
                  </span>
                </div>
                <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${stats.total > 0 ? (stats.cvs / stats.total) * 100 : 0}%` }}
                  />
                </div>
              </div>

              {/* Project Clicks Bar */}
              <div>
                <div className="flex justify-between text-zinc-300 mb-1">
                  <span className="flex items-center gap-1.5 text-purple-400">
                    <FolderGit2 className="w-3.5 h-3.5" />
                    <span>Klik Project</span>
                  </span>
                  <span className="font-semibold text-white">
                    {stats.projects} ({stats.total > 0 ? Math.round((stats.projects / stats.total) * 100) : 0}%)
                  </span>
                </div>
                <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-purple-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${stats.total > 0 ? (stats.projects / stats.total) * 100 : 0}%` }}
                  />
                </div>
              </div>

              {/* Contact Inquiries Bar */}
              <div>
                <div className="flex justify-between text-zinc-300 mb-1">
                  <span className="flex items-center gap-1.5 text-amber-400">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Inquiry Kontak</span>
                  </span>
                  <span className="font-semibold text-white">
                    {stats.contacts} ({stats.total > 0 ? Math.round((stats.contacts / stats.total) * 100) : 0}%)
                  </span>
                </div>
                <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-amber-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${stats.total > 0 ? (stats.contacts / stats.total) * 100 : 0}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Conversion Indicator footer */}
          <div className="mt-5 pt-4 border-t border-zinc-800/80 flex items-center justify-between text-[11px] bg-zinc-950/60 p-3 rounded-xl border border-zinc-800/60">
            <span className="text-zinc-400">Rasio Unduh CV:</span>
            <span className="font-bold text-emerald-400 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              {stats.cvRate}% dari Views
            </span>
          </div>
        </div>

        {/* Card B: Device Distribution */}
        <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 pb-4 border-b border-zinc-800">
              <Monitor className="w-4 h-4 text-blue-400" />
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Segmentasi Perangkat
              </h4>
            </div>

            <div className="mt-6 space-y-4">
              {/* Desktop Stat */}
              <div className="p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-950/60 text-blue-400 border border-blue-900/50">
                    <Monitor className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">Desktop / Laptop</p>
                    <p className="text-[10px] text-zinc-400">Komputer rekruter / reviewer</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-white">{stats.desktop}</span>
                  <span className="block text-[10px] text-zinc-500">
                    {stats.total > 0 ? Math.round((stats.desktop / stats.total) * 100) : 0}%
                  </span>
                </div>
              </div>

              {/* Mobile Stat */}
              <div className="p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-950/60 text-emerald-400 border border-emerald-900/50">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">Mobile Device</p>
                    <p className="text-[10px] text-zinc-400">Smartphone & Tablet</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-white">{stats.mobile}</span>
                  <span className="block text-[10px] text-zinc-500">
                    {stats.total > 0 ? Math.round((stats.mobile / stats.total) * 100) : 0}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Device Ratio Visual Bar */}
          <div className="mt-5 pt-4 border-t border-zinc-800/80">
            <div className="flex justify-between text-[11px] text-zinc-400 mb-1.5">
              <span>Rasio Platform</span>
              <span className="text-zinc-200">
                {stats.desktop} Desktop : {stats.mobile} Mobile
              </span>
            </div>
            <div className="w-full bg-zinc-800 h-2.5 rounded-full overflow-hidden flex">
              <div
                className="bg-blue-500 h-full transition-all duration-500"
                style={{ width: `${stats.total > 0 ? (stats.desktop / stats.total) * 100 : 50}%` }}
                title="Desktop"
              />
              <div
                className="bg-emerald-500 h-full transition-all duration-500"
                style={{ width: `${stats.total > 0 ? (stats.mobile / stats.total) * 100 : 50}%` }}
                title="Mobile"
              />
            </div>
          </div>
        </div>

        {/* Card C: Top Action Targets & Hotspots */}
        <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 pb-4 border-b border-zinc-800">
              <BarChart3 className="w-4 h-4 text-purple-400" />
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Target Interaksi Terpopuler
              </h4>
            </div>

            <div className="mt-4 space-y-2.5">
              {stats.topTargets.length === 0 ? (
                <p className="text-xs text-zinc-500 py-4 text-center">Belum ada data interaksi tercatat.</p>
              ) : (
                stats.topTargets.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-800/80 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2 min-w-0 pr-2">
                      <span className="w-4 text-[10px] text-zinc-500 font-bold">#{idx + 1}</span>
                      <span className="text-zinc-200 truncate" title={item.name}>
                        {item.name}
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-300 text-[11px] font-semibold flex-shrink-0">
                      {item.count}x
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-400">
            <span>Total Interaksi:</span>
            <strong className="text-white">{stats.total} Event</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
