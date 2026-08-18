"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { approvalRegister, type DekApprovalStatus } from "@/lib/dek-data-detail";
import { SectionHead } from "@/components/hc/SectionHead";
import { ToneBadge, type BadgeTone } from "@/components/shared/ToneBadge";
import { useSubholding } from "@/components/SubholdingProvider";
import { filterBySubholding } from "@/lib/subholding";

const STATUS_TONE: Record<DekApprovalStatus, BadgeTone> = {
  Disetujui: "good",
  Menunggu: "bad",
  "Ditolak/Dikembalikan": "warn",
};

const SLA = 14;

/** Register 22 permohonan persetujuan YTD beserta status tanggapan Dekom. */
export function ApprovalRegister() {
  const { active, isFiltered, def } = useSubholding();
  // Sebagian perihal menyebut subholding yang menjadi objek permohonan (mis.
  // "Divestasi aset non-produktif PTPN I"); permohonan tingkat grup tetap tampil.
  const rows = filterBySubholding(approvalRegister, active, (a) => a.perihal);
  const disetujui = rows.filter((a) => a.status === "Disetujui").length;
  const menunggu = rows.filter((a) => a.status === "Menunggu").length;
  const dikembalikan = rows.filter((a) => a.status === "Ditolak/Dikembalikan").length;

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Register Permohonan Persetujuan" action="Unduh Register" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {isFiltered
          ? `${rows.length} Permohonan (cakupan ${def.label}) · ${disetujui} Disetujui · ${menunggu} Menunggu · ${dikembalikan} Dikembalikan · SLA Internal 14 Hari`
          : "22 Permohonan YTD · 16 Disetujui · 4 Menunggu · 2 Dikembalikan · SLA Internal 14 Hari"}
      </p>

      <div className="scroll-thin mt-1.5 min-h-0 flex-1 overflow-y-auto">
        <table className="w-full border-separate border-spacing-0">
          <thead className="sticky top-0 bg-[var(--surface)]">
            <tr className="text-left text-[7.5px] font-extrabold uppercase tracking-[0.05em] text-ink-400">
              <th className="border-b border-[#eef2f6] pb-1.5 pr-2">Perihal</th>
              <th className="border-b border-[#eef2f6] pb-1.5 pr-2">Kategori</th>
              <th className="border-b border-[#eef2f6] pb-1.5 pr-2 text-right">Nilai</th>
              <th className="border-b border-[#eef2f6] pb-1.5 pr-2">Masuk</th>
              <th className="border-b border-[#eef2f6] pb-1.5 pr-2">Status</th>
              <th className="border-b border-[#eef2f6] pb-1.5 text-right">Hari</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((a) => (
              <tr key={a.id} className="align-top">
                <td className="border-b border-[#f3f6f9] py-[5px] pr-2">
                  <div className="text-[8.5px] font-bold leading-snug text-ink-900">
                    {a.perihal}
                  </div>
                  <div className="mt-[2px] flex flex-wrap items-center gap-x-1.5 text-[7.5px] text-ink-400">
                    <span className="font-semibold">{a.id}</span>
                    {a.href && a.hrefLabel && (
                      <Link
                        href={a.href}
                        className="inline-flex items-center gap-[2px] font-bold text-ptpn-green hover:underline"
                      >
                        {a.hrefLabel}
                        <ArrowUpRight size={9} />
                      </Link>
                    )}
                  </div>
                </td>
                <td className="border-b border-[#f3f6f9] py-[5px] pr-2 text-[9px] leading-snug text-ink-500">
                  {a.kategori}
                </td>
                <td className="whitespace-nowrap border-b border-[#f3f6f9] py-[5px] pr-2 text-right text-[8.5px] font-semibold tabular-nums text-ink-900">
                  {a.nilai}
                </td>
                <td className="whitespace-nowrap border-b border-[#f3f6f9] py-[5px] pr-2 text-[9px] tabular-nums text-ink-500">
                  {a.tanggalMasuk}
                </td>
                <td className="border-b border-[#f3f6f9] py-[5px] pr-2">
                  <ToneBadge label={a.status} tone={STATUS_TONE[a.status]} />
                </td>
                <td
                  className={`whitespace-nowrap border-b border-[#f3f6f9] py-[5px] text-right text-[8.5px] font-extrabold tabular-nums ${
                    a.hariBerjalan > SLA ? "text-[#ef4444]" : "text-ink-500"
                  }`}
                >
                  {a.hariBerjalan}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
