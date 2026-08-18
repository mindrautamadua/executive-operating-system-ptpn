"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { addendumAnalysis } from "@/lib/pgd-data-detail";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const TOTAL = addendumAnalysis.reduce((s, r) => s + r.jumlah, 0);

const TONE_COLOR: Record<string, string> = {
  red: PALETTE.red,
  amber: PALETTE.amber,
  green: PALETTE.green,
};

const rows = addendumAnalysis.map((r) => ({
  ...r,
  short: r.penyebab.length > 26 ? `${r.penyebab.slice(0, 25)}…` : r.penyebab,
}));

export function AddendumAnalysis() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "180ms" } as React.CSSProperties}
    >
      <SectionHead title="Analisis Addendum" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {TOTAL} Addendum · Tingkat <span className="font-bold text-[#d98b06]">18,4%</span> dari 1.246
        Kontrak
      </p>

      <div className="mt-1 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={rows}
            layout="vertical"
            margin={{ top: 4, right: 26, bottom: 0, left: 6 }}
            barCategoryGap="22%"
          >
            <CartesianGrid stroke={CHART_AXIS.grid} horizontal={false} />
            <XAxis
              type="number"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
            />
            <YAxis
              type="category"
              dataKey="short"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              width={118}
            />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.10)" }}
              formatter={(v: number) => [`${v} addendum`, "Jumlah"]}
              contentStyle={CHART_TOOLTIP_STYLE}
            />
            <Bar isAnimationActive={false} dataKey="jumlah" radius={[0, 4, 4, 0]} barSize={13}>
              {rows.map((r) => (
                <Cell key={r.penyebab} fill={TONE_COLOR[r.tone]} />
              ))}
              <LabelList
                dataKey="jumlah"
                position="right"
                style={{ fontSize: 8, fill: "#334155", fontWeight: 700 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-1 rounded-md bg-[#fdf3e0] px-2 py-[5px] text-[9px] leading-[1.4] text-[#a26a05]">
        Perubahan volume (78) dan eskalasi harga (54) menyumbang 57,7% addendum — akar masalah ada di
        demand plan dan asumsi harga RKAP.
      </p>
    </div>
  );
}
