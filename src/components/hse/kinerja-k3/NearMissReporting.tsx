"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { nearMissRatio, nearMissReporting } from "@/lib/hse-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const num = (v: number) => v.toLocaleString("id-ID");

/** Pelaporan near-miss bulanan vs target budaya pelaporan 140/bulan. */
export function NearMissReporting() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "90ms" } as React.CSSProperties}
    >
      <SectionHead title="Pelaporan Near-Miss" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Laporan Diterima vs Target Budaya Pelaporan · Jan–Mei 2026 · {num(nearMissRatio.laporanYtd)}{" "}
        laporan YTD
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={nearMissReporting} margin={{ top: 10, right: 14, bottom: 0, left: -16 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="bulan"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              interval={0}
            />
            <YAxis
              domain={[80, 170]}
              ticks={[80, 110, 140, 170]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              width={34}
            />
            <Tooltip
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, name: string) => [`${num(v)} laporan`, name]}
            />
            <Line isAnimationActive={false}
              name="Target Bulanan"
              type="monotone"
              dataKey="target"
              stroke={PALETTE.amber}
              strokeWidth={1.4}
              strokeDasharray="4 3"
              dot={false}
            />
            <Line isAnimationActive={false}
              name="Laporan Diterima"
              type="monotone"
              dataKey="laporan"
              stroke={PALETTE.green}
              strokeWidth={1.9}
              dot={{ r: 2.4 }}
              activeDot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-between gap-2 border-t border-[#f4f7fa] pt-1.5">
        <p className="text-[9px] leading-snug text-ink-500">{nearMissRatio.catatan}</p>
        <div className="shrink-0 text-right">
          <div className="whitespace-nowrap text-[11px] font-extrabold leading-none text-ink-900">
            {nearMissRatio.rasio}
          </div>
          <div className="mt-[2px] whitespace-nowrap text-[9px] font-semibold text-ink-500">
            target {nearMissRatio.rasioTarget}
          </div>
        </div>
      </div>
    </div>
  );
}
