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
import { scorecardSnapshot } from "@/lib/stg-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";
import { toSubholdingId } from "@/lib/subholding";

const TARGET = 85;

const num = (v: number) => v.toLocaleString("id-ID", { minimumFractionDigits: 1 });

/** Skor KPI korporat per entitas vs target RKAP 85. */
export function ScorecardSnapshot() {
  const { active, isFiltered } = useSubholding();
  // Grafik pembanding: batang non-aktif diredupkan agar konteks antar
  // subholding tetap terbaca; batang PTPN Group selalu penuh.
  const dim = (entity: string) => {
    const sub = toSubholdingId(entity);
    return !isFiltered || sub === null || sub === active ? 1 : 0.25;
  };

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Scorecard Snapshot" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Skor KPI Korporat per Subholding vs Target RKAP {TARGET}
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={scorecardSnapshot} margin={{ top: 18, right: 14, bottom: 0, left: -14 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="entity"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
            />
            <YAxis
              domain={[75, 95]}
              ticks={[75, 80, 85, 90, 95]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              width={30}
            />
            <Tooltip
              cursor={{ fill: "transparent" }}
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number) => [num(v), "Skor KPI"]}
            />
            <ReferenceLine
              y={TARGET}
              stroke={PALETTE.navy}
              strokeDasharray="5 4"
              strokeWidth={1.2}
            />
            <Bar isAnimationActive={false} dataKey="score" radius={[4, 4, 0, 0]} barSize={30}>
              {scorecardSnapshot.map((s) => (
                <Cell
                  key={s.entity}
                  fill={s.score >= TARGET ? PALETTE.green : PALETTE.amber}
                  fillOpacity={dim(s.entity)}
                />
              ))}
              <LabelList
                dataKey="score"
                position="top"
                offset={5}
                style={{ fontSize: 8, fill: "var(--text-1)", fontWeight: 700 }}
                formatter={(v: number) => num(v)}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <ul className="mt-1 flex items-center justify-between gap-1">
        {scorecardSnapshot.map((s) => (
          <li
            key={s.entity}
            className="min-w-0 flex-1 text-center text-[9px] text-ink-500 transition-opacity"
            style={{ opacity: dim(s.entity) }}
          >
            {s.category}
          </li>
        ))}
      </ul>
    </div>
  );
}
