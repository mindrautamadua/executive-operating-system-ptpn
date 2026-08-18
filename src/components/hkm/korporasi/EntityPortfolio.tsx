"use client";

import { entityPortfolio, entityStats, type HkmEntityStatus } from "@/lib/hkm-data-detail";
import { SectionHead } from "@/components/hc/SectionHead";
import { ToneBadge, type BadgeTone } from "@/components/shared/ToneBadge";
import { useSubholding } from "@/components/SubholdingProvider";
import { filterBySubholding } from "@/lib/subholding";

const STATUS_TONE: Record<HkmEntityStatus, BadgeTone> = {
  Aktif: "good",
  Dorman: "warn",
  "Proses Likuidasi": "bad",
};

const pct = (v: number) => `${v.toLocaleString("id-ID", { minimumFractionDigits: 1 })}%`;

/** Tabel 24 entitas anak & afiliasi; scrollable, header sticky. */
export function EntityPortfolio() {
  const { active, isFiltered, def } = useSubholding();
  // Kolom `induk` menyebut subholding pemilik tiap entitas anak/afiliasi.
  const rows = filterBySubholding(entityPortfolio, active, (e) => e.induk);
  const aktif = rows.filter((e) => e.status === "Aktif").length;
  const dorman = rows.filter((e) => e.status === "Dorman").length;
  const likuidasi = rows.filter((e) => e.status === "Proses Likuidasi").length;

  return (
    <div
      className="card anim-rise flex h-full min-h-0 flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Portofolio Entitas Anak & Afiliasi" action="Lihat Semua" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {isFiltered ? (
          <>
            {rows.length} Entitas di Bawah {def.label} · {aktif} Aktif · {dorman} Dorman ·{" "}
            {likuidasi} Proses Likuidasi
          </>
        ) : (
          <>
            {entityStats.total} Entitas di Luar 3 Subholding · {entityStats.aktif} Aktif ·{" "}
            {entityStats.dorman} Dorman · {entityStats.likuidasi} Proses Likuidasi
          </>
        )}
      </p>

      <div className="scroll-thin mt-2 min-h-0 flex-1 overflow-y-auto">
        <div className="scroll-thin overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 bg-[var(--surface)]">
            <tr className="border-b border-[#eef2f6] text-left">
              <th className="pb-1.5 text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
                Entitas
              </th>
              <th className="pb-1.5 text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
                Induk
              </th>
              <th className="pb-1.5 text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
                Bidang Usaha
              </th>
              <th className="pb-1.5 text-right text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
                Kepemilikan
              </th>
              <th className="pb-1.5 text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
                Status
              </th>
              <th className="pb-1.5 text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
                Kontribusi
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((e) => (
              <tr key={e.entitas} className="border-b border-[#f4f7fa]">
                <td className="py-[7px] pr-2 text-[9.5px] font-bold text-ink-900">{e.entitas}</td>
                <td className="py-[7px] pr-2 text-[9px] text-ink-700">{e.induk}</td>
                <td className="py-[7px] pr-2 text-[8.5px] text-ink-500">{e.bidang}</td>
                <td className="whitespace-nowrap py-[7px] pr-2 text-right text-[9px] font-semibold tabular-nums text-ink-700">
                  {pct(e.kepemilikanPct)}
                </td>
                <td className="py-[7px] pr-2">
                  <ToneBadge label={e.status} tone={STATUS_TONE[e.status]} />
                </td>
                <td className="py-[7px] text-[8.5px] text-ink-500">{e.kontribusi}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>

      <p className="pt-1.5 text-[9px] leading-snug text-ink-500">{entityStats.note}</p>
    </div>
  );
}
