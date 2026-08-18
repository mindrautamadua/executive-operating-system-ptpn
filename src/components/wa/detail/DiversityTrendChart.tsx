"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { SectionHead } from "@/components/hc/SectionHead";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { diversityTrend } from "@/lib/wa-detail-demografi";

const SERIES = [
  { key: "perempuan", label: "Perempuan", color: PALETTE.purple },
  { key: "manajerial", label: "Perempuan Manajerial", color: PALETTE.pink },
  { key: "tenure", label: "Tenure > 10 Thn", color: PALETTE.teal },
  { key: "disabilitas", label: "Disabilitas", color: PALETTE.blue },
];

/** Tren 12 bulan empat metrik keragaman, dengan garis target gender 30%. */
export function DiversityTrendChart() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "40ms" } as React.CSSProperties}
    >
      <SectionHead title="Tren Keragaman (12 Bulan)" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Garis putus-putus = target perempuan 30% (2027)
      </p>

      <div className="mt-1 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={diversityTrend} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
            />
            <YAxis
              domain={[0, 40]}
              ticks={[0, 10, 20, 30, 40]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              unit="%"
            />
            <Tooltip
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, n: string) => [
                `${v.toString().replace(".", ",")}%`,
                SERIES.find((s) => s.key === n)?.label ?? n,
              ]}
            />
            <Legend
              verticalAlign="bottom"
              height={18}
              iconSize={7}
              wrapperStyle={{ fontSize: 8.5 }}
              formatter={(v: string) => SERIES.find((s) => s.key === v)?.label ?? v}
            />
            <ReferenceLine y={30} stroke={PALETTE.purple} strokeDasharray="3 3" />
            {SERIES.map((s) => (
              <Line
                key={s.key}
                type="linear"
                dataKey={s.key}
                stroke={s.color}
                strokeWidth={1.5}
                dot={{ r: 2, fill: s.color, strokeWidth: 0 }}
                isAnimationActive={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
