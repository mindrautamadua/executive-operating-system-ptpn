"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { waterTrend } from "@/lib/esg-data-detail";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";
import type { SubholdingId } from "@/lib/subholding";

const num = (v: number) => v.toLocaleString("id-ID", { minimumFractionDigits: 2 });

/** Tren intensitas air per subholding (satuan berbeda — bandingkan arah tren). */
export function WaterIntensityTrend() {
  const { active, isFiltered, def } = useSubholding();
  // Kunci seri = dimensi subholding: palmco (sawit/TBS), sgn (tebu/gula),
  // supporting (karet & teh). Seri non-aktif diredupkan agar tren pembanding
  // antar komoditas tetap terlihat.
  const dim = (key: SubholdingId) => (!isFiltered || key === active ? 1 : 0.25);

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Tren Intensitas Air" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {isFiltered
          ? `Tren ${def.label} disorot · m³ per Ton Produk Utama (makin rendah makin baik)`
          : "m³ per Ton Produk Utama · 2022–2026 (makin rendah makin baik)"}
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={waterTrend} margin={{ top: 10, right: 12, bottom: 0, left: -12 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="year"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
            />
            <YAxis
              domain={[0.8, 1.5]}
              ticks={[0.8, 1.0, 1.2, 1.4]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => num(v)}
              width={36}
            />
            <Tooltip formatter={(v: number) => num(v)} contentStyle={CHART_TOOLTIP_STYLE} />
            <Legend
              verticalAlign="top"
              align="right"
              height={16}
              iconType="circle"
              iconSize={7}
              wrapperStyle={{ fontSize: 8.5, color: CHART_AXIS.tick }}
            />
            <Line isAnimationActive={false}
              type="linear"
              dataKey="palmco"
              name="PalmCo (m³/ton TBS)"
              stroke={PALETTE.green}
              strokeOpacity={dim("palmco")}
              strokeWidth={1.8}
              dot={{ r: 2 }}
              activeDot={{ r: 4 }}
            />
            <Line isAnimationActive={false}
              type="linear"
              dataKey="sgn"
              name="SGN (m³/ton tebu)"
              stroke={PALETTE.amber}
              strokeOpacity={dim("sugarco")}
              strokeWidth={1.8}
              dot={{ r: 2 }}
              activeDot={{ r: 4 }}
            />
            <Line isAnimationActive={false}
              type="linear"
              dataKey="supporting"
              name="SupportingCo"
              stroke={PALETTE.blue}
              strokeOpacity={dim("supportingco")}
              strokeWidth={1.8}
              dot={{ r: 2 }}
              activeDot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
