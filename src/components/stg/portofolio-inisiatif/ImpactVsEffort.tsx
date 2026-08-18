"use client";

import {
  CartesianGrid,
  Cell,
  ReferenceLine,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { impactEffort } from "@/lib/spi-data";
import { STATUS_COLOR, initiatives } from "@/lib/stg-core";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";
import { filterBySubholding } from "@/lib/subholding";

/** Pemilik tiap inisiatif — dimensi subholding titik ini (register stg-core). */
const OWNER_BY_NAME = new Map(initiatives.map((i) => [i.name, i.owner as string]));

const EFFORT_TENGAH_RP_T = 0.8;
const IMPACT_TENGAH_RP_T = 0.45;

const rp = (v: number) =>
  `Rp ${v.toLocaleString("id-ID", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} T`;

/** Kuadran dampak (uplift 2029) × effort (investasi) untuk 28 inisiatif. */
export function ImpactVsEffort() {
  const { active } = useSubholding();
  const points = filterBySubholding(impactEffort, active, (p) => OWNER_BY_NAME.get(p.name));

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "180ms" } as React.CSSProperties}
    >
      <SectionHead title="Impact vs Effort" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Dampak EBITDA 2029 (Rp T) × Kebutuhan Investasi (Rp T) · {points.length} Inisiatif
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 12, right: 14, bottom: 0, left: -18 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} />
            <XAxis
              type="number"
              dataKey="effortRpT"
              domain={[0, 3.4]}
              ticks={[0, 0.8, 1.6, 2.4, 3.2]}
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => v.toLocaleString("id-ID")}
            />
            <YAxis
              type="number"
              dataKey="impactRpT"
              domain={[0.15, 0.85]}
              ticks={[0.2, 0.4, 0.6, 0.8]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => v.toLocaleString("id-ID")}
              width={34}
            />
            <ReferenceLine
              x={EFFORT_TENGAH_RP_T}
              stroke={PALETTE.slate}
              strokeDasharray="5 4"
              strokeWidth={1.2}
            />
            <ReferenceLine
              y={IMPACT_TENGAH_RP_T}
              stroke={PALETTE.navy}
              strokeDasharray="5 4"
              strokeWidth={1.2}
            />
            <Tooltip
              cursor={{ strokeDasharray: "3 3" }}
              contentStyle={CHART_TOOLTIP_STYLE}
              labelFormatter={() => ""}
              formatter={(v: number, name: string) => [
                rp(v),
                name === "effortRpT" ? "Investasi" : "Dampak 2029",
              ]}
            />
            <Scatter data={points} shape="circle">
              {points.map((p) => (
                <Cell key={p.name} fill={STATUS_COLOR[p.status]} fillOpacity={0.8} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-1 truncate text-[9px] text-ink-500">
        Kiri-atas = dampak tinggi &amp; effort rendah (quick win); kanan-bawah perlu uji ulang
        prioritas.
      </p>
    </div>
  );
}
