"use client";

import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { maturitySpider } from "@/lib/tik-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const angka = (v: number) => v.toLocaleString("id-ID", { minimumFractionDigits: 1 });

/** Radar maturitas NIST CSF 6 domain vs target 4,0. */
export function MaturitySpider() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "180ms" } as React.CSSProperties}
    >
      <SectionHead title="Maturitas Siber NIST CSF" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Skor 6 Domain 1–5 vs Target 4,0 (2027) · komposit 3,1
      </p>

      <div className="mt-1 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={maturitySpider} margin={{ top: 8, right: 24, bottom: 4, left: 24 }}>
            <PolarGrid stroke={CHART_AXIS.grid} />
            <PolarAngleAxis dataKey="domain" tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }} />
            <PolarRadiusAxis
              domain={[0, 5]}
              tickCount={6}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              axisLine={false}
            />
            <Tooltip
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, name: string) => [angka(v), name]}
            />
            <Radar
              name="Target 2027"
              dataKey="target"
              stroke={PALETTE.amber}
              strokeWidth={1.4}
              strokeDasharray="4 3"
              fill={PALETTE.amber}
              fillOpacity={0.05}
            />
            <Radar
              name="Skor 2026"
              dataKey="skor"
              stroke={PALETTE.blue}
              strokeWidth={1.8}
              fill={PALETTE.blue}
              fillOpacity={0.18}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <p className="pb-1 text-[9px] leading-snug text-ink-500">
        Recover (2,8) terendah dan konsisten dengan RTO ERP aktual 6,5 jam vs target 4 jam serta
        sistem OT yang belum pernah diuji.
      </p>
    </div>
  );
}
