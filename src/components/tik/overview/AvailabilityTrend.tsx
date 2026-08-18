"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { availabilityTrend } from "@/lib/tik-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const pct = (v: number) => `${v.toLocaleString("id-ID", { minimumFractionDigits: 1 })}%`;

/** Tren uptime layanan kritikal 12 bulan dengan garis target SLA 99,5%. */
export function AvailabilityTrend() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "90ms" } as React.CSSProperties}
    >
      <SectionHead title="Ketersediaan Sistem Kritikal" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Uptime Blended 12 Bulan (%) vs Target SLA Enterprise 99,5% · rata-rata 99,2%
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={availabilityTrend} margin={{ top: 12, right: 14, bottom: 0, left: -12 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="bulan"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              interval={0}
            />
            <YAxis
              domain={[98.5, 99.8]}
              ticks={[98.5, 98.9, 99.3, 99.7]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => pct(v)}
              width={44}
            />
            <Tooltip contentStyle={CHART_TOOLTIP_STYLE} formatter={(v: number) => [pct(v), "Uptime"]} />
            <ReferenceLine
              y={99.5}
              stroke={PALETTE.amber}
              strokeWidth={1.4}
              strokeDasharray="4 3"
              label={{
                value: "Target 99,5%",
                position: "insideTopRight",
                style: { fontSize: 8, fill: PALETTE.amber, fontWeight: 700 },
              }}
            />
            <Line
              name="Uptime"
              type="monotone"
              dataKey="uptimePct"
              stroke={PALETTE.green}
              strokeWidth={1.9}
              dot={{ r: 2.4 }}
              activeDot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <p className="pb-1 text-[9px] leading-snug text-ink-500">
        Tidak ada satu bulan pun mencapai target sejak Jul 2025; titik terendah Mar 2026 (98,8%)
        bertepatan dengan gangguan data center dan jendela patching tertunda.
      </p>
    </div>
  );
}
