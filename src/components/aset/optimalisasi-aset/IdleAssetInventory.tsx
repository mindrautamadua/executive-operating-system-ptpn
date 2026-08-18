"use client";

import {
  IDLE_TOTAL_HA,
  IDLE_TOTAL_RP_M,
  IDLE_TOTAL_UNIT,
  idleAssetInventory,
  idleAssetNote,
} from "@/lib/aop-data";
import { SectionHead } from "@/components/hc/SectionHead";
import { ToneBadge, type BadgeTone } from "@/components/shared/ToneBadge";
import { useSubholding } from "@/components/SubholdingProvider";
import { filterBySubholding } from "@/lib/subholding";

const rp = (v: number) => v.toLocaleString("id-ID");

/**
 * Pemetaan domain: lokasi bernama "Regional n" adalah kebun sawit PalmCo;
 * "(SGN)" / lahan tebu milik SugarCo; "(PTPN I)" milik SupportingCo. Baris
 * lintas subholding (mis. aset idle tersebar, wisma & kantor) tetap tampil.
 */
const lokasiSubholding = (lokasi: string) =>
  lokasi.includes("Regional ") ? "PalmCo" : lokasi;

const JENIS_TONE: Record<string, BadgeTone> = {
  Lahan: "good",
  "Bangunan & Lahan": "info",
  Bangunan: "neutral",
};

/** Inventarisasi aset idle: 34,0 rb ha + 128 unit bangunan senilai Rp 8,9 T. */
export function IdleAssetInventory() {
  const { active, isFiltered, def } = useSubholding();
  const rows = filterBySubholding(idleAssetInventory, active, (a) => lokasiSubholding(a.lokasi));
  const luasRows = rows.reduce((s, a) => s + a.luasHa, 0);
  const unitRows = rows.reduce((s, a) => s + a.unitBangunan, 0);
  const nilaiRows = rows.reduce((s, a) => s + a.nilaiRpM, 0);

  return (
    <div
      className="card anim-rise flex h-full min-h-0 flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Inventarisasi Aset Idle" action="Lihat Semua" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {isFiltered ? (
          <>
            {def.label} &amp; lintas cakupan: {rp(luasRows)} Ha · {unitRows} Unit Bangunan · Rp{" "}
            {rp(nilaiRows)} M dari Rp {rp(IDLE_TOTAL_RP_M)} M grup
          </>
        ) : (
          <>
            {rp(IDLE_TOTAL_HA)} Ha · {IDLE_TOTAL_UNIT} Unit Bangunan · Nilai Indikatif KJPP Rp{" "}
            {rp(IDLE_TOTAL_RP_M)} M
          </>
        )}
      </p>

      <div className="scroll-thin mt-2 min-h-0 flex-1 overflow-y-auto pr-1">
        <div className="scroll-thin overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 bg-[var(--surface)]">
            <tr className="border-b border-[#eef2f6] text-left">
              <th className="pb-1.5 text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
                Lokasi
              </th>
              <th className="pb-1.5 text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
                Jenis
              </th>
              <th className="pb-1.5 text-right text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
                Luas / Unit
              </th>
              <th className="pb-1.5 text-right text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
                Nilai
              </th>
              <th className="pb-1.5 text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
                Opsi Monetisasi
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((a) => (
              <tr key={a.lokasi} className="border-b border-[#f4f7fa] align-top">
                <td className="py-[7px] pr-2 text-[9.5px] font-bold text-ink-900">{a.lokasi}</td>
                <td className="py-[7px] pr-2">
                  <ToneBadge label={a.jenis} tone={JENIS_TONE[a.jenis] ?? "neutral"} />
                </td>
                <td className="whitespace-nowrap py-[7px] pr-2 text-right text-[9px] text-ink-700">
                  {rp(a.luasHa)} ha
                  {a.unitBangunan > 0 && (
                    <span className="block text-[9px] text-ink-500">{a.unitBangunan} unit</span>
                  )}
                </td>
                <td className="whitespace-nowrap py-[7px] pr-2 text-right text-[9px] font-bold text-ink-900">
                  Rp {rp(a.nilaiRpM)} M
                </td>
                <td className="py-[7px] text-[8.5px] leading-snug text-ink-500">
                  {a.opsiMonetisasi}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>

      <p className="pt-1.5 text-[9px] leading-snug text-ink-500">{idleAssetNote}</p>
    </div>
  );
}
