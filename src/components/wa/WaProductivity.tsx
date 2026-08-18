"use client";

import Link from "next/link";
import { ArrowRight, ClipboardCheck } from "lucide-react";
import { productivityRows } from "@/lib/hc-data";
import { Delta } from "../ui/Delta";
import { ScopeNote } from "../ui/ScopeNote";

/** Baris terpilih dari model produktivitas HC (sumber tunggal: hc-data). */
const ROWS = productivityRows.filter((r) =>
  [
    "Revenue / Employee (M Rp)",
    "EBITDA / Employee (M Rp)",
    "Production (Ton) / Employee",
    "Labor Cost / Ton (Rp)",
    "Labor Cost / Revenue (%)",
  ].includes(r.indikator),
);

/** Ringkasan produktivitas workforce; detail di halaman People Productivity. */
export function WaProductivity() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <div className="flex items-center justify-between gap-2">
        <h3 className="flex min-w-0 items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.05em] text-ink-900">
          <span>
            Workforce Productivity
          </span>
          <ScopeNote />
        </h3>
        <Link
          href="/people-productivity"
          className="flex shrink-0 items-center gap-1 text-[9.5px] font-semibold text-ptpn-green hover:underline"
        >
          Lihat Detail <ArrowRight size={11} />
        </Link>
      </div>

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
          {ROWS.map((r) => (
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

      <div className="mt-auto flex items-center gap-2 rounded-lg bg-[#fdf9f0] px-3 py-[7px]">
        <ClipboardCheck size={12} className="shrink-0 text-[#d98b06]" />
        <span className="text-[9px] font-medium text-ink-700">
          Workforce +2,4% vs output value +1,1% di Palm Oil Operations — produktivitas belum
          mengimbangi pertumbuhan headcount unit tersebut.
        </span>
      </div>
    </div>
  );
}
