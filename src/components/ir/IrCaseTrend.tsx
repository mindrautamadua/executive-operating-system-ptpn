"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { caseTrend12m as caseTrend } from "@/lib/ir-intel-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "../hc/SectionHead";
import { PanelFooterLink } from "./PanelFooterLink";

const LEGEND = [
  { label: "Kasus Baru", color: PALETTE.blue },
  { label: "Kasus Selesai", color: PALETTE.green },
];

export function IrCaseTrend() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <div className="flex items-baseline gap-1.5">
        <SectionHead title="Trend Kasus Industrial Relations" />
        <span className="shrink-0 text-[8.5px] text-ink-400">(12 Bulan Terakhir)</span>
      </div>

      <div className="mt-1 flex items-center justify-center gap-4">
        {LEGEND.map((l) => (
          <span key={l.label} className="flex items-center gap-1.5 text-[8.5px] text-ink-500">
            <span className="h-[7px] w-[7px] rounded-full" style={{ background: l.color }} />
            {l.label}
          </span>
        ))}
      </div>

      <div className="min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={caseTrend} margin={{ top: 14, right: 10, bottom: 0, left: -24 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              interval={0}
            />
            <YAxis
              domain={[0, 30]}
              ticks={[0, 10, 20, 30]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
            />
            <Tooltip
              formatter={(v: number, name: string) => [
                v,
                name === "baru" ? "Kasus Baru" : "Kasus Selesai",
              ]}
              contentStyle={CHART_TOOLTIP_STYLE}
            />
            <Line isAnimationActive={false}
              type="linear"
              dataKey="baru"
              stroke={PALETTE.blue}
              strokeWidth={1.8}
              dot={{ r: 2.4, fill: PALETTE.blue, strokeWidth: 0 }}
              activeDot={{ r: 4 }}
              label={{ position: "top", fontSize: 8, fill: PALETTE.blue, dy: -2 }}
            />
            <Line isAnimationActive={false}
              type="linear"
              dataKey="selesai"
              stroke={PALETTE.green}
              strokeWidth={1.8}
              dot={{ r: 2.4, fill: PALETTE.green, strokeWidth: 0 }}
              activeDot={{ r: 4 }}
              label={{ position: "bottom", fontSize: 8, fill: PALETTE.green, dy: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <PanelFooterLink label="Lihat Detail Trend" />
    </div>
  );
}
