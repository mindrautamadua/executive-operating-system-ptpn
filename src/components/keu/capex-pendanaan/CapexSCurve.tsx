"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { capexSCurve } from "@/lib/kcx-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { fmtRpT } from "@/lib/keu-core";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

export function CapexSCurve() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "240ms" } as React.CSSProperties}
    >
      <SectionHead title="S-Curve Capex 2026" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Kumulatif Rencana vs Realisasi (Rp T) — Gap Mei Rp 0,92 T
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={capexSCurve} margin={{ top: 12, right: 12, bottom: 0, left: -16 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              interval={0}
            />
            <YAxis
              domain={[0, 10]}
              ticks={[0, 2.5, 5, 7.5, 10]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              width={32}
            />
            <Tooltip
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, name: string) => [
                fmtRpT(v, 2),
                name === "plan" ? "Rencana Kumulatif" : "Realisasi Kumulatif",
              ]}
            />
            <ReferenceLine x="Mei" stroke={CHART_AXIS.axis} strokeDasharray="4 3" />
            <Line isAnimationActive={false}
              type="monotone"
              dataKey="plan"
              stroke={PALETTE.blueSoft}
              strokeWidth={1.8}
              strokeDasharray="5 3"
              dot={false}
            />
            <Line isAnimationActive={false}
              type="monotone"
              dataKey="actual"
              stroke={PALETTE.green}
              strokeWidth={2}
              dot={{ r: 2.5 }}
              activeDot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-center gap-4 pb-1">
        <span className="flex items-center gap-1.5 text-[8.5px] text-ink-500">
          <span className="h-[2px] w-[14px] rounded" style={{ background: PALETTE.blueSoft }} />
          Rencana (RKAP Rp 9,6 T)
        </span>
        <span className="flex items-center gap-1.5 text-[8.5px] text-ink-500">
          <span className="h-[2px] w-[14px] rounded" style={{ background: PALETTE.green }} />
          Realisasi s.d. Mei Rp 3,08 T
        </span>
      </div>
    </div>
  );
}
