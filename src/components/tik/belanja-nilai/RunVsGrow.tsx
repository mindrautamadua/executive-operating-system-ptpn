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
import { runVsGrow } from "@/lib/tik-data-detail";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const run = runVsGrow.find((r) => r.kategori === "Run");
const grow = runVsGrow.find((r) => r.kategori === "Grow");

const data = [
  {
    skenario: "Aktual 2026",
    run: run?.pct ?? 0,
    grow: grow?.pct ?? 0,
  },
  {
    skenario: "Target RKAP 2027",
    run: run?.targetPct ?? 0,
    grow: grow?.targetPct ?? 0,
  },
];

const rupiah = (v: number) => v.toLocaleString("id-ID", { minimumFractionDigits: 2 });

export function RunVsGrow() {
  return (
    <div
      className="card anim-rise flex h-full min-h-0 flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "90ms" } as React.CSSProperties}
    >
      <SectionHead title="Bauran Run vs Grow" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Porsi Belanja TI (%) · Aktual 62/38 vs Target 55/45
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -20 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="skenario"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
            />
            <YAxis
              domain={[0, 100]}
              ticks={[0, 25, 50, 75, 100]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => `${v}%`}
              width={34}
            />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.08)" }}
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, name: string) => [`${v}%`, name]}
            />
            <Legend
              verticalAlign="top"
              align="right"
              height={14}
              iconType="circle"
              iconSize={6}
              wrapperStyle={{ fontSize: 8, color: "var(--text-2)" }}
            />
            <Bar isAnimationActive={false} dataKey="run" name="Run" stackId="mix" fill={PALETTE.slate} barSize={54}>
              <LabelList
                dataKey="run"
                position="center"
                formatter={(v: React.ReactNode) => `${v}%`}
                style={{ fontSize: 9, fill: "#ffffff", fontWeight: 800 }}
              />
            </Bar>
            <Bar isAnimationActive={false}
              dataKey="grow"
              name="Grow"
              stackId="mix"
              fill={PALETTE.green}
              barSize={54}
              radius={[3, 3, 0, 0]}
            >
              <LabelList
                dataKey="grow"
                position="center"
                formatter={(v: React.ReactNode) => `${v}%`}
                style={{ fontSize: 9, fill: "#ffffff", fontWeight: 800 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-1 grid grid-cols-2 gap-1.5">
        {runVsGrow.map((r) => (
          <div key={r.kategori} className="rounded-lg border border-[#eef2f6] px-2 py-[5px]">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[9px] font-bold text-ink-900">{r.kategori}</span>
              <span className="shrink-0 text-[9px] font-extrabold text-ink-700">
                Rp {rupiah(r.nilaiRpT)} T
              </span>
            </div>
            <p className="mt-[2px] text-[9px] leading-snug text-ink-500">{r.isi}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
