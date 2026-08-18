"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { payablesMaturity } from "@/lib/kas-data";
import { fmtId } from "@/lib/keu-core";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "../../hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

/** Jadwal jatuh tempo utang usaha & akrual Rp 4,1 T. */
export function PayablesMaturity() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "300ms" } as React.CSSProperties}
    >
      <SectionHead title="Payables Maturity" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Utang Usaha &amp; Akrual Rp 4,1 T per Jatuh Tempo
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={payablesMaturity} margin={{ top: 16, right: 4, bottom: 0, left: -18 }} barCategoryGap="30%">
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="bucket"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              interval={0}
            />
            <YAxis
              domain={[0, 2]}
              ticks={[0, 0.5, 1, 1.5, 2]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => fmtId(v, 1)}
              width={34}
            />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.08)" }}
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, _n: string, item: { payload?: { keterangan: string } }) => [
                `Rp ${fmtId(v, 1)} T — ${item.payload?.keterangan}`,
                "Jatuh Tempo",
              ]}
            />
            <Bar dataKey="valueRpT" fill={PALETTE.blue} radius={[3, 3, 0, 0]} maxBarSize={30}>
              <LabelList
                dataKey="valueRpT"
                position="top"
                offset={4}
                formatter={(v: number) => fmtId(v, 1)}
                style={{ fontSize: 8.5, fill: "#334155", fontWeight: 700 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
