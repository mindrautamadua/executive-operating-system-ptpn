"use client";

import {
  Bar,
  CartesianGrid,
  ComposedChart,
  LabelList,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { theftTrend } from "@/lib/hse-data-detail";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const desimal = (v: number) => v.toLocaleString("id-ID", { minimumFractionDigits: 2 });

/** Tren kasus pencurian TBS & nilai kerugian 12 bulan. */
export function TheftTrend() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Tren Pencurian TBS & Kerugian" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        12 Bulan Terakhir · 312 Kasus &amp; Rp 8,4 M Kerugian
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={theftTrend} margin={{ top: 16, right: -8, bottom: 0, left: -16 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="bulan"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              interval={0}
            />
            <YAxis
              yAxisId="kasus"
              domain={[0, 40]}
              ticks={[0, 10, 20, 30, 40]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
            />
            <YAxis
              yAxisId="rugi"
              orientation="right"
              domain={[0, 1]}
              ticks={[0, 0.25, 0.5, 0.75, 1]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => v.toLocaleString("id-ID")}
            />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.08)" }}
              formatter={(v: number, name: string) =>
                name === "kasus" ? [`${v} kasus`, "Pencurian TBS"] : [`Rp ${desimal(v)} M`, "Kerugian"]
              }
              contentStyle={CHART_TOOLTIP_STYLE}
            />
            <Bar
              yAxisId="kasus"
              dataKey="kasus"
              fill={PALETTE.blue}
              fillOpacity={0.85}
              radius={[3, 3, 0, 0]}
            >
              <LabelList
                dataKey="kasus"
                position="top"
                offset={4}
                style={{ fontSize: 8, fill: "var(--text-1)", fontWeight: 700 }}
              />
            </Bar>
            <Line
              yAxisId="rugi"
              type="linear"
              dataKey="kerugianRpM"
              stroke={PALETTE.red}
              strokeWidth={1.8}
              dot={{ r: 2.4, fill: PALETTE.red, strokeWidth: 0 }}
              activeDot={{ r: 4 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-1 truncate text-[9px] text-ink-500">
        Batang = kasus · garis = kerugian (Rp miliar) · kasus naik seiring harga TBS Rp 3.120/kg
      </p>
    </div>
  );
}
