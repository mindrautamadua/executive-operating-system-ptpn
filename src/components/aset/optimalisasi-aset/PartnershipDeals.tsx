"use client";

import {
  PARTNERSHIP_DEALS_AKTIF,
  PARTNERSHIP_NILAI_TOTAL_RP_M,
  PARTNERSHIP_TOP5_NILAI_RP_M,
  PARTNERSHIP_TOP5_PENDAPATAN_RP_M,
  partnershipDeals,
  partnershipNote,
} from "@/lib/aop-data";
import { SectionHead } from "@/components/hc/SectionHead";
import { ToneBadge, type BadgeTone } from "@/components/shared/ToneBadge";
import { useSubholding } from "@/components/SubholdingProvider";
import { filterBySubholding } from "@/lib/subholding";

const rp = (v: number) => v.toLocaleString("id-ID");

/**
 * Pemetaan domain: kawasan & pabrik hilir sawit Sei Mangkei milik PalmCo;
 * lahan/pabrik tebu milik SugarCo; karet, teh dan aset pendukung (wisata,
 * kawasan agro) milik SupportingCo (PTPN I).
 */
const NAMA_SUBHOLDING: Record<string, string> = {
  "KSO Kawasan Industri Sei Mangkei": "PalmCo",
  "BOT Pabrik Minyak Goreng Sei Mangkei": "PalmCo",
  "KSO Lahan Tebu Cinta Manis": "SGN",
  "Sewa Kawasan Wisata & Agro Jabar": "PTPN I",
  "KSO Pabrik Karet Remah Sumsel": "PTPN I",
};

const SKEMA_TONE: Record<string, BadgeTone> = {
  KSO: "good",
  BOT: "info",
  "Sewa Jangka Panjang": "neutral",
};

const MAX = Math.max(...partnershipDeals.map((d) => d.nilaiKontrakRpM));

/** 28 kemitraan aktif Rp 3,4 T; lima kontrak terbesar menguasai 67% nilai. */
export function PartnershipDeals() {
  const { active, isFiltered, def } = useSubholding();
  const rows = filterBySubholding(partnershipDeals, active, (d) => NAMA_SUBHOLDING[d.nama]);
  const nilaiRows = rows.reduce((s, d) => s + d.nilaiKontrakRpM, 0);
  const pendapatanRows = rows.reduce((s, d) => s + d.pendapatanYtdRpM, 0);

  return (
    <div
      className="card anim-rise flex h-full min-h-0 flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Kemitraan Aset (KSO/BOT)" action="Lihat Semua" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {isFiltered ? (
          <>
            Kontrak terbesar {def.label}: {rows.length} kontrak · Rp {rp(nilaiRows)} M (Pendapatan
            YTD Rp {rp(pendapatanRows)} M) dari Rp {rp(PARTNERSHIP_NILAI_TOTAL_RP_M)} M grup
          </>
        ) : (
          <>
            {PARTNERSHIP_DEALS_AKTIF} Kontrak Aktif · Rp {rp(PARTNERSHIP_NILAI_TOTAL_RP_M)} M · Top 5
            Rp {rp(PARTNERSHIP_TOP5_NILAI_RP_M)} M (Pendapatan YTD Rp{" "}
            {rp(PARTNERSHIP_TOP5_PENDAPATAN_RP_M)} M)
          </>
        )}
      </p>

      <div className="scroll-thin mt-2 flex min-h-0 flex-1 flex-col gap-1.5 overflow-y-auto pr-1">
        {rows.map((d) => (
          <div key={d.nama} className="rounded-xl border border-[#eef2f6] px-2.5 py-[7px]">
            <div className="flex items-center justify-between gap-2">
              <span className="min-w-0 truncate text-[9.5px] font-bold text-ink-900">{d.nama}</span>
              <div className="flex shrink-0 items-center gap-1.5">
                <ToneBadge label={d.skema} tone={SKEMA_TONE[d.skema] ?? "neutral"} />
                <span className="text-[9.5px] font-extrabold text-ptpn-green">
                  Rp {rp(d.nilaiKontrakRpM)} M
                </span>
              </div>
            </div>
            <div className="mt-1 flex items-center gap-2">
              <div className="h-[7px] min-w-0 flex-1 overflow-hidden rounded-full bg-[#eef2f6]">
                <div
                  className="h-full rounded-full bg-ptpn-green"
                  style={{ width: `${(d.nilaiKontrakRpM / MAX) * 100}%` }}
                />
              </div>
              <span className="shrink-0 text-[9px] font-semibold text-ink-500">
                tenor {d.tenorTahun} thn · YTD Rp {rp(d.pendapatanYtdRpM)} M
              </span>
            </div>
            <p className="mt-[3px] truncate text-[9px] text-ink-500">{d.mitra}</p>
          </div>
        ))}
      </div>

      <p className="pt-1.5 text-[9px] leading-snug text-ink-500">{partnershipNote}</p>
    </div>
  );
}
