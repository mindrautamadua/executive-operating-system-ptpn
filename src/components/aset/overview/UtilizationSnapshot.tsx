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
import { utilizationSnapshot } from "@/lib/ast-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";
import { toSubholdingId } from "@/lib/subholding";

const num = (v: number) =>
  v.toLocaleString("id-ID", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

/**
 * Pemetaan domain: PKS & refinery/hilir sawit milik PalmCo; PG (gula) milik
 * SugarCo; pabrik karet & teh milik SupportingCo (PTPN I).
 */
const FASILITAS_SUBHOLDING: Record<string, string> = {
  "PKS (36 unit)": "PalmCo",
  "PG (17 unit)": "SGN",
  "Refinery & Hilir (4 unit)": "PalmCo",
  "Pabrik Karet (9 unit)": "PTPN I",
  "Pabrik Teh (5 unit)": "PTPN I",
};

const data = utilizationSnapshot.map((u) => ({
  ...u,
  short: u.fasilitas.replace(/ \(.*\)/, ""),
}));

/** Utilisasi fasilitas olah (PKS, PG, refinery, karet, teh) vs target. */
export function UtilizationSnapshot() {
  const { active, isFiltered, def } = useSubholding();
  // Grafik pembanding lintas jenis pabrik: batang di luar cakupan diredupkan.
  const dim = (fasilitas: string) =>
    !isFiltered || toSubholdingId(FASILITAS_SUBHOLDING[fasilitas]) === active ? 1 : 0.25;

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "150ms" } as React.CSSProperties}
    >
      <SectionHead title="Utilization Snapshot" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {isFiltered
          ? `Utilisasi Kapasitas Terpasang — fasilitas ${def.label} disorot (%) vs Target RKAP`
          : "Utilisasi Kapasitas Terpasang per Jenis Fasilitas (%) vs Target RKAP"}
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 16, right: 8, bottom: 0, left: -16 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="short"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              interval={0}
            />
            <YAxis
              domain={[0, 100]}
              ticks={[0, 25, 50, 75, 100]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => `${v}%`}
              width={34}
            />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.08)" }}
              formatter={(v: number, name: string) => [`${num(v)}%`, name]}
              contentStyle={CHART_TOOLTIP_STYLE}
            />
            <Bar isAnimationActive={false} name="Utilisasi" dataKey="utilisasiPct" barSize={30} radius={[3, 3, 0, 0]}>
              {data.map((d) => (
                <Cell
                  key={d.fasilitas}
                  fill={d.utilisasiPct >= d.targetPct ? PALETTE.green : PALETTE.amber}
                  fillOpacity={0.9 * dim(d.fasilitas)}
                />
              ))}
              <LabelList
                dataKey="utilisasiPct"
                position="top"
                offset={4}
                formatter={(v: number) => `${num(v)}%`}
                style={{ fontSize: 8.5, fill: "var(--text-1)", fontWeight: 700 }}
              />
            </Bar>
            <Bar isAnimationActive={false} name="Target" dataKey="targetPct" barSize={30} radius={[3, 3, 0, 0]} fill={PALETTE.slate}>
              {data.map((d) => (
                <Cell key={d.fasilitas} fillOpacity={0.28 * dim(d.fasilitas)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-1 truncate text-[9px] text-ink-500">
        Seluruh jenis fasilitas berada di bawah target; gap terbesar pada PG (-13,8 ppt) dan karet
        (-10,2 ppt).
      </p>
    </div>
  );
}
