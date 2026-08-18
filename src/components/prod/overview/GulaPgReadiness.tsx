"use client";

import { SectionHead } from "@/components/hc/SectionHead";
import {
  pgReadiness,
  PG_JAM_BERHENTI_TARGET_PCT,
  PG_OVERALL_RECOVERY_TARGET_PCT,
} from "@/lib/pabrik-data";
import { useSubholding } from "@/components/SubholdingProvider";
import { inScope, ScopeEmpty } from "@/components/ui/CommodityScope";

const pct = (v: number) =>
  v.toLocaleString("id-ID", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

/** Kartu rail: kesiapan giling 17 PG — ringkasan target + 5 PG paling tertinggal. */
export function GulaPgReadiness() {
  const { active, def } = useSubholding();
  // Kartu khusus pabrik gula -> milik SugarCo.
  const milikScope = inScope(active, "Tebu gula musim giling");

  const rataBerhenti =
    pgReadiness.reduce((a, p) => a + p.jamBerhentiPct, 0) / pgReadiness.length;
  const rataRecovery =
    pgReadiness.reduce((a, p) => a + p.overallRecoveryPct, 0) / pgReadiness.length;
  const merah = pgReadiness.filter(
    (p) =>
      p.jamBerhentiPct > PG_JAM_BERHENTI_TARGET_PCT &&
      p.overallRecoveryPct < PG_OVERALL_RECOVERY_TARGET_PCT
  );
  const terburuk = [...pgReadiness]
    .sort((a, b) => b.jamBerhentiPct - a.jamBerhentiPct)
    .slice(0, 5);

  return (
    <div
      className="card anim-rise px-4 pb-3 pt-3"
      style={{ "--d": "160ms" } as React.CSSProperties}
    >
      <SectionHead title="Giling Gula — Kesiapan 17 PG" action="Lihat Detail" href="/produksi-operasi/kinerja-pabrik/detail#pg" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Jam berhenti giling (target ≤{PG_JAM_BERHENTI_TARGET_PCT}%) &amp; overall recovery (target ≥
        {PG_OVERALL_RECOVERY_TARGET_PCT}%)
      </p>

      {!milikScope && <ScopeEmpty label={def.fullLabel} />}

      {milikScope && (
        <>
          <div className="mt-2 grid grid-cols-3 gap-2">
            <div className="rounded-lg bg-[var(--surface-2)] p-2 text-center">
              <div className="text-[9px] uppercase tracking-wide text-ink-500">Jam Berhenti</div>
              <div className="mt-0.5 text-[12px] font-bold text-amber-600">
                {pct(rataBerhenti)}%
              </div>
            </div>
            <div className="rounded-lg bg-[var(--surface-2)] p-2 text-center">
              <div className="text-[9px] uppercase tracking-wide text-ink-500">Recovery</div>
              <div className="mt-0.5 text-[12px] font-bold text-amber-600">
                {pct(rataRecovery)}%
              </div>
            </div>
            <div className="rounded-lg bg-[var(--surface-2)] p-2 text-center">
              <div className="text-[9px] uppercase tracking-wide text-ink-500">PG Merah</div>
              <div className="mt-0.5 text-[12px] font-bold text-red-600">{merah.length}</div>
            </div>
          </div>

          <div className="mt-2 space-y-1.5">
            {terburuk.map((p) => (
              <div key={p.pg} className="flex items-center gap-2">
                <span
                  className="h-[6px] w-[6px] shrink-0 rounded-full"
                  style={{
                    background:
                      p.jamBerhentiPct > PG_JAM_BERHENTI_TARGET_PCT ? "#dc2626" : "#16a34a",
                  }}
                />
                <span className="min-w-0 flex-1 truncate text-[9px] font-semibold text-ink-700">
                  {p.pg}
                  <span className="ml-1 font-normal text-ink-400">· {p.wilayah}</span>
                </span>
                <span className="shrink-0 text-[8.5px] tabular-nums text-ink-500">
                  {pct(p.jamBerhentiPct)}% · {pct(p.overallRecoveryPct)}%
                </span>
              </div>
            ))}
          </div>

          <p className="mt-2 border-t border-[var(--border-hair)] pt-1.5 text-[9px] leading-snug text-ink-500">
            5 PG dengan jam berhenti tertinggi — keandalan giling menentukan capaian FY gula 780 rb
            ton.
          </p>
        </>
      )}
    </div>
  );
}
