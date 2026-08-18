"use client";

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { tenderPipeline } from "@/lib/pgd-data-detail";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const TONE_COLOR: Record<string, string> = {
  green: PALETTE.green,
  blue: PALETTE.blue,
  amber: PALETTE.amber,
  red: PALETTE.red,
};

const TOTAL_PAKET = tenderPipeline.reduce((s, r) => s + r.paket, 0);
const TOTAL_NILAI = tenderPipeline.reduce((s, r) => s + r.valueRpT, 0);

/** Satu baris data — tiap tahap menjadi satu segmen bertumpuk. */
const stacked: Array<Record<string, number | string>> = [
  {
    name: "Pipeline Aktif",
    ...Object.fromEntries(tenderPipeline.map((r) => [r.tahap, r.valueRpT])),
  },
];

export function TenderPipeline() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Pipeline Tender Aktif" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {TOTAL_PAKET} Paket · Nilai Rp{" "}
        {TOTAL_NILAI.toLocaleString("id-ID", { minimumFractionDigits: 2 })} T
      </p>

      <div className="mt-1 h-[52px] w-full shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={stacked}
            layout="vertical"
            margin={{ top: 4, right: 6, bottom: 0, left: 6 }}
          >
            <XAxis
              type="number"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => `${v.toLocaleString("id-ID")} T`}
            />
            <YAxis type="category" dataKey="name" hide />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.10)" }}
              formatter={(v: number, n: string) => [
                `Rp ${v.toLocaleString("id-ID", { minimumFractionDigits: 2 })} T`,
                n,
              ]}
              contentStyle={CHART_TOOLTIP_STYLE}
            />
            {tenderPipeline.map((r, i) => (
              <Bar isAnimationActive={false}
                key={r.tahap}
                dataKey={r.tahap}
                stackId="pipeline"
                fill={TONE_COLOR[r.tone]}
                barSize={26}
                radius={
                  i === 0
                    ? [4, 0, 0, 4]
                    : i === tenderPipeline.length - 1
                      ? [0, 4, 4, 0]
                      : [0, 0, 0, 0]
                }
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      <ul className="scroll-thin mt-1.5 min-h-0 flex-1 overflow-y-auto">
        {tenderPipeline.map((r) => (
          <li key={r.tahap} className="border-b border-[#f2f5f8] py-[5px] last:border-0">
            <div className="flex items-center gap-1.5">
              <span
                className="h-[8px] w-[8px] shrink-0 rounded-[2px]"
                style={{ backgroundColor: TONE_COLOR[r.tone] }}
              />
              <span className="min-w-0 flex-1 truncate text-[9px] font-semibold text-ink-700">
                {r.tahap}
              </span>
              <span className="shrink-0 text-[9.5px] font-extrabold text-ink-900">
                {r.paket} paket
              </span>
              <span className="w-[52px] shrink-0 text-right text-[8.5px] text-ink-400">
                {r.umurHari} hari
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
