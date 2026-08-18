"use client";

import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { priceSeries } from "@/lib/harga-outlook-data";
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

export function CpoPriceChart() {
  // Seluruh kartu berbasis CPO → milik PalmCo.
  const { active, def } = useSubholding();
  const cpoScope = inScope(active, "CPO");

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Harga CPO 24 Bulan" action="Lihat Detail" />
      {!cpoScope && <ScopeEmpty label={def.fullLabel} />}
      {cpoScope && (
        <>
      <div className="mt-[3px] flex items-center justify-between gap-2">
        <p className="text-[9px] text-ink-500">
          CIF Rotterdam vs KPBN vs HPP CPO — band margin Jun 2024 – Mei 2026
        </p>
        <div className="flex shrink-0 items-center gap-2.5">
          <LegendDot color={PALETTE.blue} label="Rotterdam (USD/t)" />
          <LegendDot color={PALETTE.green} label="KPBN (Rp/kg)" />
          <LegendDot color={PALETTE.slate} label="HPP CPO (Rp/kg)" />
        </div>
      </div>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={priceSeries} margin={{ top: 8, right: -4, bottom: 0, left: -4 }}>
            <defs>
              <linearGradient id="mkt-hpp-band" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={PALETTE.green} stopOpacity="0.14" />
                <stop offset="100%" stopColor={PALETTE.green} stopOpacity="0.02" />
              </linearGradient>
            </defs>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="bulan"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              interval={2}
            />
            <YAxis
              yAxisId="rp"
              domain={[8000, 14500]}
              ticks={[8000, 10000, 12000, 14000]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => `${(v / 1000).toLocaleString("id-ID")}rb`}
              width={40}
            />
            <YAxis
              yAxisId="usd"
              orientation="right"
              domain={[850, 1150]}
              ticks={[850, 950, 1050, 1150]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => `$${v}`}
              width={40}
            />
            <Tooltip
              formatter={(v: number, name: string) =>
                name === "Rotterdam"
                  ? [`USD ${v.toLocaleString("id-ID")}/ton`, name]
                  : [`${rp(v)}/kg`, name]
              }
              contentStyle={CHART_TOOLTIP_STYLE}
            />
            {/* Band margin: area KPBN (atas) dikontraskan dengan garis HPP (bawah). */}
            <Area isAnimationActive={false}
              yAxisId="rp"
              type="linear"
              dataKey="kpbnRp"
              name="KPBN"
              stroke={PALETTE.green}
              strokeWidth={1.8}
              fill="url(#mkt-hpp-band)"
              dot={false}
              activeDot={{ r: 3.5 }}
            />
            <Line isAnimationActive={false}
              yAxisId="rp"
              type="linear"
              dataKey="hppRp"
              name="HPP CPO"
              stroke={PALETTE.slate}
              strokeWidth={1.4}
              strokeDasharray="4 3"
              dot={false}
            />
            <Line isAnimationActive={false}
              yAxisId="usd"
              type="linear"
              dataKey="rotterdamUsd"
              name="Rotterdam"
              stroke={PALETTE.blue}
              strokeWidth={1.8}
              dot={false}
              activeDot={{ r: 3.5 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-1 text-[9px] leading-snug text-ink-500">
        Spread KPBN Mei (Rp 13.635) vs HPP (Rp 8.950) = Rp 4.685/kg — terlebar dalam 24 bulan ·
        spot 31 Mei Rp 13.680/kg
      </p>
        </>
      )}
    </div>
  );
}
