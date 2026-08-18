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
import { findingByCategory } from "@/lib/risk-data-detail";
import { CHART_AXIS, CHART_TOOLTIP_STYLE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const TOTAL = findingByCategory.reduce((s, c) => s + c.count, 0);

export function FindingsByCategory() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "180ms" } as React.CSSProperties}
    >
      <SectionHead title="Temuan per Kategori" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Distribusi {TOTAL} Temuan Seluruh Sumber YTD
      </p>

      <div className="mt-1 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={findingByCategory}
            layout="vertical"
            margin={{ top: 2, right: 26, bottom: 2, left: 4 }}
          >
            <CartesianGrid stroke={CHART_AXIS.grid} horizontal={false} />
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="kategori"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              width={98}
            />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.10)" }}
              formatter={(v: number) => [`${v} temuan`, "Jumlah"]}
              contentStyle={CHART_TOOLTIP_STYLE}
            />
            <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={16}>
              {findingByCategory.map((c) => (
                <Cell key={c.kategori} fill={c.color} />
              ))}
              <LabelList
                dataKey="count"
                position="right"
                style={{ fontSize: 8.5, fill: "#334155", fontWeight: 700 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-1 rounded-md bg-[#f8fafc] px-2 py-[5px] text-[9px] leading-[1.4] text-ink-500">
        Pengadaan (61) &amp; Operasional (64) menyumbang 51% temuan — dua area prioritas audit H2.
      </p>
    </div>
  );
}
