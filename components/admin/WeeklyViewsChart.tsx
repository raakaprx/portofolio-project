"use client";

import React, { useState } from "react";
import { BarChart3 } from "lucide-react";

export interface DailyViewStat {
  dateKey: string;
  label: string;
  fullDate: string;
  count: number;
}

interface WeeklyViewsChartProps {
  data: DailyViewStat[];
  loading?: boolean;
}

export function WeeklyViewsChart({ data, loading = false }: WeeklyViewsChartProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const totalViews = data.reduce((acc, curr) => acc + curr.count, 0);
  const maxCount = Math.max(...data.map((d) => d.count), 5); // baseline minimum 5 for aesthetic scaling
  const avgViews = data.length > 0 ? (totalViews / data.length).toFixed(1) : "0";

  return (
    <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-sm transition-all duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-zinc-800/80">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-950/60 border border-blue-800/60 text-blue-400">
            <BarChart3 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold font-mono text-white">
              Tren Kunjungan 7 Hari Terakhir
            </h3>
            <p className="text-xs text-zinc-400 font-mono mt-0.5">
              Distribusi aktivitas page_view harian dari pengunjung portfolio
            </p>
          </div>
        </div>

        {/* Aggregate Badges */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="px-3 py-1 rounded-lg bg-zinc-800/80 border border-zinc-700/60 text-zinc-300">
            Total: <strong className="text-blue-400 font-semibold">{totalViews}</strong> views
          </span>
          <span className="hidden sm:inline-block px-3 py-1 rounded-lg bg-zinc-800/80 border border-zinc-700/60 text-zinc-400">
            Rata-rata: <strong className="text-zinc-200">{avgViews}</strong>/hari
          </span>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="pt-6">
        {loading ? (
          <div className="relative animate-pulse">
            <div className="h-48 flex items-end justify-between gap-2 sm:gap-4 pt-4 pb-8 px-2 sm:px-4">
              {[35, 60, 80, 45, 95, 65, 75].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center justify-end h-full">
                  <div
                    style={{ height: `${h}%` }}
                    className="w-full max-w-[42px] bg-zinc-800/80 rounded-t-md"
                  />
                  <div className="mt-2 h-2.5 w-10 bg-zinc-800/60 rounded-sm" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="relative">
            {/* Horizontal Grid lines (WCAG AA Contrast) */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-8">
              <div className="border-b border-zinc-800/80 w-full flex justify-between text-[10px] font-mono text-zinc-400">
                <span>{maxCount}</span>
              </div>
              <div className="border-b border-zinc-800/60 w-full flex justify-between text-[10px] font-mono text-zinc-400">
                <span>{Math.round(maxCount / 2)}</span>
              </div>
              <div className="border-b border-zinc-800/80 w-full flex justify-between text-[10px] font-mono text-zinc-400">
                <span>0</span>
              </div>
            </div>

            {/* Bars Container */}
            <div className="h-48 flex items-end justify-between gap-2 sm:gap-4 pt-4 pb-8 relative z-10 px-2 sm:px-4">
              {data.map((item, idx) => {
                const heightPercent = maxCount > 0 ? (item.count / maxCount) * 100 : 0;
                const isHovered = hoveredIdx === idx;
                const isFirst = idx === 0;
                const isLast = idx === data.length - 1;

                return (
                  <div
                    key={item.dateKey || idx}
                    className="flex-1 flex flex-col items-center justify-end h-full group relative"
                    onMouseEnter={() => setHoveredIdx(idx)}
                    onMouseLeave={() => setHoveredIdx(null)}
                  >
                    {/* Tooltip with Boundary Clamping */}
                    {isHovered && (
                      <div
                        className={`absolute -top-12 z-20 px-2.5 py-1.5 rounded-lg bg-zinc-950 border border-zinc-700 text-white text-[11px] font-mono shadow-xl whitespace-nowrap pointer-events-none animate-in fade-in zoom-in-95 duration-150 ${
                          isFirst
                            ? "left-0"
                            : isLast
                            ? "right-0"
                            : "left-1/2 -translate-x-1/2"
                        }`}
                      >
                        <p className="font-semibold text-blue-400">{item.count} kunjungan</p>
                        <p className="text-[10px] text-zinc-400">{item.fullDate}</p>
                      </div>
                    )}

                    {/* Bar with Mount Animation */}
                    <div className="w-full max-w-[42px] flex items-end justify-center h-full">
                      <div
                        style={{ height: `${Math.max(heightPercent, 4)}%` }}
                        className={`w-full rounded-t-md transition-all duration-300 ease-out animate-bar-grow ${
                          item.count === 0
                            ? "bg-zinc-800 group-hover:bg-zinc-700"
                            : isHovered
                            ? "bg-blue-400 shadow-[0_0_12px_rgba(96,165,250,0.5)]"
                            : "bg-blue-500/90 group-hover:bg-blue-400"
                        }`}
                      />
                    </div>

                    {/* X-Axis Date Label */}
                    <div className="absolute -bottom-1 w-full text-center">
                      <span
                        className={`text-[11px] font-mono transition-colors duration-150 block truncate ${
                          isHovered
                            ? "text-blue-300 font-semibold"
                            : "text-zinc-400 group-hover:text-zinc-200"
                        }`}
                      >
                        {item.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
