"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { tornado, type TornadoDriver } from "@/lib/ksk-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { fmtId } from "@/lib/keu-core";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const fmtImpact = (v: number) => `${v > 0 ? "+" : "−"}Rp ${fmtId(Math.abs(v), 2)} T`;

export function SensitivityTornadoFin() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "180ms" } as React.CSSProperties}
    >
      <SectionHead title="Sensitivity Tornado" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Dampak Pergerakan 6 Driver terhadap EBITDA FY (Rp T)
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={tornado}
            layout="vertical"
            margin={{ top: 6, right: 16, bottom: 0, left: 24 }}
            barCategoryGap="30%"
          >
            <CartesianGrid stroke={CHART_AXIS.grid} horizontal={false} />
            <XAxis
              type="number"
              domain={[-2.2, 2.2]}
              ticks={[-2, -1, 0, 1, 2]}
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => fmtId(v, 0)}
            />
            <YAxis
              type="category"
              dataKey="driver"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick, fontWeight: 600 }}
              width={92}
            />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.08)" }}
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, name: string, item) => {
                const range = (item as { payload?: TornadoDriver })?.payload?.range ?? "";
                return [
                  fmtImpact(v),
                  `${name === "low" ? "Skenario buruk" : "Skenario baik"} (${range})`,
                ];
              }}
            />
            <ReferenceLine x={0} stroke={CHART_AXIS.axis} />
            <Bar isAnimationActive={false} dataKey="low" stackId="tor" fill={PALETTE.red} maxBarSize={12} />
            <Bar isAnimationActive={false} dataKey="high" stackId="tor" fill={PALETTE.green} maxBarSize={12} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-center gap-4 pb-1">
        <span className="flex items-center gap-1.5 text-[8.5px] text-ink-500">
          <span className="h-[7px] w-[7px] rounded-[2px]" style={{ background: PALETTE.red }} />
          Skenario buruk
        </span>
        <span className="flex items-center gap-1.5 text-[8.5px] text-ink-500">
          <span className="h-[7px] w-[7px] rounded-[2px]" style={{ background: PALETTE.green }} />
          Skenario baik
        </span>
      </div>
    </div>
  );
}
