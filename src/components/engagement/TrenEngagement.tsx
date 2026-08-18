"use client";

import { ArrowRight, ChevronDown } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  LabelList,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { trenEngagement, trenEngagementTarget } from "@/lib/engagement-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";

const fmt = (n: number) => n.toFixed(1).replace(".", ",");

export function TrenEngagement() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "160ms" } as React.CSSProperties}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="card-title-navy">Tren Engagement Score</h3>
        <button className="select-chip whitespace-nowrap px-2.5 py-[5px] text-[9.5px]">
          6 Bulan Terakhir <ChevronDown size={11} />
        </button>
      </div>

      <div className="mt-2 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={trenEngagement} margin={{ top: 18, right: 14, bottom: 0, left: -18 }}>
            <defs>
              <linearGradient id="eng-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={PALETTE.blue} stopOpacity="0.24" />
                <stop offset="100%" stopColor={PALETTE.blue} stopOpacity="0.02" />
              </linearGradient>
            </defs>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 9, fill: CHART_AXIS.tick }}
              interval={0}
            />
            {/* domain 60–90 supaya kenaikan 73→82 terbaca */}
            <YAxis
              domain={[60, 90]}
              ticks={[60, 70, 80, 90]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 9, fill: CHART_AXIS.tick }}
              width={32}
            />
            <Tooltip
              formatter={(v: number) => [fmt(v), "Engagement Score"]}
              contentStyle={CHART_TOOLTIP_STYLE}
            />
            <ReferenceLine
              y={trenEngagementTarget}
              stroke={PALETTE.amber}
              strokeDasharray="5 4"
              strokeWidth={1.2}
              label={{
                value: `Target ${trenEngagementTarget}`,
                position: "insideBottomLeft",
                fontSize: 9,
                fill: PALETTE.amber,
                fontWeight: 700,
              }}
            />
            <Area isAnimationActive={false}
              type="monotone"
              dataKey="value"
              stroke={PALETTE.blue}
              strokeWidth={1.8}
              fill="url(#eng-fill)"
              dot={{ r: 3, fill: PALETTE.blue, strokeWidth: 0 }}
              activeDot={{ r: 4.5 }}
              animationDuration={900}
            >
              <LabelList
                dataKey="value"
                position="top"
                offset={8}
                formatter={(v: number) => fmt(v)}
                style={{ fontSize: 9, fill: "#64748b", fontWeight: 600 }}
              />
            </Area>
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <button className="link-more mt-1 flex items-center gap-1 self-start">
        Lihat tren lebih lengkap <ArrowRight size={11} />
      </button>
    </div>
  );
}
