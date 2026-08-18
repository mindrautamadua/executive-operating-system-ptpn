"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { marginBench, marginBenchRef } from "@/lib/sbm-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const fmt1 = (v: number) =>
  v.toLocaleString("id-ID", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

/** Nama peer diringkas agar 8 kolom tetap terbaca. */
const SHORT: Record<string, string> = {
  "First Resources": "First Res.",
  "Astra Agro Lestari": "AALI",
  "Dharma Satya (DSN)": "DSNG",
  "Sampoerna Agro": "SGRO",
  "Golden Agri (GAR)": "GAR",
  "PTPN Group": "PTPN",
};

const DATA = marginBench.map((p) => ({
  name: SHORT[p.company] ?? p.company,
  company: p.company,
  margin: p.ebitdaMarginPct,
  isPtpn: p.isPtpn ?? false,
}));

/**
 * EBITDA margin LTM PTPN vs 7 peer emiten + garis rata industri.
 * Batang PTPN adalah margin konsolidasi grup (sawit + gula + pendukung), bukan
 * pecahan per subholding — karena itu kartu ini tetap angka grup saat difilter.
 */
export function MarginBenchmark() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Benchmark EBITDA Margin" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Margin EBITDA LTM · PTPN Peringkat 2/8 · Rata Emiten {fmt1(marginBenchRef.rataEmitenPct)}%
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={DATA} margin={{ top: 18, right: 8, bottom: 4, left: -16 }} barCategoryGap="26%">
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              interval={0}
            />
            <YAxis
              domain={[0, 36]}
              ticks={[0, 9, 18, 27, 36]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => `${v}%`}
              width={38}
            />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.08)" }}
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, _n: string, item: { payload?: { company?: string } }) => [
                `${fmt1(v)}%`,
                item?.payload?.company ?? "EBITDA Margin",
              ]}
            />
            <ReferenceLine
              y={marginBenchRef.rataEmitenPct}
              stroke={PALETTE.slate}
              strokeDasharray="3 3"
              strokeWidth={1.2}
            />
            <Bar isAnimationActive={false} dataKey="margin" radius={[3, 3, 0, 0]} maxBarSize={30}>
              {DATA.map((d) => (
                <Cell key={d.company} fill={d.isPtpn ? PALETTE.green : PALETTE.blueSoft} />
              ))}
              <LabelList
                dataKey="margin"
                position="top"
                offset={5}
                formatter={(v: number) => `${fmt1(v)}%`}
                style={{ fontSize: 8.5, fill: "#334155", fontWeight: 700 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
