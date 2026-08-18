"use client";

import { ChevronRight } from "lucide-react";
import { cascadeMap, type Rag } from "@/lib/skc-data";
import { SectionHead } from "@/components/hc/SectionHead";
import { ToneBadge, type BadgeTone } from "@/components/shared/ToneBadge";
import { useSubholding } from "@/components/SubholdingProvider";
import { filterBySubholding } from "@/lib/subholding";

const RAG_TONE: Record<Rag, BadgeTone> = {
  green: "good",
  amber: "warn",
  red: "bad",
};

const RAG_LABEL: Record<Rag, string> = {
  green: "Hijau",
  amber: "Kuning",
  red: "Merah",
};

/** Peta cascade KPI holding → target turunan subholding. */
export function KpiCascadeMap() {
  const { active, isFiltered, def } = useSubholding();
  // `entity` pada tiap target turunan adalah dimensi subholding baris cascade.
  const rows = cascadeMap
    .map((row) => ({
      ...row,
      cascade: filterBySubholding(row.cascade, active, (c) => c.entity),
    }))
    .filter((row) => row.cascade.length > 0);

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "300ms" } as React.CSSProperties}
    >
      <SectionHead title="Peta Cascade KPI Holding → Subholding" action="Lihat Semua Cascade" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {isFiltered
          ? `Keterkaitan ${rows.length} KPI Group Utama dengan Target Turunan ${def.label}`
          : "Keterkaitan 5 KPI Group Utama dengan Target Turunan PalmCo, SGN & PTPN I"}
      </p>

      <div className="scroll-thin mt-1.5 min-h-0 flex-1 overflow-y-auto pr-1">
        {rows.length === 0 && (
          <p className="text-[9px] text-ink-500">Tidak ada cascade KPI untuk cakupan ini.</p>
        )}
        <div className="flex flex-col gap-1.5">
          {rows.map((row) => (
            <div
              key={row.groupKpi}
              className="flex items-start gap-2.5 rounded-lg border border-[#eef2f6] bg-[#f5f8fa] px-2.5 py-2"
            >
              <div className="w-[196px] shrink-0">
                <div className="text-[9px] font-extrabold leading-snug text-ink-900">
                  {row.groupKpi}
                </div>
                <div className="mt-[2px] text-[9px] font-semibold text-ink-500">
                  {row.perspective}
                </div>
              </div>
              <ChevronRight size={12} className="mt-[3px] shrink-0 text-ink-400" />
              <div className="flex min-w-0 flex-1 flex-wrap items-center gap-1.5">
                {row.cascade.map((c) => (
                  <span
                    key={`${row.groupKpi}-${c.entity}`}
                    className="flex items-center gap-1.5 rounded-md border border-[#e3e9ef] bg-white px-2 py-[4px]"
                  >
                    <span className="text-[8.5px] font-extrabold text-ink-900">{c.entity}</span>
                    <span className="text-[8.5px] text-ink-500">{c.kpi}</span>
                    <ToneBadge label={RAG_LABEL[c.rag]} tone={RAG_TONE[c.rag]} />
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
