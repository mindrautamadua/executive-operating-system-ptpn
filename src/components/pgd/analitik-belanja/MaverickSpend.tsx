"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { maverickSpend, PGD_STATUS_COLOR, type PgdStatus } from "@/lib/pgd-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ToneBadge, type BadgeTone } from "@/components/shared/ToneBadge";
import { useSubholding } from "@/components/SubholdingProvider";
import { toSubholdingId } from "@/lib/subholding";

const STATUS_TONE: Record<PgdStatus, BadgeTone> = {
  "On Track": "good",
  "At Risk": "warn",
  "Off Track": "bad",
};

export function MaverickSpend() {
  const { active, isFiltered, def } = useSubholding();
  // `unit` menyebut subholding pemiliknya (PalmCo Regional n / SGN / PTPN I).
  const dim = (unit: string) => (!isFiltered || toSubholdingId(unit) === active ? 1 : 0.25);

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "150ms" } as React.CSSProperties}
    >
      <SectionHead title="Maverick Spend per Unit" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {isFiltered
          ? `Belanja di Luar Kanal Kontrak (%) · unit ${def.label} disorot · rata-rata grup 8,4%`
          : "Belanja di Luar Kanal Kontrak (%) · rata-rata grup 8,4% (Rp 1,04 T)"}
      </p>

      <div className="mt-1 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={maverickSpend} margin={{ top: 10, right: 6, bottom: 0, left: -14 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="unit"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              tickFormatter={(v: string) => v.replace("PalmCo Regional ", "Reg ")}
            />
            <YAxis
              domain={[0, 12]}
              ticks={[0, 4, 8, 12]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              width={32}
              tickFormatter={(v: number) => `${v}%`}
            />
            <Tooltip
              cursor={{ fill: "transparent" }}
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number) => [
                `${v.toLocaleString("id-ID", { minimumFractionDigits: 1 })}%`,
                "Maverick Spend",
              ]}
            />
            <ReferenceLine
              y={8.4}
              stroke={PALETTE.slate}
              strokeDasharray="4 3"
              label={{
                value: "Rata-rata 8,4%",
                position: "insideTopLeft",
                fontSize: 8.5,
                fill: CHART_AXIS.tick,
              }}
            />
            <Bar isAnimationActive={false} dataKey="maverickPct" radius={[3, 3, 0, 0]} barSize={22}>
              {maverickSpend.map((m) => (
                <Cell key={m.unit} fill={PGD_STATUS_COLOR[m.status]} fillOpacity={dim(m.unit)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-1 flex flex-wrap items-center gap-x-2.5 gap-y-1">
        {maverickSpend.map((m) => (
          <span
            key={m.unit}
            className="flex items-center gap-1 transition-opacity"
            style={{ opacity: dim(m.unit) }}
          >
            <span className="text-[9px] font-semibold text-ink-500">
              {m.unit.replace("PalmCo Regional ", "Reg ")} · Rp {m.maverickRpM} M
            </span>
            <ToneBadge label={m.status} tone={STATUS_TONE[m.status]} />
          </span>
        ))}
      </div>
    </div>
  );
}
