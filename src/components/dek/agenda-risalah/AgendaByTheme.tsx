"use client";

import {
  Bar,
  BarChart,
  Cell,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { agendaByTheme } from "@/lib/dek-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

/** Distribusi 96 butir agenda YTD menurut tema pengawasan. */
export function AgendaByTheme() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "90ms" } as React.CSSProperties}
    >
      <SectionHead title="Distribusi Tema Agenda" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        96 Butir Agenda dari 41 Rapat YTD · Kinerja &amp; Strategi dominan 29,2%
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={agendaByTheme}
            layout="vertical"
            margin={{ top: 4, right: 22, bottom: 0, left: 4 }}
          >
            <CartesianGrid stroke={CHART_AXIS.grid} horizontal={false} />
            <XAxis
              type="number"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
            />
            <YAxis
              type="category"
              dataKey="tema"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              width={96}
            />
            <Tooltip
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number) => [`${v.toLocaleString("id-ID")} butir`, "Agenda"]}
            />
            <Bar isAnimationActive={false} dataKey="jumlah" radius={[0, 3, 3, 0]} barSize={12}>
              {agendaByTheme.map((t) => (
                <Cell key={t.tema} fill={t.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="pb-1 text-[9px] leading-snug text-ink-500">
        Keberlanjutan hanya 5 butir (5,2%) dan tidak pernah menjadi mata agenda utama, padahal
        risiko regulasi pasar ekspor terus menguat.
      </p>
    </div>
  );
}
