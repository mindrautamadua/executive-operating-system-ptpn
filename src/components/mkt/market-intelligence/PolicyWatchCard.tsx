"use client";

import { Scale } from "lucide-react";
import { policyWatch, type PolicyWatchRow } from "@/lib/hilir-stok-margin-data";
import { filterBySubholding } from "@/lib/subholding";
import { useSubholding } from "@/components/SubholdingProvider";
import { commodityScope, ScopeEmpty } from "@/components/ui/CommodityScope";
import { ToneBadge, type BadgeTone } from "@/components/shared/ToneBadge";
import { SectionHead } from "../../hc/SectionHead";

const TONE: Record<PolicyWatchRow["tone"], BadgeTone> = {
  red: "bad",
  amber: "warn",
  green: "good",
};

const TONE_LABEL: Record<PolicyWatchRow["tone"], string> = {
  red: "Perlu Aksi",
  amber: "Dipantau",
  green: "Siap",
};

/** Lebar grid mengikuti jumlah kebijakan yang tersisa setelah filter subholding. */
const COLS: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-2 md:grid-cols-3",
  4: "grid-cols-2 md:grid-cols-4",
};

/** Pipeline regulasi & kebijakan berikut status kesiapan grup. */
export function PolicyWatchCard() {
  const { active, def } = useSubholding();
  // Kebijakan mengikuti komoditas yang diatur: mandat FAME/B40 = PalmCo,
  // HET gula = SugarCo; regulasi lintas komoditas tetap tampil.
  const rows = filterBySubholding(policyWatch, active, (p) =>
    commodityScope(`${p.kebijakan} ${p.dampak}`),
  );

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "240ms" } as React.CSSProperties}
    >
      <SectionHead title="Policy Watch" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Pipeline Regulasi &amp; Kebijakan · status kesiapan PTPN Group
      </p>

      {rows.length === 0 ? (
        <ScopeEmpty label={def.fullLabel} />
      ) : (
      <div className={`mt-2 grid min-h-0 flex-1 gap-3 ${COLS[rows.length] ?? "grid-cols-2 md:grid-cols-4"}`}>
        {rows.map((p) => (
          <div
            key={p.kebijakan}
            className="flex min-w-0 flex-col rounded-lg border border-[#eef2f6] bg-[#fbfcfd] px-2.5 py-2"
          >
            <div className="flex items-start justify-between gap-1.5">
              <span className="flex min-w-0 items-center gap-1.5 text-[9.5px] font-extrabold leading-[1.3] text-ink-900">
                <Scale size={11} className="shrink-0 text-ink-400" />
                <span className="min-w-0">{p.kebijakan}</span>
              </span>
              <ToneBadge label={TONE_LABEL[p.tone]} tone={TONE[p.tone]} />
            </div>
            <div className="mt-1 text-[9px] font-semibold text-ink-500">{p.status}</div>
            <p className="mt-1 text-[8.5px] leading-snug text-ink-500">{p.dampak}</p>
            <p className="mt-auto pt-1.5 text-[8.5px] leading-snug text-ink-700">
              <span className="font-bold text-ptpn-green">Kesiapan:</span> {p.kesiapan}
            </p>
          </div>
        ))}
      </div>
      )}
    </div>
  );
}
