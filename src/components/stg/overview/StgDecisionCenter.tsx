"use client";

import { AlertCircle, AlertTriangle } from "lucide-react";
import { stgDecisions } from "@/lib/stg-data";
import { SectionHead } from "@/components/hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";
import { filterBySubholding } from "@/lib/subholding";
import { DecisionActions } from "@/components/shared/DecisionActions";

const TONE = {
  red: {
    icon: AlertCircle,
    iconCls: "text-[#ef4444]",
    pill: "bg-[#fdecec] text-[#ef4444]",
    wrap: "border-[#f6d5d5] bg-[#fdf5f5]",
  },
  amber: {
    icon: AlertTriangle,
    iconCls: "text-[#f5a524]",
    pill: "bg-[#fdf3e0] text-[#d98b06]",
    wrap: "border-[#f3e3c3] bg-[#fdf9f0]",
  },
} as const;

/** Keputusan Direksi strategis yang tertunda beserta eksposur nilainya. */
export function StgDecisionCenter() {
  const { active } = useSubholding();
  // Entitas penanggung jawab keputusan disebut pada judul/situasi (SGN, PTPN I);
  // keputusan tanpa penyebutan entitas berlaku lintas cakupan.
  const rows = filterBySubholding(stgDecisions, active, (d) => `${d.title} ${d.situation}`);

  return (
    <div
      className="card anim-rise px-4 pb-3.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Strategy Decision Center" action="Lihat Semua" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {rows.length} Keputusan Direksi Overdue — Penghambat Eksekusi RJPP
      </p>

      {rows.length === 0 && (
        <p className="mt-2.5 text-[9px] text-ink-500">
          Tidak ada keputusan overdue untuk cakupan ini.
        </p>
      )}

      <div className="mt-2.5 flex flex-col gap-2">
        {rows.map((d) => {
          const t = TONE[d.tone];
          const Icon = t.icon;
          return (
            <div key={d.title} className={`rounded-xl border px-3 pb-2.5 pt-2.5 ${t.wrap}`}>
              <div className="flex items-start justify-between gap-2">
                <div className="flex min-w-0 items-center gap-1.5">
                  <Icon size={13} className={`shrink-0 ${t.iconCls}`} />
                  <span className="truncate text-[10px] font-bold text-ink-900" title={d.title}>
                    {d.title}
                  </span>
                </div>
                <span className={`shrink-0 rounded px-1.5 py-[2px] text-[9px] font-bold ${t.pill}`}>
                  {d.exposure}
                </span>
              </div>
              <p className="mt-1.5 text-[9px] leading-[1.45] text-ink-500">{d.situation}</p>
              <p className="mt-1.5 text-[8.5px] leading-[1.45] text-ink-700">
                <span className="font-bold text-ink-900">Keputusan: </span>
                {d.decision}
              </p>
              <div className="mt-1.5 flex flex-wrap items-center gap-1.5 text-[8.5px] font-semibold text-ink-400">
                <span className="rounded bg-[#ef4444] px-1.5 py-[1px] text-[7.5px] font-bold uppercase tracking-[0.04em] text-white">
                  {d.due}
                </span>
                {/* Decision Value at Risk: delay = biaya, bukan sekadar umur. */}
                <span className="rounded bg-[#fdf3e0] px-1.5 py-[1px] text-[7.5px] font-bold text-[#d98b06]">
                  {d.delayCost}
                </span>
              </div>
              <DecisionActions id={d.title} />
            </div>
          );
        })}
      </div>

      <button className="mt-2.5 w-full rounded-lg border border-[#e3e9ef] py-[6px] text-[9.5px] font-semibold text-ink-700 transition-colors hover:bg-[#f5f8fa]">
        Lihat Semua Decision
      </button>
    </div>
  );
}
