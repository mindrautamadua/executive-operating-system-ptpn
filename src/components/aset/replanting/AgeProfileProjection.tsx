"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ageProjection, ageProjectionNote } from "@/lib/arp-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";

/** Proyeksi porsi areal tua/renta & prima: roadmap penuh vs laju saat ini. */
export function AgeProfileProjection() {
  const { active } = useSubholding();
  // Pemetaan domain: profil umur areal sawit — cakupan PalmCo.
  const outOfScope = active !== "all" && active !== "palmco";

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Proyeksi Profil Umur 2026–2035" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {outOfScope
          ? "Proyeksi profil umur areal sawit hanya untuk PalmCo"
          : "Porsi Areal Tua & Renta (%) · Dengan vs Tanpa Akselerasi Replanting"}
      </p>

      <div
        className="mt-1.5 min-h-0 w-full flex-1 transition-opacity"
        style={{ opacity: outOfScope ? 0.25 : 1 }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={ageProjection} margin={{ top: 10, right: 6, bottom: 0, left: -18 }}>
            <defs>
              <linearGradient id="arp-tanpa-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={PALETTE.red} stopOpacity="0.20" />
                <stop offset="100%" stopColor={PALETTE.red} stopOpacity="0.02" />
              </linearGradient>
              <linearGradient id="arp-dengan-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={PALETTE.green} stopOpacity="0.20" />
                <stop offset="100%" stopColor={PALETTE.green} stopOpacity="0.02" />
              </linearGradient>
            </defs>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="tahun"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              interval={0}
            />
            <YAxis
              domain={[0, 60]}
              ticks={[0, 15, 30, 45, 60]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => `${v}%`}
              width={36}
            />
            <Tooltip
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, n: string) => [`${v}%`, n]}
            />
            <Legend
              verticalAlign="top"
              align="right"
              height={16}
              iconType="circle"
              iconSize={7}
              wrapperStyle={{ fontSize: 8, color: CHART_AXIS.tick }}
            />
            <Area
              type="monotone"
              dataKey="tanpaTuaRentaPct"
              name="Tua/Renta — Tanpa Akselerasi"
              stroke={PALETTE.red}
              strokeWidth={1.8}
              fill="url(#arp-tanpa-fill)"
              dot={false}
            />
            <Area
              type="monotone"
              dataKey="denganTuaRentaPct"
              name="Tua/Renta — Roadmap Penuh"
              stroke={PALETTE.green}
              strokeWidth={1.8}
              fill="url(#arp-dengan-fill)"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="denganPrimaPct"
              name="Prima — Roadmap Penuh"
              stroke={PALETTE.blue}
              strokeWidth={1.5}
              strokeDasharray="5 4"
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <p className="pb-1 text-[9px] leading-snug text-ink-500">{ageProjectionNote}</p>
    </div>
  );
}
