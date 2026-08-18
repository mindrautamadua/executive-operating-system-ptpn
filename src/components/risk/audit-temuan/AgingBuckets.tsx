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
import { agingBuckets } from "@/lib/risk-data-detail";
import { CHART_AXIS, CHART_TOOLTIP_STYLE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const TOTAL = agingBuckets.reduce((s, b) => s + b.count, 0);

export function AgingBuckets() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Aging Temuan Terbuka" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Umur {TOTAL} Temuan Terbuka Lintas Sumber per 31 Mei 2026
      </p>

      <div className="mt-1 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={agingBuckets} margin={{ top: 18, right: 10, bottom: 0, left: -18 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              width={34}
            />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.10)" }}
              formatter={(v: number) => [`${v} temuan`, "Terbuka"]}
              contentStyle={CHART_TOOLTIP_STYLE}
            />
            <Bar dataKey="count" radius={[4, 4, 0, 0]} barSize={34}>
              {agingBuckets.map((b) => (
                <Cell key={b.label} fill={b.color} />
              ))}
              <LabelList
                dataKey="count"
                position="top"
                style={{ fontSize: 8.5, fill: "#334155", fontWeight: 700 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-1 rounded-md bg-[#fdecec] px-2 py-[5px] text-[9px] leading-[1.4] text-[#b91c1c]">
        11 temuan overdue = 7 bucket 90–180 hari + 4 bucket &gt;180 hari — wajib eskalasi Komite Audit.
      </p>
    </div>
  );
}
