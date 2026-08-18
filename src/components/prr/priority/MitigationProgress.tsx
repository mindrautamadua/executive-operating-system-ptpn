"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { SectionHead } from "@/components/hc/SectionHead";
import { CHART_AXIS, CHART_TOOLTIP_STYLE } from "@/lib/chart-palette";
import { avgMitigation, mitigationProgress } from "@/lib/prr-priority";

/** Progres mitigasi 6 risiko prioritas teratas terhadap target grup 65%. */
export function MitigationProgress() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Progres Mitigasi (Top 6)" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Rata-rata <span className="font-bold text-ink-900">{avgMitigation}%</span> · target 65% akhir
        Q3
      </p>

      <div className="mt-1 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={mitigationProgress}
            layout="vertical"
            margin={{ top: 6, right: 10, bottom: 0, left: 62 }}
            barSize={11}
          >
            <CartesianGrid stroke={CHART_AXIS.grid} horizontal={false} />
            <XAxis
              type="number"
              domain={[0, 100]}
              ticks={[0, 25, 50, 75, 100]}
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              unit="%"
            />
            <YAxis
              type="category"
              dataKey="name"
              tickLine={false}
              axisLine={false}
              width={62}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
            />
            <Tooltip
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, n: string) => [`${v}%`, n === "selesai" ? "Selesai" : "Sisa"]}
            />
            <ReferenceLine x={65} stroke="#1a9c5b" strokeDasharray="3 3" />
            <Bar dataKey="selesai" stackId="m" fill="#1a9c5b" isAnimationActive={false} />
            <Bar
              dataKey="sisa"
              stackId="m"
              fill="#e6ecf2"
              radius={[0, 3, 3, 0]}
              isAnimationActive={false}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
