"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { varianceWaterfall, type VarianceStep } from "@/lib/kba-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { fmtId } from "@/lib/keu-core";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const TYPE_COLOR: Record<VarianceStep["type"], string> = {
  start: PALETTE.blueSoft,
  plus: PALETTE.green,
  minus: PALETTE.red,
  total: PALETTE.navy,
};

interface WfDatum {
  name: string;
  base: number;
  value: number;
  label: string;
  type: VarianceStep["type"];
}

/** Susun base transparan agar bar delta melayang ala waterfall. */
function buildWaterfall(steps: VarianceStep[]): WfDatum[] {
  let running = 0;
  return steps.map((s) => {
    if (s.type === "start" || s.type === "total") {
      running = s.value;
      return { name: s.label, base: 0, value: s.value, label: fmtId(s.value, 2), type: s.type };
    }
    const start = running;
    running += s.value;
    return {
      name: s.label,
      base: Math.min(start, running),
      value: Math.abs(s.value),
      label: `${s.value > 0 ? "+" : "−"}${fmtId(Math.abs(s.value), 2)}`,
      type: s.type,
    };
  });
}

const data = buildWaterfall(varianceWaterfall);

/** Tick dua baris untuk label langkah panjang. */
function MultilineTick({ x = 0, y = 0, payload }: { x?: number; y?: number; payload?: { value: string } }) {
  const words = String(payload?.value ?? "").split(" ");
  const lines = words.length > 1 ? [words.slice(0, -1).join(" "), words[words.length - 1]] : words;
  return (
    <text x={x} y={y + 8} textAnchor="middle" fontSize={8} fill="var(--chart-tick)">
      {lines.map((line, i) => (
        <tspan key={line} x={x} dy={i === 0 ? 0 : 8}>
          {line}
        </tspan>
      ))}
    </text>
  );
}

export function BudgetVarianceWaterfall() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Budget Variance Waterfall" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Bridge EBITDA RKAP Prorata → Realisasi YTD (Rp T) — surplus +Rp 0,52 T
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 16, right: 4, bottom: 8, left: -18 }}
            barCategoryGap="26%"
          >
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={<MultilineTick />}
              interval={0}
              height={26}
            />
            <YAxis
              domain={[0, 8]}
              ticks={[0, 2, 4, 6, 8]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              width={30}
            />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.08)" }}
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, _n: string, item) =>
                (item as { dataKey?: string })?.dataKey === "base"
                  ? [null, null]
                  : [(item as { payload?: WfDatum })?.payload?.label ?? v, "Rp T"]
              }
            />
            <Bar dataKey="base" stackId="wf" fill="transparent" isAnimationActive={false} />
            <Bar dataKey="value" stackId="wf" radius={[2, 2, 0, 0]} maxBarSize={34}>
              {data.map((d) => (
                <Cell key={d.name} fill={TYPE_COLOR[d.type]} />
              ))}
              <LabelList
                dataKey="label"
                position="top"
                offset={5}
                style={{ fontSize: 8.5, fill: "#334155", fontWeight: 700 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
