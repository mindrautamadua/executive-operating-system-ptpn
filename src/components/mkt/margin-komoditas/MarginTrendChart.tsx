"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { marginTrend } from "@/lib/hilir-stok-margin-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { useSubholding } from "@/components/SubholdingProvider";
import { inScope } from "@/components/ui/CommodityScope";
import { SectionHead } from "../../hc/SectionHead";

const SERIES = [
  { key: "cpo", label: "CPO", color: PALETTE.green },
  { key: "gula", label: "Gula", color: PALETTE.amber },
  { key: "karet", label: "Karet", color: PALETTE.navy },
  { key: "hilir", label: "Produk Hilir", color: PALETTE.blue },
] as const;

const pct = (v: number) =>
  `${v.toLocaleString("id-ID", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%`;

/**
 * Tren margin per komoditas. Komoditas menentukan pemilik subholding:
 * CPO → PalmCo, gula → SugarCo, karet → SupportingCo; produk hilir tidak
 * terikat satu subholding sehingga selalu tampil penuh. Seri di luar cakupan
 * diredupkan (bukan dihapus) supaya grafik perbandingan tetap terbaca.
 */
export function MarginTrendChart() {
  const { active } = useSubholding();
  const opacity = (label: string) => (inScope(active, label) ? 1 : 0.25);

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Tren Margin Bruto Bulanan" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Margin Bruto per Komoditas (%) Jan-Mei 2026 · rally Mei memperlebar margin CPO
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={marginTrend} margin={{ top: 8, right: 10, bottom: 0, left: -26 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="bulan"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
            />
            <YAxis
              domain={[0, 40]}
              ticks={[0, 10, 20, 30, 40]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => `${v}%`}
            />
            <Tooltip
              formatter={(v: number, name: string) => [
                pct(v),
                SERIES.find((s) => s.key === name)?.label ?? name,
              ]}
              contentStyle={CHART_TOOLTIP_STYLE}
            />
            {SERIES.map((s) => (
              <Line isAnimationActive={false}
                key={s.key}
                type="linear"
                dataKey={s.key}
                stroke={s.color}
                strokeWidth={s.key === "cpo" ? 2 : 1.5}
                strokeOpacity={opacity(s.label)}
                dot={false}
                activeDot={{ r: 3.5 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-1 flex items-center gap-3">
        {SERIES.map((s) => (
          <span
            key={s.key}
            className="flex items-center gap-1.5 text-[9px] font-semibold text-ink-500"
            style={{ opacity: opacity(s.label) }}
          >
            <span className="h-[3px] w-[14px] rounded-full" style={{ background: s.color }} />
            {s.label}
          </span>
        ))}
      </div>
    </div>
  );
}
