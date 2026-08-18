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
import { benefitWaterfall } from "@/lib/tik-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const rp = (v: number) => `Rp ${v.toLocaleString("id-ID", { minimumFractionDigits: 2 })} T`;
const bulat = (v: number) => Math.round(v * 100) / 100;

const realisasiTotal = bulat(benefitWaterfall.reduce((a, b) => a + b.realisasiRpT, 0));
const potensiTotal = bulat(benefitWaterfall.reduce((a, b) => a + b.potensiRpT, 0));

interface Step {
  label: string;
  /** Offset transparan untuk efek jembatan (waterfall). */
  base: number;
  nilai: number;
  color: string;
  catatan: string;
  total: boolean;
}

// Bridge: realisasi YTD → gap tiap komponen → potensi penuh pasca rollout.
const steps: Step[] = (() => {
  const out: Step[] = [
    {
      label: "Realisasi YTD",
      base: 0,
      nilai: realisasiTotal,
      color: PALETTE.green,
      catatan: "Benefit terealisasi dari modul yang sudah go-live.",
      total: true,
    },
  ];
  let kumulatif = realisasiTotal;
  for (const b of benefitWaterfall) {
    const gap = bulat(b.potensiRpT - b.realisasiRpT);
    out.push({
      label: b.komponen,
      base: bulat(kumulatif),
      nilai: gap,
      color: b.color,
      catatan: b.catatan,
      total: false,
    });
    kumulatif = bulat(kumulatif + gap);
  }
  out.push({
    label: "Potensi Penuh",
    base: 0,
    nilai: potensiTotal,
    color: PALETTE.navy,
    catatan: "Potensi benefit penuh setelah seluruh modul ERP go-live.",
    total: true,
  });
  return out;
})();

/** Waterfall benefit ERP: realisasi YTD menjembatani gap tiap komponen ke potensi penuh. */
export function BenefitWaterfall() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "150ms" } as React.CSSProperties}
    >
      <SectionHead title="Waterfall Benefit ERP" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Realisasi YTD {rp(realisasiTotal)} → Gap per Komponen → Potensi Penuh {rp(potensiTotal)}
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={steps} margin={{ top: 16, right: 14, bottom: 0, left: -18 }} barCategoryGap="24%">
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              interval={0}
            />
            <YAxis
              domain={[0, 1.4]}
              ticks={[0, 0.35, 0.7, 1.05, 1.4]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => v.toLocaleString("id-ID", { minimumFractionDigits: 2 })}
              width={40}
            />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.08)" }}
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, name: string, item) => {
                if (name !== "nilai") return [null, null];
                const s = item.payload as Step;
                return [`${rp(v)} — ${s.catatan}`, s.label];
              }}
            />
            <Bar dataKey="base" stackId="w" fill="transparent" isAnimationActive={false} />
            <Bar dataKey="nilai" stackId="w" radius={[3, 3, 0, 0]} barSize={38}>
              {steps.map((s) => (
                <Cell key={s.label} fill={s.color} fillOpacity={s.total ? 0.95 : 0.7} />
              ))}
              <LabelList
                dataKey="nilai"
                position="top"
                style={{ fontSize: 8.5, fill: "#334155", fontWeight: 700 }}
                formatter={(v: number) => v.toLocaleString("id-ID", { minimumFractionDigits: 2 })}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="pb-1 text-[9px] leading-snug text-ink-500">
        Rp 0,88 T dari total gap Rp 1,17 T melekat pada efisiensi proses dan akurasi data — dua
        komponen yang bergantung pada modul Plantation dan BI.
      </p>
    </div>
  );
}
