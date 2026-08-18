"use client";

import {
  Bar,
  CartesianGrid,
  ComposedChart,
  LabelList,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { capexVsOpexTrend } from "@/lib/tik-data-detail";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const rupiah = (v: number) => v.toLocaleString("id-ID", { minimumFractionDigits: 2 });
const persen = (v: number) => v.toLocaleString("id-ID", { minimumFractionDigits: 1 });

export function CapexVsOpexTrend() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "90ms" } as React.CSSProperties}
    >
      <SectionHead title="Tren Capex vs Opex TI" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Belanja TI 5 Tahun (Rp T) + Kurva Belanja terhadap Pendapatan (%)
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={capexVsOpexTrend} margin={{ top: 16, right: 2, bottom: 0, left: -14 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="tahun"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
            />
            <YAxis
              yAxisId="nilai"
              domain={[0, 1]}
              ticks={[0, 0.25, 0.5, 0.75, 1]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => rupiah(v)}
              width={38}
            />
            <YAxis
              yAxisId="rasio"
              orientation="right"
              domain={[0, 2.5]}
              ticks={[0, 0.5, 1, 1.5, 2, 2.5]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              width={26}
            />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.08)" }}
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, name: string) =>
                name === "% Pendapatan"
                  ? [`${persen(v)}%`, name]
                  : [`Rp ${rupiah(v)} T`, name]
              }
            />
            <Legend
              verticalAlign="top"
              align="right"
              height={14}
              iconType="circle"
              iconSize={6}
              wrapperStyle={{ fontSize: 8, color: "var(--text-2)" }}
            />
            <Bar
              yAxisId="nilai"
              dataKey="capexRpT"
              name="Capex"
              stackId="ti"
              fill={PALETTE.blue}
              barSize={30}
            />
            <Bar
              yAxisId="nilai"
              dataKey="opexRpT"
              name="Opex"
              stackId="ti"
              fill={PALETTE.slate}
              barSize={30}
              radius={[3, 3, 0, 0]}
            >
              <LabelList
                dataKey="totalRpT"
                position="top"
                offset={5}
                formatter={(v: React.ReactNode) => rupiah(Number(v))}
                style={{ fontSize: 8.5, fill: "#334155", fontWeight: 700 }}
              />
            </Bar>
            <Line
              yAxisId="rasio"
              type="monotone"
              dataKey="pctPendapatan"
              name="% Pendapatan"
              stroke={PALETTE.green}
              strokeWidth={1.8}
              dot={{ r: 2.5, fill: PALETTE.green }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <p className="pb-1 text-[9px] leading-snug text-ink-500">
        Belanja TI naik 80% dalam 5 tahun (Rp 0,51 T → Rp 0,92 T); rasio terhadap pendapatan bergerak
        1,1% → 1,6%, tetap di dalam rentang benchmark.
      </p>
    </div>
  );
}
