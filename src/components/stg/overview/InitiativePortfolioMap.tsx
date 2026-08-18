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
  ZAxis,
} from "recharts";
import { STATUS_COLOR, initiatives } from "@/lib/stg-core";
import { portfolioBubbles } from "@/lib/stg-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";
import { filterBySubholding } from "@/lib/subholding";

/** Pemilik tiap inisiatif — dimensi subholding bubble (register stg-core). */
const OWNER_BY_NAME = new Map(initiatives.map((i) => [i.name, i.owner as string]));

const rp = (v: number) =>
  `Rp ${v.toLocaleString("id-ID", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} T`;

const LEGEND = [
  { label: "On Track", color: STATUS_COLOR["On Track"] },
  { label: "At Risk", color: STATUS_COLOR["At Risk"] },
  { label: "Off Track", color: STATUS_COLOR["Off Track"] },
];

/** Peta portofolio 28 inisiatif: progres × dampak, ukuran bubble = investasi. */
export function InitiativePortfolioMap() {
  const { active } = useSubholding();
  const bubbles = filterBySubholding(portfolioBubbles, active, (b) => OWNER_BY_NAME.get(b.name));

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Initiative Portfolio Map" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Dampak (EBITDA Uplift 2029) × Progres Fisik · Ukuran = Kebutuhan Investasi ·{" "}
        {bubbles.length} Inisiatif
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 12, right: 14, bottom: 0, left: -18 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} />
            <XAxis
              type="number"
              dataKey="progress"
              domain={[15, 85]}
              ticks={[20, 35, 50, 65, 80]}
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => `${v}%`}
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
            <ZAxis type="number" dataKey="investRpT" range={[26, 320]} />
            <ReferenceLine x={50} stroke={PALETTE.slate} strokeDasharray="5 4" strokeWidth={1.2} />
            <ReferenceLine y={0.45} stroke={PALETTE.navy} strokeDasharray="5 4" strokeWidth={1.2} />
            <Tooltip
              cursor={{ strokeDasharray: "3 3" }}
              contentStyle={CHART_TOOLTIP_STYLE}
              labelFormatter={() => ""}
              formatter={(v: number, name: string) => {
                if (name === "progress") return [`${v}%`, "Progres"];
                if (name === "impactRpT") return [rp(v), "Dampak 2029"];
                return [rp(v), "Investasi"];
              }}
            />
            <Scatter data={bubbles} shape="circle">
              {bubbles.map((b) => (
                <Cell key={b.name} fill={STATUS_COLOR[b.status]} fillOpacity={0.55} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-1 flex items-center justify-center gap-3 text-[9px] text-ink-500">
        {LEGEND.map((l) => (
          <span key={l.label} className="flex items-center gap-1">
            <span
              className="h-[7px] w-[7px] rounded-full"
              style={{ backgroundColor: l.color, opacity: 0.75 }}
            />
            {l.label}
          </span>
        ))}
        <span className="text-ink-400">Kuadran kiri-atas = dampak tinggi, progres tertinggal</span>
      </div>
    </div>
  );
}
