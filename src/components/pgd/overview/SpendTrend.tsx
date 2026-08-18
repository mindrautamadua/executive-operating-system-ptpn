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
import { spendTrend } from "@/lib/pgd-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const rp = (v: number) => `Rp ${v.toLocaleString("id-ID", { minimumFractionDigits: 2 })} T`;

export function SpendTrend() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "90ms" } as React.CSSProperties}
    >
      <SectionHead title="Tren Belanja Bulanan" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Realisasi vs RKAP Prorata (Rp T) · 12 bulan terakhir · YTD 2026 Rp 12,4 T
      </p>

      <div className="mt-1 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={spendTrend} margin={{ top: 10, right: 10, bottom: 0, left: -12 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
            />
            <YAxis
              domain={[0, 3.4]}
              ticks={[0, 1, 2, 3]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              width={34}
            />
            <Tooltip contentStyle={CHART_TOOLTIP_STYLE} formatter={(v: number) => rp(v)} />
            <Legend
              verticalAlign="top"
              align="right"
              height={16}
              iconSize={7}
              wrapperStyle={{ fontSize: 8.5 }}
            />
            <Bar
              name="Realisasi Belanja"
              dataKey="belanja"
              fill={PALETTE.blue}
              radius={[3, 3, 0, 0]}
              barSize={13}
            />
            <Line
              name="RKAP Prorata"
              type="monotone"
              dataKey="rkapProrata"
              stroke={PALETTE.amber}
              strokeWidth={1.8}
              strokeDasharray="4 3"
              dot={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <p className="pb-1 text-[9px] leading-snug text-ink-500">
        Sejak Mar&apos;26 realisasi bulanan konsisten di atas prorata Rp 2,48 T — laju belanja +8,4%
        YoY perlu diimbangi penghematan sourcing.
      </p>
    </div>
  );
}
