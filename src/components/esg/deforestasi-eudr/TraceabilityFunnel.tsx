"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { traceabilityFunnel } from "@/lib/esg-data-detail";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";
import { filterBySubholding } from "@/lib/subholding";

const pct = (v: number) => `${v.toLocaleString("id-ID", { maximumFractionDigits: 1 })}%`;

/** Funnel ketertelusuran TTB (ke PKS) → TTP (ke kebun) per sumber pasokan. */
export function TraceabilityFunnel() {
  const { active, isFiltered, def } = useSubholding();
  // `sumber` menyebut subholding pemilik pasokan inti (PalmCo/SupportingCo);
  // baris "Plasma & pihak ketiga" tidak terikat subholding sehingga selalu
  // tampil sebagai pembanding rantai pasok.
  const rows = filterBySubholding(traceabilityFunnel, active, (r) => r.sumber);

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Traceability Funnel" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {isFiltered
          ? `Sumber pasokan ${def.label} & non-inti · TTP Grup 92,4%`
          : "TTB → TTP per Sumber Pasokan · TTP Grup 92,4%"}
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={rows}
            margin={{ top: 10, right: 10, bottom: 0, left: -14 }}
            barCategoryGap="28%"
          >
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="sumber"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              interval={0}
            />
            <YAxis
              domain={[70, 100]}
              ticks={[70, 80, 90, 100]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              width={34}
            />
            <Tooltip formatter={(v: number) => pct(v)} contentStyle={CHART_TOOLTIP_STYLE} />
            <Legend
              verticalAlign="top"
              align="right"
              height={16}
              iconType="circle"
              iconSize={7}
              wrapperStyle={{ fontSize: 8.5, color: CHART_AXIS.tick }}
            />
            <Bar isAnimationActive={false} dataKey="ttbPct" name="TTB (ke PKS)" fill={PALETTE.blue} radius={[3, 3, 0, 0]} />
            <Bar isAnimationActive={false} dataKey="ttpPct" name="TTP (ke kebun)" fill={PALETTE.green} radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
