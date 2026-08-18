"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { trajectory2029 } from "@/lib/svc-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const fmt = (v: number) =>
  v.toLocaleString("id-ID", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const LABELS: Record<string, string> = {
  target: "Jalur Target",
  realisasi: "Realisasi",
};

/**
 * Jalur kumulatif EBITDA uplift menuju Rp 12,4 T pada 2029.
 * Trajektori RJPP hanya ditetapkan di tingkat grup — RULE B.
 */
export function ValueTrajectory2029() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "180ms" } as React.CSSProperties}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <SectionHead title="Trajektori Nilai 2029" badge={<ScopeNote />} />
          <p className="mt-[3px] text-[9px] text-ink-500">
            Kumulatif EBITDA Uplift RJPP · Rp T · Posisi 2026 = YTD Mei
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2.5">
          <span className="flex items-center gap-1">
            <span
              className="h-[7px] w-[7px] rounded-full"
              style={{ backgroundColor: PALETTE.blueSoft }}
            />
            <span className="text-[9px] font-semibold text-ink-500">Jalur Target</span>
          </span>
          <span className="flex items-center gap-1">
            <span
              className="h-[7px] w-[7px] rounded-full"
              style={{ backgroundColor: PALETTE.green }}
            />
            <span className="text-[9px] font-semibold text-ink-500">Realisasi</span>
          </span>
        </div>
      </div>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={trajectory2029} margin={{ top: 18, right: 12, bottom: 0, left: -14 }}>
            <defs>
              <linearGradient id="svc-target-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={PALETTE.blueSoft} stopOpacity="0.20" />
                <stop offset="100%" stopColor={PALETTE.blueSoft} stopOpacity="0.02" />
              </linearGradient>
              <linearGradient id="svc-real-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={PALETTE.green} stopOpacity="0.22" />
                <stop offset="100%" stopColor={PALETTE.green} stopOpacity="0.03" />
              </linearGradient>
            </defs>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="year"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              interval={0}
            />
            <YAxis
              domain={[0, 14]}
              ticks={[0, 4, 8, 12, 14]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => `${v} T`}
              width={38}
            />
            <Tooltip
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, n: string) => [`Rp ${fmt(v)} T`, LABELS[n] ?? n]}
            />
            <Area isAnimationActive={false}
              type="monotone"
              dataKey="target"
              stroke={PALETTE.blueSoft}
              strokeWidth={1.8}
              fill="url(#svc-target-fill)"
              dot={{ r: 2.5, fill: PALETTE.blueSoft, strokeWidth: 0 }}
              activeDot={{ r: 4 }}
            >
              <LabelList
                dataKey="target"
                position="top"
                offset={6}
                formatter={(v: number) => fmt(v)}
                style={{ fontSize: 8.5, fill: "#334155", fontWeight: 700 }}
              />
            </Area>
            <Area isAnimationActive={false}
              type="monotone"
              dataKey="realisasi"
              stroke={PALETTE.green}
              strokeWidth={2}
              fill="url(#svc-real-fill)"
              connectNulls={false}
              dot={{ r: 2.8, fill: PALETTE.green, strokeWidth: 0 }}
              activeDot={{ r: 4 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
