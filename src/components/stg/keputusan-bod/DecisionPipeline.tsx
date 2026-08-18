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
import { useMemo } from "react";
import { pipeline, register } from "@/lib/sbd-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";
import { filterBySubholding } from "@/lib/subholding";

const SERIES = [
  { key: "selesai", label: "Selesai", color: PALETTE.green },
  { key: "berjalan", label: "Berjalan", color: PALETTE.blue },
  { key: "overdue", label: "Overdue", color: PALETTE.red },
] as const;

const LABELS: Record<string, string> = Object.fromEntries(SERIES.map((s) => [s.key, s.label]));

const DATA = pipeline.map((m) => ({ ...m, total: m.selesai + m.berjalan + m.overdue }));

const MONTHS = pipeline.map((m) => m.month);

const STATUS_KEY = {
  Selesai: "selesai",
  Berjalan: "berjalan",
  Overdue: "overdue",
} as const;

/** Pipeline keputusan per bulan berdasarkan status tindak lanjut. */
export function DecisionPipeline() {
  const { active, isFiltered, def } = useSubholding();

  // Baris pipeline induk tidak menyimpan subholding; saat filter aktif jumlah
  // per bulan dihitung ulang dari register (judul + PIC) agar konsisten dengan
  // kartu register. Tanpa filter, angka induk 46 keputusan YTD dipakai apa adanya.
  const data = useMemo(() => {
    if (!isFiltered) return DATA;
    const rows = filterBySubholding(register, active, (d) => `${d.title} ${d.pic}`);
    return MONTHS.map((month) => {
      const bulan = rows.filter((d) => d.tanggal.split(" ")[1] === month);
      const selesai = bulan.filter((d) => STATUS_KEY[d.status] === "selesai").length;
      const berjalan = bulan.filter((d) => STATUS_KEY[d.status] === "berjalan").length;
      const overdue = bulan.filter((d) => STATUS_KEY[d.status] === "overdue").length;
      return { month, selesai, berjalan, overdue, total: bulan.length };
    });
  }, [active, isFiltered]);

  const totalAll = data.reduce((s, m) => s + m.total, 0);
  const maxY = isFiltered
    ? Math.max(4, Math.ceil(Math.max(...data.map((m) => m.total)) / 4) * 4)
    : 12;
  const ticks = [0, maxY / 4, maxY / 2, (maxY * 3) / 4, maxY];

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <SectionHead title="Pipeline Keputusan" />
          <p className="mt-[3px] text-[9px] text-ink-500">
            {isFiltered
              ? `${totalAll} Keputusan Terkini ${def.label} per Bulan & Status Tindak Lanjut`
              : "46 Keputusan YTD per Bulan & Status Tindak Lanjut"}
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap items-center justify-end gap-x-2 gap-y-1">
          {SERIES.map((s) => (
            <span key={s.key} className="flex items-center gap-1">
              <span
                className="h-[7px] w-[7px] shrink-0 rounded-[2px]"
                style={{ backgroundColor: s.color }}
              />
              <span className="text-[9px] font-semibold text-ink-500">{s.label}</span>
            </span>
          ))}
        </div>
      </div>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 16, right: 8, bottom: 4, left: -22 }} barCategoryGap="30%">
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              interval={0}
            />
            <YAxis
              domain={[0, maxY]}
              ticks={ticks}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              width={34}
            />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.08)" }}
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, n: string) => [`${v} keputusan`, LABELS[n] ?? n]}
            />
            {SERIES.map((s, i) => (
              <Bar
                key={s.key}
                dataKey={s.key}
                stackId="dec"
                fill={s.color}
                maxBarSize={34}
                radius={i === SERIES.length - 1 ? [3, 3, 0, 0] : undefined}
              >
                {i === SERIES.length - 1 && (
                  <LabelList
                    dataKey="total"
                    position="top"
                    offset={5}
                    style={{ fontSize: 8, fill: "#334155", fontWeight: 700 }}
                  />
                )}
              </Bar>
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
