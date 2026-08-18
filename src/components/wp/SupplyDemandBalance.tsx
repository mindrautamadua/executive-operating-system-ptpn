"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { supplyDemand } from "@/lib/wp-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "../hc/SectionHead";

const ribuan = (v: number) => v.toLocaleString("id-ID");

const SERIES: Record<string, string> = {
  supply: "Supply",
  demand: "Demand",
};

/** Label gap merah di dasar bar Demand. */
function GapLabel(props: {
  x?: number | string;
  y?: number | string;
  width?: number | string;
  height?: number | string;
  index?: number;
}) {
  const { x = 0, y = 0, width = 0, height = 0, index } = props;
  if (index == null) return null;
  return (
    <text
      x={Number(x) + Number(width) + 4}
      y={Number(y) + Number(height) - 5}
      fill={PALETTE.red}
      fontSize={8}
      fontWeight={700}
    >
      {ribuan(supplyDemand[index].gap)}
    </text>
  );
}

function LegendRow() {
  return (
    <div className="mt-1.5 flex items-center gap-4 text-[8.5px] font-semibold text-ink-500">
      {[
        { label: "Supply", color: PALETTE.blue },
        { label: "Demand", color: PALETTE.green },
        { label: "Gap", color: PALETTE.red },
      ].map((s) => (
        <span key={s.label} className="flex items-center gap-1.5">
          <span className="h-[8px] w-[8px] rounded-[2px]" style={{ background: s.color }} />
          {s.label}
        </span>
      ))}
    </div>
  );
}

export function SupplyDemandBalance() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "180ms" } as React.CSSProperties}
    >
      <SectionHead title="Workforce Supply & Demand Balance" />
      <LegendRow />

      <div className="mt-1 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={supplyDemand}
            margin={{ top: 18, right: 30, bottom: 0, left: -6 }}
            barCategoryGap="28%"
            barGap={4}
          >
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
            />
            <YAxis
              domain={[0, 100000]}
              ticks={[0, 20000, 40000, 60000, 80000, 100000]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => (v ? `${v / 1000}K` : "0")}
              width={38}
            />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.08)" }}
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, name: string) => [ribuan(v), SERIES[name] ?? name]}
            />
            <Bar isAnimationActive={false} dataKey="supply" fill={PALETTE.blue} radius={[3, 3, 0, 0]} maxBarSize={34}>
              <LabelList
                dataKey="supply"
                position="top"
                offset={5}
                formatter={ribuan}
                style={{ fontSize: 8.5, fill: "#334155", fontWeight: 700 }}
              />
            </Bar>
            <Bar isAnimationActive={false} dataKey="demand" fill={PALETTE.green} radius={[3, 3, 0, 0]} maxBarSize={34}>
              <LabelList
                dataKey="demand"
                position="top"
                offset={5}
                formatter={ribuan}
                style={{ fontSize: 8.5, fill: "#334155", fontWeight: 700 }}
              />
              <LabelList dataKey="gap" content={GapLabel} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
