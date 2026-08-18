"use client";

import {
  Bar,
  CartesianGrid,
  ComposedChart,
  LabelList,
  Line,
  ReferenceArea,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { hotspotFootnote, hotspotTrend } from "@/lib/hse-data-detail";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

/** Tren hotspot satelit vs kejadian kebakaran terverifikasi 12 bulan. */
export function HotspotTrend() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Tren Hotspot & Kejadian Kebakaran" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        12 Bulan Terakhir · 214 Hotspot &amp; 18 Kejadian · Puncak Musim Kering Jul–Sep Disorot
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={hotspotTrend} margin={{ top: 16, right: -8, bottom: 0, left: -16 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <ReferenceArea
              yAxisId="hotspot"
              x1="Jul 25"
              x2="Sep 25"
              fill={PALETTE.amber}
              fillOpacity={0.1}
            />
            <XAxis
              dataKey="bulan"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              interval={0}
            />
            <YAxis
              yAxisId="hotspot"
              domain={[0, 40]}
              ticks={[0, 10, 20, 30, 40]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
            />
            <YAxis
              yAxisId="kejadian"
              orientation="right"
              domain={[0, 6]}
              ticks={[0, 2, 4, 6]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
            />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.08)" }}
              formatter={(v: number, name: string) =>
                name === "hotspot" ? [`${v} titik`, "Hotspot"] : [`${v} kejadian`, "Kebakaran"]
              }
              contentStyle={CHART_TOOLTIP_STYLE}
            />
            <Bar
              yAxisId="hotspot"
              dataKey="hotspot"
              fill={PALETTE.amber}
              fillOpacity={0.85}
              radius={[3, 3, 0, 0]}
            >
              <LabelList
                dataKey="hotspot"
                position="top"
                offset={4}
                style={{ fontSize: 8, fill: "var(--text-1)", fontWeight: 700 }}
              />
            </Bar>
            <Line
              yAxisId="kejadian"
              type="linear"
              dataKey="kejadian"
              stroke={PALETTE.red}
              strokeWidth={1.8}
              dot={{ r: 2.4, fill: PALETTE.red, strokeWidth: 0 }}
              activeDot={{ r: 4 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-1 truncate text-[9px] text-ink-500" title={hotspotFootnote}>
        Jul–Sep 2025 menyumbang 91 dari 214 hotspot (42,5%) · probabilitas El Nino H2 2026 62%
      </p>
    </div>
  );
}
