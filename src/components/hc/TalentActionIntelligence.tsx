"use client";

import Link from "next/link";
import { Crosshair, Sparkles } from "lucide-react";
import { talentActions } from "@/lib/hc-data";
import { SectionHead } from "./SectionHead";
import { ScopeNote } from "../ui/ScopeNote";

/** Jawaban "who should we act on": talent kritis + aksi yang direkomendasikan. */
export function TalentActionIntelligence() {
  return (
    <div className="card anim-rise px-4 pb-3.5 pt-3" style={{ "--d": "200ms" } as React.CSSProperties}>
      <SectionHead title="Talent Action Intelligence" action="Lihat Semua" href="/talent-intelligence/decisions" badge={<ScopeNote />} />

      <div className="mt-3 rounded-xl border border-[#f6d5d5] bg-[#fdf5f5] px-3 py-2.5">
        <div className="flex items-center gap-2">
          <span className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-[#fdecec]">
            <Crosshair size={14} className="text-[#ef4444]" />
          </span>
          <div className="min-w-0">
            <div className="flex items-baseline gap-1.5">
              <span className="text-[18px] font-extrabold leading-none text-[#ef4444]">
                {talentActions.headline.value}
              </span>
              <span className="truncate text-[9.5px] font-bold text-ink-900">
                {talentActions.headline.label}
              </span>
            </div>
            <div className="mt-[3px] text-[9px] text-ink-500">{talentActions.headline.sub}</div>
          </div>
        </div>
        <div className="mt-2 flex items-center justify-between border-t border-[#f6d5d5] pt-2">
          <span className="text-[8.5px] font-semibold text-ink-500">
            {talentActions.exposure.label}
          </span>
          <span className="text-[10px] font-extrabold text-[#ef4444]">
            {talentActions.exposure.value}
          </span>
        </div>
      </div>

      <div className="mt-2.5 flex flex-col gap-[7px]">
        {talentActions.rows.map((r) => (
          <div key={r.label} className="flex items-center justify-between gap-2">
            <span className="text-[9px] text-ink-500">{r.label}</span>
            <span className="text-[10px] font-bold text-ink-900">{r.value}</span>
          </div>
        ))}
      </div>

      <div className="mt-2.5 flex items-start gap-2 rounded-xl bg-ptpn-greenLight px-3 py-2.5">
        <Sparkles size={12} className="mt-[1px] shrink-0 text-ptpn-green" />
        <p className="text-[9px] leading-[1.45] text-ink-900">
          <span className="font-bold text-ptpn-green">Recommended Action: </span>
          {talentActions.recommendation}
        </p>
      </div>

      <Link href="/talent-intelligence/decisions" className="mt-2.5 block w-full text-center rounded-lg border border-[#e3e9ef] py-[6px] text-[9.5px] font-semibold text-ink-700 transition-colors hover:bg-[#f5f8fa]">
        Lihat Talent Actions
      </Link>
    </div>
  );
}
