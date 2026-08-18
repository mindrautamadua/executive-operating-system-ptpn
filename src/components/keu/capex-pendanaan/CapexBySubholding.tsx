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
import { capexBySubholding } from "@/lib/kcx-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { fmtId, fmtRpT } from "@/lib/keu-core";
import { SectionHead } from "@/components/hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";
import { toSubholdingId } from "@/lib/subholding";

const data = capexBySubholding.map((s) => ({
  name: s.segment,
  actual: s.actual,
  sisa: Number((s.plan - s.actual).toFixed(2)),
  plan: s.plan,
  progressPct: s.progressPct,
  fokus: s.fokus,
  // `segment` (PalmCo / SGN / PTPN I) adalah dimensi subholding batang ini.
  sub: toSubholdingId(s.segment),
}));

export function CapexBySubholding() {
  const { active, isFiltered } = useSubholding();
  // Grafik pembanding: batang non-aktif diredupkan agar konteks antar
  // subholding tetap terbaca, alih-alih menyisakan satu batang tunggal.
  const dim = (sub: ReturnType<typeof toSubholdingId>) =>
    !isFiltered || sub === active ? 1 : 0.25;

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Capex per Subholding" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Realisasi YTD &amp; Sisa Plafon RKAP (Rp T)
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 14, right: 4, bottom: 0, left: -18 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
            />
            <YAxis
              domain={[0, 7]}
              ticks={[0, 2, 4, 6]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              width={30}
            />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.08)" }}
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, name: string) => [
                fmtRpT(v, 2),
                name === "actual" ? "Realisasi YTD" : "Sisa RKAP",
              ]}
            />
            <Bar isAnimationActive={false} dataKey="actual" stackId="cx" fill={PALETTE.green} maxBarSize={34}>
              {data.map((d) => (
                <Cell key={d.name} fillOpacity={dim(d.sub)} />
              ))}
            </Bar>
            <Bar isAnimationActive={false} dataKey="sisa" stackId="cx" fill="#d7e3ee" radius={[2, 2, 0, 0]} maxBarSize={34}>
              {data.map((d) => (
                <Cell key={d.name} fillOpacity={dim(d.sub)} />
              ))}
              <LabelList
                dataKey="progressPct"
                position="top"
                offset={5}
                formatter={(v: number) => `${fmtId(v, 1)}%`}
                style={{ fontSize: 8.5, fill: "#334155", fontWeight: 700 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-col gap-[2px] pb-1">
        {data.map((d) => (
          <div
            key={d.name}
            className="flex items-center gap-1.5 text-[9px] text-ink-500 transition-opacity"
            style={{ opacity: dim(d.sub) }}
          >
            <span className="w-[42px] shrink-0 font-bold text-ink-700">{d.name}</span>
            <span className="truncate">{d.fokus}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
