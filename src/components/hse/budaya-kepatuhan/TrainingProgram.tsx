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
import { trainingFootnote, trainingProgram } from "@/lib/hse-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const num = (v: number) => v.toLocaleString("id-ID");
const pct = (v: number) => `${v.toLocaleString("id-ID", { minimumFractionDigits: 1 })}%`;

const totalPeserta = trainingProgram.reduce((a, r) => a + r.peserta, 0);
const totalBatch = trainingProgram.reduce((a, r) => a + r.batch, 0);

/** Peserta pelatihan K3 YTD per jenis program (total 12.400 peserta). */
export function TrainingProgram() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Program Pelatihan K3" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {num(totalPeserta)} Peserta YTD 2026 · {num(totalBatch)} batch · 5 program inti
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={trainingProgram}
            layout="vertical"
            margin={{ top: 4, right: 24, bottom: 0, left: 4 }}
            barCategoryGap="24%"
          >
            <CartesianGrid stroke={CHART_AXIS.grid} horizontal={false} />
            <XAxis
              type="number"
              domain={[0, 6400]}
              ticks={[0, 1600, 3200, 4800, 6400]}
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              tickFormatter={num}
            />
            <YAxis
              type="category"
              dataKey="program"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              width={142}
              interval={0}
            />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.08)" }}
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, _n: string, item) => {
                const r = item.payload as (typeof trainingProgram)[number];
                return [
                  `${num(v)} peserta · ${pct(r.pct)} · ${r.batch} batch · kelulusan ${r.kelulusanPct}%${
                    r.wajib ? " · wajib" : ""
                  }`,
                  r.program,
                ];
              }}
            />
            <Bar isAnimationActive={false} dataKey="peserta" radius={[0, 3, 3, 0]} barSize={16}>
              {trainingProgram.map((r) => (
                <Cell key={r.program} fill={r.color} fillOpacity={0.85} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="pb-1 text-[9px] leading-snug text-ink-500">{trainingFootnote}</p>
    </div>
  );
}
