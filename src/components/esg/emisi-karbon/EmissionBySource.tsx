"use client";

import {
  Bar,
  BarChart,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { emissionBySource } from "@/lib/esg-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const angka = (v: number) => v.toLocaleString("id-ID", { minimumFractionDigits: 2 });

export function EmissionBySource() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "90ms" } as React.CSSProperties}
    >
      <SectionHead title="Emisi per Sumber" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Kontribusi Scope 1+2 (jt tCO2e/tahun) · Total 5,34 jt
      </p>

      <div className="mt-1 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={emissionBySource}
            layout="vertical"
            margin={{ top: 4, right: 42, bottom: 0, left: 4 }}
          >
            <XAxis type="number" hide domain={[0, 2.4]} />
            <YAxis
              type="category"
              dataKey="sumber"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              width={116}
            />
            <Tooltip
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number) => [`${angka(v)} jt tCO2e`, "Emisi"]}
            />
            <Bar dataKey="nilaiJtTon" radius={[0, 3, 3, 0]} barSize={13}>
              {emissionBySource.map((d) => (
                <Cell key={d.sumber} fill={d.color} />
              ))}
              <LabelList
                dataKey="pct"
                position="right"
                formatter={(v: React.ReactNode) => `${v}%`}
                style={{ fontSize: 8, fill: "#334155", fontWeight: 700 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="pb-1 text-[9px] leading-snug text-ink-500">
        POME 2,01 jt tCO2e (38%) adalah sumber tunggal terbesar — target utama metana capture.
      </p>
    </div>
  );
}
