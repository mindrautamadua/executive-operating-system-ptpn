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
import { DOWNTIME_TOTAL_JAM, downtimeByCause, downtimeNote } from "@/lib/afs-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";
import { toSubholdingId } from "@/lib/subholding";

const ribuan = (v: number) => v.toLocaleString("id-ID");

/**
 * Pemetaan domain: PKS (sawit) milik PalmCo, PG (gula) milik SugarCo,
 * pabrik karet & teh milik SupportingCo (PTPN I).
 */
const JENIS_SUBHOLDING: Record<string, string> = {
  "PKS (36 unit)": "PalmCo",
  "PG (17 unit)": "SGN",
  "Pabrik Karet (9 unit)": "PTPN I",
  "Pabrik Teh (5 unit)": "PTPN I",
};

const SERIES = [
  { key: "mekanikalJam", label: "Mekanikal", color: PALETTE.red },
  { key: "pasokanJam", label: "Pasokan", color: PALETTE.amber },
  { key: "boilerJam", label: "Boiler", color: PALETTE.purple },
  { key: "listrikJam", label: "Listrik", color: PALETTE.blue },
  { key: "lainnyaJam", label: "Lainnya", color: PALETTE.slate },
] as const;

const data = downtimeByCause.map((d) => ({
  ...d,
  short: d.jenis.replace(/ \(.*\)/, ""),
}));

/** Downtime YTD per jenis pabrik, di-stack menurut penyebab (jam). */
export function DowntimeAnalysis() {
  const { active, isFiltered } = useSubholding();
  const dim = (jenis: string) =>
    !isFiltered || toSubholdingId(JENIS_SUBHOLDING[jenis]) === active ? 1 : 0.25;

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "150ms" } as React.CSSProperties}
    >
      <SectionHead title="Analisis Downtime" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Jam Downtime YTD per Jenis Pabrik &amp; Penyebab · total {ribuan(DOWNTIME_TOTAL_JAM)} jam
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 6, bottom: 0, left: -10 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="short"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              interval={0}
            />
            <YAxis
              domain={[0, 7000]}
              ticks={[0, 1750, 3500, 5250, 7000]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => ribuan(v)}
              width={40}
            />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.08)" }}
              formatter={(v: number, name: string) => [`${ribuan(v)} jam`, name]}
              contentStyle={CHART_TOOLTIP_STYLE}
            />
            {SERIES.map((s, i) => (
              <Bar isAnimationActive={false}
                key={s.key}
                name={s.label}
                dataKey={s.key}
                stackId="dt"
                fill={s.color}
                barSize={40}
                radius={i === SERIES.length - 1 ? [2, 2, 0, 0] : undefined}
              >
                {data.map((d) => (
                  <Cell key={d.jenis} fillOpacity={dim(d.jenis)} />
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

      <p className="line-clamp-2 text-[9px] leading-snug text-ink-500">{downtimeNote}</p>
    </div>
  );
}
