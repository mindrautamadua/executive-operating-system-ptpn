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
import { geoConcentration } from "@/lib/risk-data-detail";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const TOTAL = geoConcentration.reduce((s, r) => s + r.count, 0);

export function GeoConcentration() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Konsentrasi Geografis" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Sebaran {TOTAL} Perkara Aktif per Provinsi
      </p>

      <div className="mt-1 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={geoConcentration}
            layout="vertical"
            margin={{ top: 2, right: 24, bottom: 2, left: 4 }}
          >
            <CartesianGrid stroke={CHART_AXIS.grid} horizontal={false} />
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="provinsi"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              width={92}
            />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.10)" }}
              formatter={(v: number) => [`${v} perkara`, "Jumlah"]}
              contentStyle={CHART_TOOLTIP_STYLE}
            />
            <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={10}>
              {geoConcentration.map((r) => (
                <Cell
                  key={r.provinsi}
                  fill={r.count >= 10 ? PALETTE.red : r.count >= 6 ? PALETTE.amber : PALETTE.blue}
                />
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
        Sumut, Riau &amp; Jatim memegang 52% perkara — penempatan tim legal regional mengikuti pola
        ini.
      </p>
    </div>
  );
}
