"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { SectionHead } from "@/components/hc/SectionHead";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, GENDER } from "@/lib/chart-palette";
import { agePyramid } from "@/lib/wa-detail-demografi";

/** Piramida usia: laki-laki ke kiri, perempuan ke kanan. */
export function AgePyramidChart() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "40ms" } as React.CSSProperties}
    >
      <SectionHead title="Piramida Usia" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Melebar di 31 – 40 tahun · menyempit di bawah 25 tahun
      </p>

      <div className="mt-1 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={agePyramid}
            layout="vertical"
            stackOffset="sign"
            margin={{ top: 6, right: 10, bottom: 0, left: 26 }}
            barSize={13}
          >
            <CartesianGrid stroke={CHART_AXIS.grid} horizontal={false} />
            <XAxis
              type="number"
              domain={[-13000, 6000]}
              ticks={[-12000, -8000, -4000, 0, 4000]}
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => `${Math.abs(v) / 1000}K`}
            />
            <YAxis
              type="category"
              dataKey="band"
              tickLine={false}
              axisLine={false}
              width={40}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
            />
            <Tooltip
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, n: string) => [
                Math.abs(v).toLocaleString("id-ID"),
                n === "laki" ? "Laki-laki" : "Perempuan",
              ]}
            />
            <Legend
              verticalAlign="bottom"
              height={18}
              iconSize={7}
              wrapperStyle={{ fontSize: 8 }}
              formatter={(v: string) => (v === "laki" ? "Laki-laki" : "Perempuan")}
            />
            <ReferenceLine x={0} stroke={CHART_AXIS.axis} />
            <Bar dataKey="laki" stackId="p" fill={GENDER.lakiLaki} isAnimationActive={false} />
            <Bar dataKey="perempuan" stackId="p" fill={GENDER.perempuan} isAnimationActive={false} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
