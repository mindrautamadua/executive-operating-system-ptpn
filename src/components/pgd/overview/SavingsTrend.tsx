"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { savingsTrend } from "@/lib/pgd-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const rpM = (v: number) => `Rp ${v.toLocaleString("id-ID")} M`;

export function SavingsTrend() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Penghematan Kumulatif" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Realisasi vs Jalur Target (Rp M) · target FY Rp 850 M · YTD Rp 386 M (45,4%)
      </p>

      <div className="mt-1 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={savingsTrend} margin={{ top: 10, right: 10, bottom: 0, left: -8 }}>
            <defs>
              <linearGradient id="pgd-save-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={PALETTE.green} stopOpacity="0.2" />
                <stop offset="100%" stopColor={PALETTE.green} stopOpacity="0.02" />
              </linearGradient>
            </defs>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
            />
            <YAxis
              domain={[0, 450]}
              ticks={[0, 150, 300, 450]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              width={34}
            />
            <Tooltip contentStyle={CHART_TOOLTIP_STYLE} formatter={(v: number) => rpM(v)} />
            <Legend
              verticalAlign="top"
              align="right"
              height={16}
              iconSize={7}
              wrapperStyle={{ fontSize: 8.5 }}
            />
            <Area isAnimationActive={false}
              name="Realisasi Kumulatif"
              type="monotone"
              dataKey="kumulatif"
              stroke={PALETTE.green}
              strokeWidth={1.8}
              fill="url(#pgd-save-fill)"
              dot={{ r: 2.4 }}
              activeDot={{ r: 4 }}
            />
            <Area isAnimationActive={false}
              name="Jalur Target"
              type="monotone"
              dataKey="target"
              stroke={PALETTE.amber}
              strokeWidth={1.5}
              strokeDasharray="4 3"
              fill="none"
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <p className="pb-1 text-[9px] leading-snug text-ink-500">
        Realisasi melampaui jalur prorata sejak Apr&apos;26 (+Rp 32 M) — namun 43,5% penghematan
        masih bergantung pada 42 kontrak payung yang belum menutup seluruh kategori strategis.
      </p>
    </div>
  );
}
