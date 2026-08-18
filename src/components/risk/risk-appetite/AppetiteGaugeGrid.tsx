"use client";

import { PolarAngleAxis, RadialBar, RadialBarChart, ResponsiveContainer } from "recharts";
import { appetiteGauges, type AppetiteStatus } from "@/lib/risk-data";
import { PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";
import { ToneBadge, type BadgeTone } from "@/components/shared/ToneBadge";

const STATUS_COLOR: Record<AppetiteStatus, string> = {
  Aman: PALETTE.green,
  "Near-Limit": PALETTE.amber,
  Breach: PALETTE.red,
  "Zero-Tolerance": PALETTE.red,
};

const STATUS_TONE: Record<AppetiteStatus, BadgeTone> = {
  Aman: "good",
  "Near-Limit": "warn",
  Breach: "bad",
  "Zero-Tolerance": "bad",
};

/** Gauge radial utilisasi limit; skala 0–120% agar breach tetap terbaca. */
function Gauge({ pct, color }: { pct: number; color: string }) {
  const value = Math.min(pct, 120);
  return (
    <div className="relative h-[72px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          data={[{ name: "utilisasi", value }]}
          innerRadius="72%"
          outerRadius="100%"
          startAngle={210}
          endAngle={-30}
          barSize={7}
        >
          <PolarAngleAxis type="number" domain={[0, 120]} tick={false} />
          <RadialBar
            dataKey="value"
            cornerRadius={4}
            fill={color}
            background={{ fill: "var(--chart-grid)" }}
            isAnimationActive
            animationDuration={900}
          />
        </RadialBarChart>
      </ResponsiveContainer>
      <span className="pointer-events-none absolute inset-0 flex items-end justify-center pb-[10px]">
        <span className="text-[13px] font-extrabold leading-none text-ink-900">{pct}%</span>
      </span>
    </div>
  );
}

/** 8 limit representatif dari 28: utilisasi aktual terhadap limit per kategori. */
export function AppetiteGaugeGrid() {
  return (
    <div
      className="card anim-rise px-4 pb-3.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Utilisasi Limit per Kategori" action="Lihat 28 Limit" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Aktual vs Limit Risk Appetite — Utilisasi &gt; 100% Berarti Breach
      </p>

      <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-3">
        {appetiteGauges.map((g) => (
          <div key={g.metric} className="rounded-xl border border-[#eef2f6] bg-[#fbfcfd] px-2.5 pb-2 pt-2">
            <div className="flex items-start justify-between gap-1.5">
              <span className="min-w-0">
                <span className="block truncate text-[9px] font-bold text-ink-900" title={g.metric}>
                  {g.metric}
                </span>
                <span className="block truncate text-[7.5px] text-ink-500">{g.kategori}</span>
              </span>
              <ToneBadge label={g.status} tone={STATUS_TONE[g.status]} />
            </div>

            <Gauge pct={g.utilisasiPct} color={STATUS_COLOR[g.status]} />

            <div className="mt-1 flex items-center justify-between gap-1.5 text-[9px]">
              <span className="truncate text-ink-500">
                Limit <span className="font-bold text-ink-700">{g.limitLabel}</span>
              </span>
              <span className="shrink-0 font-extrabold text-ink-900">{g.aktualLabel}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
