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
import { incidentByActivity } from "@/lib/hse-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";
import type { SubholdingId } from "@/lib/subholding";

const pct = (v: number) => `${v.toLocaleString("id-ID", { minimumFractionDigits: 1 })}%`;

/**
 * Pemetaan aktivitas kerja ke subholding pemiliknya: "Panen & Angkut TBS" adalah
 * rantai kerja kebun sawit, jadi seluruhnya milik PalmCo (PTPN IV). Aktivitas
 * lain (pengolahan pabrik, pemeliharaan, bengkel, transportasi) berlangsung di
 * semua subholding sehingga tidak dipetakan ke satu cakupan.
 */
const AKTIVITAS_SUBHOLDING: Record<string, SubholdingId | null> = {
  "Panen & Angkut TBS": "palmco",
};

/** Distribusi kecelakaan YTD per aktivitas kerja; panen & angkut TBS terbesar. */
export function IncidentByActivity() {
  const { active, isFiltered, def } = useSubholding();
  const dim = (aktivitas: string) => {
    if (!isFiltered) return 0.85;
    const id = AKTIVITAS_SUBHOLDING[aktivitas] ?? null;
    return id === null || id === active ? 0.85 : 0.25;
  };

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Insiden per Aktivitas Kerja" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {isFiltered ? (
          <>84 Kecelakaan YTD 2026 · aktivitas di luar {def.label} diredupkan</>
        ) : (
          <>84 Kecelakaan YTD 2026 · panen &amp; angkut TBS mendominasi 36,9%</>
        )}
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={incidentByActivity}
            layout="vertical"
            margin={{ top: 4, right: 20, bottom: 0, left: 4 }}
            barCategoryGap="24%"
          >
            <CartesianGrid stroke={CHART_AXIS.grid} horizontal={false} />
            <XAxis
              type="number"
              domain={[0, 32]}
              ticks={[0, 8, 16, 24, 32]}
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
            />
            <YAxis
              type="category"
              dataKey="aktivitas"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              width={124}
              interval={0}
            />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.08)" }}
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, _n: string, item) => {
                const r = item.payload as (typeof incidentByActivity)[number];
                return [
                  `${v} kasus · ${pct(r.pct)} · ${r.beratFatal} berat/fatal`,
                  r.aktivitas,
                ];
              }}
            />
            <Bar dataKey="jumlah" radius={[0, 3, 3, 0]} barSize={14}>
              {incidentByActivity.map((r) => (
                <Cell key={r.aktivitas} fill={r.color} fillOpacity={dim(r.aktivitas)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="pb-1 text-[9px] leading-snug text-ink-500">
        Rantai panen–angkut menyumbang 31 kasus sekaligus 5 dari 10 kasus berat/fatal — konsentrasi
        risiko tertinggi grup pada satu rantai aktivitas.
      </p>
    </div>
  );
}
