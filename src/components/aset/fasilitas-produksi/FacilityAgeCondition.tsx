"use client";

import {
  CartesianGrid,
  Cell,
  ReferenceLine,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ageCondition,
  ageConditionNote,
  KONDISI_AMBANG_BAIK,
  KONDISI_AMBANG_KRITIS,
} from "@/lib/afs-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";

const pks = ageCondition.filter((a) => a.jenis === "PKS");
const pg = ageCondition.filter((a) => a.jenis === "PG");

const warna = (kondisi: number) =>
  kondisi < KONDISI_AMBANG_KRITIS
    ? PALETTE.red
    : kondisi < KONDISI_AMBANG_BAIK
      ? PALETTE.amber
      : PALETTE.green;

/** Sebaran umur pabrik × indeks kondisi aset, dibedakan PKS dan PG. */
export function FacilityAgeCondition() {
  const { active, isFiltered } = useSubholding();
  // Pemetaan domain: PKS (sawit) milik PalmCo, PG (gula) milik SugarCo.
  const dim = (jenis: "PKS" | "PG") => {
    if (!isFiltered) return 1;
    return active === (jenis === "PKS" ? "palmco" : "sugarco") ? 1 : 0.25;
  };

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Umur vs Kondisi Pabrik" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Umur (tahun) × Indeks Kondisi 0–100 · ambang kritis {KONDISI_AMBANG_KRITIS}
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 12, right: 12, bottom: 0, left: -22 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} />
            <XAxis
              type="number"
              dataKey="umurThn"
              domain={[0, 70]}
              ticks={[0, 14, 28, 42, 56, 70]}
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => `${v} th`}
            />
            <YAxis
              type="number"
              dataKey="kondisiIndex"
              domain={[40, 100]}
              ticks={[40, 55, 70, 85, 100]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
            />
            <ReferenceLine
              y={KONDISI_AMBANG_KRITIS}
              stroke={PALETTE.red}
              strokeDasharray="5 4"
              strokeWidth={1.2}
            />
            <ReferenceLine
              y={KONDISI_AMBANG_BAIK}
              stroke={PALETTE.slate}
              strokeDasharray="5 4"
              strokeWidth={1.2}
            />
            <Tooltip
              cursor={{ strokeDasharray: "3 3" }}
              formatter={(v: number, name: string) =>
                name === "umurThn" ? [`${v} tahun`, "Umur"] : [`${v}/100`, "Indeks Kondisi"]
              }
              labelFormatter={() => ""}
              contentStyle={CHART_TOOLTIP_STYLE}
            />
            <Scatter name="PKS" data={pks} shape="circle">
              {pks.map((d) => (
                <Cell key={d.pabrik} fill={warna(d.kondisiIndex)} fillOpacity={0.85 * dim("PKS")} />
              ))}
            </Scatter>
            <Scatter name="PG" data={pg} shape="square">
              {pg.map((d) => (
                <Cell key={d.pabrik} fill={warna(d.kondisiIndex)} fillOpacity={0.85 * dim("PG")} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-1 line-clamp-2 text-[9px] leading-snug text-ink-500">{ageConditionNote}</p>
    </div>
  );
}
