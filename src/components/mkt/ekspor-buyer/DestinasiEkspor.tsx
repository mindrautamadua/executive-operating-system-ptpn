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
import { destinasiEkspor } from "@/lib/kontrak-buyer-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { ScopeNote } from "@/components/ui/ScopeNote";
import { SectionHead } from "@/components/hc/SectionHead";

const BAR_COLORS = [
  PALETTE.blue,
  PALETTE.blue,
  PALETTE.blueSoft,
  PALETTE.amber,
  PALETTE.blueSoft,
  PALETTE.slate,
];

/** Volume ekspor CPO per negara tujuan (bar horizontal). */
export function DestinasiEkspor() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "150ms" } as React.CSSProperties}
    >
      {/* Destinasi dipecah per negara, bukan per komoditas — angka konsolidasi grup. */}
      <SectionHead title="Destinasi Ekspor" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Volume CPO ekspor per negara tujuan YTD (rb ton, total 213)
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={destinasiEkspor}
            layout="vertical"
            margin={{ top: 0, right: 44, bottom: 0, left: 8 }}
            barCategoryGap="24%"
          >
            <CartesianGrid stroke={CHART_AXIS.grid} horizontal={false} />
            <XAxis
              type="number"
              domain={[0, 80]}
              ticks={[0, 20, 40, 60, 80]}
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
            />
            <YAxis
              type="category"
              dataKey="negara"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              width={96}
            />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.08)" }}
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, _n: string, item: { payload?: { sharePct?: number } }) => [
                `${v.toLocaleString("id-ID")} rb ton (${item.payload?.sharePct ?? 0}%)`,
                "Volume Ekspor",
              ]}
            />
            <Bar dataKey="volumeRbTon" radius={[0, 3, 3, 0]} maxBarSize={13}>
              {destinasiEkspor.map((d, i) => (
                <Cell key={d.negara} fill={BAR_COLORS[i] ?? PALETTE.slate} />
              ))}
              <LabelList
                dataKey="sharePct"
                position="right"
                offset={5}
                formatter={(v: number) => `${v}%`}
                style={{ fontSize: 8.5, fill: "#334155", fontWeight: 700 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-1 truncate text-[9px] text-ink-500">
        India &amp; Tiongkok menyerap 56% ekspor · Belanda (11%) terpapar EUDR Des 2026.
      </p>
    </div>
  );
}
