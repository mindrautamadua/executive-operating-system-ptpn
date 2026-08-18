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
import { competitionLevel } from "@/lib/pgd-data-detail";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const BENDERA_COLOR: Record<string, string> = {
  Merah: PALETTE.red,
  Kuning: PALETTE.amber,
  Hijau: PALETTE.green,
};

const TUNGGAL = competitionLevel[0];

export function CompetitionLevel() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "180ms" } as React.CSSProperties}
    >
      <SectionHead title="Tingkat Kompetisi Paket" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Distribusi Jumlah Peserta · Rata-rata 3,4 vs Target ≥ 4
      </p>

      <div className="mt-1 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={competitionLevel} margin={{ top: 18, right: 10, bottom: 0, left: -18 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="bucket"
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
              formatter={(v: number) => [`${v} paket`, "Jumlah Paket"]}
              contentStyle={CHART_TOOLTIP_STYLE}
            />
            <Bar isAnimationActive={false} dataKey="paket" radius={[4, 4, 0, 0]} barSize={32}>
              {competitionLevel.map((r) => (
                <Cell key={r.bucket} fill={BENDERA_COLOR[r.bendera]} />
              ))}
              <LabelList
                dataKey="paket"
                position="top"
                style={{ fontSize: 8.5, fill: "#334155", fontWeight: 700 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-1 rounded-md bg-[#fdecec] px-2 py-[5px] text-[9px] leading-[1.4] text-[#b91c1c]">
        Bendera merah: {TUNGGAL.paket} paket berpeserta tunggal ({TUNGGAL.pct}% · Rp{" "}
        {TUNGGAL.valueRpT.toLocaleString("id-ID", { minimumFractionDigits: 2 })} T) hanya hemat
        {" "}{TUNGGAL.hematVsHpsPct}% vs HPS — versus 9,4% pada paket ≥ 5 peserta.
      </p>
    </div>
  );
}
