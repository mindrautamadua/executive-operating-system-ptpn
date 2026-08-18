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
import { bySubholding } from "@/lib/svc-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";
import { toSubholdingId } from "@/lib/subholding";

const fmt = (v: number) =>
  v.toLocaleString("id-ID", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const SERIES = [
  { key: "efisiensi", label: "Efisiensi Biaya", color: PALETTE.green },
  { key: "yieldRendemen", label: "Yield & Rendemen", color: PALETTE.teal },
  { key: "hilirisasi", label: "Hilirisasi", color: PALETTE.blue },
  { key: "aset", label: "Optimalisasi Aset", color: PALETTE.amber },
  { key: "digital", label: "Digital", color: PALETTE.purple },
] as const;

const LABELS: Record<string, string> = Object.fromEntries(SERIES.map((s) => [s.key, s.label]));

// `entity` (PalmCo / SGN / PTPN I / Holding) adalah dimensi subholding batang ini.
const DATA = bySubholding.map((r) => ({ ...r, sub: toSubholdingId(r.entity) }));

/** Realisasi nilai per subholding, ditumpuk per pengungkit. */
export function ValueBySubholding() {
  const { active, isFiltered } = useSubholding();
  // Grafik pembanding: batang non-aktif diredupkan agar kontribusi antar entitas
  // tetap terbaca; batang "Holding" ikut diredupkan saat filter aktif.
  const dim = (sub: ReturnType<typeof toSubholdingId>) =>
    !isFiltered || sub === active ? 1 : 0.25;

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <SectionHead title="Nilai per Subholding" />
          <p className="mt-[3px] text-[9px] text-ink-500">
            Realisasi YTD per Entitas &amp; Pengungkit · Rp T
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap items-center justify-end gap-x-2 gap-y-1">
          {SERIES.map((s) => (
            <span key={s.key} className="flex items-center gap-1">
              <span
                className="h-[7px] w-[7px] shrink-0 rounded-[2px]"
                style={{ backgroundColor: s.color }}
              />
              <span className="text-[7.5px] font-semibold text-ink-500">{s.label}</span>
            </span>
          ))}
        </div>
      </div>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={DATA}
            margin={{ top: 16, right: 6, bottom: 4, left: -18 }}
            barCategoryGap="30%"
          >
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="entity"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              interval={0}
            />
            <YAxis
              domain={[0, 1.2]}
              ticks={[0, 0.3, 0.6, 0.9, 1.2]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => `${fmt(v)} T`}
              width={44}
            />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.08)" }}
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, n: string) => [`Rp ${fmt(v)} T`, LABELS[n] ?? n]}
            />
            {SERIES.map((s, i) => (
              <Bar
                key={s.key}
                dataKey={s.key}
                stackId="val"
                fill={s.color}
                maxBarSize={44}
                radius={i === SERIES.length - 1 ? [3, 3, 0, 0] : undefined}
              >
                {DATA.map((d) => (
                  <Cell key={d.entity} fillOpacity={dim(d.sub)} />
                ))}
                {i === SERIES.length - 1 && (
                  <LabelList
                    dataKey="totalRpT"
                    position="top"
                    offset={5}
                    formatter={(v: number) => fmt(v)}
                    style={{ fontSize: 8.5, fill: "#334155", fontWeight: 700 }}
                  />
                )}
              </Bar>
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
