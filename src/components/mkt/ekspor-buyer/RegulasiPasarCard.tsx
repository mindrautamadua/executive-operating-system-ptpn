"use client";

import { regulasiPasar, type RegulasiRow } from "@/lib/kontrak-buyer-data";
import { filterBySubholding } from "@/lib/subholding";
import { useSubholding } from "@/components/SubholdingProvider";
import { commodityScope, ScopeEmpty } from "@/components/ui/CommodityScope";
import { SectionHead } from "@/components/hc/SectionHead";
import { ToneBadge, type BadgeTone } from "@/components/shared/ToneBadge";

const TONE: Record<RegulasiRow["tone"], BadgeTone> = {
  green: "good",
  amber: "warn",
  red: "bad",
};

const COLS = "grid-cols-[minmax(0,0.7fr)_minmax(0,1fr)_minmax(0,1.6fr)]";

/** Status regulasi pasar: DMO, pungutan ekspor, bea keluar, HET gula, EUDR. */
export function RegulasiPasarCard() {
  const { active, def } = useSubholding();
  // Komoditas yang diatur menentukan pemiliknya: DMO migor & bea keluar CPO =
  // PalmCo, HET gula = SugarCo; regulasi lintas komoditas tetap tampil.
  const rows = filterBySubholding(regulasiPasar, active, (r) =>
    commodityScope(`${r.regulasi} ${r.dampak}`),
  );

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "180ms" } as React.CSSProperties}
    >
      <SectionHead title="Regulasi Pasar & Kepatuhan" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Status kebijakan yang membatasi harga, volume, dan tujuan penjualan
      </p>

      {rows.length === 0 && <ScopeEmpty label={def.fullLabel} />}

      {rows.length > 0 && (
        <>
      <div
        className={`mt-2 grid ${COLS} items-center gap-x-3 text-[9px] font-semibold uppercase tracking-[0.04em] text-ink-500`}
      >
        <span>Regulasi</span>
        <span>Status</span>
        <span>Dampak</span>
      </div>

      <ul className="mt-1 flex min-h-0 flex-1 flex-col justify-between gap-1">
        {rows.map((r) => (
          <li
            key={r.regulasi}
            className={`grid ${COLS} items-center gap-x-3 rounded-lg border border-[#eef2f6] bg-[#fbfcfd] px-2.5 py-[5px]`}
          >
            <span className="truncate text-[9.5px] font-extrabold text-ink-900" title={r.regulasi}>
              {r.regulasi}
            </span>
            <span className="flex min-w-0">
              <ToneBadge label={r.status} tone={TONE[r.tone]} />
            </span>
            <span className="truncate text-[8.5px] text-ink-500" title={r.dampak}>
              {r.dampak}
            </span>
          </li>
        ))}
      </ul>
        </>
      )}

      <p className="mt-1.5 truncate text-[9px] text-ink-500">
        Kepatuhan DMO 100% menopang izin ekspor · beban pungutan &amp; bea keluar menekan net-back FOB.
      </p>
    </div>
  );
}
