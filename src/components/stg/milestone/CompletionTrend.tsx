"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { completionTrend } from "@/lib/sms-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

/**
 * Milestone selesai kumulatif: rencana vs aktual 2026.
 * Deret kumulatif hanya tersedia di tingkat grup (tanpa pecahan owner) — RULE B.
 */
export function CompletionTrend() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "300ms" } as React.CSSProperties}
    >
      <SectionHead title="Completion Trend 2026" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Milestone Selesai Kumulatif — Rencana vs Aktual (Target FY 142)
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={completionTrend} margin={{ top: 12, right: 14, bottom: 0, left: -18 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
            />
            <YAxis
              domain={[0, 150]}
              ticks={[0, 50, 100, 150]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              width={32}
            />
            <Tooltip
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, name: string) => [`${v} milestone`, name]}
            />
            <Legend
              verticalAlign="top"
              align="right"
              height={18}
              iconType="plainline"
              iconSize={10}
              wrapperStyle={{ fontSize: 8.5, color: CHART_AXIS.tick }}
            />
            <Line
              type="monotone"
              name="Rencana Kumulatif"
              dataKey="rencana"
              stroke={PALETTE.blue}
              strokeWidth={1.6}
              strokeDasharray="4 3"
              dot={false}
            />
            <Line
              type="monotone"
              name="Aktual Kumulatif"
              dataKey="aktual"
              stroke={PALETTE.green}
              strokeWidth={2}
              dot={{ r: 2.5 }}
              activeDot={{ r: 4 }}
              connectNulls={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-1 truncate text-[9px] text-ink-500">
        Aktual Mei 58 vs rencana 68 — gap 10 milestone dan melebar sejak Maret.
      </p>
    </div>
  );
}
