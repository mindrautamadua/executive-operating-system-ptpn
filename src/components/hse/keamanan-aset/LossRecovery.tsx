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
import { lossRecovery, lossRecoveryMeta } from "@/lib/hse-data-detail";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const desimal = (v: number) => v.toLocaleString("id-ID", { minimumFractionDigits: 2 });

const data = lossRecovery.map((l) => ({
  ...l,
  label: l.kategori.replace(" & Suku Cadang", "").replace("Gangguan Operasional", "Gangguan Ops"),
}));

/** Nilai kerugian vs pemulihan per kategori insiden keamanan. */
export function LossRecovery() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Kerugian & Pemulihan" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Rp {desimal(lossRecoveryMeta.kerugianTotalRpM)} M Kerugian · Rp{" "}
        {desimal(lossRecoveryMeta.pemulihanTotalRpM)} M Dipulihkan (31,0%)
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 16, right: 6, bottom: 0, left: -18 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              interval={0}
            />
            <YAxis
              domain={[0, 9]}
              ticks={[0, 3, 6, 9]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
            />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.08)" }}
              formatter={(v: number, name: string) => [
                `Rp ${desimal(v)} M`,
                name === "kerugianRpM" ? "Kerugian" : "Pemulihan",
              ]}
              contentStyle={CHART_TOOLTIP_STYLE}
            />
            <Bar dataKey="kerugianRpM" fill={PALETTE.red} fillOpacity={0.85} radius={[3, 3, 0, 0]}>
              <LabelList
                dataKey="kerugianRpM"
                position="top"
                offset={4}
                formatter={(v: number) => desimal(v)}
                style={{ fontSize: 8, fill: "var(--text-1)", fontWeight: 700 }}
              />
            </Bar>
            <Bar
              dataKey="pemulihanRpM"
              fill={PALETTE.green}
              fillOpacity={0.85}
              radius={[3, 3, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-1 flex items-center gap-2.5">
        <span className="flex items-center gap-1 text-[9px] text-ink-500">
          <span
            className="h-[7px] w-[7px] shrink-0 rounded-full"
            style={{ backgroundColor: PALETTE.red }}
          />
          Kerugian
        </span>
        <span className="flex items-center gap-1 text-[9px] text-ink-500">
          <span
            className="h-[7px] w-[7px] shrink-0 rounded-full"
            style={{ backgroundColor: PALETTE.green }}
          />
          Pemulihan
        </span>
        <span className="min-w-0 flex-1 truncate text-[9px] text-ink-500" title={lossRecoveryMeta.catatan}>
          {lossRecoveryMeta.catatan}
        </span>
      </div>
    </div>
  );
}
