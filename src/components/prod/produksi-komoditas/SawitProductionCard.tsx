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
import { sawitWaterfall } from "@/lib/produksi-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "../../hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";
import { inScope, ScopeEmpty } from "@/components/ui/CommodityScope";

const SHORT: Record<string, string> = {
  "TBS Kebun Inti": "TBS Inti",
  "TBS Plasma & Pihak III": "Plasma & III",
  "Restan / Tidak Terolah": "Restan",
  "TBS Diolah": "TBS Diolah",
  CPO: "CPO",
  "Palm Kernel": "Palm Kernel",
};

interface Step {
  name: string;
  base: number;
  val: number;
  display: number;
  fill: string;
  note?: string;
}

// Waterfall via stacked bar: base transparan + nilai (trik transparent-base).
const data: Step[] = (() => {
  let cum = 0;
  return sawitWaterfall.map((s) => {
    if (s.type === "total") {
      return { name: SHORT[s.label], base: 0, val: cum, display: s.value, fill: PALETTE.navy, note: s.note };
    }
    if (s.type === "out") {
      const fill = s.label === "CPO" ? PALETTE.blue : PALETTE.teal;
      return { name: SHORT[s.label], base: 0, val: s.value, display: s.value, fill, note: s.note };
    }
    const start = cum;
    cum += s.value;
    return {
      name: SHORT[s.label],
      base: Math.min(start, cum),
      val: Math.abs(s.value),
      display: s.value,
      fill: s.value < 0 ? PALETTE.red : PALETTE.green,
      note: s.note,
    };
  });
})();

const jt = (v: number) =>
  v.toLocaleString("id-ID", { minimumFractionDigits: 2, maximumFractionDigits: 3 });

export function SawitProductionCard() {
  const { active, def } = useSubholding();
  // Waterfall TBS -> CPO & Palm Kernel: seluruhnya milik PalmCo.
  const milikScope = inScope(active, "Sawit TBS CPO");

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Sawit Production Waterfall" action="Lihat Detail" href="/produksi-operasi/produksi-komoditas/detail#sawit" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Alur TBS Inti → Plasma → Diolah → CPO &amp; Palm Kernel (jt ton, YTD)
      </p>

      {!milikScope && <ScopeEmpty label={def.fullLabel} />}

      {milikScope && (
        <>
      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 16, right: 8, bottom: 0, left: -14 }} barCategoryGap="24%">
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              interval={0}
            />
            <YAxis
              domain={[0, 5]}
              ticks={[0, 1, 2, 3, 4, 5]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
            />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.08)" }}
              formatter={(v: number, name: string, item) =>
                name === "val"
                  ? [`${jt((item.payload as Step).display)} jt ton`, (item.payload as Step).name]
                  : [null, null]
              }
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
                formatter={(v: number) => jt(v)}
                style={{ fontSize: 8.5, fill: "var(--text-1)", fontWeight: 700 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-1 text-[9px] leading-snug text-ink-500">
        Restan rata-rata 1,8% + reject sortasi · OER 22,4% · KER 4,6%
      </p>
        </>
      )}
    </div>
  );
}
