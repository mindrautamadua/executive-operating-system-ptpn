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
import { SectionHead } from "@/components/hc/SectionHead";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { headcountMovement, type MovementStep } from "@/lib/wa-data";

const KIND_COLOR: Record<MovementStep["kind"], string> = {
  total: PALETTE.blueSoft,
  in: PALETTE.green,
  out: PALETTE.red,
};

/** Tick dua baris (label dipisah "\n"). */
function MultilineTick({ x, y, payload }: { x?: number; y?: number; payload?: { value: string } }) {
  const lines = String(payload?.value ?? "").split("\n");
  return (
    <text x={x} y={(y ?? 0) + 8} textAnchor="middle" fontSize={8} fill="var(--chart-tick)">
      {lines.map((line, i) => (
        <tspan key={line} x={x} dy={i === 0 ? 0 : 8}>
          {line}
        </tspan>
      ))}
    </text>
  );
}

/** Waterfall arus headcount YTD: Des 2025 → Mei 2026. */
export function MovementWaterfall() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "40ms" } as React.CSSProperties}
    >
      <SectionHead title="Arus Headcount YTD" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        68.501 (Des 2025) → 70.142 (Mei 2026) ·{" "}
        <span className="font-bold text-ptpn-green">net +1.641</span>
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={headcountMovement}
            margin={{ top: 18, right: 6, bottom: 8, left: -4 }}
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
              domain={[64000, 76000]}
              ticks={[64000, 68000, 72000, 76000]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => `${v / 1000}K`}
              width={36}
            />
            <Tooltip
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, _n: string, p: { payload?: MovementStep }) => [
                p.payload?.label ?? v.toLocaleString("id-ID"),
                p.payload?.kind === "total" ? "Posisi" : "Perubahan",
              ]}
            />
            <Bar dataKey="base" stackId="w" fill="transparent" isAnimationActive={false} />
            <Bar dataKey="value" stackId="w" radius={[3, 3, 0, 0]} isAnimationActive={false}>
              {headcountMovement.map((s) => (
                <Cell key={s.name} fill={KIND_COLOR[s.kind]} />
              ))}
              <LabelList
                dataKey="label"
                position="top"
                style={{ fontSize: 8.5, fontWeight: 700, fill: "#334155" }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
