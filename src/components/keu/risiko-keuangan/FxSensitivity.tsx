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
import { fxTornado } from "@/lib/krk-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { fmtId } from "@/lib/keu-core";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const fmtImpact = (v: number) => `${v > 0 ? "+" : "−"}Rp ${fmtId(Math.abs(v), 2)} T`;

interface TickProps {
  x?: number;
  y?: number;
  payload?: { value: string };
}

function DriverTick({ x = 0, y = 0, payload }: TickProps) {
  const words = String(payload?.value ?? "").split(" ");
  const mid = Math.ceil(words.length / 2);
  const lines =
    words.length > 2
      ? [words.slice(0, mid).join(" "), words.slice(mid).join(" ")]
      : [words.join(" ")];
  return (
    <text x={x} y={y} textAnchor="end" dominantBaseline="middle">
      {lines.map((line, i) => (
        <tspan
          key={line}
          x={x}
          dy={i === 0 ? (lines.length > 1 ? -4 : 3) : 9}
          style={{ fontSize: 8.5, fill: "var(--chart-tick)", fontWeight: 600 }}
        >
          {line}
        </tspan>
      ))}
    </text>
  );
}

export function FxSensitivity() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "180ms" } as React.CSSProperties}
    >
      <SectionHead title="FX Sensitivity" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Dampak Pergerakan IDR ±5% terhadap Laba (Rp T) — eksposur neto USD 420 jt
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={fxTornado}
            layout="vertical"
            margin={{ top: 6, right: 16, bottom: 0, left: 32 }}
            barCategoryGap="32%"
          >
            <CartesianGrid stroke={CHART_AXIS.grid} horizontal={false} />
            <XAxis
              type="number"
              domain={[-0.45, 0.45]}
              ticks={[-0.4, -0.2, 0, 0.2, 0.4]}
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => fmtId(v, 1)}
            />
            <YAxis
              type="category"
              dataKey="driver"
              tickLine={false}
              axisLine={false}
              tick={<DriverTick />}
              width={96}
            />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.08)" }}
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, name: string) => [
                fmtImpact(v),
                name === "apresiasi" ? "IDR menguat 5%" : "IDR melemah 5%",
              ]}
            />
            <ReferenceLine x={0} stroke={CHART_AXIS.axis} />
            <Bar isAnimationActive={false} dataKey="apresiasi" stackId="fx" fill={PALETTE.blue} maxBarSize={14} />
            <Bar isAnimationActive={false} dataKey="depresiasi" stackId="fx" fill={PALETTE.amber} maxBarSize={14} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-center gap-4 pb-1">
        <span className="flex items-center gap-1.5 text-[8.5px] text-ink-500">
          <span className="h-[7px] w-[7px] rounded-[2px]" style={{ background: PALETTE.blue }} />
          IDR menguat 5%
        </span>
        <span className="flex items-center gap-1.5 text-[8.5px] text-ink-500">
          <span className="h-[7px] w-[7px] rounded-[2px]" style={{ background: PALETTE.amber }} />
          IDR melemah 5%
        </span>
      </div>
    </div>
  );
}
