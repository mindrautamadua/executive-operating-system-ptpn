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
import { abatementWaterfall } from "@/lib/esg-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

interface WfDatum {
  name: string;
  base: number;
  delta: number;
  fill: string;
  label: string;
}

const BASELINE = 2.12;
const TARGET = 1.48;

const angka = (v: number) => v.toLocaleString("id-ID", { minimumFractionDigits: 2 });

/** Nama lever dipendekkan agar 8 kolom tetap terbaca. */
const SHORT: Record<string, string> = {
  "Biogas capture POME": "Biogas POME",
  "Efisiensi boiler & steam": "Boiler",
  "Composting tankos": "Composting",
  "Lahan & pupuk presisi": "Lahan & Pupuk",
  "Solar PV": "Solar PV",
  "B30/B40 fleet": "B30/B40",
};

const DATA: WfDatum[] = (() => {
  let run = BASELINE;
  const rows: WfDatum[] = [
    { name: "Baseline 2019", base: 0, delta: BASELINE, fill: PALETTE.slate, label: angka(BASELINE) },
  ];
  for (const l of abatementWaterfall) {
    run -= l.reduksi;
    rows.push({
      name: SHORT[l.lever] ?? l.lever,
      base: run,
      delta: l.reduksi,
      fill: l.status === "Sebagian terealisasi" ? PALETTE.green : PALETTE.amber,
      label: `−${angka(l.reduksi)}`,
    });
  }
  rows.push({ name: "Target 2030", base: 0, delta: TARGET, fill: PALETTE.teal, label: angka(TARGET) });
  return rows;
})();

export function AbatementWaterfall() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Abatement Waterfall menuju -30%" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Kontribusi Lever terhadap Intensitas Emisi (tCO2e/ton CPO) · 2,12 → 1,48
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={DATA}
            margin={{ top: 16, right: 4, bottom: 4, left: -14 }}
            barCategoryGap="22%"
          >
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              interval={0}
              height={20}
            />
            <YAxis
              domain={[1.4, 2.2]}
              ticks={[1.4, 1.6, 1.8, 2.0, 2.2]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => angka(v)}
              width={40}
            />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.08)" }}
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, _n: string, item: { dataKey?: string | number }) =>
                item?.dataKey === "base" ? [null, null] : [angka(v), "tCO2e/ton CPO"]
              }
            />
            {/* dasar transparan agar bar lever "melayang" ala waterfall */}
            <Bar dataKey="base" stackId="wf" fill="transparent" isAnimationActive={false} />
            <Bar dataKey="delta" stackId="wf" radius={[2, 2, 0, 0]} maxBarSize={34}>
              {DATA.map((d) => (
                <Cell key={d.name} fill={d.fill} />
              ))}
              <LabelList
                dataKey="label"
                position="top"
                offset={5}
                style={{ fontSize: 8.5, fill: "#334155", fontWeight: 700 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="pb-1 text-[9px] leading-snug text-ink-500">
        Biogas POME menyumbang 0,28 dari total reduksi 0,64 — hampir separuh jalur menuju target
        2030.
      </p>
    </div>
  );
}
