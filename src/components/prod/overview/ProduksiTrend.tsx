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
import { produksiBulanan } from "@/lib/produksi-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";
import { inScope, ScopeEmpty } from "@/components/ui/CommodityScope";

const SERI_LABEL: Record<string, string> = {
  tbs2026: "TBS 2026",
  tbs2025: "TBS 2025",
  cpo2026: "CPO 2026",
  cpo2025: "CPO 2025",
};

const LEGEND = [
  { label: "TBS 2026 (bar)", color: PALETTE.green },
  { label: "TBS 2025 (bar)", color: PALETTE.slate },
  { label: "CPO 2026 (line)", color: PALETTE.blue },
  { label: "CPO 2025 (line)", color: PALETTE.blueSoft },
];

const jtTon = (v: number) =>
  v.toLocaleString("id-ID", { minimumFractionDigits: 2, maximumFractionDigits: 3 });

/** Tren produksi bulanan TBS (bar) & CPO (line) — 2026 YTD vs 2025 penuh. */
export function ProduksiTrend() {
  const { active, def } = useSubholding();
  // Seluruh seri kartu ini TBS & CPO -> milik PalmCo.
  const milikScope = inScope(active, "TBS CPO sawit");

  return (
    <div
      className="card anim-rise flex flex-col px-4 pb-3 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Tren Produksi Bulanan" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        TBS Diolah &amp; CPO (jt ton) — 2026 terisi Jan–Mei (YTD) vs realisasi 2025
      </p>

      {!milikScope && <ScopeEmpty label={def.fullLabel} />}

      {milikScope && (
        <>
      <div className="mt-1.5 h-[220px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={produksiBulanan} margin={{ top: 10, right: -8, bottom: 0, left: -16 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="bulan"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
            />
            <YAxis
              yAxisId="tbs"
              domain={[0, 1.2]}
              ticks={[0, 0.3, 0.6, 0.9, 1.2]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => v.toLocaleString("id-ID")}
            />
            <YAxis
              yAxisId="cpo"
              orientation="right"
              domain={[0, 0.3]}
              ticks={[0, 0.1, 0.2, 0.3]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => v.toLocaleString("id-ID")}
            />
            <Tooltip
              formatter={(v: number, name: string) => [jtTon(v), SERI_LABEL[name] ?? name]}
              contentStyle={CHART_TOOLTIP_STYLE}
            />
            <Bar isAnimationActive={false} yAxisId="tbs" dataKey="tbs2025" fill={PALETTE.slate} fillOpacity={0.45} radius={[3, 3, 0, 0]} />
            <Bar isAnimationActive={false} yAxisId="tbs" dataKey="tbs2026" fill={PALETTE.green} radius={[3, 3, 0, 0]} />
            <Line isAnimationActive={false}
              yAxisId="cpo"
              type="linear"
              dataKey="cpo2025"
              stroke={PALETTE.blueSoft}
              strokeWidth={1.6}
              strokeDasharray="5 4"
              dot={{ r: 2, fill: PALETTE.blueSoft, strokeWidth: 0 }}
              activeDot={{ r: 4 }}
            />
            <Line isAnimationActive={false}
              yAxisId="cpo"
              type="linear"
              dataKey="cpo2026"
              stroke={PALETTE.blue}
              strokeWidth={1.8}
              dot={{ r: 2.4, fill: PALETTE.blue, strokeWidth: 0 }}
              activeDot={{ r: 4 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-1 flex items-center justify-center gap-4">
        {LEGEND.map((l) => (
          <span key={l.label} className="flex items-center gap-1.5 text-[8.5px] text-ink-500">
            <span className="h-[7px] w-[7px] rounded-full" style={{ background: l.color }} />
            {l.label}
          </span>
        ))}
      </div>
        </>
      )}
    </div>
  );
}
