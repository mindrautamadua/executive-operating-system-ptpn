"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { expiryTimeline } from "@/lib/pgd-data-detail";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

/** Tiga bulan pertama (Jun–Agu'26) = jendela 90 hari. */
const WINDOW_90 = 3;
const JT90 = expiryTimeline.slice(0, WINDOW_90).reduce((s, p) => s + p.jumlah, 0);

export function ExpiryTimeline() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Timeline Jatuh Tempo Kontrak" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        12 Bulan ke Depan ·{" "}
        <span className="font-bold text-[#ef4444]">{JT90} Kontrak Jatuh Tempo ≤ 90 Hari</span>
      </p>

      <div className="mt-1 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={expiryTimeline} margin={{ top: 18, right: 10, bottom: 0, left: -18 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              width={34}
            />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.10)" }}
              formatter={(v: number) => [`${v} kontrak`, "Berakhir"]}
              contentStyle={CHART_TOOLTIP_STYLE}
            />
            <Bar isAnimationActive={false} dataKey="jumlah" radius={[4, 4, 0, 0]} barSize={20}>
              {expiryTimeline.map((p, i) => (
                <Cell key={p.month} fill={i < WINDOW_90 ? PALETTE.red : PALETTE.blue} />
              ))}
              <LabelList
                dataKey="jumlah"
                position="top"
                style={{ fontSize: 8, fill: "#334155", fontWeight: 700 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-1 rounded-md bg-[#fdecec] px-2 py-[5px] text-[9px] leading-[1.4] text-[#b91c1c]">
        87 kontrak senilai Rp 2,86 T jatuh tempo ≤ 90 hari; hanya 39 memiliki paket pengganti di
        pipeline tender.
      </p>
    </div>
  );
}
