"use client";

import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { monthlyTrack } from "@/lib/kba-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { fmtRpT } from "@/lib/keu-core";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const LABEL: Record<string, string> = {
  plan: "RKAP Bulanan",
  actual: "Realisasi Bulanan",
  planKumulatif: "RKAP Kumulatif",
  actualKumulatif: "Realisasi Kumulatif",
};

export function MonthlyBudgetTrack() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "180ms" } as React.CSSProperties}
    >
      <SectionHead title="Monthly Budget Track" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Pendapatan Bulanan Plan vs Aktual + Kumulatif 2026 (Rp T)
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={monthlyTrack} margin={{ top: 8, right: -8, bottom: 0, left: -18 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
            />
            <YAxis
              yAxisId="left"
              domain={[0, 6]}
              ticks={[0, 2, 4, 6]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              width={30}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              domain={[0, 28]}
              ticks={[0, 7, 14, 21, 28]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              width={34}
            />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.08)" }}
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, name: string) => [fmtRpT(v, 2), LABEL[name] ?? name]}
            />
            <Bar isAnimationActive={false}
              yAxisId="left"
              dataKey="plan"
              fill={PALETTE.blueSoft}
              radius={[2, 2, 0, 0]}
              maxBarSize={16}
            />
            <Bar isAnimationActive={false}
              yAxisId="left"
              dataKey="actual"
              fill={PALETTE.green}
              radius={[2, 2, 0, 0]}
              maxBarSize={16}
            />
            <Line isAnimationActive={false}
              yAxisId="right"
              type="monotone"
              dataKey="planKumulatif"
              stroke={PALETTE.slate}
              strokeWidth={1.6}
              strokeDasharray="5 3"
              dot={false}
            />
            <Line isAnimationActive={false}
              yAxisId="right"
              type="monotone"
              dataKey="actualKumulatif"
              stroke={PALETTE.navy}
              strokeWidth={1.8}
              dot={{ r: 2.5 }}
              activeDot={{ r: 4 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-center gap-3.5 pb-1">
        <span className="flex items-center gap-1.5 text-[8.5px] text-ink-500">
          <span className="h-[7px] w-[7px] rounded-[2px]" style={{ background: PALETTE.blueSoft }} />
          RKAP Bulanan
        </span>
        <span className="flex items-center gap-1.5 text-[8.5px] text-ink-500">
          <span className="h-[7px] w-[7px] rounded-[2px]" style={{ background: PALETTE.green }} />
          Realisasi Bulanan
        </span>
        <span className="flex items-center gap-1.5 text-[8.5px] text-ink-500">
          <span className="h-[2px] w-[14px] rounded" style={{ background: PALETTE.slate }} />
          RKAP Kumulatif
        </span>
        <span className="flex items-center gap-1.5 text-[8.5px] text-ink-500">
          <span className="h-[2px] w-[14px] rounded" style={{ background: PALETTE.navy }} />
          Realisasi Kumulatif
        </span>
      </div>
    </div>
  );
}
