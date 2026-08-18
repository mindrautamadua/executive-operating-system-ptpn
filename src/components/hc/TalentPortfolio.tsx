"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { flightRiskDrivers, nineBox, talentStats } from "@/lib/hc-data";
import { SectionHead } from "./SectionHead";
import { ScopeNote } from "../ui/ScopeNote";
import { WhyDrivers } from "./WhyDrivers";

const CELL_TONE = {
  strong: "bg-ptpn-green text-white",
  mid: "bg-[#dff2e7] text-ptpn-greenDark",
  soft: "bg-[#fdf3e0] text-[#b57a10]",
} as const;

export function TalentPortfolio() {
  const [showWhy, setShowWhy] = useState(false);

  return (
    <div className="card anim-rise px-4 pb-3.5 pt-3" style={{ "--d": "180ms" } as React.CSSProperties}>
      <SectionHead title="Talent Portfolio" action="Lihat Detail" href="/talent-intelligence/portfolio-9box" badge={<ScopeNote />} />

      <div className="mt-3 flex items-start gap-3">
        <div className="flex shrink-0 items-center gap-1.5">
          <div
            className="text-[9px] font-semibold text-ink-500"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            Performance
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-[7.5px] text-ink-400">High</span>
            <div className="grid grid-cols-3 gap-1">
              {nineBox.flat().map((cell, i) => (
                <div
                  key={i}
                  className={`flex h-[30px] w-[42px] items-center justify-center rounded-md text-[9.5px] font-bold ${CELL_TONE[cell.tone]}`}
                >
                  {cell.value}
                </div>
              ))}
            </div>
            <span className="text-[7.5px] text-ink-400">Low</span>
            <div className="flex w-full justify-between px-1 text-[7.5px] text-ink-400">
              <span>Low</span>
              <span>Medium</span>
              <span>High</span>
            </div>
            <div className="text-[9px] font-semibold text-ink-500">Potential</div>
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <div className="text-[9px] font-semibold leading-[1.35] text-ink-700">
            {talentStats.star.label}
          </div>
          <div className="mt-[3px] flex items-baseline gap-1.5">
            <span className="text-[20px] font-extrabold leading-none text-ptpn-green">
              {talentStats.star.value}
            </span>
            <span className="text-[9px] text-ink-500">{talentStats.star.unit}</span>
          </div>
          <div className="mt-2.5 flex flex-col gap-[7px]">
            {talentStats.rows.map((r) => {
              const isFlightRisk = r.label === "Flight Risk High";
              return (
                <div key={r.label} className="flex items-center justify-between gap-2">
                  {isFlightRisk ? (
                    <button
                      onClick={() => setShowWhy((s) => !s)}
                      className="flex items-center gap-1 text-[9px] text-ink-500 hover:text-ink-900"
                    >
                      {r.label}
                      <ChevronDown
                        size={10}
                        className={`text-ink-400 transition-transform ${showWhy ? "rotate-180" : ""}`}
                      />
                    </button>
                  ) : (
                    <span className="text-[9px] text-ink-500">{r.label}</span>
                  )}
                  <span
                    className={`text-[10px] font-bold ${
                      r.tone === "red" ? "text-[#ef4444]" : "text-ink-900"
                    }`}
                  >
                    {r.value}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {showWhy && (
        <div className="mt-2.5">
          <WhyDrivers drivers={flightRiskDrivers} />
        </div>
      )}

      <Link href="/talent-intelligence/pipeline-readiness" className="mt-3 block w-full text-center rounded-lg border border-[#e3e9ef] py-[6px] text-[9.5px] font-semibold text-ink-700 transition-colors hover:bg-[#f5f8fa]">
        Lihat Talent Pipeline
      </Link>
    </div>
  );
}
