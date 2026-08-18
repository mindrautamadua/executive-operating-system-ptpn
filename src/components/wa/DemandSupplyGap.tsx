"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ArrowDown } from "lucide-react";
import {
  businessDriverChain,
  demandSupply,
  demandSupplyHeadline,
  gapClosurePlan,
} from "@/lib/wa-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { ScopeNote } from "../ui/ScopeNote";

const ribuan = (v: number) => v.toLocaleString("id-ID");

/** Demand vs Supply 2026-2028: inti workforce planning (business-driver based). */
export function DemandSupplyGap() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <div className="flex items-center justify-between gap-2">
        <h3 className="flex min-w-0 items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.05em] text-ink-900">
          <span>
            Workforce Demand vs Supply{" "}
            <span className="font-semibold normal-case tracking-normal text-ink-400">
              (Proyeksi 2026-2028)
            </span>
          </span>
          <ScopeNote />
        </h3>
        <span className="rounded bg-[#fdecec] px-2 py-[3px] text-[9px] font-bold text-[#ef4444]">
          {demandSupplyHeadline.value} · {demandSupplyHeadline.label}
        </span>
      </div>

      <div className="mt-1.5 grid min-h-0 flex-1 grid-cols-[minmax(0,58fr)_minmax(0,42fr)] gap-4">
        {/* Chart supply vs demand */}
        <div className="flex min-h-0 flex-col">
          <div className="min-h-0 w-full flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={demandSupply} margin={{ top: 16, right: 8, bottom: 0, left: -4 }} barGap={4}>
                <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
                <XAxis
                  dataKey="year"
                  tickLine={false}
                  axisLine={{ stroke: CHART_AXIS.axis }}
                  tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
                />
                <YAxis
                  domain={[66000, 78000]}
                  ticks={[66000, 69000, 72000, 75000, 78000]}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
                  tickFormatter={(v: number) => `${v / 1000}K`}
                  width={36}
                />
                <Tooltip
                  formatter={(v: number, name: string) => [
                    ribuan(v),
                    name === "supply" ? "Supply" : "Demand",
                  ]}
                  contentStyle={CHART_TOOLTIP_STYLE}
                />
                <Legend
                  wrapperStyle={{ fontSize: 8.5 }}
                  iconSize={8}
                  formatter={(v: string) => (v === "supply" ? "Supply (proyeksi)" : "Demand (business plan)")}
                />
                <Bar isAnimationActive={false} dataKey="supply" fill={PALETTE.green} radius={[3, 3, 0, 0]} maxBarSize={26}>
                  <LabelList
                    dataKey="supply"
                    position="top"
                    formatter={ribuan}
                    style={{ fontSize: 8.5, fill: "#334155", fontWeight: 700 }}
                  />
                </Bar>
                <Bar isAnimationActive={false} dataKey="demand" fill={PALETTE.navy} radius={[3, 3, 0, 0]} maxBarSize={26}>
                  <LabelList
                    dataKey="demand"
                    position="top"
                    formatter={ribuan}
                    style={{ fontSize: 8.5, fill: "#334155", fontWeight: 700 }}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-1 flex items-center gap-2">
            {demandSupply.map((d) => (
              <span
                key={d.year}
                className="flex-1 rounded-lg bg-[#fdf5f5] px-2 py-[4px] text-center text-[8.5px] font-semibold text-ink-500"
              >
                Gap {d.year}: <span className="font-bold text-[#ef4444]">{ribuan(d.gap)}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Business driver chain */}
        <div className="flex min-h-0 flex-col">
          <div className="text-[8.5px] font-bold uppercase tracking-[0.05em] text-ink-400">
            Business Driver → Workforce Demand
          </div>
          <div className="mt-1.5 flex min-h-0 flex-1 flex-col justify-between">
            {businessDriverChain.map((step, i) => (
              <div key={step.label}>
                {i > 0 && (
                  <div className="flex justify-center py-[1px]">
                    <ArrowDown size={9} className="text-ink-400" />
                  </div>
                )}
                <div className="flex items-center justify-between rounded-lg bg-[#f8fafc] px-2.5 py-[5px]">
                  <span className="text-[8.5px] font-medium text-ink-500">{step.label}</span>
                  <span className="text-right">
                    <span className="text-[10px] font-extrabold text-ink-900">{step.value}</span>
                    <span className="ml-1 text-[9px] text-ink-500">{step.sub}</span>
                  </span>
                </div>
              </div>
            ))}
            <div className="mt-1.5 rounded-lg border border-[#f6d5d5] bg-[#fdf5f5] px-2.5 py-[5px]">
              <div className="flex items-center justify-between">
                <span className="text-[8.5px] font-bold text-ink-700">Gap 2026</span>
                <span className="text-[10.5px] font-extrabold text-[#ef4444]">-2.176 FTE</span>
              </div>
              <div className="mt-[3px] flex items-center gap-1.5">
                {gapClosurePlan.map((p) => (
                  <span
                    key={p.label}
                    className="rounded bg-white px-1.5 py-[2px] text-[7.5px] font-semibold text-ink-500"
                  >
                    {p.label} <span className="font-bold text-ink-900">{p.value}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
