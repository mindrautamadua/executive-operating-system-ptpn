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
import { seasonality3Tahun } from "@/lib/produksi-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "../../hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";
import { inScope, ScopeEmpty } from "@/components/ui/CommodityScope";

const SERIES = [
  { key: "y2024", label: "2024", color: PALETTE.slate },
  { key: "y2025", label: "2025", color: PALETTE.blue },
  { key: "y2026", label: "2026 (YTD)", color: PALETTE.green },
] as const;

const num = (v: number) =>
  v.toLocaleString("id-ID", { minimumFractionDigits: 3, maximumFractionDigits: 3 });

export function SeasonalityChart() {
  const { active, def } = useSubholding();
  // Seluruh seri adalah produksi CPO -> milik PalmCo.
  const milikScope = inScope(active, "CPO");

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Seasonality CPO 3 Tahun" action="Lihat Detail" href="/produksi-operasi/produksi-komoditas/detail#seasonality" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Produksi CPO Bulanan (jt ton) · puncak konsisten Agu–Okt
      </p>

      {!milikScope && <ScopeEmpty label={def.fullLabel} />}

      {milikScope && (
        <>
      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={seasonality3Tahun} margin={{ top: 10, right: 8, bottom: 0, left: -22 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="bulan"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              interval={0}
            />
            <YAxis
              domain={[0.15, 0.24]}
              ticks={[0.15, 0.18, 0.21, 0.24]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) =>
                v.toLocaleString("id-ID", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
              }
            />
            <Tooltip
              formatter={(v: number, name: string) => [
                `${num(v)} jt ton`,
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
                strokeWidth={s.key === "y2026" ? 2 : 1.5}
                strokeDasharray={s.key === "y2024" ? "4 3" : undefined}
                dot={false}
                activeDot={{ r: 3.5 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-1 flex items-center gap-3">
        {SERIES.map((s) => (
          <span key={s.key} className="flex items-center gap-1.5 text-[9px] font-semibold text-ink-500">
            <span className="h-[3px] w-[14px] rounded-full" style={{ background: s.color }} />
            {s.label}
          </span>
        ))}
      </div>
        </>
      )}
    </div>
  );
}
