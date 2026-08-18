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
import { ratingTrend } from "@/lib/esg-data-detail";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const num = (v: number) => v.toLocaleString("id-ID", { maximumFractionDigits: 1 });

/**
 * Tren tiga skor rating. Arah "baik" berbeda per seri: Sustainalytics turun =
 * membaik, GCG & CSA naik = membaik — ditandai pada label legend.
 */
export function RatingTrend() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Tren Rating Multi-Agensi" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        2023–2026 · arah membaik dicantumkan pada tiap seri
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={ratingTrend} margin={{ top: 10, right: 12, bottom: 0, left: -14 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="year"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
            />
            <YAxis
              domain={[20, 100]}
              ticks={[20, 40, 60, 80, 100]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              width={30}
            />
            <Tooltip formatter={(v: number) => num(v)} contentStyle={CHART_TOOLTIP_STYLE} />
            <Legend
              verticalAlign="top"
              align="right"
              height={16}
              iconType="circle"
              iconSize={7}
              wrapperStyle={{ fontSize: 8, color: CHART_AXIS.tick }}
            />
            <Line isAnimationActive={false}
              type="linear"
              dataKey="gcg"
              name="GCG SK-16 (naik = baik)"
              stroke={PALETTE.green}
              strokeWidth={1.8}
              dot={{ r: 2 }}
              activeDot={{ r: 4 }}
            />
            <Line isAnimationActive={false}
              type="linear"
              dataKey="csa"
              name="S&P CSA (naik = baik)"
              stroke={PALETTE.teal}
              strokeWidth={1.8}
              dot={{ r: 2 }}
              activeDot={{ r: 4 }}
            />
            <Line isAnimationActive={false}
              type="linear"
              dataKey="sustainalytics"
              name="Sustainalytics Risk (turun = baik)"
              stroke={PALETTE.blue}
              strokeWidth={1.8}
              strokeDasharray="4 3"
              dot={{ r: 2 }}
              activeDot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
