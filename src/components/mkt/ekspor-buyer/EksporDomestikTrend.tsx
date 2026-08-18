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
import { eksporDomestikTrend } from "@/lib/kontrak-buyer-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { ScopeNote } from "@/components/ui/ScopeNote";
import { SectionHead } from "@/components/hc/SectionHead";

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1">
      <span className="h-[6px] w-[6px] rounded-full" style={{ background: color }} />
      <span className="text-[9px] text-ink-500">{label}</span>
    </span>
  );
}

/** Tren volume CPO domestik vs ekspor 12 bulan (stacked area). */
export function EksporDomestikTrend() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      {/* Volume bauran pasar dilaporkan konsolidasi grup — tanpa pecahan subholding. */}
      <SectionHead title="Tren Ekspor vs Domestik" action="Lihat Detail" badge={<ScopeNote />} />
      <div className="mt-[3px] flex items-center justify-between gap-2">
        <p className="text-[9px] text-ink-500">
          Volume CPO per pasar, 12 bulan terakhir (rb ton, stacked)
        </p>
        <div className="flex shrink-0 items-center gap-2.5">
          <LegendDot color={PALETTE.green} label="Domestik" />
          <LegendDot color={PALETTE.blue} label="Ekspor" />
        </div>
      </div>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={eksporDomestikTrend}
            margin={{ top: 8, right: 8, bottom: 0, left: -18 }}
          >
            <defs>
              <linearGradient id="mkt-dom-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={PALETTE.green} stopOpacity="0.28" />
                <stop offset="100%" stopColor={PALETTE.green} stopOpacity="0.06" />
              </linearGradient>
              <linearGradient id="mkt-eks-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={PALETTE.blue} stopOpacity="0.35" />
                <stop offset="100%" stopColor={PALETTE.blue} stopOpacity="0.08" />
              </linearGradient>
            </defs>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="bulan"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              interval={0}
            />
            <YAxis
              domain={[0, 250]}
              ticks={[0, 50, 100, 150, 200, 250]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
            />
            <Tooltip
              formatter={(v: number, name: string) => [`${v.toLocaleString("id-ID")} rb ton`, name]}
              contentStyle={CHART_TOOLTIP_STYLE}
            />
            <Area
              type="linear"
              dataKey="domestik"
              name="Domestik"
              stackId="pasar"
              stroke={PALETTE.green}
              strokeWidth={1.6}
              fill="url(#mkt-dom-fill)"
              dot={false}
              activeDot={{ r: 3 }}
            />
            <Area
              type="linear"
              dataKey="ekspor"
              name="Ekspor"
              stackId="pasar"
              stroke={PALETTE.blue}
              strokeWidth={1.6}
              fill="url(#mkt-eks-fill)"
              dot={false}
              activeDot={{ r: 3 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-1 text-[9px] leading-snug text-ink-500">
        Jan-Mei 2026: ekspor 213 dari 968 rb ton (22,0%) — paritas ekspor membaik seiring Rotterdam +8,0%
      </p>
    </div>
  );
}
