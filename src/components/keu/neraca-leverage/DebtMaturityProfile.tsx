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
import { debtMaturity, debtMaturityNote } from "@/lib/knl-data";
import { fmtId } from "@/lib/keu-core";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "../../hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

/** Profil jatuh tempo pokok utang 2026-2031; puncak 2027 disorot. */
export function DebtMaturityProfile() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Debt Maturity Profile" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Pokok Jatuh Tempo per Tahun · Rp T · total Rp 28,4 T
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={debtMaturity} margin={{ top: 16, right: 4, bottom: 0, left: -20 }} barCategoryGap="28%">
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="year"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              interval={0}
            />
            <YAxis
              domain={[0, 10]}
              ticks={[0, 2.5, 5, 7.5, 10]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => fmtId(v, 1)}
              width={36}
            />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.08)" }}
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, _n: string, item: { payload?: { peak?: boolean } }) => [
                `Rp ${fmtId(v, 1)} T${item.payload?.peak ? " · puncak refinancing" : ""}`,
                "Pokok Jatuh Tempo",
              ]}
            />
            <Bar dataKey="value" radius={[3, 3, 0, 0]} maxBarSize={30}>
              {debtMaturity.map((d) => (
                <Cell key={d.year} fill={d.peak ? PALETTE.red : PALETTE.blue} />
              ))}
              <LabelList
                dataKey="value"
                position="top"
                offset={4}
                formatter={(v: number) => fmtId(v, 1)}
                style={{ fontSize: 7.5, fill: "#334155", fontWeight: 700 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-1 truncate text-[8px] leading-snug text-ink-500" title={debtMaturityNote}>
        {debtMaturityNote}
      </p>
    </div>
  );
}
