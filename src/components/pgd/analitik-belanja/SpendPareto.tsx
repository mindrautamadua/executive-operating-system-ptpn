"use client";

import {
  Bar,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { spendPareto } from "@/lib/pgd-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

export function SpendPareto() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Pareto Konsentrasi Vendor" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Belanja Kumulatif (Rp T) &amp; Porsi Kumulatif (%) · Top-20 = 43,0%
      </p>

      <div className="mt-1 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={spendPareto} margin={{ top: 10, right: 4, bottom: 0, left: -12 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
            />
            <YAxis
              yAxisId="left"
              domain={[0, 14]}
              ticks={[0, 4, 8, 12]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              width={34}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              domain={[0, 100]}
              ticks={[0, 50, 100]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              width={26}
              tickFormatter={(v: number) => `${v}%`}
            />
            <Tooltip
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, name: string) =>
                name === "Porsi Kumulatif"
                  ? [`${v.toLocaleString("id-ID", { minimumFractionDigits: 1 })}%`, name]
                  : [`Rp ${v.toLocaleString("id-ID", { minimumFractionDigits: 2 })} T`, name]
              }
            />
            <Legend
              verticalAlign="top"
              align="right"
              height={16}
              iconSize={7}
              wrapperStyle={{ fontSize: 8.5 }}
            />
            <ReferenceLine
              yAxisId="right"
              y={43}
              stroke={PALETTE.red}
              strokeDasharray="4 3"
              label={{
                value: "Top-20 43%",
                position: "insideTopRight",
                fontSize: 8.5,
                fill: PALETTE.red,
              }}
            />
            <Bar
              yAxisId="left"
              name="Belanja Kumulatif"
              dataKey="spendRpT"
              radius={[3, 3, 0, 0]}
              barSize={26}
            >
              {spendPareto.map((p) => (
                <Cell key={p.label} fill={p.vendor === 20 ? PALETTE.red : PALETTE.blue} />
              ))}
            </Bar>
            <Line
              yAxisId="right"
              name="Porsi Kumulatif"
              type="monotone"
              dataKey="cumPct"
              stroke={PALETTE.amber}
              strokeWidth={1.8}
              dot={{ r: 2.4 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <p className="pb-1 text-[9px] leading-snug text-ink-500">
        20 vendor (0,6% populasi) menguasai Rp 5,33 T; 100 vendor teratas sudah mencapai 69,8%
        belanja grup — kurva sangat curam di ujung kiri.
      </p>
    </div>
  );
}
