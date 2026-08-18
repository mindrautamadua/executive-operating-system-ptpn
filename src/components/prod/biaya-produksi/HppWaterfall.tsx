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
import { HPP_CPO_RP_KG, HPP_TARGET_RP_KG, hppKomponen, hppNote } from "@/lib/biaya-opex-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { useSubholding } from "@/components/SubholdingProvider";
import { inScope, ScopeEmpty } from "@/components/ui/CommodityScope";
import { SectionHead } from "../../hc/SectionHead";

const SHORT: Record<string, string> = {
  "Panen & Perawatan Tanaman": "Panen & Rawat",
  "Pupuk & Agro-Input": "Pupuk",
  "Angkut TBS": "Angkut",
  "Pengolahan Pabrik": "Pabrik",
  "Overhead & Umum": "Overhead",
};

interface Step {
  name: string;
  base: number;
  val: number;
  target: number;
  fill: string;
}

// Waterfall komponen HPP via stacked bar transparan; warna merah = di atas alokasi target.
const data: Step[] = (() => {
  let cum = 0;
  const steps: Step[] = hppKomponen.map((k) => {
    const base = cum;
    cum += k.nilaiRpKg;
    return {
      name: SHORT[k.komponen],
      base,
      val: k.nilaiRpKg,
      target: k.targetRpKg,
      fill: k.nilaiRpKg > k.targetRpKg ? PALETTE.red : PALETTE.green,
    };
  });
  steps.push({ name: "HPP CPO", base: 0, val: HPP_CPO_RP_KG, target: HPP_TARGET_RP_KG, fill: PALETTE.navy });
  return steps;
})();

const rp = (v: number) => `Rp ${v.toLocaleString("id-ID")}`;

export function HppWaterfall() {
  const { active, def } = useSubholding();
  // HPP di modul ini adalah HPP CPO per kg — seluruhnya milik PalmCo.
  const dalamCakupan = inScope(active, "HPP CPO (sawit)");

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="HPP Waterfall CPO" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Komponen HPP (Rp/kg) vs Alokasi Target RKAP · merah = di atas target
      </p>

      {!dalamCakupan ? (
        <ScopeEmpty label={def.fullLabel} />
      ) : (
        <>
      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 16, right: 8, bottom: 0, left: -6 }} barCategoryGap="24%">
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              interval={0}
            />
            <YAxis
              domain={[0, 10000]}
              ticks={[0, 2500, 5000, 7500, 10000]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => `${v / 1000}K`}
              width={30}
            />
            <ReferenceLine
              y={HPP_TARGET_RP_KG}
              stroke={PALETTE.amber}
              strokeDasharray="5 4"
              strokeWidth={1.3}
              label={{
                value: "Target 8.700",
                position: "insideTopLeft",
                fontSize: 8.5,
                fontWeight: 700,
                fill: PALETTE.amber,
              }}
            />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.08)" }}
              formatter={(v: number, name: string, item) =>
                name === "val"
                  ? [
                      `${rp(v)} · target ${rp((item.payload as Step).target)}`,
                      (item.payload as Step).name,
                    ]
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
                dataKey="val"
                position="top"
                offset={4}
                formatter={(v: number) => v.toLocaleString("id-ID")}
                style={{ fontSize: 8.5, fill: "var(--text-1)", fontWeight: 700 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-1 line-clamp-2 text-[9px] leading-snug text-ink-500">{hppNote}</p>
        </>
      )}
    </div>
  );
}
