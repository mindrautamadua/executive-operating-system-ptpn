"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { corporateActions, type HkmCorporateAction } from "@/lib/hkm-data-detail";
import { SectionHead } from "@/components/hc/SectionHead";
import { ToneBadge, type BadgeTone } from "@/components/shared/ToneBadge";
import { PALETTE } from "@/lib/chart-palette";
import { useSubholding } from "@/components/SubholdingProvider";
import { filterBySubholding } from "@/lib/subholding";

const STATUS_TONE: Record<HkmCorporateAction["status"], BadgeTone> = {
  "On Track": "good",
  "Perlu Perhatian": "warn",
  Terlambat: "bad",
};

const BAR_COLOR: Record<HkmCorporateAction["status"], string> = {
  "On Track": PALETTE.green,
  "Perlu Perhatian": PALETTE.amber,
  Terlambat: PALETTE.red,
};

/** Daftar aksi korporasi 2026 beserta tahap hukum dan progresnya. */
export function CorporateActions() {
  const { active, isFiltered, def } = useSubholding();
  // Sebagian aksi menyebut subholding pelaksananya (mis. "JV Bioetanol SGN");
  // aksi tingkat grup tanpa penyebutan tetap tampil di semua cakupan.
  const rows = filterBySubholding(corporateActions, active, (a) => a.aksi);

  return (
    <div
      className="card anim-rise flex h-full min-h-0 flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Aksi Korporasi 2026" action="Lihat Semua" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {isFiltered
          ? `${rows.length} Aksi dalam cakupan ${def.label} · termasuk aksi tingkat grup`
          : "6 Aksi Berjalan · 1 Pembentukan JV · 2 Likuidasi · 2 Restrukturisasi · 1 Divestasi"}
      </p>

      <div className="scroll-thin mt-2 min-h-0 flex-1 overflow-y-auto pr-1">
        {rows.map((a) => (
          <div key={a.aksi} className="border-b border-[#f4f7fa] py-[7px] last:border-0">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <div className="truncate text-[9.5px] font-bold text-ink-900" title={a.aksi}>
                  {a.aksi}
                </div>
                <div className="mt-[2px] text-[8.5px] text-ink-500">
                  {a.jenis} · {a.tahap}
                </div>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-[3px]">
                <ToneBadge label={a.status} tone={STATUS_TONE[a.status]} />
                <span className="text-[9px] font-semibold text-ink-500">Target {a.target}</span>
              </div>
            </div>

            <div className="mt-1.5 flex items-center gap-2">
              <div className="h-[5px] min-w-0 flex-1 overflow-hidden rounded-full bg-[#eef2f6]">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${a.progresPct}%`, backgroundColor: BAR_COLOR[a.status] }}
                />
              </div>
              <span className="w-[26px] shrink-0 text-right text-[8.5px] font-bold tabular-nums text-ink-700">
                {a.progresPct}%
              </span>
            </div>

            {a.href && a.hrefLabel && (
              <Link
                href={a.href}
                className="mt-[4px] inline-flex items-center gap-1 text-[9px] font-semibold text-ptpn-green hover:underline"
              >
                {a.hrefLabel} <ArrowRight size={9} />
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
