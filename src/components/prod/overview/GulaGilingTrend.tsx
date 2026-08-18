"use client";

import {
  Bar,
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
import { SectionHead } from "@/components/hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";
import { inScope, ScopeEmpty } from "@/components/ui/CommodityScope";

const num = (v: number, d = 1) =>
  v.toLocaleString("id-ID", { minimumFractionDigits: d, maximumFractionDigits: d });

const LEGEND = [
  { label: "Tebu Digiling (bar, jt ton)", color: PALETTE.teal },
  { label: "Produksi Gula (line, rb ton)", color: PALETTE.amber },
];

const STATS = [
  { label: "Gula YTD", value: "92 rb ton" },
  { label: "Capaian YTD", value: "93,9%" },
  { label: "Rendemen Mei", value: "7,36%" },
  { label: "Target FY", value: "780 rb ton" },
];

/** Kurva musim giling gula — tebu digiling (bar) & produksi gula (line), Mei realisasi. */
export function GulaGilingTrend() {
  const { active, def } = useSubholding();
  // Seluruh seri kartu ini tebu & gula -> milik SugarCo.
  const milikScope = inScope(active, "Tebu gula musim giling");

  return (
    <div
      className="card anim-rise flex flex-col px-4 pb-3 pt-3"
      style={{ "--d": "140ms" } as React.CSSProperties}
    >
      <SectionHead title="Kinerja Giling Gula" action="Lihat Detail" href="/produksi-operasi/produksi-komoditas/detail#gula" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Tebu Digiling (jt ton) &amp; Produksi Gula (rb ton) Mei–Nov — Mei realisasi, sisanya proyeksi RKAP
      </p>

      {!milikScope && <ScopeEmpty label={def.fullLabel} />}

      {milikScope && (
        <>
          <div className="mt-1.5 h-[190px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={gulaGiling} margin={{ top: 14, right: -8, bottom: 0, left: -16 }}>
                <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
                <XAxis
                  dataKey="bulan"
                  tickLine={false}
                  axisLine={{ stroke: CHART_AXIS.axis }}
                  tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
                  interval={0}
                />
                <YAxis
                  yAxisId="tebu"
                  domain={[0, 2]}
                  ticks={[0, 0.5, 1, 1.5, 2]}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
                  tickFormatter={(v: number) => num(v)}
                />
                <YAxis
                  yAxisId="gula"
                  orientation="right"
                  domain={[0, 140]}
                  ticks={[0, 35, 70, 105, 140]}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
                  tickFormatter={(v: number) => v.toLocaleString("id-ID")}
                />
                <ReferenceLine
                  yAxisId="tebu"
                  x="Mei"
                  stroke={PALETTE.amber}
                  strokeDasharray="5 4"
                  strokeWidth={1.3}
                  label={{
                    value: "Giling mulai Mei",
                    position: "insideTopLeft",
                    fontSize: 8.5,
                    fontWeight: 700,
                    fill: PALETTE.amber,
                  }}
                />
                <Tooltip
                  formatter={(v: number, name: string) =>
                    name === "tebuJtTon"
                      ? [`${num(v, 2)} jt ton`, "Tebu Digiling"]
                      : [`${num(v)} rb ton`, "Produksi Gula"]
                  }
                  contentStyle={CHART_TOOLTIP_STYLE}
                />
                <Bar
                  yAxisId="tebu"
                  dataKey="tebuJtTon"
                  fill={PALETTE.teal}
                  fillOpacity={0.75}
                  radius={[3, 3, 0, 0]}
                />
                <Line
                  yAxisId="gula"
                  type="linear"
                  dataKey="gulaRbTon"
                  stroke={PALETTE.amber}
                  strokeWidth={1.8}
                  dot={{ r: 2.4, fill: PALETTE.amber, strokeWidth: 0 }}
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

          <div className="mt-2 grid grid-cols-4 gap-2 border-t border-[var(--border-hair)] pt-2">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-[9px] uppercase tracking-wide text-ink-500">{s.label}</div>
                <div className="mt-0.5 text-[11px] font-bold text-ink-700">{s.value}</div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
