"use client";

import Link from "next/link";
import { ChevronDown, ChevronRight } from "lucide-react";
import {
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { dimensi } from "@/lib/kinerja-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { ScopeNote } from "@/components/ui/ScopeNote";

const data = dimensi.map((d) => ({
  dim: d.short,
  kini: d.pct,
  lalu: d.prev,
}));

const fmt = (v: number) => v.toFixed(1).replace(".", ",");

export function KinerjaDimensi() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="card-title-navy flex min-w-0 items-center gap-1.5"><span>KINERJA BERDASARKAN DIMENSI</span><ScopeNote /></h3>
          <p className="mt-[3px] text-[9.5px] text-ink-500">
            Rata-rata Score per Dimensi — Q2 vs Q1 2026
          </p>
        </div>
        <button className="select-chip whitespace-nowrap px-2.5 py-[5px] text-[9.5px] transition-colors hover:bg-[#f7f9fb]">
          Semua Dimensi <ChevronDown size={11} />
        </button>
      </div>

      <div className="mt-1 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data} outerRadius="74%" margin={{ top: 4, right: 24, bottom: 0, left: 24 }}>
            <PolarGrid stroke={CHART_AXIS.grid} />
            <PolarAngleAxis
              dataKey="dim"
              tick={{ fontSize: 9, fill: CHART_AXIS.tick }}
            />
            {/* domain sempit agar selisih antar-dimensi terlihat */}
            <PolarRadiusAxis domain={[60, 95]} tick={false} axisLine={false} />
            <Radar isAnimationActive={false}
              name="Q1 2026"
              dataKey="lalu"
              stroke={PALETTE.slate}
              strokeWidth={1.4}
              strokeDasharray="4 3"
              fill={PALETTE.slate}
              fillOpacity={0.1}
              animationDuration={900}
            />
            <Radar isAnimationActive={false}
              name="Q2 2026"
              dataKey="kini"
              stroke={PALETTE.green}
              strokeWidth={1.8}
              fill={PALETTE.green}
              fillOpacity={0.24}
              dot={{ r: 2.5, fill: PALETTE.green, strokeWidth: 0 }}
              animationDuration={900}
            />
            <Tooltip
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, name: string) => [fmt(v), name]}
            />
            <Legend
              verticalAlign="bottom"
              height={16}
              iconType="plainline"
              iconSize={12}
              wrapperStyle={{ fontSize: 9 }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <Link href="/kinerja-karyawan/dimensi" className="link-more mt-1 flex items-center gap-1">
        Lihat detail dimensi <ChevronRight size={11} />
      </Link>
    </div>
  );
}
