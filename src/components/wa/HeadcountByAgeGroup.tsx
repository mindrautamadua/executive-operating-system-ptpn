"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { headcountByAge } from "@/lib/wa-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE } from "@/lib/chart-palette";
import { SectionHead } from "../hc/SectionHead";
import { ScopeNote } from "../ui/ScopeNote";

const ribuan = (v: number) => v.toLocaleString("id-ID");

export function HeadcountByAgeGroup() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-1.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead
        title="Headcount by Age Group"
        action="Lihat Detail"
        href="/workforce-analytics/headcount-usia"
        badge={<ScopeNote />}
      />
      <p className="mt-[3px] text-[9px] text-ink-500">Distribusi Usia Karyawan</p>

      <div className="mt-1 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={headcountByAge} margin={{ top: 18, right: 6, bottom: 12, left: -8 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              interval={0}
              label={{
                value: "Age Group (Tahun)",
                position: "insideBottom",
                offset: -10,
                style: { fontSize: 8.5, fill: "var(--chart-tick)" },
              }}
            />
            <YAxis
              domain={[0, 25000]}
              ticks={[0, 5000, 10000, 15000, 20000, 25000]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => (v === 0 ? "0" : `${v / 1000}K`)}
              width={40}
              label={{
                value: "Jumlah Karyawan",
                angle: -90,
                position: "insideLeft",
                offset: 16,
                style: { fontSize: 8.5, fill: "var(--chart-tick)", textAnchor: "middle" },
              }}
            />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.08)" }}
              formatter={(v: number) => [ribuan(v), "Karyawan"]}
              contentStyle={CHART_TOOLTIP_STYLE}
            />
            <Bar isAnimationActive={false} dataKey="value" radius={[3, 3, 0, 0]} maxBarSize={26}>
              {headcountByAge.map((d) => (
                <Cell key={d.name} fill={d.color} />
              ))}
              <LabelList
                dataKey="value"
                position="top"
                offset={6}
                formatter={ribuan}
                style={{ fontSize: 8, fill: "#334155", fontWeight: 700 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
