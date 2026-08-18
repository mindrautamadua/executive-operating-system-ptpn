"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { leverageTrend, NET_DEBT_EBITDA_COVENANT } from "@/lib/knl-data";
import { fmtId } from "@/lib/keu-core";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "../../hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const SERIES = [
  { key: "netDebtEbitda", label: "Net Debt/EBITDA", color: PALETTE.green },
  { key: "der", label: "DER", color: PALETTE.blue },
] as const;

/** Tren deleveraging 8 kuartal vs covenant Net Debt/EBITDA 2,5x. */
export function LeverageTrend() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "180ms" } as React.CSSProperties}
    >
      <SectionHead title="Leverage Trend" badge={<ScopeNote />} />
      <div className="mt-[3px] flex items-center justify-between gap-2">
        <p className="text-[9px] text-ink-500">DER &amp; Net Debt/EBITDA (x)</p>
        <div className="flex shrink-0 items-center gap-2.5">
          {SERIES.map((s) => (
            <span key={s.key} className="flex items-center gap-1 text-[9px] font-semibold text-ink-500">
              <span className="h-[7px] w-[7px] rounded-full" style={{ backgroundColor: s.color }} />
              {s.label}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={leverageTrend} margin={{ top: 8, right: 10, bottom: 0, left: -22 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="quarter"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              interval={0}
            />
            <YAxis
              domain={[0, 3]}
              ticks={[0, 1, 2, 3]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => `${v}x`}
              width={34}
            />
            <ReferenceLine
              y={NET_DEBT_EBITDA_COVENANT}
              stroke={PALETTE.red}
              strokeDasharray="5 4"
              label={{
                value: "Covenant 2,5x",
                position: "insideTopRight",
                style: { fontSize: 8.5, fill: PALETTE.red, fontWeight: 800 },
              }}
            />
            <Tooltip
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, name: string) => [
                `${fmtId(v, 2)}x`,
                SERIES.find((s) => s.key === name)?.label ?? name,
              ]}
            />
            {SERIES.map((s) => (
              <Line isAnimationActive={false}
                key={s.key}
                type="monotone"
                dataKey={s.key}
                stroke={s.color}
                strokeWidth={1.8}
                dot={false}
                activeDot={{ r: 3.5 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
