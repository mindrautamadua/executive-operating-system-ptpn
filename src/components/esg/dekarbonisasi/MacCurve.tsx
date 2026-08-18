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
import { macCurve } from "@/lib/esg-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const angka = (v: number) => v.toLocaleString("id-ID");

/** Makin murah makin hijau; lever termahal diberi warna amber. */
const FILLS = [PALETTE.green, PALETTE.greenSoft, PALETTE.teal, PALETTE.blue, PALETTE.amber];

export function MacCurve() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "150ms" } as React.CSSProperties}
    >
      <SectionHead title="Marginal Abatement Cost per Lever" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Biaya Abatement (Rp ribu/tCO2e) · Diurut dari Termurah
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={macCurve} margin={{ top: 16, right: 8, bottom: 4, left: -14 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="lever"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              interval={0}
              height={20}
            />
            <YAxis
              domain={[0, 300]}
              ticks={[0, 100, 200, 300]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              width={38}
            />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.08)" }}
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, _n: string, item: { payload?: { potensiRbTon?: number } }) => [
                `Rp ${angka(v)} rb/tCO2e · potensi ${angka(item?.payload?.potensiRbTon ?? 0)} rb tCO2e`,
                "MAC",
              ]}
            />
            <Bar isAnimationActive={false} dataKey="biayaRbPerTon" radius={[3, 3, 0, 0]} maxBarSize={40}>
              {macCurve.map((d, i) => (
                <Cell key={d.lever} fill={FILLS[i]} />
              ))}
              <LabelList
                dataKey="biayaRbPerTon"
                position="top"
                offset={5}
                formatter={(v: React.ReactNode) => `Rp ${v}`}
                style={{ fontSize: 8.5, fill: "#334155", fontWeight: 700 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="pb-1 text-[9px] leading-snug text-ink-500">
        Biogas termurah (Rp 86 rb/tCO2e) sekaligus berpotensi terbesar 1.110 rb tCO2e — prioritas
        alokasi capex.
      </p>
    </div>
  );
}
