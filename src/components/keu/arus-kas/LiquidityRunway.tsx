"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { liquidityRunway, MINIMUM_CASH_RPT, runwayNote } from "@/lib/kas-data";
import { fmtId } from "@/lib/keu-core";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "../../hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

/** Proyeksi kas mingguan 13 minggu vs ambang minimum cash Rp 3,5 T. */
export function LiquidityRunway() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Liquidity Runway 13 Minggu" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Proyeksi Saldo Kas Mingguan vs Minimum Cash Rp {fmtId(MINIMUM_CASH_RPT, 1)} T
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={liquidityRunway} margin={{ top: 10, right: 10, bottom: 0, left: -14 }}>
            <defs>
              <linearGradient id="kas-runway-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={PALETTE.teal} stopOpacity="0.18" />
                <stop offset="100%" stopColor={PALETTE.teal} stopOpacity="0.02" />
              </linearGradient>
            </defs>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="week"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              interval={0}
            />
            <YAxis
              domain={[2, 9]}
              ticks={[2, 3.5, 5, 6.5, 8]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => `${fmtId(v, 1)} T`}
              width={38}
            />
            <ReferenceLine
              y={MINIMUM_CASH_RPT}
              stroke={PALETTE.red}
              strokeDasharray="5 4"
              label={{
                value: "Minimum Cash 3,5 T",
                position: "insideBottomRight",
                style: { fontSize: 8.5, fill: PALETTE.red, fontWeight: 800 },
              }}
            />
            <Tooltip
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number) => [`Rp ${fmtId(v, 1)} T`, "Proyeksi Kas"]}
            />
            <Area isAnimationActive={false}
              type="monotone"
              dataKey="proyeksi"
              stroke={PALETTE.teal}
              strokeWidth={1.8}
              fill="url(#kas-runway-fill)"
              dot={{ r: 2, strokeWidth: 0, fill: PALETTE.teal }}
              activeDot={{ r: 4 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-1 truncate text-[9px] leading-snug text-ink-500" title={runwayNote}>
        {runwayNote}
      </p>
    </div>
  );
}
