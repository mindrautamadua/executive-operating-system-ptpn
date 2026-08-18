"use client";

import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { hppTrend, hppTrendNote } from "@/lib/biaya-opex-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { useSubholding } from "@/components/SubholdingProvider";
import { inScope, ScopeEmpty } from "@/components/ui/CommodityScope";
import { SectionHead } from "../../hc/SectionHead";

// Jaws: band area = gap antara HPP dan harga jual (margin kas).
const data = hppTrend.map((p) => ({ ...p, band: [p.hppRpKg, p.hargaJualRpKg] }));

const rp = (v: number) => `Rp ${v.toLocaleString("id-ID")}`;

export function HppTrend() {
  const { active, def } = useSubholding();
  // HPP & harga jual di kartu ini keduanya CPO — milik PalmCo.
  const dalamCakupan = inScope(active, "HPP CPO (sawit)");

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="HPP vs Harga Jual (Jaws)" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        HPP CPO vs Harga Jual Realisasi 12 Bulan (Rp/kg) · area = margin kas
      </p>

      {!dalamCakupan ? (
        <ScopeEmpty label={def.fullLabel} />
      ) : (
        <>
      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 10, right: 10, bottom: 0, left: -8 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="bulan"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              interval={1}
            />
            <YAxis
              domain={[8000, 14000]}
              ticks={[8000, 10000, 12000, 14000]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => `${v / 1000}K`}
              width={34}
            />
            <Tooltip
              formatter={(v: number | [number, number], name: string) =>
                Array.isArray(v)
                  ? [`${rp(v[1] - v[0])}/kg`, "Margin Kas"]
                  : [`${rp(v)}/kg`, name === "hppRpKg" ? "HPP CPO" : "Harga Jual"]
              }
              contentStyle={CHART_TOOLTIP_STYLE}
            />
            <Area
              dataKey="band"
              stroke="none"
              fill={PALETTE.green}
              fillOpacity={0.1}
              isAnimationActive={false}
            />
            <Line
              type="linear"
              dataKey="hargaJualRpKg"
              stroke={PALETTE.green}
              strokeWidth={1.8}
              dot={{ r: 2, fill: PALETTE.green, strokeWidth: 0 }}
              activeDot={{ r: 4 }}
            />
            <Line
              type="linear"
              dataKey="hppRpKg"
              stroke={PALETTE.red}
              strokeWidth={1.8}
              dot={{ r: 2, fill: PALETTE.red, strokeWidth: 0 }}
              activeDot={{ r: 4 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-1 flex items-center gap-3">
        <span className="flex items-center gap-1.5 text-[9px] font-semibold text-ink-500">
          <span className="h-[3px] w-[14px] rounded-full" style={{ background: PALETTE.green }} />
          Harga Jual
        </span>
        <span className="flex items-center gap-1.5 text-[9px] font-semibold text-ink-500">
          <span className="h-[3px] w-[14px] rounded-full" style={{ background: PALETTE.red }} />
          HPP CPO
        </span>
        <span className="min-w-0 truncate text-[9px] text-ink-500">{hppTrendNote}</span>
      </div>
        </>
      )}
    </div>
  );
}
