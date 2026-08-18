"use client";

import {
  CartesianGrid,
  Label,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ArrowRight, ChevronDown } from "lucide-react";
import { rasioKinerja, rasioTren } from "@/lib/comp-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { ScopeNote } from "@/components/ui/ScopeNote";

export function RasioKinerja() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "580ms" } as React.CSSProperties}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="card-title-navy flex min-w-0 items-center gap-1.5"><span>Rasio Kompensasi terhadap Kinerja</span><ScopeNote /></h3>
          <p className="mt-[3px] text-[9.5px] text-ink-500">
            Total Rewards Ratio vs Performance Score
          </p>
        </div>
        <button className="select-chip whitespace-nowrap px-2.5 py-[5px] text-[9.5px]">
          Semua Unit <ChevronDown size={11} />
        </button>
      </div>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 6, right: 10, bottom: 4, left: -8 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} />
            <XAxis
              type="number"
              dataKey="x"
              domain={[50, 100]}
              ticks={[50, 60, 70, 80, 90, 100]}
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 9, fill: CHART_AXIS.tick }}
            >
              <Label
                value="Performance Score"
                position="insideBottom"
                offset={-4}
                style={{ fontSize: 9, fill: CHART_AXIS.tick }}
              />
            </XAxis>
            <YAxis
              type="number"
              dataKey="y"
              domain={[50, 100]}
              ticks={[50, 60, 70, 80, 90, 100]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 9, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => `${v}%`}
              width={40}
            >
              <Label
                value="Total Rewards Ratio (%)"
                angle={-90}
                position="insideLeft"
                offset={16}
                style={{ fontSize: 9, fill: CHART_AXIS.tick, textAnchor: "middle" }}
              />
            </YAxis>
            <Tooltip
              formatter={(v: number, n: string) => [
                n === "y" ? `${v}%` : v,
                n === "y" ? "Total Rewards Ratio" : "Performance Score",
              ]}
              contentStyle={CHART_TOOLTIP_STYLE}
            />
            <Scatter isAnimationActive={false}
              data={rasioKinerja}
              fill={PALETTE.greenSoft}
              fillOpacity={0.7}
              animationDuration={800}
            />
            {/* garis tren — animasi disamakan dengan titik sebar */}
            <Scatter isAnimationActive={false}
              data={rasioTren}
              line={{ stroke: "#9fb5c6", strokeWidth: 1.2, strokeDasharray: "5 4" }}
              shape={() => <g />}
              legendType="none"
              animationDuration={800}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <button className="link-more mt-1 flex items-center gap-1">
        Lihat analisis korelasi <ArrowRight size={11} />
      </button>
    </div>
  );
}
