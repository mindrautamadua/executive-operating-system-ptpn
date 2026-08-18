"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CURAH_HUJAN_ANOMALI_PCT, curahHujanBulanan, ensoIndex } from "@/lib/agro-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

/**
 * Curah hujan & ENSO adalah paparan iklim lintas komoditas (sawit, tebu, karet,
 * teh) — angkanya konsolidasi grup dan tidak ikut filter subholding.
 */
export function CurahHujanElNino() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <div className="flex items-center justify-between gap-2">
        <SectionHead
          title="Curah Hujan & Sinyal El Nino"
          className="flex-1"
          action="Lihat Detail"
          badge={<ScopeNote />}
        />
      </div>
      <p className="mt-[3px] text-[9px] text-ink-500">
        Aktual vs Normal Klimatologis 12 Bulan (mm) · Anomali{" "}
        <span className="font-bold text-[#ef4444]">{CURAH_HUJAN_ANOMALI_PCT}%</span>
      </p>

      <div className="mt-1.5 grid min-h-0 flex-1 grid-cols-[minmax(0,62fr)_minmax(0,38fr)] gap-3">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={curahHujanBulanan} margin={{ top: 8, right: 6, bottom: 0, left: -18 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="bulan"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              interval={1}
            />
            <YAxis
              domain={[100, 300]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              width={34}
            />
            <Tooltip
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, name: string) => [`${v} mm`, name]}
            />
            <Line
              type="monotone"
              dataKey="normalMm"
              name="Normal 30 Thn"
              stroke={PALETTE.slate}
              strokeWidth={1.4}
              strokeDasharray="4 3"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="aktualMm"
              name="Aktual"
              stroke={PALETTE.blue}
              strokeWidth={1.8}
              dot={{ r: 2, fill: PALETTE.blue }}
              activeDot={{ r: 3.5 }}
            />
          </LineChart>
        </ResponsiveContainer>

        <div className="flex min-h-0 flex-col">
          <div className="flex items-center justify-between">
            <span className="text-[8.5px] font-bold text-ink-700">Indeks ONI (ENSO)</span>
            <span className="rounded bg-[#fdecec] px-1.5 py-[2px] text-[7.5px] font-extrabold text-[#ef4444]">
              Ambang El Nino +1,0
            </span>
          </div>
          <div className="mt-1 min-h-0 w-full flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ensoIndex} margin={{ top: 6, right: 2, bottom: 0, left: -24 }}>
                <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
                <XAxis
                  dataKey="periode"
                  tickLine={false}
                  axisLine={{ stroke: CHART_AXIS.axis }}
                  tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
                  interval={0}
                />
                <YAxis
                  domain={[-0.5, 2]}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
                  width={30}
                />
                <Tooltip
                  contentStyle={CHART_TOOLTIP_STYLE}
                  formatter={(v: number) => [v.toLocaleString("id-ID"), "ONI"]}
                  labelFormatter={(label: string) => {
                    const p = ensoIndex.find((e) => e.periode === label);
                    return p?.proyeksi ? `${label} (proyeksi)` : label;
                  }}
                />
                <ReferenceLine y={1.0} stroke={PALETTE.red} strokeDasharray="4 3" />
                <Bar dataKey="oni" barSize={12} radius={[2, 2, 0, 0]}>
                  {ensoIndex.map((e) => (
                    <Cell
                      key={e.periode}
                      fill={e.proyeksi ? PALETTE.amber : PALETTE.teal}
                      fillOpacity={e.proyeksi ? 0.75 : 1}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="pb-1 text-[7.5px] leading-snug text-ink-400">
            ONI Apr 1,1 — proyeksi Sep 1,5 (kuning = proyeksi BMKG/NOAA).
          </p>
        </div>
      </div>
    </div>
  );
}
