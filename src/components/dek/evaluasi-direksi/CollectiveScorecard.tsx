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
import { collectiveScorecard } from "@/lib/dek-data-detail";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const DATA = collectiveScorecard.map((p) => ({
  name: p.perspektif,
  skor: p.skor,
  bobot: p.bobot,
  color: p.color,
}));

/** Skor 4 perspektif scorecard + skor kolektif Direksi 87,4. */
export function CollectiveScorecard() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <SectionHead title="Scorecard Kolektif Direksi" badge={<ScopeNote />} />
          <p className="mt-[3px] text-[9px] text-ink-500">
            Bobot 35/30/15/20% · Ambang Kategori Baik 80
          </p>
        </div>
        <div className="shrink-0 rounded-lg bg-ptpn-greenLight px-2.5 py-1 text-right">
          <div className="text-[7.5px] font-extrabold uppercase tracking-[0.05em] text-ptpn-green">
            Skor Kolektif
          </div>
          <div className="text-[15px] font-extrabold leading-none tabular-nums text-ptpn-green">
            87,4
            <span className="ml-[2px] text-[9px] font-bold">/100</span>
          </div>
        </div>
      </div>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={DATA}
            margin={{ top: 18, right: 8, bottom: 4, left: -14 }}
            barCategoryGap="28%"
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
              domain={[70, 100]}
              ticks={[70, 80, 85, 90, 100]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              width={38}
            />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.08)" }}
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, _n: string, item: { payload?: { bobot?: number } }) => [
                `${v.toLocaleString("id-ID")} · bobot ${item.payload?.bobot ?? 0}%`,
                "Skor",
              ]}
            />
            <ReferenceLine y={80} stroke={PALETTE.red} strokeDasharray="3 3" strokeWidth={1.2} />
            <Bar isAnimationActive={false} dataKey="skor" radius={[3, 3, 0, 0]} maxBarSize={42}>
              {DATA.map((d) => (
                <Cell key={d.name} fill={d.color} />
              ))}
              <LabelList
                dataKey="skor"
                position="top"
                offset={5}
                style={{ fontSize: 8, fill: "#334155", fontWeight: 700 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
