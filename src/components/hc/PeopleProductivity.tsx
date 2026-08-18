"use client";

import { ClipboardCheck } from "lucide-react";
import { productivityNote, productivityRows } from "@/lib/hc-data";
import { Delta } from "../ui/Delta";
import { SectionHead } from "./SectionHead";
import { ScopeNote } from "../ui/ScopeNote";

export function PeopleProductivity() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3.5 pt-3"
      style={{ "--d": "140ms" } as React.CSSProperties}
    >
      <SectionHead title="People Productivity" action="Lihat Detail" href="/people-productivity" badge={<ScopeNote />} />

      <div className="scroll-thin overflow-x-auto">
      <table className="mt-2 w-full border-collapse">
        <thead>
          <tr className="border-b border-[#f0f3f6] text-left text-[8.5px] font-semibold text-ink-400">
            <th className="pb-[6px] font-semibold">Indikator</th>
            <th className="pb-[6px] text-right font-semibold">YTD Mei 2026</th>
            <th className="pb-[6px] text-right font-semibold">YoY</th>
            <th className="pb-[6px] text-right font-semibold">Target 2026</th>
          </tr>
        </thead>
        <tbody>
          {productivityRows.map((r) => (
            <tr key={r.indikator} className="border-b border-[#f5f8fa] last:border-0">
              <td className="py-[5.5px] text-[9.5px] font-medium text-ink-700">{r.indikator}</td>
              <td className="py-[5.5px] text-right text-[9.5px] font-bold text-ink-900">{r.ytd}</td>
              <td className="py-[5.5px] text-right">
                <Delta value={r.yoy} trend={r.yoyTrend} tone={r.yoyTone} size={9.5} />
              </td>
              <td className="py-[5.5px] text-right text-[9.5px] text-ink-500">{r.target}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      <div className="mt-auto flex items-center gap-2 rounded-lg bg-ptpn-greenLight px-3 py-[7px]">
        <ClipboardCheck size={12} className="shrink-0 text-ptpn-green" />
        <span className="text-[9px] font-medium text-ink-700">{productivityNote}</span>
      </div>
    </div>
  );
}
