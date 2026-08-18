"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ganttPrograms, type GanttBar } from "@/lib/sms-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";
import { toSubholdingId } from "@/lib/subholding";

const STATUS_FILL: Record<GanttBar["status"], string> = {
  Selesai: PALETTE.green,
  Berjalan: PALETTE.blue,
  Terlambat: PALETTE.red,
};

const BULAN = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];

interface Row {
  label: string;
  program: string;
  /** Offset transparan (bulan sebelum mulai). */
  base: number;
  /** Durasi bar (bulan). */
  durasi: number;
  progress: number;
  status: GanttBar["status"];
  start: number;
  end: number;
  /** Subholding yang disebut eksplisit di label bar, mis. "(PalmCo)" / "SGN". */
  sub: ReturnType<typeof toSubholdingId>;
}

// Gantt via BarChart horizontal: bar `base` transparan sebagai offset waktu mulai.
const rows: Row[] = ganttPrograms.flatMap((p) =>
  p.bars.map((b) => ({
    label: b.label,
    program: p.program,
    base: b.start - 1,
    durasi: b.end - b.start + 1,
    progress: b.progress,
    status: b.status,
    start: b.start,
    end: b.end,
    sub: toSubholdingId(b.label),
  })),
);

const LEGEND: GanttBar["status"][] = ["Selesai", "Berjalan", "Terlambat"];

/** Timeline gantt milestone Q1–Q4 2026 per program transformasi. */
export function MilestoneTimeline() {
  const { active, isFiltered } = useSubholding();
  // Hanya sebagian bar menyebut subholding di labelnya. Bar yang menyebut
  // subholding lain diredupkan; bar lintas-grup tetap penuh sebagai konteks.
  const dim = (sub: Row["sub"]) => (!isFiltered || sub === null || sub === active ? 0.85 : 0.25);

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Milestone Timeline 2026" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Gantt Milestone Kunci Q1–Q4 2026 · 6 Program Transformasi
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={rows}
            layout="vertical"
            margin={{ top: 4, right: 14, bottom: 0, left: 4 }}
            barCategoryGap="18%"
          >
            <CartesianGrid stroke={CHART_AXIS.grid} horizontal={false} />
            <XAxis
              type="number"
              domain={[0, 12]}
              ticks={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]}
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => BULAN[v] ?? ""}
              orientation="top"
            />
            <YAxis
              type="category"
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              width={148}
              interval={0}
            />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.08)" }}
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, name: string, item) => {
                if (name !== "durasi") return [null, null];
                const r = item.payload as Row;
                return [
                  `${BULAN[r.start - 1]}–${BULAN[r.end - 1]} 2026 · progres ${r.progress}% · ${r.status}`,
                  r.program,
                ];
              }}
            />
            <Bar dataKey="base" stackId="g" fill="transparent" isAnimationActive={false} />
            <Bar dataKey="durasi" stackId="g" radius={[3, 3, 3, 3]} barSize={9}>
              {rows.map((r) => (
                <Cell key={r.label} fill={STATUS_FILL[r.status]} fillOpacity={dim(r.sub)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-1 flex items-center justify-center gap-3 text-[9px] text-ink-500">
        {LEGEND.map((s) => (
          <span key={s} className="flex items-center gap-1">
            <span
              className="h-[7px] w-[7px] rounded-full"
              style={{ backgroundColor: STATUS_FILL[s] }}
            />
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}
