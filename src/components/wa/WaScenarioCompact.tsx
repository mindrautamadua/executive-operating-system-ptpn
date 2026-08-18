"use client";

import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { scenarioRows } from "@/lib/hc-data";
import { ScopeNote } from "../ui/ScopeNote";

/** Ringkasan skenario workforce 2028; simulasi interaktif di Scenario Simulation. */
export function WaScenarioCompact() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <div className="flex items-center justify-between gap-2">
        <h3 className="flex min-w-0 items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.05em] text-ink-900">
          <span>
            Workforce Scenarios{" "}
            <span className="font-semibold normal-case tracking-normal text-ink-400">
              (Horizon 2028)
            </span>
          </span>
          <ScopeNote />
        </h3>
        <Link
          href="/scenario-simulation"
          className="flex shrink-0 items-center gap-1 text-[9.5px] font-semibold text-ptpn-green hover:underline"
        >
          Simulasikan <ArrowRight size={11} />
        </Link>
      </div>

      <div className="mt-2 grid min-h-0 flex-1 grid-cols-2 grid-rows-2 gap-2">
        {scenarioRows.map((r) => (
          <div
            key={r.skenario}
            className={`rounded-xl px-2.5 py-2 ${
              r.recommended
                ? "border border-ptpn-green/40 bg-ptpn-greenLight/60"
                : "bg-[#f8fafc]"
            }`}
          >
            <div className="flex items-center justify-between gap-1.5">
              <span
                className={`truncate text-[8.5px] font-bold ${
                  r.recommended ? "text-ptpn-green" : "text-ink-700"
                }`}
              >
                {r.skenario}
              </span>
              {r.recommended && (
                <Star size={10} className="shrink-0 fill-[#f5a524] text-[#f5a524]" strokeWidth={0} />
              )}
            </div>
            <div className="mt-1.5 grid grid-cols-2 md:grid-cols-3 gap-1">
              <div>
                <div className="text-[7.5px] text-ink-400">HC</div>
                <div className="text-[9.5px] font-extrabold text-ink-900">{r.headcount}</div>
              </div>
              <div>
                <div className="text-[7.5px] text-ink-400">Cost</div>
                <div className="text-[9.5px] font-extrabold text-ink-900">{r.cost}</div>
              </div>
              <div>
                <div className="text-[7.5px] text-ink-400">Produktivitas</div>
                <div className="text-[9.5px] font-extrabold text-ptpn-green">{r.productivity}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
