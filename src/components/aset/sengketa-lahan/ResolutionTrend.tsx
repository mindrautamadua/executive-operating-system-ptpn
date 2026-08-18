"use client";

import {
  CartesianGrid,
  LabelList,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { resolutionNote, resolutionTrend } from "@/lib/asg-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const num = (v: number) =>
  v.toLocaleString("id-ID", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

/** Tren kumulatif penyelesaian sengketa vs target linear FY 15 rb ha. */
export function ResolutionTrend() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Tren Penyelesaian Sengketa" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Kumulatif Areal Diselesaikan vs Target FY 15 rb ha (rb ha)
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={resolutionTrend} margin={{ top: 18, right: 10, bottom: 0, left: -20 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="bulan"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              interval={0}
            />
            <YAxis
              domain={[0, 8]}
              ticks={[0, 2, 4, 6, 8]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              width={32}
            />
            <Tooltip
              formatter={(v: number, name: string) => [`${num(v)} rb ha`, name]}
              contentStyle={CHART_TOOLTIP_STYLE}
            />
            <Line
              name="Target Kumulatif"
              type="linear"
              dataKey="targetKumulatifRbHa"
              stroke={PALETTE.slate}
              strokeWidth={1.5}
              strokeDasharray="4 3"
              dot={false}
              activeDot={{ r: 3.5 }}
            />
            <Line
              name="Realisasi Kumulatif"
              type="linear"
              dataKey="kumulatifRbHa"
              stroke={PALETTE.green}
              strokeWidth={1.9}
              dot={{ r: 2.4, fill: PALETTE.green, strokeWidth: 0 }}
              activeDot={{ r: 4 }}
            >
              <LabelList
                dataKey="kumulatifRbHa"
                position="top"
                offset={6}
                formatter={(v: number) => num(v)}
                style={{ fontSize: 8.5, fill: "var(--text-1)", fontWeight: 700 }}
              />
            </Line>
          </LineChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-1 line-clamp-2 text-[9px] leading-snug text-ink-500">{resolutionNote}</p>
    </div>
  );
}
