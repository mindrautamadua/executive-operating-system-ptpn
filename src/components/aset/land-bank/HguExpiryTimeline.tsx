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
import { hguExpiry, hguExpiryNote } from "@/lib/alb-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const PUNCAK_TAHUN = "2028";

/** Timeline luas HGU berakhir 2026–2035; puncak 2028 ditandai warna berbeda. */
export function HguExpiryTimeline() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "90ms" } as React.CSSProperties}
    >
      <SectionHead title="Timeline Berakhirnya HGU" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Luas HGU Berakhir per Tahun 2026–2035 (rb ha) · puncak 2028
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={hguExpiry} margin={{ top: 16, right: 6, bottom: 0, left: -18 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="tahun"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              interval={0}
            />
            <YAxis
              domain={[0, 80]}
              ticks={[0, 20, 40, 60, 80]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              width={34}
            />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.08)" }}
              formatter={(v: number) => [`${v.toLocaleString("id-ID")} rb ha`, "HGU Berakhir"]}
              contentStyle={CHART_TOOLTIP_STYLE}
            />
            <Bar isAnimationActive={false} dataKey="luasRbHa" barSize={26} radius={[3, 3, 0, 0]}>
              {hguExpiry.map((d) => (
                <Cell
                  key={d.tahun}
                  fill={d.tahun === PUNCAK_TAHUN ? PALETTE.red : PALETTE.amber}
                  fillOpacity={d.tahun === PUNCAK_TAHUN ? 0.95 : 0.75}
                />
              ))}
              <LabelList
                dataKey="luasRbHa"
                position="top"
                offset={4}
                style={{ fontSize: 8.5, fill: "var(--text-1)", fontWeight: 700 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-1 line-clamp-2 text-[9px] leading-snug text-ink-500">{hguExpiryNote}</p>
    </div>
  );
}
