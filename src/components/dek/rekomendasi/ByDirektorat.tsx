"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { byDirektorat, DEK_STATUS_COLOR } from "@/lib/dek-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

/** Sebaran 68 rekomendasi per direktorat PIC menurut status tindak lanjut. */
export function ByDirektorat() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "90ms" } as React.CSSProperties}
    >
      <SectionHead title="Tindak Lanjut per Direktorat" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        68 Rekomendasi YTD · 51 selesai · 8 berjalan · 9 overdue
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={byDirektorat}
            layout="vertical"
            margin={{ top: 4, right: 18, bottom: 0, left: 4 }}
          >
            <CartesianGrid stroke={CHART_AXIS.grid} horizontal={false} />
            <XAxis
              type="number"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
            />
            <YAxis
              type="category"
              dataKey="direktorat"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              width={104}
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
              name="Selesai"
              dataKey="selesai"
              stackId="s"
              fill={DEK_STATUS_COLOR.Selesai}
              barSize={13}
            />
            <Bar
              name="Berjalan"
              dataKey="berjalan"
              stackId="s"
              fill={DEK_STATUS_COLOR.Berjalan}
              barSize={13}
            />
            <Bar
              name="Overdue"
              dataKey="overdue"
              stackId="s"
              fill={DEK_STATUS_COLOR.Overdue}
              radius={[0, 3, 3, 0]}
              barSize={13}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="pb-1 text-[9px] leading-snug text-ink-500">
        Direktorat Operasi memikul 18 rekomendasi dengan penyelesaian terendah (66,7%) dan 4 dari 9
        butir overdue.
      </p>
    </div>
  );
}
