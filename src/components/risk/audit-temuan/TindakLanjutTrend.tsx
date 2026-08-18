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
import { tlTrend } from "@/lib/risk-data-detail";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

export function TindakLanjutTrend() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Tren Tindak Lanjut" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        % Temuan Closed Kumulatif — 12 Bulan Terakhir
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={tlTrend} margin={{ top: 14, right: 14, bottom: 0, left: -14 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="bulan"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              interval={1}
            />
            <YAxis
              domain={[60, 90]}
              ticks={[60, 70, 80, 90]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => `${v}%`}
              width={38}
            />
            <Tooltip
              formatter={(v: number) => [`${v}%`, "Closed"]}
              contentStyle={CHART_TOOLTIP_STYLE}
            />
            <Line isAnimationActive={false}
              type="monotone"
              dataKey="closedPct"
              stroke={PALETTE.green}
              strokeWidth={1.8}
              dot={{ r: 2 }}
              activeDot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-1 rounded-md bg-ptpn-greenLight px-2 py-[5px] text-[9px] leading-[1.4] text-ptpn-greenDark">
        Closure rate naik 66% → 81% dalam 12 bulan; sisa gap ada pada temuan bernilai besar.
      </p>
    </div>
  );
}
