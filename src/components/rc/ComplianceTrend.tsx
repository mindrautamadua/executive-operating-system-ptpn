"use client";

import {
  CartesianGrid,
  LabelList,
  Line,
  LineChart,
  ReferenceArea,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { complianceTrend } from "@/lib/rc-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "../hc/SectionHead";

const BANDS = [
  { label: "0-69 Kritis", cls: "bg-[#fdecec] text-[#ef4444]" },
  { label: "70-84 Parsial", cls: "bg-[#fdf3e0] text-[#d98b06]" },
  { label: "85-100 Patuh", cls: "bg-ptpn-greenLight text-ptpn-green" },
];

export function ComplianceTrend() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Compliance Trend (12 Bulan Terakhir)" />
      <p className="mt-[3px] text-[9px] text-ink-500">Pergerakan Overall Compliance Score</p>

      <div className="mt-1 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={complianceTrend} margin={{ top: 14, right: 10, bottom: 0, left: -18 }}>
            <ReferenceArea y1={0} y2={69} fill={PALETTE.red} fillOpacity={0.06} />
            <ReferenceArea y1={70} y2={84} fill={PALETTE.amber} fillOpacity={0.06} />
            <ReferenceArea y1={85} y2={100} fill={PALETTE.green} fillOpacity={0.07} />
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              interval={0}
            />
            <YAxis
              domain={[0, 100]}
              ticks={[0, 25, 50, 75, 100]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
            />
            <Tooltip
              formatter={(v: number) => [v, "Compliance Score"]}
              contentStyle={CHART_TOOLTIP_STYLE}
            />
            <Line
              type="linear"
              dataKey="value"
              stroke={PALETTE.green}
              strokeWidth={1.8}
              dot={{ r: 2.4, fill: PALETTE.green, strokeWidth: 0 }}
              activeDot={{ r: 4 }}
            >
              <LabelList
                dataKey="value"
                position="top"
                offset={7}
                style={{ fontSize: 8.5, fill: "var(--text-1)", fontWeight: 700 }}
              />
            </Line>
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-1 grid grid-cols-3 gap-1.5">
        {BANDS.map((b) => (
          <span
            key={b.label}
            className={`rounded-md px-2 py-[5px] text-center text-[9px] font-bold ${b.cls}`}
          >
            {b.label}
          </span>
        ))}
      </div>
    </div>
  );
}
