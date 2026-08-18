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
import { legalSpendBreakdown, legalSpendStats } from "@/lib/hkm-data-detail";
import { CHART_AXIS, CHART_TOOLTIP_STYLE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const data = legalSpendBreakdown.map((r) => ({
  ...r,
  nama: r.komponen.length > 30 ? `${r.komponen.slice(0, 29)}…` : r.komponen,
}));

/** Rincian realisasi legal spend YTD Rp 96 M terhadap pagu FY Rp 216 M. */
export function LegalSpendBreakdown() {
  return (
    <div
      className="card anim-rise flex h-full min-h-0 flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Rincian Legal Spend" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Realisasi YTD Rp {legalSpendStats.ytdRpM} M dari Pagu FY Rp {legalSpendStats.paguFyRpM} M ·
        Serapan{" "}
        {legalSpendStats.serapanPct.toLocaleString("id-ID", { minimumFractionDigits: 1 })}%
      </p>

      <div className="mt-1 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 4, right: 38, bottom: 2, left: 4 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} horizontal={false} />
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="nama"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              width={150}
            />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.10)" }}
              formatter={(
                v: number,
                _n: string,
                p: { payload?: { paguFyRpM?: number; keterangan?: string } },
              ) => [
                `Rp ${v} M dari pagu Rp ${p.payload?.paguFyRpM ?? 0} M — ${
                  p.payload?.keterangan ?? ""
                }`,
                "Realisasi YTD",
              ]}
              contentStyle={CHART_TOOLTIP_STYLE}
            />
            <Bar dataKey="ytdRpM" radius={[0, 4, 4, 0]} barSize={14}>
              {data.map((r) => (
                <Cell key={r.komponen} fill={r.color} />
              ))}
              <LabelList
                dataKey="ytdRpM"
                position="right"
                formatter={(v: number) => `Rp ${v} M`}
                style={{ fontSize: 8.5, fill: "#334155", fontWeight: 700 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-1 rounded-md bg-[#fdf3e0] px-2 py-[5px] text-[9px] leading-[1.4] text-[#d98b06]">
        {legalSpendStats.note}
      </p>
    </div>
  );
}
