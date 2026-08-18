"use client";

import { CircleHelp, MapPin } from "lucide-react";
import { redKpiWatch } from "@/lib/dek-data-detail";
import { SectionHead } from "@/components/hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";
import { filterBySubholding } from "@/lib/subholding";

/**
 * Empat KPI berstatus merah disajikan sebagai pertanyaan pengawasan yang perlu
 * diajukan Dewan Komisaris — bukan daftar aksi perbaikan (itu ranah Direksi).
 */
export function RedKpiWatch() {
  const { active, isFiltered, def } = useSubholding();
  // Sebagian KPI merah menyebut subholding pada namanya (mis. "EBITDA Margin
  // SGN"); KPI korporat tanpa penyebutan berlaku untuk seluruh cakupan.
  const rows = filterBySubholding(redKpiWatch, active, (r) => r.kpi);

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "180ms" } as React.CSSProperties}
    >
      <SectionHead title="Pertanyaan Pengawasan atas 4 KPI Merah" action="Lihat Scorecard" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {isFiltered
          ? `Butir yang Perlu Ditanyakan Dewan Komisaris · ${rows.length} KPI dalam cakupan ${def.label}`
          : "Butir yang Perlu Ditanyakan Dewan Komisaris kepada Direksi · Bukan Daftar Aksi"}
      </p>

      <div className="scroll-thin mt-2 grid min-h-0 flex-1 grid-cols-2 gap-2 overflow-y-auto pr-1">
        {rows.map((r) => (
          <div
            key={r.kpi}
            className="flex flex-col rounded-xl border border-[#f6d5d5] bg-[#fdf5f5] px-3 pb-2.5 pt-2.5"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <div className="truncate text-[10px] font-bold text-ink-900">{r.kpi}</div>
                <div className="mt-[2px] text-[9px] font-semibold text-ink-500">
                  {r.direktorat}
                </div>
              </div>
              <span className="shrink-0 rounded bg-[#fdecec] px-1.5 py-[2px] text-[9px] font-bold text-[#ef4444]">
                Merah {r.triwulanMerah} TW
              </span>
            </div>

            <p className="mt-1.5 text-[8.5px] leading-[1.45] text-ink-500">{r.ringkasanGap}</p>

            <p className="mt-1.5 flex items-start gap-1 text-[9px] leading-[1.45] text-ink-900">
              <CircleHelp size={11} className="mt-[1px] shrink-0 text-[#ef4444]" />
              <span>
                <span className="font-bold">Pertanyaan pengawasan:</span> {r.pertanyaanPengawasan}
              </span>
            </p>

            <div className="mt-auto flex items-center gap-1 pt-1.5 text-[9px] font-semibold text-ink-500">
              <MapPin size={9} className="shrink-0" />
              Diajukan pada: {r.forum}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
