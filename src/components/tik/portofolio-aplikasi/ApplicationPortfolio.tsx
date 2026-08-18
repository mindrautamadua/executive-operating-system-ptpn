"use client";

import { applicationPortfolio, timeDistribution, type TimeStatus } from "@/lib/tik-data-detail";
import { SectionHead } from "@/components/hc/SectionHead";
import { ToneBadge, type BadgeTone } from "@/components/shared/ToneBadge";
import { useSubholding } from "@/components/SubholdingProvider";
import { filterBySubholding } from "@/lib/subholding";

const TIME_TONE: Record<TimeStatus, BadgeTone> = {
  Invest: "good",
  Tolerate: "neutral",
  Migrate: "info",
  Eliminate: "bad",
};

const KRITIKALITAS_TONE: Record<string, string> = {
  Kritikal: "text-[#ef4444]",
  Tinggi: "text-[#d98b06]",
  Sedang: "text-ink-700",
  Rendah: "text-ink-400",
};

const angka = (v: number) => v.toLocaleString("id-ID");

export function ApplicationPortfolio() {
  const { active, isFiltered, def } = useSubholding();
  // Sebagian aplikasi menyebut subholding pemiliknya pada namanya (mis. "Sistem
  // Akuntansi Legacy PTPN I"); aplikasi grup tanpa penyebutan tetap tampil.
  const rows = filterBySubholding(applicationPortfolio, active, (a) => a.aplikasi);

  return (
    <div
      className="card anim-rise flex h-full min-h-0 flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Portofolio Aplikasi Inti (TIME)" action="Lihat Semua" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {isFiltered
          ? `${rows.length} Aplikasi dalam cakupan ${def.label} · Kritikalitas, Umur & Status TIME`
          : "14 Aplikasi Terpilih dari 68 Aplikasi Inti · Kritikalitas, Umur & Status TIME"}
      </p>

      <div className="scroll-thin mt-2 min-h-0 flex-1 overflow-y-auto">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 bg-[var(--surface)]">
            <tr className="border-b border-[#eef2f6] text-left">
              <th className="pb-1.5 text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
                Aplikasi
              </th>
              <th className="pb-1.5 text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
                Domain
              </th>
              <th className="pb-1.5 text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
                Kritikalitas
              </th>
              <th className="pb-1.5 text-right text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
                Umur
              </th>
              <th className="pb-1.5 text-right text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
                Pengguna
              </th>
              <th className="pb-1.5 text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
                Status
              </th>
              <th className="pb-1.5 text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
                Catatan
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((a) => (
              <tr key={a.aplikasi} className="border-b border-[#f4f7fa]">
                <td className="py-[7px] pr-2 text-[9.5px] font-bold text-ink-900">{a.aplikasi}</td>
                <td className="py-[7px] pr-2 text-[9px] text-ink-700">{a.domain}</td>
                <td
                  className={`py-[7px] pr-2 text-[9px] font-semibold ${KRITIKALITAS_TONE[a.kritikalitas]}`}
                >
                  {a.kritikalitas}
                </td>
                <td className="whitespace-nowrap py-[7px] pr-2 text-right text-[9px] font-semibold text-ink-700">
                  {a.umurTahun} th
                </td>
                <td className="whitespace-nowrap py-[7px] pr-2 text-right text-[9px] font-semibold text-ink-700">
                  {angka(a.pengguna)}
                </td>
                <td className="py-[7px] pr-2">
                  <ToneBadge label={a.status} tone={TIME_TONE[a.status]} />
                </td>
                <td className="py-[7px] text-[8.5px] text-ink-500">{a.catatan}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="pt-1.5 text-[9px] leading-snug text-ink-500">
        Distribusi 68 aplikasi:{" "}
        {timeDistribution.map((t) => `${t.status} ${t.jumlah} (${t.pct}%)`).join(" · ")}.
      </p>
    </div>
  );
}
