"use client";

import Link from "next/link";
import {
  Area,
  AreaChart,
  CartesianGrid,
  LabelList,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChevronDown, ChevronRight } from "lucide-react";
import { trendOverall, trendTarget } from "@/lib/kinerja-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE, SEMANTIC } from "@/lib/chart-palette";
import { ScopeNote } from "@/components/ui/ScopeNote";

export function TrendOverallScore() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="card-title-navy flex min-w-0 items-center gap-1.5"><span>TREND KINERJA OVERALL SCORE</span><ScopeNote /></h3>
          <p className="mt-[3px] text-[9.5px] text-ink-500">
            Rata-rata Score dari Waktu ke Waktu
          </p>
        </div>
        <button className="select-chip whitespace-nowrap px-2.5 py-[5px] text-[9.5px] transition-colors hover:bg-[#f7f9fb]">
          6 Bulan Terakhir <ChevronDown size={11} />
        </button>
      </div>

      <div className="mt-2 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={trendOverall} margin={{ top: 18, right: 14, bottom: 0, left: -18 }}>
            <defs>
              <linearGradient id="to-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={PALETTE.greenSoft} stopOpacity="0.2" />
                <stop offset="100%" stopColor={PALETTE.greenSoft} stopOpacity="0.02" />
              </linearGradient>
            </defs>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 9, fill: CHART_AXIS.tick }}
              interval={0}
            />
            {/* domain sempit [70, 95] agar kenaikan 76 → 88 tidak tampak datar */}
            <YAxis
              domain={[70, 95]}
              ticks={[70, 75, 80, 85, 90, 95]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 9, fill: CHART_AXIS.tick }}
              width={36}
            />
            <Tooltip
              formatter={(v: number) => [v.toFixed(1).replace(".", ","), "Score"]}
              contentStyle={CHART_TOOLTIP_STYLE}
            />
            <ReferenceLine
              y={trendTarget}
              stroke={SEMANTIC.warn}
              strokeDasharray="5 4"
              label={{
                value: `Target ${trendTarget}`,
                position: "insideBottomRight",
                fontSize: 9,
                fill: SEMANTIC.warn,
                fontWeight: 600,
              }}
            />
            <Area isAnimationActive={false}
              type="monotone"
              dataKey="value"
              stroke={PALETTE.green}
              strokeWidth={1.8}
              fill="url(#to-fill)"
              dot={{ r: 3, fill: "var(--surface)", stroke: PALETTE.green, strokeWidth: 2 }}
              activeDot={{ r: 4.5 }}
              animationDuration={900}
            >
              <LabelList
                dataKey="value"
                position="top"
                offset={9}
                formatter={(v: number) => v.toFixed(1).replace(".", ",")}
                style={{ fontSize: 9, fill: "var(--text-2)", fontWeight: 700 }}
              />
            </Area>
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <Link href="/kinerja-karyawan/tren-score" className="link-more mt-1 flex items-center gap-1">
        Lihat trend lengkap <ChevronRight size={11} />
      </Link>
    </div>
  );
}
