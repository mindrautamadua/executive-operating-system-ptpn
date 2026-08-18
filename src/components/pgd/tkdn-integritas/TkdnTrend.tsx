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
import { tkdnTrend } from "@/lib/pgd-data-detail";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

export function TkdnTrend() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Tren TKDN 8 Kuartal" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Realisasi vs Target Regulasi — Q3 2024 s.d. Q2 2026
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={tkdnTrend} margin={{ top: 14, right: 14, bottom: 0, left: -14 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="kuartal"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              tickFormatter={(v: string) => v.replace(" 20", " '")}
            />
            <YAxis
              domain={[58, 72]}
              ticks={[58, 62, 66, 70]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => `${v}%`}
              width={38}
            />
            <Tooltip
              formatter={(v: number, n: string) => [`${v.toLocaleString("id-ID")}%`, n]}
              contentStyle={CHART_TOOLTIP_STYLE}
            />
            <Legend
              verticalAlign="top"
              align="right"
              height={14}
              iconSize={7}
              wrapperStyle={{ fontSize: 8, paddingBottom: 2 }}
            />
            <Line isAnimationActive={false}
              type="monotone"
              dataKey="aktual"
              name="TKDN Aktual"
              stroke={PALETTE.green}
              strokeWidth={1.8}
              dot={{ r: 2 }}
              activeDot={{ r: 4 }}
            />
            <Line isAnimationActive={false}
              type="monotone"
              dataKey="target"
              name="Target 65%"
              stroke={PALETTE.slate}
              strokeWidth={1.4}
              strokeDasharray="4 3"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-1 rounded-md bg-ptpn-greenLight px-2 py-[5px] text-[9px] leading-[1.4] text-ptpn-greenDark">
        TKDN naik 62,1% → 68,4% dalam 8 kuartal dan melampaui target sejak Q2 2025; surplus kini 3,4
        pts.
      </p>
    </div>
  );
}
