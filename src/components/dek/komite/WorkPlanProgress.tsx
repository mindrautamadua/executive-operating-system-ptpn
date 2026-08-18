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
import { workPlanNote, workPlanProgress } from "@/lib/dek-data-detail";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const DATA = workPlanProgress.map((w) => ({
  name: w.komite.replace("Komite ", ""),
  rencana: w.rencana,
  realisasi: w.realisasi,
  capaian: w.capaian,
  color: w.color,
}));

const LABELS: Record<string, string> = {
  rencana: "Rencana Program",
  realisasi: "Realisasi Program",
};

/** Rencana vs realisasi program kerja tahunan tiap komite (gabungan 78%). */
export function WorkPlanProgress() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <SectionHead title="Progres Program Kerja" badge={<ScopeNote />} />
          <p className="mt-[3px] text-[9px] text-ink-500">
            32 dari 41 Program Terealisasi · Capaian Gabungan 78,0%
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2.5">
          <span className="flex items-center gap-1">
            <span
              className="h-[7px] w-[7px] shrink-0 rounded-full"
              style={{ backgroundColor: PALETTE.slate }}
            />
            <span className="text-[9px] font-semibold text-ink-500">Rencana</span>
          </span>
          <span className="flex items-center gap-1">
            <span
              className="h-[7px] w-[7px] shrink-0 rounded-full"
              style={{ backgroundColor: PALETTE.green }}
            />
            <span className="text-[9px] font-semibold text-ink-500">Realisasi</span>
          </span>
        </div>
      </div>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={DATA}
            margin={{ top: 18, right: 8, bottom: 4, left: -18 }}
            barCategoryGap="26%"
          >
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              interval={0}
            />
            <YAxis
              domain={[0, 20]}
              ticks={[0, 5, 10, 15, 20]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              width={38}
            />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.08)" }}
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, n: string) => [`${v} program`, LABELS[n] ?? n]}
            />
            <Bar dataKey="rencana" fill={PALETTE.slate} radius={[3, 3, 0, 0]} maxBarSize={26} />
            <Bar dataKey="realisasi" radius={[3, 3, 0, 0]} maxBarSize={26}>
              {DATA.map((d) => (
                <Cell key={d.name} fill={d.color} />
              ))}
              <LabelList
                dataKey="capaian"
                position="top"
                offset={5}
                style={{ fontSize: 8, fill: "#334155", fontWeight: 700 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-1 text-[8.5px] leading-snug text-ink-500">{workPlanNote}</p>
    </div>
  );
}
