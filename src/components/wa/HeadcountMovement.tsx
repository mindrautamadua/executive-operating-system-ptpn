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
import { headcountMovement, type MovementStep } from "@/lib/wa-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "../hc/SectionHead";
import { ScopeNote } from "../ui/ScopeNote";

const KIND_COLOR: Record<MovementStep["kind"], string> = {
  total: PALETTE.blueSoft,
  in: PALETTE.green,
  out: PALETTE.red,
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
    <text x={x} y={y + 8} textAnchor="middle" fontSize={8} fill="var(--chart-tick)">
      {lines.map((line: string, i: number) => (
        <tspan key={line} x={x} dy={i === 0 ? 0 : 8}>
          {line}
        </tspan>
      ))}
    </text>
  );
}

export function HeadcountMovement() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "180ms" } as React.CSSProperties}
    >
      <SectionHead
        title="Headcount Movement (YTD)"
        action="Lihat Detail"
        href="/workforce-analytics/headcount-movement"
        badge={<ScopeNote />}
      />
      <p className="mt-[3px] text-[9px] text-ink-500">Arus Pergerakan Karyawan YTD</p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={headcountMovement}
            margin={{ top: 16, right: 4, bottom: 8, left: -6 }}
            barCategoryGap="28%"
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
              domain={[0, 80000]}
              ticks={[0, 20000, 40000, 60000, 80000]}
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
                  : [item?.payload?.label, "Perubahan"]
              }
            />
            {/* dasar transparan agar bar delta "melayang" ala waterfall */}
            <Bar dataKey="base" stackId="wf" fill="transparent" isAnimationActive={false} />
            <Bar dataKey="value" stackId="wf" radius={[2, 2, 0, 0]} maxBarSize={34}>
              {headcountMovement.map((d) => (
                <Cell key={d.name} fill={KIND_COLOR[d.kind]} />
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
