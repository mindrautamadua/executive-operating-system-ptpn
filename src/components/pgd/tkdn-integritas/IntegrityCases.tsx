"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { integrityCases, integritySummary } from "@/lib/pgd-data-detail";
import type { PgdIntegrityStage } from "@/lib/pgd-data-detail";
import { SectionHead } from "@/components/hc/SectionHead";
import { ToneBadge, type BadgeTone } from "@/components/shared/ToneBadge";
import { useSubholding } from "@/components/SubholdingProvider";
import { filterBySubholding } from "@/lib/subholding";

const STAGE_TONE: Record<PgdIntegrityStage, BadgeTone> = {
  "Telaah Awal": "neutral",
  "Investigasi Penuh": "warn",
  "Terbukti (Substantiated)": "bad",
  "Sanksi / APH": "info",
};

const TOTAL_INDIKASI = integrityCases.reduce((s, r) => s + r.indikasiRpM, 0);

/** 14 laporan integritas pengadaan — irisan kategori pengadaan pada WBS grup. */
export function IntegrityCases() {
  const { active, isFiltered, def } = useSubholding();
  // `unit` menyebut subholding pelapor (PalmCo Regional n / SGN / PTPN I).
  const rows = filterBySubholding(integrityCases, active, (c) => c.unit);
  const indikasiRows = rows.reduce((s, r) => s + r.indikasiRpM, 0);

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <SectionHead title="Kasus Integritas Pengadaan" />
          <p className="mt-[3px] text-[9px] text-ink-500">
            {isFiltered ? (
              <>
                {rows.length} kasus {def.label} dari {integrityCases.length} kasus pengadaan ·
                Indikasi Rp {indikasiRows.toLocaleString("id-ID", { minimumFractionDigits: 1 })} M
              </>
            ) : (
              <>
                {integrityCases.length} dari {integritySummary.laporanWbsGrup} Laporan WBS Grup ·
                Indikasi Rp {TOTAL_INDIKASI.toLocaleString("id-ID", { minimumFractionDigits: 1 })} M
              </>
            )}
          </p>
        </div>
        <Link
          href="/risiko-kepatuhan/fraud-wbs"
          className="flex shrink-0 items-center gap-1 text-[9.5px] font-semibold text-ptpn-green hover:underline"
        >
          Buka Fraud &amp; WBS <ArrowUpRight size={11} />
        </Link>
      </div>

      <div className="scroll-thin mt-2 min-h-0 flex-1 overflow-y-auto">
        <div className="scroll-thin overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-[#eef2f6] text-left">
              {["Kode", "Jenis Dugaan", "Unit", "Indikasi", "Tahap"].map((h) => (
                <th
                  key={h}
                  className="py-[5px] text-[9px] font-extrabold uppercase tracking-[0.04em] text-ink-500"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((c) => (
              <tr key={c.kode} className="border-b border-[#f4f7f9] last:border-0">
                <td className="py-[5px] pr-2 text-[9px] font-bold text-ink-900">{c.kode}</td>
                <td className="py-[5px] pr-2 text-[8.5px] text-ink-700">{c.jenis}</td>
                <td className="py-[5px] pr-2 text-[8.5px] text-ink-500">{c.unit}</td>
                <td className="py-[5px] pr-2 text-[9px] font-extrabold text-[#ef4444]">
                  Rp {c.indikasiRpM.toLocaleString("id-ID", { minimumFractionDigits: 1 })} M
                </td>
                <td className="py-[5px]">
                  <ToneBadge label={c.tahap} tone={STAGE_TONE[c.tahap]} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>

      <p className="mt-1.5 rounded-md bg-[#f8fafc] px-2 py-[5px] text-[9px] leading-[1.4] text-ink-500">
        {integritySummary.note}
      </p>
    </div>
  );
}
