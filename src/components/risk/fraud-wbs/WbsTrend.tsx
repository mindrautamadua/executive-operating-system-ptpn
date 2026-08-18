"use client";

import {
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { wbsChannels, wbsTrend } from "@/lib/risk-data-detail";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const TOTAL_KANAL = wbsChannels.reduce((s, c) => s + c.count, 0);

export function WbsTrend() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Tren Laporan & Kanal Pelaporan" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Laporan Masuk 12 Bulan Terakhir · Komposisi Kanal {TOTAL_KANAL} Laporan YTD
      </p>

      <div className="mt-1.5 flex min-h-0 flex-1 gap-2">
        <div className="min-w-0 flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={wbsTrend} margin={{ top: 14, right: 10, bottom: 0, left: -20 }}>
              <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
              <XAxis
                dataKey="bulan"
                tickLine={false}
                axisLine={{ stroke: CHART_AXIS.axis }}
                tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
                interval={1}
              />
              <YAxis
                domain={[0, 14]}
                ticks={[0, 4, 8, 12]}
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
                width={34}
              />
              <Tooltip
                formatter={(v: number) => [`${v} laporan`, "Masuk"]}
                contentStyle={CHART_TOOLTIP_STYLE}
              />
              <Line isAnimationActive={false}
                type="monotone"
                dataKey="laporan"
                stroke={PALETTE.blue}
                strokeWidth={1.8}
                dot={{ r: 2 }}
                activeDot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="flex w-[210px] shrink-0 items-center gap-2 border-l border-[#f2f5f8] pl-2">
          <div className="h-[112px] w-[104px] shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie isAnimationActive={false}
                  data={wbsChannels}
                  dataKey="count"
                  nameKey="channel"
                  innerRadius="56%"
                  outerRadius="86%"
                  paddingAngle={2}
                  stroke="none"
                >
                  {wbsChannels.map((c) => (
                    <Cell key={c.channel} fill={c.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(v: number, n: string) => [`${v} laporan`, n]}
                  contentStyle={CHART_TOOLTIP_STYLE}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="min-w-0 flex-1">
            {wbsChannels.map((c) => (
              <li key={c.channel} className="flex items-center gap-1.5 py-[3px]">
                <span
                  className="h-[8px] w-[8px] shrink-0 rounded-[2px]"
                  style={{ backgroundColor: c.color }}
                />
                <span className="min-w-0 flex-1 truncate text-[8.5px] font-medium text-ink-700">
                  {c.channel}
                </span>
                <span className="shrink-0 text-[9px] font-bold text-ink-900">{c.count}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
