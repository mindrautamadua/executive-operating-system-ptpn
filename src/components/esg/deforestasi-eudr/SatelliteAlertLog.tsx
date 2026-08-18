"use client";

import { satelliteAlerts, satelliteAlertSummary } from "@/lib/esg-data-detail";
import { ToneBadge, type BadgeTone } from "@/components/shared/ToneBadge";
import { SectionHead } from "@/components/hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";

const STATUS_TONE: Record<string, BadgeTone> = {
  "Investigasi lapangan": "warn",
  "Closed — false positive": "good",
};

const STATUS_LABEL: Record<string, string> = {
  "Investigasi lapangan": "Investigasi",
  "Closed — false positive": "False positive",
};

/** Log alert deforestasi satelit (14 YTD) — 5 alert terkini + ringkasan. */
export function SatelliteAlertLog() {
  const { active, def } = useSubholding();
  // Seluruh alert berlokasi di Regional 1–7 (konsesi kebun sawit) — cakupan PalmCo.
  const outOfScope = active !== "all" && active !== "palmco";

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Log Alert Satelit" action="Lihat Semua" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {outOfScope ? (
          `Alert deforestasi dipantau di konsesi sawit PalmCo — di luar cakupan ${def.label}`
        ) : (
          <>
            {satelliteAlertSummary.ytdTotal} alert YTD · {satelliteAlertSummary.investigasi}{" "}
            investigasi · {satelliteAlertSummary.falsePositiveClosed} false positive · verifikasi
            rata-rata {satelliteAlertSummary.avgVerifikasiHari} hari
          </>
        )}
      </p>

      <div
        className="mt-2 min-h-0 flex-1 overflow-hidden transition-opacity"
        style={{ opacity: outOfScope ? 0.25 : 1 }}
      >
        <div className="scroll-thin overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-[#eef2f6] text-[8.5px] font-semibold text-ink-500">
              <th className="pb-[6px] text-left font-semibold">ID Alert</th>
              <th className="pb-[6px] text-left font-semibold">Lokasi</th>
              <th className="pb-[6px] text-left font-semibold">Tanggal</th>
              <th className="pb-[6px] text-right font-semibold">Luas (ha)</th>
              <th className="pb-[6px] pl-3 text-left font-semibold">Sumber</th>
              <th className="pb-[6px] pl-3 text-left font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {satelliteAlerts.map((a) => (
              <tr
                key={a.id}
                className="border-b border-[#f5f8fa] transition-colors last:border-0 hover:bg-[#f5f8fa]"
              >
                <td className="whitespace-nowrap py-[7px] text-[9.5px] font-bold text-ink-900">
                  {a.id}
                </td>
                <td className="max-w-0 truncate py-[7px] text-[9.5px] text-ink-700" title={a.lokasi}>
                  {a.lokasi}
                </td>
                <td className="whitespace-nowrap py-[7px] text-[9.5px] text-ink-700">
                  {a.tanggal}
                </td>
                <td className="py-[7px] text-right text-[9.5px] font-semibold tabular-nums text-ink-900">
                  {a.luasHa.toLocaleString("id-ID", { minimumFractionDigits: 1 })}
                </td>
                <td className="whitespace-nowrap py-[7px] pl-3 text-[9px] text-ink-500">
                  {a.sumber}
                </td>
                <td className="py-[7px] pl-3">
                  <ToneBadge label={STATUS_LABEL[a.status]} tone={STATUS_TONE[a.status]} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>

      <p className="mt-1 border-t border-[#f5f8fa] pt-1.5 text-[8.5px] leading-snug text-ink-500">
        Menampilkan 5 alert terkini; 9 alert lain YTD telah ditutup sebagai false positive
        (replanting &amp; tumbang alam).
      </p>
    </div>
  );
}
