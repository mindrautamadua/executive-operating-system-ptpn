"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { meetingCadence } from "@/lib/dek-data-detail";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const SERIES = [
  { key: "audit", label: "Audit", color: PALETTE.blue },
  { key: "risikoGcg", label: "Manajemen Risiko & GCG", color: PALETTE.amber },
  { key: "nomrem", label: "Nominasi & Remunerasi", color: PALETTE.teal },
] as const;

const LABELS: Record<string, string> = Object.fromEntries(SERIES.map((s) => [s.key, s.label]));

/** Kadensi rapat komite 12 bulan; Jan–Mei 2026 berjumlah 24 rapat. */
export function MeetingCadence() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "240ms" } as React.CSSProperties}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <SectionHead title="Kadensi Rapat Komite" badge={<ScopeNote />} />
          <p className="mt-[3px] text-[9px] text-ink-500">
            12 Bulan Terakhir · 24 Rapat YTD 2026 (10 Audit · 8 Risiko &amp; GCG · 6 Nomrem)
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap items-center justify-end gap-x-2.5 gap-y-1">
          {SERIES.map((s) => (
            <span key={s.key} className="flex items-center gap-1">
              <span
                className="h-[7px] w-[7px] shrink-0 rounded-full"
                style={{ backgroundColor: s.color }}
              />
              <span className="text-[9px] font-semibold text-ink-500">{s.label}</span>
            </span>
          ))}
        </div>
      </div>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={meetingCadence}
            margin={{ top: 12, right: 10, bottom: 0, left: -22 }}
            barCategoryGap="24%"
          >
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="bulan"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              interval={0}
            />
            <YAxis
              domain={[0, 6]}
              ticks={[0, 2, 4, 6]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              width={38}
            />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.08)" }}
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, n: string) => [`${v} rapat`, LABELS[n] ?? n]}
            />
            {SERIES.map((s) => (
              <Bar isAnimationActive={false}
                key={s.key}
                dataKey={s.key}
                stackId="komite"
                fill={s.color}
                maxBarSize={22}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
