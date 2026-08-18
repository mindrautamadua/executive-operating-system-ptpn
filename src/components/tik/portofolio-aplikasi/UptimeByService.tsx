"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { uptimeByService } from "@/lib/tik-data-detail";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

/** Target SLA enterprise layanan kritikal. */
const TARGET_SLA_PCT = 99.5;

const desimal = (v: number) => v.toLocaleString("id-ID", { minimumFractionDigits: 1 });

const data = uptimeByService.map((s) => ({
  ...s,
  singkat: s.layanan.length > 18 ? `${s.layanan.slice(0, 17)}…` : s.layanan,
}));

export function UptimeByService() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Ketersediaan Layanan Kritikal" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Uptime YTD (%) 8 Layanan · Garis Target SLA {desimal(TARGET_SLA_PCT)}%
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 16, right: 8, bottom: 12, left: -12 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="singkat"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              interval={0}
              angle={-18}
              textAnchor="end"
              height={30}
            />
            <YAxis
              domain={[98, 100]}
              ticks={[98, 98.5, 99, 99.5, 100]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => desimal(v)}
              width={32}
            />
            <ReferenceLine
              y={TARGET_SLA_PCT}
              stroke={PALETTE.navy}
              strokeDasharray="5 4"
              strokeWidth={1.2}
            />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.08)" }}
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number) => [`${desimal(v)}%`, "Uptime YTD"]}
              labelFormatter={(label: string) => {
                const row = data.find((d) => d.singkat === label);
                return row
                  ? `${row.layanan} · downtime ${row.downtimeMenit} menit · ${row.insidenP1} insiden P1`
                  : label;
              }}
            />
            <Bar isAnimationActive={false} dataKey="uptimePct" radius={[3, 3, 0, 0]} maxBarSize={30}>
              {data.map((d) => (
                <Cell
                  key={d.layanan}
                  fill={d.status === "Memenuhi SLA" ? PALETTE.green : PALETTE.red}
                />
              ))}
              <LabelList
                dataKey="uptimePct"
                position="top"
                offset={5}
                formatter={(v: React.ReactNode) => desimal(Number(v))}
                style={{ fontSize: 8, fill: "#334155", fontWeight: 700 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="pb-1 text-[9px] leading-snug text-ink-500">
        5 dari 8 layanan di bawah SLA; SCADA (98,6%) dan timbang jembatan (98,9%) menyumbang 543
        menit downtime — langsung memotong olah TBS.
      </p>
    </div>
  );
}
