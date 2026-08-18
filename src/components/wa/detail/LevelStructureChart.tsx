"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { SectionHead } from "@/components/hc/SectionHead";
import { CHART_AXIS, CHART_TOOLTIP_STYLE } from "@/lib/chart-palette";
import { levelRows } from "@/lib/wa-detail-komposisi";

const DATA = levelRows.map((l) => ({
  name: l.name.length > 18 ? `${l.name.slice(0, 17)}…` : l.name,
  full: l.name,
  headcount: l.headcount,
  color: l.color,
}));

/** Piramida struktur: jumlah pekerja per lapis jabatan. */
export function LevelStructureChart() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "40ms" } as React.CSSProperties}
    >
      <SectionHead title="Piramida Struktur Jabatan" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        6 lapis · 55,8% pekerja berada di lapis Staff
      </p>

      <div className="mt-1 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={DATA}
            layout="vertical"
            margin={{ top: 6, right: 24, bottom: 0, left: 74 }}
            barSize={13}
          >
            <CartesianGrid stroke={CHART_AXIS.grid} horizontal={false} />
            <XAxis
              type="number"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => `${v / 1000}K`}
            />
            <YAxis
              type="category"
              dataKey="name"
              tickLine={false}
              axisLine={false}
              width={74}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
            />
            <Tooltip
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number) => [v.toLocaleString("id-ID"), "Headcount"]}
            />
            <Bar dataKey="headcount" radius={[0, 3, 3, 0]} isAnimationActive={false}>
              {DATA.map((d) => (
                <Cell key={d.full} fill={d.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
