"use client";

import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { gulaGiling } from "@/lib/produksi-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "../../hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";
import { inScope, ScopeEmpty } from "@/components/ui/CommodityScope";

const num = (v: number, d = 2) =>
  v.toLocaleString("id-ID", { minimumFractionDigits: d, maximumFractionDigits: d });

export function GulaGilingCard() {
  const { active, def } = useSubholding();
  // Tebu, rendemen & musim giling -> seluruh kartu milik SugarCo.
  const milikScope = inScope(active, "Tebu gula musim giling");

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Kurva Musim Giling Gula" action="Lihat Detail" href="/produksi-operasi/produksi-komoditas/detail#gula" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Tebu Digiling (jt ton) &amp; Rendemen (%) Mei–Nov · Mei = realisasi, sisanya proyeksi RKAP
      </p>

      {!milikScope && <ScopeEmpty label={def.fullLabel} />}

      {milikScope && (
        <>
      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={gulaGiling} margin={{ top: 16, right: -8, bottom: 0, left: -18 }}>
            <defs>
              <linearGradient id="pkom-tebu-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={PALETTE.teal} stopOpacity="0.22" />
                <stop offset="100%" stopColor={PALETTE.teal} stopOpacity="0.02" />
              </linearGradient>
            </defs>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="bulan"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              interval={0}
            />
            <YAxis
              yAxisId="tebu"
              domain={[0, 2]}
              ticks={[0, 0.5, 1, 1.5, 2]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => num(v, 1)}
            />
            <YAxis
              yAxisId="rendemen"
              orientation="right"
              domain={[7.2, 7.6]}
              ticks={[7.2, 7.3, 7.4, 7.5, 7.6]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => num(v, 1)}
            />
            <ReferenceLine
              yAxisId="tebu"
              x="Mei"
              stroke={PALETTE.amber}
              strokeDasharray="5 4"
              strokeWidth={1.3}
              label={{
                value: "Musim giling dimulai Mei",
                position: "insideTopLeft",
                fontSize: 8.5,
                fontWeight: 700,
                fill: PALETTE.amber,
              }}
            />
            <Tooltip
              formatter={(v: number, name: string) =>
                name === "tebuJtTon"
                  ? [`${num(v)} jt ton`, "Tebu Digiling"]
                  : [`${num(v)}%`, "Rendemen"]
              }
              contentStyle={CHART_TOOLTIP_STYLE}
            />
            <Area
              yAxisId="tebu"
              type="linear"
              dataKey="tebuJtTon"
              stroke={PALETTE.teal}
              strokeWidth={1.8}
              fill="url(#pkom-tebu-fill)"
              dot={{ r: 2.2, fill: PALETTE.teal, strokeWidth: 0 }}
              activeDot={{ r: 4 }}
            />
            <Line
              yAxisId="rendemen"
              type="linear"
              dataKey="rendemenPct"
              stroke={PALETTE.purple}
              strokeWidth={1.6}
              strokeDasharray="5 4"
              dot={{ r: 2, fill: PALETTE.purple, strokeWidth: 0 }}
              activeDot={{ r: 4 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-1 text-[9px] leading-snug text-ink-500">
        FY: tebu 10,5 jt ton · gula 780 rb ton · rendemen rata-rata 7,45%
      </p>
        </>
      )}
    </div>
  );
}
