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
import { ncBreakdown, ncFootnote } from "@/lib/esg-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

export function NonConformityBreakdown() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Non-Conformity per Prinsip ISPO" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        118 Temuan Audit 12 Bulan Terakhir · Major &amp; Minor NC
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={ncBreakdown}
            layout="vertical"
            margin={{ top: 4, right: 30, bottom: 0, left: 4 }}
          >
            <XAxis type="number" hide domain={[0, 46]} />
            <YAxis
              type="category"
              dataKey="prinsip"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              width={112}
            />
            <Tooltip
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number) => [`${v} temuan`, "Non-conformity"]}
            />
            <Bar dataKey="jumlah" radius={[0, 3, 3, 0]} barSize={11}>
              {ncBreakdown.map((d) => (
                <Cell key={d.prinsip} fill={d.color} />
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

      <p className="pb-1 text-[9px] leading-snug text-ink-500">{ncFootnote}</p>
    </div>
  );
}
