"use client";

import { Gauge } from "lucide-react";
import {
  compaDistribusi,
  compaPerLevel,
  rangePosition,
  strukturRisiko,
} from "@/lib/comp-data";
import { ScopeNote } from "@/components/ui/ScopeNote";

function statusTone(status: string) {
  if (status === "Above Market") return "tone-blue";
  if (status === "Monitor") return "tone-amber";
  return "tone-green";
}

/**
 * Compa-ratio & range penetration: posisi pay vs market P50 per level,
 * distribusi compa seluruh karyawan, dan risiko struktur
 * (compression / inversion / out-of-range).
 */
export function CompaRangePanel() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "80ms" } as React.CSSProperties}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="card-title-navy flex items-center gap-1.5">
          <Gauge size={13} className="text-[#1b3a6b]" />
          Compa-Ratio &amp; Range Positioning
          <ScopeNote />
        </h3>
        <span className="shrink-0 text-[9px] font-semibold text-ink-500">
          Compa = Actual Pay / Market P50
        </span>
      </div>

      <div className="mt-2.5 grid min-h-0 flex-1 grid-cols-[minmax(0,38fr)_minmax(0,32fr)_minmax(0,30fr)] gap-2.5">
        {/* Compa per level */}
        <div className="flex min-w-0 flex-col">
          <span className="text-[8.5px] font-bold uppercase tracking-wide text-ink-400">
            Market Positioning per Level
          </span>
          <ul className="mt-1.5 flex min-h-0 flex-1 flex-col justify-between gap-[3px]">
            {compaPerLevel.map((r) => (
              <li key={r.level} className="flex shrink-0 items-center gap-2">
                <span className="w-[108px] shrink-0 truncate text-[8.5px] font-semibold text-ink-700">
                  {r.level}
                </span>
                <div className="relative h-[7px] min-w-0 flex-1 overflow-hidden rounded-full bg-[var(--chart-grid)]">
                  <div
                    className="h-full rounded-full bg-[#3b7ded]"
                    style={{ width: `${Math.min(((r.compa - 80) / 50) * 100, 100)}%` }}
                  />
                  {/* marker 100% = market P50 */}
                  <div className="absolute top-0 h-full w-[2px] bg-[#94a3b8]" style={{ left: "40%" }} />
                </div>
                <span className="w-[30px] shrink-0 text-right text-[9px] font-extrabold text-ink-900">
                  {r.compa}%
                </span>
                <span className="w-[26px] shrink-0 text-right text-[9px] font-bold text-ink-500">
                  {r.posisi}
                </span>
                <span
                  className={`w-[74px] shrink-0 rounded px-1 py-[1px] text-center text-[7.5px] font-bold leading-none ${statusTone(r.status)}`}
                >
                  {r.status}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Distribusi compa + range position */}
        <div className="flex min-w-0 flex-col">
          <span className="text-[8.5px] font-bold uppercase tracking-wide text-ink-400">
            Distribusi Compa-Ratio
          </span>
          <div className="mt-1.5 flex h-[10px] w-full overflow-hidden rounded-full">
            {compaDistribusi.map((b) => (
              <div key={b.bucket} style={{ width: `${b.pct}%`, background: b.color }} />
            ))}
          </div>
          <div className="mt-1 flex flex-wrap gap-x-2.5 gap-y-[2px]">
            {compaDistribusi.map((b) => (
              <span key={b.bucket} className="flex items-center gap-1 text-[7.5px] font-semibold text-ink-600">
                <span className="h-[6px] w-[6px] rounded-full" style={{ background: b.color }} />
                {b.bucket} <span className="font-extrabold text-ink-900">{b.pct}%</span>
              </span>
            ))}
          </div>

          <span className="mt-2 text-[8.5px] font-bold uppercase tracking-wide text-ink-400">
            Pay Range Penetration
          </span>
          <ul className="mt-1 flex min-h-0 flex-1 flex-col justify-between gap-[2px]">
            {rangePosition.map((r) => (
              <li key={r.label} className="flex shrink-0 items-center gap-2">
                <span className="w-[76px] shrink-0 text-[9px] font-semibold text-ink-600">{r.label}</span>
                <div className="h-[6px] min-w-0 flex-1 overflow-hidden rounded-full bg-[var(--chart-grid)]">
                  <div className="h-full rounded-full" style={{ width: `${r.pct * 2}%`, background: r.color }} />
                </div>
                <span className="w-[26px] shrink-0 text-right text-[8.5px] font-extrabold text-ink-900">
                  {r.pct}%
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Risiko struktur */}
        <div
          className="flex min-w-0 flex-col rounded-xl border border-[#eef2f6] px-3 py-2.5"
          style={{ borderTop: "3px solid #ef4444" }}
        >
          <span className="inline-flex w-fit items-center rounded px-1.5 py-[2px] text-[9px] font-bold leading-none tone-red">
            Structural Pay Risk
          </span>
          <ul className="mt-1.5 flex min-h-0 flex-1 flex-col justify-between gap-[4px]">
            {strukturRisiko.map((r) => (
              <li key={r.label} className="flex shrink-0 items-center justify-between gap-2">
                <span className="min-w-0 truncate text-[8.5px] font-semibold leading-snug text-ink-700">
                  {r.label}
                </span>
                <span
                  className={`shrink-0 rounded px-1.5 py-[2px] text-[9.5px] font-extrabold leading-none tone-${r.tone}`}
                >
                  {r.value}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-1.5 border-t border-[#eef2f6] pt-1.5 text-[9px] leading-snug text-ink-500">
            Salary inversion otomatis masuk{" "}
            <span className="font-bold text-ink-700">People Risk Radar</span> sebagai
            compensation-driven retention risk.
          </p>
        </div>
      </div>
    </div>
  );
}
