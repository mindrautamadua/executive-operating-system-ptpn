"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { byOwner } from "@/lib/sms-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";
import { toSubholdingId } from "@/lib/subholding";

// `owner` (PalmCo / SGN / PTPN I / Holding) adalah dimensi subholding batang ini.
const data = byOwner.map((o) => ({ ...o, sub: toSubholdingId(o.owner) }));

/** Komposisi status 142 milestone per owner (selesai / on track / terlambat). */
export function MilestoneByOwner() {
  const { active, isFiltered } = useSubholding();
  // Grafik pembanding: batang non-aktif diredupkan agar komposisi antar owner
  // tetap terbaca. Batang "Holding" ikut diredupkan saat filter aktif karena ia
  // bukan bagian dari subholding terpilih — konsisten dengan owner lainnya.
  const dim = (sub: ReturnType<typeof toSubholdingId>) =>
    !isFiltered || sub === active ? 1 : 0.25;

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "180ms" } as React.CSSProperties}
    >
      <SectionHead title="Milestone per Owner" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Komposisi Status 142 Milestone per Subholding
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 6, right: 14, bottom: 0, left: -18 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="owner"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
            />
            <YAxis
              domain={[0, 70]}
              ticks={[0, 20, 40, 60]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              width={32}
            />
            <Tooltip
              cursor={{ fill: "transparent" }}
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, name: string) => [`${v} milestone`, name]}
            />
            <Legend
              verticalAlign="top"
              align="right"
              height={18}
              iconType="circle"
              iconSize={7}
              wrapperStyle={{ fontSize: 8.5, color: CHART_AXIS.tick }}
            />
            <Bar isAnimationActive={false} dataKey="done" name="Selesai" stackId="m" fill={PALETTE.green} barSize={30}>
              {data.map((d) => (
                <Cell key={d.owner} fillOpacity={dim(d.sub)} />
              ))}
            </Bar>
            <Bar isAnimationActive={false} dataKey="onTrack" name="On Track" stackId="m" fill={PALETTE.blue}>
              {data.map((d) => (
                <Cell key={d.owner} fillOpacity={dim(d.sub)} />
              ))}
            </Bar>
            <Bar isAnimationActive={false}
              dataKey="late"
              name="Terlambat"
              stackId="m"
              fill={PALETTE.red}
              radius={[4, 4, 0, 0]}
            >
              {data.map((d) => (
                <Cell key={d.owner} fillOpacity={dim(d.sub)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-1 truncate text-[9px] text-ink-500">
        {isFiltered
          ? "Batang non-aktif diredupkan; komposisi seluruh owner tetap ditampilkan sebagai konteks."
          : "SGN: 8 dari 40 milestone terlambat (20%) — rasio tertinggi lintas subholding."}
      </p>
    </div>
  );
}
