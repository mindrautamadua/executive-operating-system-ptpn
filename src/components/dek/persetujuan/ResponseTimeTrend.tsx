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
import { responseTimeTrend } from "@/lib/dek-data-detail";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const LABELS: Record<string, string> = {
  rataHari: "Rata Waktu Tanggapan",
  sla: "SLA Internal",
};

/** Tren rata-rata waktu tanggapan Dewan Komisaris 12 bulan vs SLA 14 hari. */
export function ResponseTimeTrend() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "240ms" } as React.CSSProperties}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <SectionHead title="Tren Waktu Tanggapan" badge={<ScopeNote />} />
          <p className="mt-[3px] text-[9px] text-ink-500">
            12 Bulan Terakhir · Rata-Rata YTD 11 Hari · Puncak April 15 Hari
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2.5">
          <span className="flex items-center gap-1">
            <span
              className="h-[7px] w-[7px] shrink-0 rounded-full"
              style={{ backgroundColor: PALETTE.blue }}
            />
            <span className="text-[9px] font-semibold text-ink-500">Rata Hari</span>
          </span>
          <span className="flex items-center gap-1">
            <span
              className="h-[7px] w-[7px] shrink-0 rounded-full"
              style={{ backgroundColor: PALETTE.red }}
            />
            <span className="text-[9px] font-semibold text-ink-500">SLA 14 Hari</span>
          </span>
        </div>
      </div>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={responseTimeTrend} margin={{ top: 16, right: 12, bottom: 0, left: -18 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="bulan"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              interval={0}
            />
            <YAxis
              domain={[0, 20]}
              ticks={[0, 5, 10, 14, 20]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              width={38}
            />
            <Tooltip
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, n: string) => [`${v} hari`, LABELS[n] ?? n]}
            />
            <Line isAnimationActive={false}
              type="monotone"
              dataKey="sla"
              stroke={PALETTE.red}
              strokeWidth={1.2}
              strokeDasharray="3 3"
              dot={false}
              activeDot={false}
            />
            <Line isAnimationActive={false}
              type="monotone"
              dataKey="rataHari"
              stroke={PALETTE.blue}
              strokeWidth={2.2}
              dot={{ r: 2.4, fill: PALETTE.blue, strokeWidth: 0 }}
              activeDot={{ r: 4 }}
            >
              <LabelList
                dataKey="rataHari"
                position="top"
                offset={6}
                style={{ fontSize: 8.5, fill: "#334155", fontWeight: 700 }}
              />
            </Line>
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
