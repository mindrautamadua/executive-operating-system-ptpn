"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { landBankComposition } from "@/lib/ast-data";
import { LAND_BANK_TOTAL_RB_HA } from "@/lib/ast-core";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";
import { toSubholdingId } from "@/lib/subholding";

const num = (v: number) =>
  v.toLocaleString("id-ID", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

const SERIES = [
  { key: "menghasilkanRbHa", label: "Menghasilkan", color: PALETTE.green },
  { key: "tbmRbHa", label: "TBM", color: PALETTE.greenSoft },
  { key: "cadanganRbHa", label: "Cadangan", color: PALETTE.blue },
  { key: "sengketaRbHa", label: "Sengketa", color: PALETTE.red },
  { key: "lainRbHa", label: "Emplasemen & Lain", color: PALETTE.slate },
] as const;

/** Komposisi land bank per subholding (rb ha), stacked per peruntukan. */
export function LandBankComposition() {
  const { active, isFiltered, def } = useSubholding();
  // `subholding` (PalmCo / SGN (Lahan Tebu) / PTPN I) adalah dimensi subholding
  // kolom ini. Grafik pembanding: kolom non-aktif diredupkan agar porsi antar
  // subholding tetap terbaca terhadap total grup.
  const dim = (subholding: string) =>
    !isFiltered || toSubholdingId(subholding) === active ? 1 : 0.25;

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Komposisi Land Bank" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {isFiltered
          ? `Penguasaan Lahan ${def.label} dalam konteks grup (rb ha)`
          : `Penguasaan Lahan per Subholding (rb ha) · total ${num(LAND_BANK_TOTAL_RB_HA)} rb ha`}
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={landBankComposition} margin={{ top: 8, right: 6, bottom: 0, left: -14 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="subholding"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              interval={0}
            />
            <YAxis
              domain={[0, 700]}
              ticks={[0, 175, 350, 525, 700]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              width={36}
            />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.08)" }}
              formatter={(v: number, name: string) => [`${num(v)} rb ha`, name]}
              contentStyle={CHART_TOOLTIP_STYLE}
            />
            {SERIES.map((s, i) => (
              <Bar isAnimationActive={false}
                key={s.key}
                name={s.label}
                dataKey={s.key}
                stackId="lb"
                fill={s.color}
                barSize={46}
                radius={i === SERIES.length - 1 ? [2, 2, 0, 0] : undefined}
              >
                {landBankComposition.map((row) => (
                  <Cell key={row.subholding} fillOpacity={dim(row.subholding)} />
                ))}
              </Bar>
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mb-1 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
        {SERIES.map((s) => (
          <span key={s.key} className="flex items-center gap-1.5 text-[9px] text-ink-500">
            <span className="h-[7px] w-[7px] rounded-full" style={{ background: s.color }} />
            {s.label}
          </span>
        ))}
      </div>
    </div>
  );
}
