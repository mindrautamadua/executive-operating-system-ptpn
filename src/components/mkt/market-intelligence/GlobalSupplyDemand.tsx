"use client";

import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { globalSupplyDemand, globalSupplyDemandNote } from "@/lib/hilir-stok-margin-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { useSubholding } from "@/components/SubholdingProvider";
import { inScope, ScopeEmpty } from "@/components/ui/CommodityScope";
import { SectionHead } from "../../hc/SectionHead";

const num = (v: number) =>
  v.toLocaleString("id-ID", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

const NAMES: Record<string, string> = {
  produksi: "Produksi",
  konsumsi: "Konsumsi",
  stokAkhir: "Stok Akhir",
};

/** Supply-demand minyak sawit global + stok akhir pelaporan utama. */
export function GlobalSupplyDemand() {
  const { active, def } = useSubholding();
  // Neraca ini khusus minyak sawit global → hanya relevan bagi PalmCo.
  const luarCakupan = !inScope(active, "sawit");

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "180ms" } as React.CSSProperties}
    >
      <SectionHead title="Global Supply-Demand Sawit" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Produksi vs Konsumsi Global (jt ton) &amp; Stok Akhir Pelaporan Utama
      </p>

      {luarCakupan ? (
        <ScopeEmpty label={def.fullLabel} />
      ) : (
      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={globalSupplyDemand} margin={{ top: 8, right: -8, bottom: 0, left: -22 }} barCategoryGap="30%">
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="periode"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
            />
            <YAxis
              yAxisId="vol"
              domain={[76, 82]}
              ticks={[76, 78, 80, 82]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
            />
            <YAxis
              yAxisId="stok"
              orientation="right"
              domain={[3, 6]}
              ticks={[3, 4, 5, 6]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
            />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.08)" }}
              formatter={(v: number, name: string) => [`${num(v)} jt ton`, NAMES[name] ?? name]}
              contentStyle={CHART_TOOLTIP_STYLE}
            />
            <Bar yAxisId="vol" dataKey="produksi" fill={PALETTE.blueSoft} radius={[2, 2, 0, 0]} maxBarSize={22} />
            <Bar yAxisId="vol" dataKey="konsumsi" fill={PALETTE.green} radius={[2, 2, 0, 0]} maxBarSize={22} />
            <Line
              yAxisId="stok"
              type="linear"
              dataKey="stokAkhir"
              stroke={PALETTE.amber}
              strokeWidth={2}
              dot={{ r: 3, strokeWidth: 0, fill: PALETTE.amber }}
              activeDot={{ r: 4 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      )}

      <div className="mt-1 flex items-center gap-3">
        <span className="flex items-center gap-1.5 text-[9px] font-semibold text-ink-500">
          <span className="h-[7px] w-[7px] rounded-sm" style={{ background: PALETTE.blueSoft }} />
          Produksi
        </span>
        <span className="flex items-center gap-1.5 text-[9px] font-semibold text-ink-500">
          <span className="h-[7px] w-[7px] rounded-sm" style={{ background: PALETTE.green }} />
          Konsumsi
        </span>
        <span className="flex items-center gap-1.5 text-[9px] font-semibold text-ink-500">
          <span className="h-[3px] w-[14px] rounded-full" style={{ background: PALETTE.amber }} />
          Stok Akhir (kanan)
        </span>
      </div>
      <p className="mt-1 truncate text-[9px] text-ink-500" title={globalSupplyDemandNote}>
        {globalSupplyDemandNote}
      </p>
    </div>
  );
}
