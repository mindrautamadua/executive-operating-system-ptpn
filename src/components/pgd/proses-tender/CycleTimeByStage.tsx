"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { cycleTimeByStage } from "@/lib/pgd-data-detail";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const AKTUAL = cycleTimeByStage.reduce((s, r) => s + r.aktualHari, 0);
const TARGET = cycleTimeByStage.reduce((s, r) => s + r.targetHari, 0);

const rows = cycleTimeByStage.map((r) => ({
  ...r,
  short: r.tahap.length > 26 ? `${r.tahap.slice(0, 25)}…` : r.tahap,
}));

export function CycleTimeByStage() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Waktu Siklus per Tahap" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Aktual <span className="font-bold text-[#ef4444]">{AKTUAL} Hari</span> vs Target {TARGET}{" "}
        Hari · Permintaan → PO
      </p>

      <div className="mt-1 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={rows}
            layout="vertical"
            margin={{ top: 4, right: 24, bottom: 0, left: 6 }}
            barCategoryGap="20%"
          >
            <CartesianGrid stroke={CHART_AXIS.grid} horizontal={false} />
            <XAxis
              type="number"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => `${v}h`}
            />
            <YAxis
              type="category"
              dataKey="short"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              width={124}
            />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.10)" }}
              formatter={(v: number, n: string) => [`${v} hari`, n]}
              contentStyle={CHART_TOOLTIP_STYLE}
            />
            <Legend
              verticalAlign="top"
              align="right"
              height={14}
              iconSize={7}
              wrapperStyle={{ fontSize: 8, paddingBottom: 2 }}
            />
            <Bar dataKey="aktualHari" name="Aktual" radius={[0, 3, 3, 0]} barSize={8}>
              {rows.map((r) => (
                <Cell key={r.tahap} fill={r.bottleneck ? PALETTE.red : PALETTE.blue} />
              ))}
              <LabelList
                dataKey="aktualHari"
                position="right"
                style={{ fontSize: 8.5, fill: "#334155", fontWeight: 700 }}
              />
            </Bar>
            <Bar
              dataKey="targetHari"
              name="Target SLA"
              fill={PALETTE.slate}
              radius={[0, 3, 3, 0]}
              barSize={5}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-1 rounded-md bg-[#fdecec] px-2 py-[5px] text-[9px] leading-[1.4] text-[#b91c1c]">
        Bottleneck evaluasi 11 hari (target 7) menyumbang 4 dari 7 hari kelebihan siklus; penyusunan
        HPS menambah 2 hari.
      </p>
    </div>
  );
}
