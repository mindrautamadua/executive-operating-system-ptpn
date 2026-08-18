"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { claimHistory } from "@/lib/risk-data-detail";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

export function ClaimHistory() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Riwayat Klaim & Premi" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">Klaim vs Premi 3 Tahun (Rp Miliar)</p>

      <div className="mt-1 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={claimHistory} margin={{ top: 18, right: 8, bottom: 0, left: -18 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="tahun"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              width={34}
            />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.10)" }}
              formatter={(v: number) => [`Rp ${v} M`, ""]}
              contentStyle={CHART_TOOLTIP_STYLE}
            />
            <Legend
              verticalAlign="top"
              align="right"
              height={16}
              iconSize={7}
              wrapperStyle={{ fontSize: 8, color: CHART_AXIS.tick }}
            />
            <Bar dataKey="premiRpM" name="Premi" fill={PALETTE.blue} radius={[4, 4, 0, 0]} barSize={20} />
            <Bar dataKey="klaimRpM" name="Klaim" fill={PALETTE.amber} radius={[4, 4, 0, 0]} barSize={20}>
              <LabelList
                dataKey="lossRatioPct"
                position="top"
                formatter={(v: React.ReactNode) => `LR ${String(v)}%`}
                style={{ fontSize: 8.5, fill: "#334155", fontWeight: 700 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-1 rounded-md bg-[#f8fafc] px-2 py-[5px] text-[9px] leading-[1.4] text-ink-500">
        Loss ratio turun 48% → 41% lalu stabil 42% YTD — posisi tawar sehat menghadapi hard market.
      </p>
    </div>
  );
}
