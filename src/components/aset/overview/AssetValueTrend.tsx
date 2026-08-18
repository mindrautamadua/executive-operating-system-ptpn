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
import { assetValueNote, assetValueTrend } from "@/lib/ast-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const num = (v: number) =>
  v.toLocaleString("id-ID", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

/** Tren nilai buku aset tetap 5 tahun + capex tahun berjalan. */
export function AssetValueTrend() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Tren Nilai Aset Tetap" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Nilai Buku Aset Tetap &amp; Capex 2022–2026 (Rp T)
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={assetValueTrend} margin={{ top: 18, right: 8, bottom: 0, left: -14 }}>
            <defs>
              <linearGradient id="ast-value-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={PALETTE.green} stopOpacity="0.20" />
                <stop offset="100%" stopColor={PALETTE.green} stopOpacity="0.02" />
              </linearGradient>
            </defs>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="tahun"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              interval={0}
            />
            <YAxis
              domain={[0, 90]}
              ticks={[0, 30, 60, 90]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => (v === 0 ? "0" : `${v} T`)}
              width={36}
            />
            <Tooltip
              formatter={(v: number, name: string) => [`Rp ${num(v)} T`, name]}
              contentStyle={CHART_TOOLTIP_STYLE}
            />
            <Area isAnimationActive={false}
              name="Aset Tetap"
              type="linear"
              dataKey="asetTetapRpT"
              stroke={PALETTE.green}
              strokeWidth={1.8}
              fill="url(#ast-value-fill)"
              dot={{ r: 2.4, fill: PALETTE.green, strokeWidth: 0 }}
              activeDot={{ r: 4 }}
            >
              <LabelList
                dataKey="asetTetapRpT"
                position="top"
                offset={6}
                formatter={(v: number) => num(v)}
                style={{ fontSize: 8.5, fill: "var(--text-1)", fontWeight: 700 }}
              />
            </Area>
            <Line isAnimationActive={false}
              name="Capex"
              type="linear"
              dataKey="capexRpT"
              stroke={PALETTE.blue}
              strokeWidth={1.6}
              strokeDasharray="4 3"
              dot={{ r: 2.2, fill: PALETTE.blue, strokeWidth: 0 }}
              activeDot={{ r: 4 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-1 truncate text-[9px] text-ink-500" title={assetValueNote}>
        {assetValueNote}
      </p>
    </div>
  );
}
