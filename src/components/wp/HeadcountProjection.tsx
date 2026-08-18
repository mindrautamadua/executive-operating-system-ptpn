"use client";

import { ShieldCheck } from "lucide-react";
import {
  Area,
  CartesianGrid,
  ComposedChart,
  LabelList,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { headcountProjection, projectionNote } from "@/lib/wp-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "../hc/SectionHead";
import { NotePill } from "./NotePill";

const ribuan = (v: number) => v.toLocaleString("id-ID");

function LegendRow() {
  return (
    <div className="mt-1.5 flex items-center gap-4 text-[8.5px] font-semibold text-ink-500">
      <span className="flex items-center gap-1.5">
        <span className="h-[2px] w-[16px] rounded-full" style={{ background: PALETTE.blue }} />
        Total Headcount
      </span>
      <span className="flex items-center gap-1.5">
        <svg width="16" height="2" className="shrink-0">
          <line
            x1="0"
            y1="1"
            x2="16"
            y2="1"
            stroke={PALETTE.green}
            strokeWidth="2"
            strokeDasharray="4 3"
          />
        </svg>
        Net Additional
      </span>
    </div>
  );
}

export function HeadcountProjection() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Proyeksi Headcount 2026 - 2028" />
      <LegendRow />

      <div className="mt-1 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={headcountProjection}
            margin={{ top: 22, right: 24, bottom: 0, left: -4 }}
          >
            <defs>
              <linearGradient id="wp-proj-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={PALETTE.blue} stopOpacity="0.14" />
                <stop offset="100%" stopColor={PALETTE.blue} stopOpacity="0.02" />
              </linearGradient>
            </defs>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
            />
            <YAxis
              domain={[60000, 76000]}
              ticks={[60000, 62000, 64000, 66000, 68000, 70000, 72000, 74000, 76000]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => `${v / 1000}K`}
              width={38}
            />
            <YAxis yAxisId="net" hide domain={[-1500, 13000]} />
            <Tooltip
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, name: string) => [
                ribuan(v),
                name === "total" ? "Total Headcount" : "Net Additional",
              ]}
            />
            <Area isAnimationActive={false}
              type="linear"
              dataKey="total"
              stroke={PALETTE.blue}
              strokeWidth={1.8}
              fill="url(#wp-proj-fill)"
              dot={{ r: 3, fill: "#fff", stroke: PALETTE.blue, strokeWidth: 1.8 }}
              activeDot={{ r: 4.5 }}
            >
              <LabelList
                dataKey="total"
                position="top"
                offset={9}
                formatter={ribuan}
                style={{ fontSize: 8.5, fill: "#334155", fontWeight: 700 }}
              />
            </Area>
            <Line isAnimationActive={false}
              yAxisId="net"
              type="linear"
              dataKey="net"
              stroke={PALETTE.green}
              strokeWidth={1.6}
              strokeDasharray="5 4"
              dot={{ r: 2.5, fill: "#fff", stroke: PALETTE.green, strokeWidth: 1.6 }}
              activeDot={{ r: 4 }}
            >
              <LabelList
                dataKey="net"
                position="top"
                offset={8}
                formatter={(v: number) => (v ? ribuan(v) : "")}
                style={{ fontSize: 8, fill: PALETTE.green, fontWeight: 700 }}
              />
            </Line>
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <NotePill icon={ShieldCheck} text={projectionNote} />
    </div>
  );
}
