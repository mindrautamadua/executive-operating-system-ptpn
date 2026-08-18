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
import { priceVolumeBridge } from "@/lib/pemasaran-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const SHORT: Record<string, string> = {
  "Penjualan YTD 2025": "YTD 2025",
  "Efek Harga": "Harga",
  "Efek Volume": "Volume",
  "Efek Mix & Hilirisasi": "Mix & Hilir",
  Lainnya: "Lainnya",
  "Penjualan YTD 2026": "YTD 2026",
};

interface Step {
  name: string;
  full: string;
  base: number;
  val: number;
  display: number;
  fill: string;
}

// Waterfall via stacked bar: base transparan + nilai (trik transparent-base).
const data: Step[] = (() => {
  let cum = 0;
  return priceVolumeBridge.map((s) => {
    if (s.type === "total") {
      cum = s.value;
      return {
        name: SHORT[s.label],
        full: s.label,
        base: 0,
        val: s.value,
        display: s.value,
        fill: PALETTE.navy,
      };
    }
    const start = cum;
    cum += s.value;
    return {
      name: SHORT[s.label],
      full: s.label,
      base: Math.min(start, cum),
      val: Math.abs(s.value),
      display: s.value,
      fill: s.value < 0 ? PALETTE.red : PALETTE.green,
    };
  });
})();

const t = (v: number) =>
  v.toLocaleString("id-ID", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/** Dekomposisi kenaikan penjualan YoY: efek harga vs volume vs mix. */
export function PriceVolumeBridge() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "90ms" } as React.CSSProperties}
    >
      {/* Jembatan disusun dari nilai penjualan konsolidasi grup. */}
      <SectionHead title="Price-Volume Bridge YoY" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Jembatan penjualan YTD 2025 → 2026 (Rp Triliun)
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 16, right: 8, bottom: 0, left: -18 }} barCategoryGap="24%">
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              interval={0}
            />
            <YAxis
              domain={[0, 22]}
              ticks={[0, 5, 10, 15, 20]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
            />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.08)" }}
              formatter={(v: number, name: string, item) => {
                if (name !== "val") return [null, null];
                const d = item.payload as Step;
                const label =
                  d.fill === PALETTE.navy
                    ? `Rp ${t(d.display)} T`
                    : `${d.display >= 0 ? "+" : "−"}Rp ${t(Math.abs(d.display))} T`;
                return [label, d.full];
              }}
              labelFormatter={() => ""}
              contentStyle={CHART_TOOLTIP_STYLE}
            />
            <Bar dataKey="base" stackId="w" fill="transparent" isAnimationActive={false} />
            <Bar dataKey="val" stackId="w" radius={[3, 3, 0, 0]}>
              {data.map((d) => (
                <Cell key={d.name} fill={d.fill} />
              ))}
              <LabelList
                dataKey="display"
                position="top"
                offset={4}
                formatter={(v: number) => t(v)}
                style={{ fontSize: 8.5, fill: "var(--text-1)", fontWeight: 700 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-1 text-[9px] leading-snug text-ink-500">
        +Rp 2,3 T YoY: harga +1,42 · volume +0,68 · mix &amp; hilirisasi +0,25 · lainnya −0,05
      </p>
    </div>
  );
}
