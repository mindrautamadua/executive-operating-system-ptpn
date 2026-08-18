"use client";

import { AlertTriangle } from "lucide-react";
import { expiryCalendar } from "@/lib/hkm-data";
import type { HkmProcessStatus } from "@/lib/hkm-data";
import { SectionHead } from "@/components/hc/SectionHead";
import { ToneBadge, type BadgeTone } from "@/components/shared/ToneBadge";
import { useSubholding } from "@/components/SubholdingProvider";
import { filterBySubholding } from "@/lib/subholding";

const STATUS_TONE: Record<HkmProcessStatus, BadgeTone> = {
  "Belum Diproses": "bad",
  "Dalam Proses": "info",
  "Menunggu Instansi": "warn",
  Terbit: "good",
  Terlambat: "bad",
};

/** Kalender kedaluwarsa 43 izin yang berakhir ≤6 bulan (scrollable). */
export function ExpiryCalendar() {
  const { active, isFiltered, def } = useSubholding();
  // Kolom `unit` sebagian menyebut subholding pemilik izin (mis. "SGN — PG
  // Djatiroto"); unit yang hanya menyebut regional tidak dipetakan ke satu
  // subholding sehingga tetap tampil di semua cakupan.
  const rows = filterBySubholding(expiryCalendar, active, (r) => r.unit);
  const totalKritikal = rows.filter((r) => r.kritikal).length;
  const belumDiproses = rows.filter((r) => r.status === "Belum Diproses").length;

  return (
    <div
      className="card anim-rise flex h-full min-h-0 flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "90ms" } as React.CSSProperties}
    >
      <SectionHead title="Kalender Kedaluwarsa Izin" action="Lihat Semua" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {rows.length} Izin Berakhir ≤6 Bulan (Jun–Nov 2026) · {totalKritikal} kritikal operasi ·{" "}
        {belumDiproses} belum diproses{isFiltered ? ` · cakupan ${def.label}` : ""}
      </p>

      <div className="scroll-thin mt-2 min-h-0 flex-1 overflow-y-auto pr-1">
        <div className="scroll-thin overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 bg-[var(--surface)]">
            <tr className="border-b border-[#eef2f6] text-[8.5px] font-semibold text-ink-500">
              <th className="pb-[6px] text-left font-semibold">Izin</th>
              <th className="pb-[6px] pl-3 text-left font-semibold">Unit</th>
              <th className="pb-[6px] pl-3 text-left font-semibold">Berakhir</th>
              <th className="pb-[6px] pl-3 text-left font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr
                key={`${r.izin}-${r.unit}-${r.berakhir}`}
                className="border-b border-[#f5f8fa] transition-colors last:border-0 hover:bg-[#f5f8fa]"
              >
                <td className="max-w-0 py-[7px] pr-2">
                  <div className="flex items-center gap-1">
                    {r.kritikal && (
                      <AlertTriangle size={9} className="shrink-0 text-[#ef4444]" aria-label="Kritikal operasi" />
                    )}
                    <span className="truncate text-[9.5px] font-bold text-ink-900" title={r.izin}>
                      {r.izin}
                    </span>
                  </div>
                  <div className="mt-[2px] truncate text-[9px] text-ink-500">{r.domain}</div>
                </td>
                <td className="max-w-0 truncate py-[7px] pl-3 text-[9px] text-ink-700" title={r.unit}>
                  {r.unit}
                </td>
                <td className="whitespace-nowrap py-[7px] pl-3 text-[9.5px] font-semibold tabular-nums text-ink-900">
                  {r.berakhir}
                </td>
                <td className="py-[7px] pl-3">
                  <ToneBadge label={r.status} tone={STATUS_TONE[r.status]} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>

      <p className="mt-1 border-t border-[#f5f8fa] pt-1.5 text-[9px] leading-snug text-ink-500">
        Ikon merah menandai izin yang kedaluwarsanya menghentikan operasi unit; Agustus 2026
        menampung 11 izin — beban bulanan tertinggi.
      </p>
    </div>
  );
}
