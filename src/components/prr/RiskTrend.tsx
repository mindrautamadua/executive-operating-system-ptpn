"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import {
  Area,
  CartesianGrid,
  ComposedChart,
  LabelList,
  Line,
  ReferenceArea,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { RISK_APPETITE, riskTrend } from "@/lib/prr-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "../hc/SectionHead";

const BANDS = [
  { label: "0-39 Low Risk", cls: "bg-ptpn-greenLight text-ptpn-green" },
  { label: "40-69 Medium Risk", cls: "bg-[#fdf3e0] text-[#d98b06]" },
  { label: "70-100 High Risk", cls: "bg-[#fdecec] text-[#ef4444]" },
  { label: "Forecast + Confidence Band", cls: "bg-[#e8f1fd] text-[#2f6fe4]" },
];

const lastActual = [...riskTrend].reverse().find((p) => p.value !== undefined)!;

export function RiskTrend() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="People Risk Trend & Forecast" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Aktual Jun 25 - Mei 26 · Forecast Jun - Des 26 · saat ini{" "}
        <span className="font-bold text-[#ef4444]">
          {lastActual.value! - RISK_APPETITE} pts di atas appetite
        </span>
      </p>

      <div className="mt-1 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={riskTrend} margin={{ top: 14, right: 10, bottom: 0, left: -18 }}>
            <ReferenceArea y1={0} y2={39} fill={PALETTE.green} fillOpacity={0.07} />
            <ReferenceArea y1={40} y2={69} fill={PALETTE.amber} fillOpacity={0.06} />
            <ReferenceArea y1={70} y2={100} fill={PALETTE.red} fillOpacity={0.07} />
            <ReferenceLine
              y={RISK_APPETITE}
              stroke="#2f6fe4"
              strokeDasharray="5 4"
              strokeWidth={1.4}
              label={{
                value: `Risk Appetite ≤${RISK_APPETITE}`,
                position: "insideBottomLeft",
                fontSize: 8.5,
                fontWeight: 700,
                fill: "#2f6fe4",
              }}
            />
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              interval={1}
            />
            <YAxis
              domain={[0, 100]}
              ticks={[0, 25, 50, 75, 100]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
            />
            <Tooltip
              formatter={(v: number | [number, number], name: string) =>
                Array.isArray(v)
                  ? [`${v[0]} - ${v[1]}`, "Confidence Band"]
                  : [v, name === "forecast" ? "Forecast" : "Risk Score"]
              }
              contentStyle={CHART_TOOLTIP_STYLE}
            />
            <Area
              dataKey="band"
              stroke="none"
              fill={PALETTE.blue}
              fillOpacity={0.12}
              isAnimationActive={false}
            />
            <Line
              type="linear"
              dataKey="forecast"
              stroke={PALETTE.blue}
              strokeWidth={1.6}
              strokeDasharray="5 4"
              dot={{ r: 2, fill: PALETTE.blue, strokeWidth: 0 }}
              activeDot={{ r: 4 }}
            />
            <Line
              type="linear"
              dataKey="value"
              stroke={PALETTE.red}
              strokeWidth={1.8}
              dot={{ r: 2.4, fill: PALETTE.red, strokeWidth: 0 }}
              activeDot={{ r: 4 }}
            >
              <LabelList
                dataKey="value"
                position="top"
                offset={7}
                style={{ fontSize: 8.5, fill: "var(--text-1)", fontWeight: 700 }}
              />
            </Line>
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-1 grid grid-cols-2 md:grid-cols-4 gap-1.5">
        {BANDS.map((b) => (
          <span
            key={b.label}
            className={`rounded-md px-2 py-[5px] text-center text-[9px] font-bold ${b.cls}`}
          >
            {b.label}
          </span>
        ))}
      </div>
      <Link href="/people-risk-radar/tren-risiko" className="mt-1.5 flex w-full items-center justify-center gap-1 rounded-lg border border-[#e3e9ef] bg-[#f8fafc] py-[7px] text-[9.5px] font-semibold text-ptpn-greenDark transition-colors hover:bg-[#eef4f0]">
        Lihat Tren & Forecast <ArrowRight size={11} />
      </Link>
    </div>
  );
}
