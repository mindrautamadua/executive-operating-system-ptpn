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
import { utilisasiByJenis } from "@/lib/pabrik-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { useSubholding } from "@/components/SubholdingProvider";
import { inScope } from "@/components/ui/CommodityScope";
import { SectionHead } from "../../hc/SectionHead";

// Jenis pabrik menentukan pemilik subholding: PKS (sawit) → PalmCo,
// PG (gula) → SugarCo, pabrik karet & teh → SupportingCo.
const data = utilisasiByJenis.map((u) => ({
  name: `${u.jenis} · ${u.unit}`,
  jenis: u.jenis,
  utilisasi: u.utilisasiPct,
  target: u.targetPct,
}));

const pct = (v: number) =>
  `${v.toLocaleString("id-ID", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%`;

export function UtilisasiByJenis() {
  const { active } = useSubholding();

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Utilisasi per Jenis Pabrik" action="Lihat Detail" href="/produksi-operasi/kinerja-pabrik/detail#utilisasi" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Utilisasi Kapasitas vs Target RKAP (%) · 36 PKS · 17 PG · 9 Karet · 5 Teh
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 14, right: 8, bottom: 0, left: -18 }} barCategoryGap="28%">
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="name"
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
            />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.08)" }}
              formatter={(v: number, name: string) => [
                pct(v),
                name === "utilisasi" ? "Utilisasi" : "Target RKAP",
              ]}
              contentStyle={CHART_TOOLTIP_STYLE}
            />
            {/* Grafik pembanding: batang di luar cakupan diredupkan, bukan dihapus,
                supaya posisi relatif antar jenis pabrik tetap terbaca. */}
            <Bar isAnimationActive={false} dataKey="utilisasi" fill={PALETTE.green} radius={[3, 3, 0, 0]}>
              {data.map((d) => (
                <Cell
                  key={d.name}
                  fill={PALETTE.green}
                  fillOpacity={inScope(active, d.jenis) ? 1 : 0.25}
                />
              ))}
              <LabelList
                dataKey="utilisasi"
                position="top"
                offset={4}
                formatter={(v: number) => pct(v)}
                style={{ fontSize: 8.5, fill: "var(--text-1)", fontWeight: 700 }}
              />
            </Bar>
            <Bar isAnimationActive={false} dataKey="target" fill={PALETTE.slate} fillOpacity={0.45} radius={[3, 3, 0, 0]}>
              {data.map((d) => (
                <Cell
                  key={d.name}
                  fill={PALETTE.slate}
                  fillOpacity={inScope(active, d.jenis) ? 0.45 : 0.11}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-1 truncate text-[9px] text-ink-500">
        PG: musim giling baru mulai Mei — utilisasi bulan pertama giling.
      </p>
    </div>
  );
}
