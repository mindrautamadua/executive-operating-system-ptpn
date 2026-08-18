"use client";

import {
  PG_JAM_BERHENTI_TARGET_PCT,
  PG_OVERALL_RECOVERY_TARGET_PCT,
  pgReadiness,
  pgReadinessNote,
} from "@/lib/pabrik-data";
import { ToneBadge } from "@/components/shared/ToneBadge";
import { useSubholding } from "@/components/SubholdingProvider";
import { inScope, ScopeEmpty } from "@/components/ui/CommodityScope";
import { SectionHead } from "../../hc/SectionHead";

const num = (v: number) =>
  v.toLocaleString("id-ID", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

export function PgReadiness() {
  const { active, def } = useSubholding();
  // Seluruh kartu ini milik SugarCo: 17 pabrik gula (PG) & musim giling.
  const dalamCakupan = inScope(active, "PG (pabrik gula)");

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Kesiapan 17 Pabrik Gula" action="Lihat Detail" href="/produksi-operasi/kinerja-pabrik/detail#pg" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Jam Berhenti Giling (target ≤10%) &amp; Overall Recovery (target ≥80%)
      </p>

      {!dalamCakupan ? (
        <ScopeEmpty label={def.fullLabel} />
      ) : (
        <>
      <div className="mt-2 grid grid-cols-[minmax(0,1.4fr)_58px_58px_56px] items-center gap-x-2 pr-2 text-[9px] font-semibold uppercase tracking-[0.04em] text-ink-500">
        <span>Pabrik Gula</span>
        <span className="text-right">Berhenti</span>
        <span className="text-right">Recovery</span>
        <span className="text-right">Status</span>
      </div>

      <ul className="scroll-thin mt-1 flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto pr-1">
        {pgReadiness.map((p) => {
          const merah =
            p.jamBerhentiPct > PG_JAM_BERHENTI_TARGET_PCT ||
            p.overallRecoveryPct < PG_OVERALL_RECOVERY_TARGET_PCT - 2;
          const siap =
            p.jamBerhentiPct <= PG_JAM_BERHENTI_TARGET_PCT &&
            p.overallRecoveryPct >= PG_OVERALL_RECOVERY_TARGET_PCT;
          return (
            <li
              key={p.pg}
              className="grid shrink-0 grid-cols-[minmax(0,1.4fr)_58px_58px_56px] items-center gap-x-2 rounded-lg border border-[#eef2f6] bg-[#fbfcfd] px-2 py-1"
            >
              <span className="min-w-0 leading-[1.25]">
                <span className="block truncate text-[9px] font-extrabold text-ink-900">{p.pg}</span>
                <span className="block text-[7.5px] text-ink-400">{p.wilayah}</span>
              </span>
              <span
                className={`text-right text-[9px] font-extrabold ${
                  p.jamBerhentiPct > PG_JAM_BERHENTI_TARGET_PCT ? "text-[#ef4444]" : "text-ptpn-green"
                }`}
              >
                {num(p.jamBerhentiPct)}%
              </span>
              <span
                className={`text-right text-[9px] font-extrabold ${
                  p.overallRecoveryPct < PG_OVERALL_RECOVERY_TARGET_PCT
                    ? "text-[#d98b06]"
                    : "text-ptpn-green"
                }`}
              >
                {num(p.overallRecoveryPct)}%
              </span>
              <span className="flex justify-end">
                <ToneBadge
                  label={siap ? "Siap" : merah ? "Merah" : "Waspada"}
                  tone={siap ? "good" : merah ? "bad" : "warn"}
                />
              </span>
            </li>
          );
        })}
      </ul>

      <p className="mt-1.5 line-clamp-2 text-[9px] leading-snug text-ink-500">{pgReadinessNote}</p>
        </>
      )}
    </div>
  );
}
