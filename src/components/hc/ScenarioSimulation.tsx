"use client";

import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { scenarioNote, scenarioRows } from "@/lib/hc-data";
import { ScopeNote } from "../ui/ScopeNote";

export function ScenarioSimulation() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3.5 pt-3"
      style={{ "--d": "160ms" } as React.CSSProperties}
    >
      <div className="flex items-center justify-between gap-2">
        <h3 className="flex min-w-0 items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.05em] text-ink-900">
          <span>
            Scenario Simulation{" "}
            <span className="font-semibold normal-case tracking-normal text-ink-400">(What-if)</span>
          </span>
          <ScopeNote />
        </h3>
        <Link
          href="/scenario-simulation"
          className="flex shrink-0 cursor-pointer items-center gap-1 text-[9.5px] font-semibold text-ptpn-green hover:underline"
        >
          Lihat Semua <ArrowRight size={11} />
        </Link>
      </div>

      <div className="scroll-thin overflow-x-auto">
      <table className="mt-2 w-full border-collapse">
        <thead>
          <tr className="border-b border-[#f0f3f6] text-left text-[8.5px] font-semibold text-ink-400">
            <th className="pb-[6px] font-semibold">Skenario</th>
            <th className="pb-[6px] text-right font-semibold">
              Headcount
              <br />
              Growth
            </th>
            <th className="pb-[6px] text-right font-semibold">HC Cost Impact</th>
            <th className="pb-[6px] text-right font-semibold">
              Productivity
              <br />
              Impact
            </th>
            <th className="pb-[6px] pl-4 font-semibold">Keterangan</th>
          </tr>
        </thead>
        <tbody>
          {scenarioRows.map((r) => (
            <tr
              key={r.skenario}
              className={`border-b border-[#f5f8fa] last:border-0 ${
                r.recommended ? "bg-ptpn-greenLight/60" : ""
              }`}
            >
              <td
                className={`py-[7px] pl-1 text-[9.5px] font-semibold ${
                  r.recommended ? "text-ptpn-green" : "text-ink-700"
                }`}
              >
                {r.skenario}
              </td>
              <td className="py-[7px] text-right text-[9.5px] font-bold text-ink-900">
                {r.headcount}
              </td>
              <td className="py-[7px] text-right text-[9.5px] font-bold text-ink-900">{r.cost}</td>
              <td className="py-[7px] text-right text-[9.5px] font-bold text-ptpn-green">
                {r.productivity}
              </td>
              <td className="py-[7px] pl-4 text-[9px] leading-[1.35] text-ink-500">
                {r.keterangan}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      <div className="mt-auto flex items-center gap-2 rounded-lg bg-[#f8fafc] px-3 py-[7px]">
        <Star size={12} className="shrink-0 fill-[#f5a524] text-[#f5a524]" strokeWidth={0} />
        <span className="text-[9px] font-medium text-ink-700">{scenarioNote}</span>
      </div>
    </div>
  );
}
