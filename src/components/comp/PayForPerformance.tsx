"use client";

import { Target } from "lucide-react";
import { p4pRingkas, rewardByPerformance, rewardMisalignment } from "@/lib/comp-data";
import { PALETTE } from "@/lib/chart-palette";
import { ScopeNote } from "@/components/ui/ScopeNote";

/**
 * Pay-for-Performance Effectiveness: rata-rata total rewards & merit per rating,
 * differentiation ratio, dan reward misalignment (high performer underpaid /
 * low performer overpaid) — bukan sekadar korelasi.
 */
export function PayForPerformance() {
  const maxReward = Math.max(...rewardByPerformance.map((r) => r.rewardNum));
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "240ms" } as React.CSSProperties}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="card-title-navy flex items-center gap-1.5">
          <Target size={13} className="text-[#1b3a6b]" />
          Pay-for-Performance Effectiveness
          <ScopeNote />
        </h3>
        <span className="shrink-0 text-[9px] font-semibold text-ink-500">{p4pRingkas.korelasi}</span>
      </div>

      <ul className="mt-2.5 flex min-h-0 flex-1 flex-col justify-between gap-[3px]">
        {rewardByPerformance.map((r) => (
          <li key={r.rating} className="flex shrink-0 items-center gap-2">
            <span className="w-[62px] shrink-0 truncate text-[8.5px] font-semibold text-ink-700">
              {r.rating}
            </span>
            <div className="h-[7px] min-w-0 flex-1 overflow-hidden rounded-full bg-[var(--chart-grid)]">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${(r.rewardNum / maxReward) * 100}%`,
                  background: PALETTE.blue,
                }}
              />
            </div>
            <span className="w-[52px] shrink-0 text-right text-[8.5px] font-extrabold text-ink-900">
              {r.avgReward}
            </span>
            <span className="w-[34px] shrink-0 text-right text-[9px] font-bold text-ink-500">
              {r.merit}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-2 grid grid-cols-2 gap-2 border-t border-[#eef2f6] pt-2">
        <div>
          <div className="text-[12px] font-extrabold leading-none text-ink-900">
            {p4pRingkas.rewardDiff}
          </div>
          <div className="mt-[2px] text-[7.5px] font-semibold leading-tight text-ink-500">
            {p4pRingkas.rewardDiffNote}
          </div>
        </div>
        <div>
          <div className="text-[12px] font-extrabold leading-none text-ink-900">
            {p4pRingkas.meritDiff}
          </div>
          <div className="mt-[2px] text-[7.5px] font-semibold leading-tight text-ink-500">
            {p4pRingkas.meritDiffNote}
          </div>
        </div>
      </div>

      <div className="mt-2 flex flex-col gap-[4px]">
        {rewardMisalignment.map((m) => (
          <div key={m.label} className="flex items-center justify-between gap-2">
            <span className="min-w-0 truncate text-[9px] font-semibold text-ink-600">
              {m.label} <span className="text-ink-400">· {m.note}</span>
            </span>
            <span
              className={`shrink-0 rounded px-1.5 py-[2px] text-[9.5px] font-extrabold leading-none tone-${m.tone}`}
            >
              {m.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
