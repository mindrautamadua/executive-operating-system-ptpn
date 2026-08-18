"use client";

import Link from "next/link";
import { ArrowRight, AlertTriangle } from "lucide-react";
import { criticalTalentRisk } from "@/lib/comp-data";
import { ScopeNote } from "@/components/ui/ScopeNote";

/**
 * Critical Talent Compensation Risk: funnel critical talent → under-market →
 * high performer/HiPo underpaid, plus retention premium economics
 * (adjustment vs replacement cost). Jembatan Compensation ↔ Talent ↔ People Risk.
 */
export function CriticalTalentCompRisk() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "400ms" } as React.CSSProperties}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="card-title-navy flex items-center gap-1.5">
          <AlertTriangle size={13} className="text-[#b91c1c]" />
          Critical Talent Compensation Risk
          <ScopeNote />
        </h3>
        <span className="shrink-0 rounded px-1.5 py-[2px] text-[9px] font-bold leading-none tone-red">
          {criticalTalentRisk.level}
        </span>
      </div>

      <ul className="mt-2.5 flex min-h-0 flex-1 flex-col justify-between gap-[3px]">
        {criticalTalentRisk.funnel.map((f, i) => (
          <li key={f.label} className="flex shrink-0 items-center gap-2">
            <span className="w-[142px] shrink-0 truncate text-[9px] font-semibold text-ink-700">
              {f.label}
            </span>
            <div className="h-[7px] min-w-0 flex-1 overflow-hidden rounded-full bg-[var(--chart-grid)]">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${Math.max(f.pct, 3)}%`,
                  background: i >= 3 ? "#ef4444" : i >= 1 ? "#f5a524" : "#3b7ded",
                }}
              />
            </div>
            <span className="w-[36px] shrink-0 text-right text-[9px] font-extrabold text-ink-900">
              {f.value}
            </span>
          </li>
        ))}
      </ul>

      <ul className="mt-2 flex flex-col gap-[3px] border-t border-[#eef2f6] pt-1.5">
        {criticalTalentRisk.ekonomi.map((e) => (
          <li key={e.label} className="flex items-center justify-between gap-2">
            <span className="min-w-0 truncate text-[9px] font-semibold text-ink-500">{e.label}</span>
            <span className="shrink-0 text-[8.5px] font-extrabold text-ink-900">{e.value}</span>
          </li>
        ))}
      </ul>
      <p className="mt-1 text-[9px] font-semibold leading-snug text-[#0f7a44]">
        {criticalTalentRisk.kesimpulan}
      </p>

      <div className="mt-1.5 flex gap-1.5">
        <Link
          href="/talent-intelligence"
          className="flex flex-1 items-center justify-center gap-1 rounded-lg border border-[#e3e9ef] bg-[#f8fafc] py-[4px] text-[9px] font-semibold text-ptpn-greenDark transition-colors hover:bg-[#eef4f0]"
        >
          Talent Intelligence <ArrowRight size={9} />
        </Link>
        <Link
          href="/people-risk-radar"
          className="flex flex-1 items-center justify-center gap-1 rounded-lg border border-[#e3e9ef] bg-[#f8fafc] py-[4px] text-[9px] font-semibold text-ptpn-greenDark transition-colors hover:bg-[#eef4f0]"
        >
          People Risk Radar <ArrowRight size={9} />
        </Link>
      </div>
    </div>
  );
}
