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
import { limitTrend } from "@/lib/risk-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

/** Tren utilisasi limit 6 bulan: jumlah breach dan near-limit per bulan. */
export function LimitTrend() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2 pt-3"
      style={{ "--d": "180ms" } as React.CSSProperties}
    >
      <SectionHead title="Tren Utilisasi Limit" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Breach &amp; Near-Limit 6 Bulan Terakhir (dari 28 Limit)
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={limitTrend} margin={{ top: 10, right: 14, bottom: 0, left: -20 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="bulan"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
            />
            <YAxis
              domain={[0, 8]}
              ticks={[0, 2, 4, 6, 8]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              width={34}
            />
            <Tooltip contentStyle={CHART_TOOLTIP_STYLE} />
            <Legend
              verticalAlign="bottom"
              height={18}
              iconSize={7}
              wrapperStyle={{ fontSize: 8.5, color: "var(--chart-tick)" }}
            />
            <Line isAnimationActive={false}
              type="monotone"
              dataKey="breach"
              name="Breach"
              stroke={PALETTE.red}
              strokeWidth={1.8}
              dot={{ r: 2.5 }}
              activeDot={{ r: 4 }}
            />
            <Line isAnimationActive={false}
              type="monotone"
              dataKey="nearLimit"
              name="Near-Limit"
              stroke={PALETTE.amber}
              strokeWidth={1.8}
              strokeDasharray="4 3"
              dot={{ r: 2.5 }}
              activeDot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
