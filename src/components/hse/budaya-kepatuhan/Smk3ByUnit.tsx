"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { smk3ByUnit, smk3Footnote } from "@/lib/hse-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";
import type { SubholdingId } from "@/lib/subholding";

const num = (v: number) => v.toLocaleString("id-ID");

const totalUnit = smk3ByUnit.reduce((a, r) => a + r.total, 0);
const totalTersertifikasi = smk3ByUnit.reduce((a, r) => a + r.tersertifikasi, 0);

/**
 * Pemetaan jenis unit ke subholding pemiliknya, mengikuti struktur operasi grup:
 * PKS (pabrik kelapa sawit) = PalmCo, PG (pabrik gula) = SugarCo, sedangkan
 * pabrik karet & teh berada di SupportingCo (PTPN I). Kantor & unit pendukung
 * bersifat lintas grup sehingga tidak dipetakan ke satu subholding.
 */
const UNIT_SUBHOLDING: Record<string, SubholdingId | null> = {
  "PKS (Pabrik Kelapa Sawit)": "palmco",
  "PG (Pabrik Gula)": "sugarco",
  "Pabrik Karet": "supportingco",
  "Pabrik Teh": "supportingco",
  "Kantor & Unit Pendukung": null,
};

/** Sertifikasi SMK3 per jenis unit — bar bertumpuk tersertifikasi vs belum (basis 76 unit). */
export function Smk3ByUnit() {
  const { active, isFiltered, def } = useSubholding();
  const dim = (jenisUnit: string, dasar: number) => {
    if (!isFiltered) return dasar;
    const id = UNIT_SUBHOLDING[jenisUnit] ?? null;
    return id === null || id === active ? dasar : 0.25;
  };

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Sertifikasi SMK3 per Jenis Unit" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {isFiltered ? (
          <>
            {num(totalTersertifikasi)} dari {num(totalUnit)} Unit Tersertifikasi (89,5%) · jenis unit
            di luar {def.label} diredupkan
          </>
        ) : (
          <>
            {num(totalTersertifikasi)} dari {num(totalUnit)} Unit Tersertifikasi (89,5%) · sisa 8
            unit dalam pipeline audit
          </>
        )}
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={smk3ByUnit}
            margin={{ top: 8, right: 8, bottom: 0, left: -20 }}
            barCategoryGap="30%"
          >
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="jenisUnit"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              interval={0}
            />
            <YAxis
              domain={[0, 40]}
              ticks={[0, 10, 20, 30, 40]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              width={34}
            />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.08)" }}
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, name: string) => [`${num(v)} unit`, name]}
            />
            <Legend
              verticalAlign="top"
              align="right"
              height={16}
              iconType="circle"
              iconSize={6}
              wrapperStyle={{ fontSize: 8, color: CHART_AXIS.tick }}
            />
            <Bar isAnimationActive={false}
              name="Tersertifikasi"
              dataKey="tersertifikasi"
              stackId="u"
              fill={PALETTE.green}
              barSize={34}
            >
              {smk3ByUnit.map((r) => (
                <Cell key={r.jenisUnit} fillOpacity={dim(r.jenisUnit, 0.9)} />
              ))}
            </Bar>
            <Bar isAnimationActive={false}
              name="Belum"
              dataKey="belum"
              stackId="u"
              fill={PALETTE.slate}
              barSize={34}
              radius={[3, 3, 0, 0]}
            >
              {smk3ByUnit.map((r) => (
                <Cell key={r.jenisUnit} fillOpacity={dim(r.jenisUnit, 0.7)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="pb-1 text-[9px] leading-snug text-ink-500">{smk3Footnote}</p>
    </div>
  );
}
