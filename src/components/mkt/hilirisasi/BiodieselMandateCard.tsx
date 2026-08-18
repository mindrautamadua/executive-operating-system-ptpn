"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { biodieselMandate, biodieselSummary } from "@/lib/hilir-stok-margin-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { useSubholding } from "@/components/SubholdingProvider";
import { inScope, ScopeEmpty } from "@/components/ui/CommodityScope";
import { SectionHead } from "../../hc/SectionHead";

const num = (v: number) =>
  v.toLocaleString("id-ID", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

export function BiodieselMandateCard() {
  const { active, def } = useSubholding();
  // Mandat B40 disalurkan lewat FAME berbasis CPO — seluruhnya domain PalmCo.
  const luarCakupan = !inScope(active, "biodiesel FAME");

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "180ms" } as React.CSSProperties}
    >
      <div className="flex items-center justify-between gap-2">
        <SectionHead title="Mandat Biodiesel B40" className="min-w-0 flex-1" />
        <span className="shrink-0 rounded-md bg-[#fdf3e0] px-1.5 py-[2px] text-[9px] font-extrabold text-[#d98b06]">
          Serapan {num(biodieselSummary.serapanPct)}%
        </span>
      </div>
      <p className="mt-[3px] text-[9px] text-ink-500">
        Alokasi vs Realisasi FAME Bulanan (rb kL) · alokasi FY {biodieselSummary.alokasiFyRbKl} rb
        kL
      </p>

      {luarCakupan ? (
        <ScopeEmpty label={def.fullLabel} />
      ) : (
      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={biodieselMandate} margin={{ top: 8, right: 8, bottom: 0, left: -26 }} barCategoryGap="28%">
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="bulan"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
            />
            <YAxis
              domain={[0, 10]}
              ticks={[0, 2.5, 5, 7.5, 10]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
            />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.08)" }}
              formatter={(v: number, name: string) => [
                `${num(v)} rb kL`,
                name === "alokasi" ? "Alokasi" : "Realisasi",
              ]}
              contentStyle={CHART_TOOLTIP_STYLE}
            />
            <Bar dataKey="alokasi" fill={PALETTE.slate} radius={[2, 2, 0, 0]} maxBarSize={16} />
            <Bar dataKey="realisasi" fill={PALETTE.green} radius={[2, 2, 0, 0]} maxBarSize={16} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      )}

      <div className="mt-1 flex items-center gap-3">
        <span className="flex items-center gap-1.5 text-[9px] font-semibold text-ink-500">
          <span className="h-[7px] w-[7px] rounded-sm" style={{ background: PALETTE.slate }} />
          Alokasi
        </span>
        <span className="flex items-center gap-1.5 text-[9px] font-semibold text-ink-500">
          <span className="h-[7px] w-[7px] rounded-sm" style={{ background: PALETTE.green }} />
          Realisasi
        </span>
        <span className="min-w-0 truncate text-[9px] text-ink-500" title={biodieselSummary.catatan}>
          {biodieselSummary.catatan}
        </span>
      </div>
    </div>
  );
}
