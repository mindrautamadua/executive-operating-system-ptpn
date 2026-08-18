"use client";

import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { followUpTrend } from "@/lib/dek-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

/** Rekomendasi terbit vs ditindaklanjuti 12 bulan terakhir. */
export function FollowUpTrend() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "90ms" } as React.CSSProperties}
    >
      <SectionHead title="Rekomendasi Terbit vs Ditindaklanjuti" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        12 Bulan Terakhir (jumlah butir) · garis penutupan tertinggal sejak Januari 2026
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={followUpTrend} margin={{ top: 8, right: 12, bottom: 0, left: -18 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="bulan"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              interval={0}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              width={34}
            />
            <Tooltip
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, name: string) => [`${v.toLocaleString("id-ID")} butir`, name]}
            />
            <Legend
              verticalAlign="top"
              align="right"
              height={16}
              iconSize={7}
              wrapperStyle={{ fontSize: 8.5 }}
            />
            <Bar
              name="Terbit"
              dataKey="terbit"
              fill={PALETTE.blue}
              radius={[3, 3, 0, 0]}
              barSize={11}
            />
            <Line
              name="Ditindaklanjuti"
              type="monotone"
              dataKey="ditindaklanjuti"
              stroke={PALETTE.green}
              strokeWidth={1.9}
              dot={{ r: 2.4 }}
              activeDot={{ r: 4 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <p className="pb-1 text-[9px] leading-snug text-ink-500">
        Sejak Januari 2026 laju penerbitan (13,6/bulan) melampaui laju penutupan (10,2/bulan);
        selisih kumulatif kini 17 butir terbuka.
      </p>
    </div>
  );
}
