"use client";

import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { aspPremiumAvg, aspVsBenchmark } from "@/lib/pemasaran-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";
import { inScope, ScopeEmpty } from "@/components/ui/CommodityScope";

const rp = (v: number) => `Rp ${v.toLocaleString("id-ID")}`;

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1">
      <span className="h-[6px] w-[6px] rounded-full" style={{ background: color }} />
      <span className="text-[9px] text-ink-500">{label}</span>
    </span>
  );
}

/** ASP realisasi CPO vs benchmark KPBN + premium bulanan (bar). */
export function AspVsBenchmark() {
  // Seluruh kartu berbasis CPO → milik PalmCo.
  const { active, def } = useSubholding();
  const cpoScope = inScope(active, "CPO");

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "150ms" } as React.CSSProperties}
    >
      <SectionHead title="ASP vs Benchmark KPBN" action="Lihat Detail" />
      {!cpoScope && <ScopeEmpty label={def.fullLabel} />}
      {cpoScope && (
        <>
      <div className="mt-[3px] flex items-center justify-between gap-2">
        <p className="text-[9px] text-ink-500">
          Premium/diskon ASP CPO terhadap KPBN per bulan (Rp/kg)
        </p>
        <div className="flex shrink-0 items-center gap-2.5">
          <LegendDot color={PALETTE.green} label="ASP" />
          <LegendDot color={PALETTE.slate} label="KPBN" />
          <LegendDot color={PALETTE.amber} label="Premium" />
        </div>
      </div>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={aspVsBenchmark}
            margin={{ top: 8, right: -6, bottom: 0, left: -2 }}
            barCategoryGap="42%"
          >
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="bulan"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              interval={0}
            />
            <YAxis
              yAxisId="harga"
              domain={[11000, 14000]}
              ticks={[11000, 12000, 13000, 14000]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => `${(v / 1000).toLocaleString("id-ID")}rb`}
              width={36}
            />
            <YAxis
              yAxisId="premium"
              orientation="right"
              domain={[0, 80]}
              ticks={[0, 20, 40, 60, 80]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              width={28}
            />
            <Tooltip
              formatter={(v: number, name: string) =>
                name === "Premium" ? [`+${rp(v)}/kg`, name] : [`${rp(v)}/kg`, name]
              }
              contentStyle={CHART_TOOLTIP_STYLE}
            />
            <Bar isAnimationActive={false}
              yAxisId="premium"
              dataKey="premium"
              name="Premium"
              fill={PALETTE.amber}
              fillOpacity={0.7}
              radius={[2, 2, 0, 0]}
            />
            <Line isAnimationActive={false}
              yAxisId="harga"
              type="linear"
              dataKey="kpbn"
              name="KPBN"
              stroke={PALETTE.slate}
              strokeWidth={1.4}
              strokeDasharray="4 3"
              dot={false}
            />
            <Line isAnimationActive={false}
              yAxisId="harga"
              type="linear"
              dataKey="asp"
              name="ASP"
              stroke={PALETTE.green}
              strokeWidth={1.8}
              dot={{ r: 2.5 }}
              activeDot={{ r: 4 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-1 text-[9px] leading-snug text-ink-500">
        Rata-rata premium YTD {aspPremiumAvg} — FFA rendah &amp; kontrak premium buyer hilir
      </p>
        </>
      )}
    </div>
  );
}
