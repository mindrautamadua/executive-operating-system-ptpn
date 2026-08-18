"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { controlEffectiveness } from "@/lib/risk-data-detail";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const LATEST = controlEffectiveness[controlEffectiveness.length - 1];

export function ControlEffectiveness() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "180ms" } as React.CSSProperties}
    >
      <SectionHead title="Efektivitas Kontrol" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Tren Hasil Uji Efektivitas Kontrol Kunci · Terkini {LATEST.pct}%
      </p>

      <div className="mt-1 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={controlEffectiveness}
            margin={{ top: 16, right: 10, bottom: 0, left: -18 }}
          >
            <defs>
              <linearGradient id="erm-ctrl-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={PALETTE.teal} stopOpacity="0.18" />
                <stop offset="100%" stopColor={PALETTE.teal} stopOpacity="0.02" />
              </linearGradient>
            </defs>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="periode"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
            />
            <YAxis
              domain={[50, 85]}
              ticks={[50, 60, 70, 80]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => `${v}%`}
              width={34}
            />
            <Tooltip
              formatter={(v: number) => [`${v}%`, "Efektif"]}
              contentStyle={CHART_TOOLTIP_STYLE}
            />
            <Area isAnimationActive={false}
              type="monotone"
              dataKey="pct"
              stroke={PALETTE.teal}
              strokeWidth={1.8}
              fill="url(#erm-ctrl-fill)"
              dot={{ r: 2 }}
              activeDot={{ r: 4 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-1 rounded-md bg-ptpn-greenLight px-2 py-[5px] text-[9px] leading-[1.4] text-ptpn-greenDark">
        Naik 14 poin sejak S1 2024; percepatan lanjutan bergantung pada otomasi kontrol berbasis TI.
      </p>
    </div>
  );
}
