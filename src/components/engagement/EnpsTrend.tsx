"use client";

import { ArrowRight, ChevronDown } from "lucide-react";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  LabelList,
  Legend,
  Line,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { enpsTrend } from "@/lib/engagement-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";

const signed = (v: number) => (v > 0 ? `+${v}` : `${v}`);

/**
 * Diverging: promoters (+ passives) ke atas, detractors ke bawah dari 0.
 * Semua dalam % responden — garis eNPS (= %promoter − %detractor)
 * berbagi skala yang sama sehingga cukup satu sumbu.
 */
export function EnpsTrend() {
  const data = enpsTrend.map((d) => ({ ...d, detractorsNeg: -d.detractors }));

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "220ms" } as React.CSSProperties}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="card-title-navy">eNPS Trend</h3>
        <button className="select-chip whitespace-nowrap px-2.5 py-[5px] text-[9.5px]">
          6 Bulan Terakhir <ChevronDown size={11} />
        </button>
      </div>

      <div className="mt-1 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 6, right: 8, bottom: 0, left: -14 }} stackOffset="sign">
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 9, fill: CHART_AXIS.tick }}
              interval={0}
            />
            <YAxis
              domain={[-50, 100]}
              ticks={[-50, 0, 50, 100]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 9, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => `${v}%`}
              width={36}
            />
            <Tooltip
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, n: string) =>
                n === "eNPS Score" ? [signed(v), n] : [`${Math.abs(v)}%`, n]
              }
            />
            <Legend
              verticalAlign="top"
              align="center"
              height={20}
              iconType="circle"
              iconSize={7}
              wrapperStyle={{ fontSize: 9 }}
            />
            <ReferenceLine y={0} stroke={CHART_AXIS.axis} strokeWidth={1} />
            <Bar isAnimationActive={false}
              name="Promoters"
              dataKey="promoters"
              stackId="share"
              fill={PALETTE.green}
              barSize={14}
              animationDuration={800}
            />
            <Bar isAnimationActive={false}
              name="Passives"
              dataKey="passives"
              stackId="share"
              fill={PALETTE.slate}
              barSize={14}
              radius={[3, 3, 0, 0]}
              animationDuration={800}
            />
            <Bar isAnimationActive={false}
              name="Detractors"
              dataKey="detractorsNeg"
              stackId="share"
              fill={PALETTE.red}
              barSize={14}
              radius={[0, 0, 3, 3]}
              animationDuration={800}
            />
            <Line isAnimationActive={false}
              name="eNPS Score"
              type="monotone"
              dataKey="enps"
              stroke={PALETTE.blue}
              strokeWidth={1.8}
              dot={{ r: 3, fill: PALETTE.blue, strokeWidth: 0 }}
              activeDot={{ r: 4.5 }}
              animationDuration={900}
            >
              <LabelList
                dataKey="enps"
                position="top"
                offset={8}
                formatter={signed}
                style={{ fontSize: 9, fill: "#1f2937", fontWeight: 700 }}
              />
            </Line>
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <button className="link-more mt-1 flex items-center gap-1 self-start">
        Lihat detail eNPS <ArrowRight size={11} />
      </button>
    </div>
  );
}
