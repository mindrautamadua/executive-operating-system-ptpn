"use client";

import {
  CartesianGrid,
  LabelList,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { scoreTrend } from "@/lib/dek-data-detail";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const LABELS: Record<string, string> = {
  skor: "Skor Kolektif Direksi",
  ambangBaik: "Ambang Kategori Baik",
};

/** Tren skor kolektif Direksi 8 kuartal terhadap ambang kategori Baik. */
export function ScoreTrend() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "240ms" } as React.CSSProperties}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <SectionHead title="Tren Skor Kolektif" badge={<ScopeNote />} />
          <p className="mt-[3px] text-[9px] text-ink-500">
            8 Kuartal Terakhir · Naik 4,3 pts sejak Q3 2024
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2.5">
          <span className="flex items-center gap-1">
            <span
              className="h-[7px] w-[7px] shrink-0 rounded-full"
              style={{ backgroundColor: PALETTE.green }}
            />
            <span className="text-[9px] font-semibold text-ink-500">Skor Kolektif</span>
          </span>
          <span className="flex items-center gap-1">
            <span
              className="h-[7px] w-[7px] shrink-0 rounded-full"
              style={{ backgroundColor: PALETTE.red }}
            />
            <span className="text-[9px] font-semibold text-ink-500">Ambang Baik</span>
          </span>
        </div>
      </div>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={scoreTrend} margin={{ top: 16, right: 12, bottom: 0, left: -14 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="kuartal"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              interval={0}
            />
            <YAxis
              domain={[76, 92]}
              ticks={[76, 80, 84, 88, 92]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              width={38}
            />
            <Tooltip
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, n: string) => [v.toLocaleString("id-ID"), LABELS[n] ?? n]}
            />
            <Line isAnimationActive={false}
              type="monotone"
              dataKey="ambangBaik"
              stroke={PALETTE.red}
              strokeWidth={1.2}
              strokeDasharray="3 3"
              dot={false}
              activeDot={false}
            />
            <Line isAnimationActive={false}
              type="monotone"
              dataKey="skor"
              stroke={PALETTE.green}
              strokeWidth={2.2}
              dot={{ r: 2.4, fill: PALETTE.green, strokeWidth: 0 }}
              activeDot={{ r: 4 }}
            >
              <LabelList
                dataKey="skor"
                position="top"
                offset={6}
                formatter={(v: number) => v.toLocaleString("id-ID")}
                style={{ fontSize: 8.5, fill: "#334155", fontWeight: 700 }}
              />
            </Line>
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
