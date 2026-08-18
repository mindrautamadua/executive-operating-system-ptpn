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
import { emissionBySubholding } from "@/lib/esg-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";
import { toSubholdingId } from "@/lib/subholding";

export function EmissionBySubholding() {
  const { active, isFiltered, def } = useSubholding();
  // `name` (PalmCo / SugarCo (SGN) / SupportingCo) adalah dimensi subholding.
  // Grafik pembanding porsi: batang non-aktif diredupkan agar bobot relatif
  // terhadap grup tetap terbaca.
  const dim = (name: string) => (!isFiltered || toSubholdingId(name) === active ? 1 : 0.25);

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "150ms" } as React.CSSProperties}
    >
      <SectionHead title="Emisi per Subholding" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">% Kontribusi terhadap Scope 1+2 Grup</p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={emissionBySubholding} margin={{ top: 18, right: 10, bottom: 0, left: -22 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
            />
            <YAxis
              domain={[0, 90]}
              ticks={[0, 30, 60, 90]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              width={34}
            />
            <Tooltip
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number) => [`${v}%`, "Porsi Emisi"]}
            />
            <Bar dataKey="pct" radius={[3, 3, 0, 0]} barSize={34}>
              {emissionBySubholding.map((d) => (
                <Cell key={d.name} fill={d.color} fillOpacity={dim(d.name)} />
              ))}
              <LabelList
                dataKey="pct"
                position="top"
                formatter={(v: React.ReactNode) => `${v}%`}
                style={{ fontSize: 8.5, fill: "#334155", fontWeight: 700 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="pb-1 text-[9px] leading-snug text-ink-500">
        {isFiltered
          ? `Porsi ${def.label} disorot dalam konteks Scope 1+2 grup; subholding lain diredupkan.`
          : "PalmCo menyumbang 78% jejak grup — prioritas program abatement tetap di sisi sawit."}
      </p>
    </div>
  );
}
