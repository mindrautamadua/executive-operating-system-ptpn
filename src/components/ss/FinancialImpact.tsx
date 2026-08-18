"use client";

import { ArrowRight } from "lucide-react";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  LabelList,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { financialImpact } from "@/lib/ss-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "../hc/SectionHead";

const ribuan = (v: number) => v.toLocaleString("id-ID");

const LEGEND = [
  { label: "Baseline Plan Cost", color: PALETTE.blue, type: "bar" },
  { label: "Skenario C Cost", color: PALETTE.green, type: "bar" },
  { label: "ROI (Skenario C)", color: PALETTE.amber, type: "line" },
];

export function FinancialImpact() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Dampak Finansial (2026 - 2028)" />
      <p className="mt-[3px] text-[9px] text-ink-500">Proyeksi dampak finansial kumulatif</p>

      <div className="mt-1 flex items-center justify-between text-[9px] font-semibold text-ink-500">
        <span>Miliar Rupiah</span>
        <span>ROI (%)</span>
      </div>

      <div className="min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={financialImpact} margin={{ top: 14, right: -8, bottom: 0, left: -10 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
            />
            <YAxis
              yAxisId="cost"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              tickFormatter={ribuan}
              width={42}
            />
            <YAxis
              yAxisId="roi"
              orientation="right"
              domain={[0, 30]}
              ticks={[0, 5, 10, 15, 20, 25, 30]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => `${v}%`}
              width={40}
            />
            <Tooltip
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, name: string) => {
                if (name === "roi") return [`${v.toLocaleString("id-ID")}%`, "ROI (Skenario C)"];
                return [
                  `Rp ${ribuan(v)} M`,
                  name === "baseline" ? "Baseline Plan Cost" : "Skenario C Cost",
                ];
              }}
            />
            <Bar yAxisId="cost" dataKey="baseline" fill={PALETTE.blue} radius={[3, 3, 0, 0]} barSize={16}>
              <LabelList
                dataKey="baseline"
                position="top"
                formatter={ribuan}
                style={{ fontSize: 8, fill: "#334155", fontWeight: 700 }}
              />
            </Bar>
            <Bar yAxisId="cost" dataKey="scenario" fill={PALETTE.green} radius={[3, 3, 0, 0]} barSize={16}>
              <LabelList
                dataKey="scenario"
                position="top"
                formatter={ribuan}
                style={{ fontSize: 8, fill: "#334155", fontWeight: 700 }}
              />
            </Bar>
            <Line
              yAxisId="roi"
              type="linear"
              dataKey="roi"
              stroke={PALETTE.amber}
              strokeWidth={1.8}
              dot={{ r: 3, fill: PALETTE.amber, strokeWidth: 0 }}
              activeDot={{ r: 4 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-0.5 flex items-center justify-center gap-4">
        {LEGEND.map((l) => (
          <span key={l.label} className="flex items-center gap-1.5 text-[9px] font-semibold text-ink-500">
            {l.type === "bar" ? (
              <span className="h-[8px] w-[8px] shrink-0 rounded-[2px]" style={{ background: l.color }} />
            ) : (
              <span className="h-[2px] w-[12px] shrink-0 rounded-full" style={{ background: l.color }} />
            )}
            {l.label}
          </span>
        ))}
      </div>

      <button className="mt-1.5 flex w-full items-center justify-center gap-1 rounded-lg border border-[#e3e9ef] bg-[#f8fafc] py-[7px] text-[9.5px] font-semibold text-ptpn-greenDark transition-colors hover:bg-[#eef4f0]">
        Lihat Detail Finansial <ArrowRight size={11} />
      </button>
    </div>
  );
}
