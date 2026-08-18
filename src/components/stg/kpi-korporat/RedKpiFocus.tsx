"use client";

import { CircleAlert } from "lucide-react";
import { redFocus } from "@/lib/skc-data";
import { SectionHead } from "@/components/hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";
import { filterBySubholding } from "@/lib/subholding";

/** Fokus 4 KPI merah: gap, akar masalah, aksi, dan pemilik. */
export function RedKpiFocus() {
  const { active } = useSubholding();
  // `owner` (PIC) menyebut entitas, mis. "Dir. Produksi SGN".
  const rows = filterBySubholding(redFocus, active, (r) => r.owner);

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "240ms" } as React.CSSProperties}
    >
      <SectionHead title="Fokus KPI Merah" action="Lihat Recovery Plan" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {rows.length} KPI Merah — Akar Masalah &amp; Aksi Perbaikan Terjadwal
      </p>

      <div className="scroll-thin mt-1.5 min-h-0 flex-1 overflow-y-auto pr-1">
        {rows.length === 0 && (
          <p className="text-[9px] text-ink-500">Tidak ada KPI merah untuk cakupan ini.</p>
        )}
        <div className="grid grid-cols-2 gap-2">
          {rows.map((r) => (
            <div key={r.name} className="rounded-lg border border-[#f5d9d9] bg-[#fdecec] p-2">
              <div className="flex items-start gap-1.5">
                <CircleAlert size={11} strokeWidth={2} className="mt-[1px] shrink-0 text-[#ef4444]" />
                <div className="min-w-0">
                  <div className="text-[9px] font-extrabold leading-snug text-ink-900">
                    {r.name}
                  </div>
                  <div className="mt-[2px] text-[9px] font-semibold leading-snug text-[#ef4444]">
                    {r.gap}
                  </div>
                </div>
              </div>
              <p className="mt-1.5 text-[9px] leading-snug text-ink-500">
                <span className="font-bold text-ink-700">Akar masalah:</span> {r.rootCause}
              </p>
              <p className="mt-[3px] text-[9px] leading-snug text-ink-700">
                <span className="font-bold text-ptpn-green">Aksi:</span> {r.action}
              </p>
              <div className="mt-1.5 border-t border-[#f5d9d9] pt-1 text-[9px] font-semibold text-ink-500">
                PIC: {r.owner}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
