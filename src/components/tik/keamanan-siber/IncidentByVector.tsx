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
import { incidentByVector } from "@/lib/tik-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const pct = (v: number) => `${v.toLocaleString("id-ID", { minimumFractionDigits: 1 })}%`;

/** Distribusi insiden YTD menurut vektor serangan. */
export function IncidentByVector() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "90ms" } as React.CSSProperties}
    >
      <SectionHead title="Insiden per Vektor Serangan" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Jumlah Insiden YTD 2026 · phishing mendominasi 41,2%
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={incidentByVector}
            layout="vertical"
            margin={{ top: 4, right: 20, bottom: 0, left: 4 }}
            barCategoryGap="24%"
          >
            <CartesianGrid stroke={CHART_AXIS.grid} horizontal={false} />
            <XAxis
              type="number"
              domain={[0, 16]}
              ticks={[0, 4, 8, 12, 16]}
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
            />
            <YAxis
              type="category"
              dataKey="vektor"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              width={132}
              interval={0}
            />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.08)" }}
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, _n: string, item) => {
                const r = item.payload as (typeof incidentByVector)[number];
                return [`${v} insiden · ${pct(r.pct)} · tren ${r.tren}`, r.vektor];
              }}
            />
            <Bar dataKey="jumlah" radius={[0, 3, 3, 0]} barSize={13}>
              {incidentByVector.map((r) => (
                <Cell key={r.vektor} fill={r.color} fillOpacity={0.85} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="pb-1 text-[9px] leading-snug text-ink-500">
        Dua vektor bertren naik — phishing (14) dan akses tidak sah (6); yang kedua beririsan dengan
        temuan audit berulang review akses user ERP.
      </p>
    </div>
  );
}
