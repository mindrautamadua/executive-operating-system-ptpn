"use client";

import {
  Area,
  CartesianGrid,
  ComposedChart,
  LabelList,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { hilirRevenueTrend, hilirTargetPath } from "@/lib/hilir-stok-margin-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { ScopeNote } from "@/components/ui/ScopeNote";
import { SectionHead } from "../../hc/SectionHead";

interface TrendDatum {
  periode: string;
  porsi: number | null;
  target: number | null;
}

const DATA: TrendDatum[] = [
  ...hilirRevenueTrend.map((p) => ({
    periode: p.periode.replace("FY 20", "FY ").replace("YTD Mei 2026", "Mei 26"),
    porsi: p.porsiPct,
    target: null as number | null,
  })),
  ...hilirTargetPath.map((t) => ({
    periode: `${t.tahun}T`,
    porsi: null as number | null,
    target: t.targetPct,
  })),
];

const pct = (v: number) =>
  `${v.toLocaleString("id-ID", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%`;

export function HilirRevenueTrend() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      {/* Porsi hilir dihitung atas total penjualan grup — tanpa pecahan per subholding. */}
      <SectionHead
        title="Porsi Pendapatan Hilir vs Jalur Target"
        action="Lihat Detail"
        badge={<ScopeNote />}
      />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Realisasi Porsi Hilir (% penjualan) &amp; Jalur Target menuju 25% pada 2030
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={DATA} margin={{ top: 16, right: 14, bottom: 0, left: -22 }}>
            <defs>
              <linearGradient id="hilir-porsi-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={PALETTE.green} stopOpacity="0.18" />
                <stop offset="100%" stopColor={PALETTE.green} stopOpacity="0.02" />
              </linearGradient>
            </defs>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="periode"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              interval={0}
            />
            <YAxis
              domain={[0, 28]}
              ticks={[0, 7, 14, 21, 28]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => `${v}%`}
            />
            <Tooltip
              formatter={(v: number, name: string) => [
                pct(v),
                name === "porsi" ? "Realisasi Porsi Hilir" : "Jalur Target",
              ]}
              contentStyle={CHART_TOOLTIP_STYLE}
            />
            <Area isAnimationActive={false}
              type="linear"
              dataKey="porsi"
              stroke={PALETTE.green}
              strokeWidth={1.8}
              fill="url(#hilir-porsi-fill)"
              dot={{ r: 2.5, strokeWidth: 0, fill: PALETTE.green }}
              activeDot={{ r: 4 }}
              connectNulls={false}
            >
              <LabelList
                dataKey="porsi"
                position="top"
                offset={6}
                formatter={(v: unknown) => (v == null ? "" : pct(v as number))}
                style={{ fontSize: 8.5, fill: "#334155", fontWeight: 700 }}
              />
            </Area>
            <Line isAnimationActive={false}
              type="linear"
              dataKey="target"
              stroke={PALETTE.navy}
              strokeWidth={1.5}
              strokeDasharray="5 3"
              dot={{ r: 2, strokeWidth: 0, fill: PALETTE.navy }}
              activeDot={{ r: 3.5 }}
              connectNulls
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-1 flex items-center gap-3">
        <span className="flex items-center gap-1.5 text-[9px] font-semibold text-ink-500">
          <span className="h-[3px] w-[14px] rounded-full" style={{ background: PALETTE.green }} />
          Realisasi Porsi Hilir
        </span>
        <span className="flex items-center gap-1.5 text-[9px] font-semibold text-ink-500">
          <span className="h-[3px] w-[14px] rounded-full" style={{ background: PALETTE.navy }} />
          Jalur Target (T) → 25% pada 2030
        </span>
      </div>
    </div>
  );
}
