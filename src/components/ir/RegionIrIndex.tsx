"use client";

import { ISLANDS, MAP_H } from "@/lib/indonesia";
import { RISK_STYLE, regionLegend } from "@/lib/ir-data";
import { regionHeatmap } from "@/lib/ir-intel-data";
import { SectionHead } from "../hc/SectionHead";
import { PanelFooterLink } from "./PanelFooterLink";

const TONE_DOT: Record<"good" | "warn" | "bad", string> = {
  good: "bg-[#1a9c5b]",
  warn: "bg-[#f5a524]",
  bad: "bg-[#ef4444]",
};

export function RegionIrIndex() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="IR Risk Heatmap per Region" />

      <div className="flex min-h-0 flex-1 items-center gap-3 pt-1">
        <div className="relative h-full w-[30%] shrink-0 self-center">
          <svg
            viewBox={`0 0 1000 ${MAP_H}`}
            className="h-full w-full"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient
                id="ir-map-fill"
                gradientUnits="userSpaceOnUse"
                x1="80"
                y1="0"
                x2="700"
                y2="376"
              >
                <stop offset="0%" stopColor="#b7f0c6" />
                <stop offset="50%" stopColor="#4ec583" />
                <stop offset="100%" stopColor="#1e9a60" />
              </linearGradient>
              <filter id="ir-map-soft" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="7" />
              </filter>
            </defs>
            <g filter="url(#ir-map-soft)" opacity="0.35">
              {ISLANDS.map((is) => (
                <path key={`irg-${is.id}`} d={is.d} fill="#4ec583" />
              ))}
            </g>
            {ISLANDS.map((is) => (
              <path
                key={is.id}
                d={is.d}
                fill="url(#ir-map-fill)"
                stroke="var(--map-stroke)"
                strokeWidth="1"
                strokeLinejoin="round"
              />
            ))}
          </svg>
        </div>

        <div className="flex min-w-0 flex-1 flex-col self-stretch">
          <div className="grid grid-cols-[minmax(0,1fr)_36px_52px_40px_18px] items-center gap-x-1.5 border-b border-[#eef2f6] pb-1 text-[9px] font-semibold uppercase tracking-[0.04em] text-ink-500">
            <span>Region</span>
            <span className="text-right">Indeks</span>
            <span className="text-center">Strike</span>
            <span className="text-right">Comp.</span>
            <span />
          </div>
          <div className="flex min-h-0 flex-1 flex-col justify-around">
            {regionHeatmap.map((r) => (
              <div
                key={r.name}
                className="grid grid-cols-[minmax(0,1fr)_36px_52px_40px_18px] items-center gap-x-1.5"
              >
                <span className="flex min-w-0 items-center gap-1">
                  <span className="truncate text-[9px] font-medium text-ink-700" title={r.name}>
                    {r.name}
                  </span>
                  {r.watch && (
                    <span className="shrink-0 rounded bg-[#fdf9e0] px-1 py-[1px] text-[7.5px] font-extrabold uppercase tracking-[0.03em] text-[#a8891b]">
                      Watch
                    </span>
                  )}
                </span>
                <span className="text-right text-[9.5px] font-bold tabular-nums text-ink-900">
                  {r.index}
                </span>
                <span className="text-center">
                  <span
                    className={`inline-block rounded px-1.5 py-[1px] text-[7.5px] font-bold ${RISK_STYLE[r.strike]}`}
                  >
                    {r.strike}
                  </span>
                </span>
                <span className="text-right text-[9px] font-semibold tabular-nums text-ink-700">
                  {r.compliance}%
                </span>
                <span className="flex justify-center">
                  <span className={`h-[7px] w-[7px] rounded-full ${TONE_DOT[r.tone]}`} />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
        {regionLegend.map((l) => (
          <span key={l.label} className="flex items-center gap-1 text-[9px] text-ink-500">
            <span className="h-[7px] w-[7px] rounded-full" style={{ background: l.color }} />
            {l.label}
          </span>
        ))}
        <span className="flex items-center gap-1 text-[9px] text-ink-500">
          <span className="rounded bg-[#fdf9e0] px-1 py-[1px] text-[7.5px] font-extrabold uppercase text-[#a8891b]">
            Watch
          </span>
          &lt;2 pts di atas batas kategori
        </span>
      </div>

      <PanelFooterLink label="Lihat Detail Regional" />
    </div>
  );
}
