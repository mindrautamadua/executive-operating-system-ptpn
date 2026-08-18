"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { attendanceTrend } from "@/lib/dek-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const pct = (v: number) => `${v.toLocaleString("id-ID")}%`;

/** Tren kehadiran 12 bulan: rapat Dekom & gabungan vs rapat komite. */
export function AttendanceTrend() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "210ms" } as React.CSSProperties}
    >
      <SectionHead title="Tren Kehadiran Rapat" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        12 Bulan Terakhir (%) · rata-rata YTD 2026 gabungan 94%
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={attendanceTrend} margin={{ top: 8, right: 14, bottom: 0, left: -14 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="bulan"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              interval={0}
            />
            <YAxis
              domain={[84, 102]}
              ticks={[85, 90, 95, 100]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => pct(v)}
              width={40}
            />
            <Tooltip
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, name: string) => [pct(v), name]}
            />
            <Legend
              verticalAlign="top"
              align="right"
              height={16}
              iconSize={7}
              wrapperStyle={{ fontSize: 8.5 }}
            />
            <Line isAnimationActive={false}
              name="Rapat Dekom & Gabungan"
              type="monotone"
              dataKey="dekom"
              stroke={PALETTE.navy}
              strokeWidth={1.9}
              dot={{ r: 2.4 }}
              activeDot={{ r: 4 }}
            />
            <Line isAnimationActive={false}
              name="Rapat Komite"
              type="monotone"
              dataKey="komite"
              stroke={PALETTE.teal}
              strokeWidth={1.6}
              dot={{ r: 2.2 }}
              activeDot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <p className="pb-1 text-[9px] leading-snug text-ink-500">
        Kehadiran rapat Dekom Mei turun ke 89%, titik terendah enam bulan, bertepatan dengan tiga
        rapat yang berimpit dengan jadwal komite.
      </p>
    </div>
  );
}
