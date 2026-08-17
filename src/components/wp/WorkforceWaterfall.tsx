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
import { gapWaterfall, waterfallNote, type WfStep } from "@/lib/wp-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "../hc/SectionHead";

const KIND_COLOR: Record<WfStep["kind"], string> = {
  total: PALETTE.blueSoft,
  out: PALETTE.green,
};

/** Tick dua baris (label dipisah "\n"). */
function MultilineTick({
  x = 0,
  y = 0,
  payload,
}: {
  x?: number;
  y?: number;
  payload?: { value: string | number };
}) {
  const lines = String(payload?.value).split("\n");
  return (
    <text x={x} y={y + 8} textAnchor="middle" fontSize={7} fill="var(--chart-tick)">
      {lines.map((line: string, i: number) => (
        <tspan key={line} x={x} dy={i === 0 ? 0 : 8}>
          {line}
        </tspan>
      ))}
    </text>
  );
}

/**
 * Workforce Gap Waterfall: kebutuhan bruto 7.834 (net 3.714 + attrisi 4.120)
 * tertutup penuh oleh mobilitas, reskilling, outsourcing, hiring.
 */
export function WorkforceWaterfall() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "360ms" } as React.CSSProperties}
    >
      <SectionHead title="Workforce Gap Waterfall 2026-2028" />
      <p className="mt-[3px] text-[9px] text-ink-500">{waterfallNote}</p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={gapWaterfall}
            margin={{ top: 16, right: 4, bottom: 8, left: -10 }}
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
              domain={[0, 8000]}
              ticks={[0, 2000, 4000, 6000, 8000]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => (v === 0 ? "0" : `${v / 1000}K`)}
              width={38}
            />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.08)" }}
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(
                v: number,
                _n: string,
                item: { dataKey?: string | number; payload?: { label: string } },
              ) =>
                item?.dataKey === "base"
                  ? [null, null]
                  : [item?.payload?.label, "Kontribusi"]
              }
            />
            {/* dasar transparan agar bar delta "melayang" ala waterfall */}
            <Bar dataKey="base" stackId="wf" fill="transparent" isAnimationActive={false} />
            <Bar dataKey="value" stackId="wf" radius={[2, 2, 0, 0]} maxBarSize={32}>
              {gapWaterfall.map((d) => (
                <Cell key={d.name} fill={KIND_COLOR[d.kind]} />
              ))}
              <LabelList
                dataKey="label"
                position="top"
                offset={5}
                style={{ fontSize: 7.5, fill: "#334155", fontWeight: 700 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
