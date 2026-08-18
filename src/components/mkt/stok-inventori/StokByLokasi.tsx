"use client";

import { stokByLokasi, stokByLokasiTotal } from "@/lib/hilir-stok-margin-data";
import { useSubholding } from "@/components/SubholdingProvider";
import { ScopeEmpty, inScope } from "@/components/ui/CommodityScope";
import { SectionHead } from "../../hc/SectionHead";

const utilColor = (pct: number) =>
  pct >= 80 ? "text-[#d98b06]" : pct >= 65 ? "text-ink-700" : "text-ink-400";

/**
 * Distribusi stok CPO per terminal/regional (rb ton + utilisasi tangki).
 * Seluruh baris adalah tangki timbun CPO → milik PalmCo; pada cakupan
 * SugarCo/SupportingCo tidak ada baris yang tersisa.
 */
export function StokByLokasi() {
  const { active, def } = useSubholding();
  const relevan = inScope(active, "CPO");
  const max = Math.max(...stokByLokasi.map((r) => r.cpoRbTon));
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Stok CPO by Lokasi" action={relevan ? "Lihat Detail" : undefined} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {stokByLokasiTotal.cpoRbTon} rb ton pada {stokByLokasiTotal.terminal} terminal/tangki timbun
      </p>

      {!relevan && <ScopeEmpty label={def.fullLabel} />}

      {relevan && (
      <>
      <ul className="mt-2 flex min-h-0 flex-1 flex-col justify-between gap-1">
        {stokByLokasi.map((r) => (
          <li key={r.regional} className="grid grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_66px] items-center gap-x-2">
            <span className="min-w-0 leading-[1.25]">
              <span className="block truncate text-[9px] font-bold text-ink-900" title={r.regional}>
                {r.regional}
              </span>
              <span className="block text-[9px] text-ink-500">{r.terminal} terminal</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-[7px] min-w-0 flex-1 overflow-hidden rounded-full bg-[#eef2f6]">
                <span
                  className="block h-full rounded-full bg-[#3b7ded]"
                  style={{ width: `${(r.cpoRbTon / max) * 100}%` }}
                />
              </span>
              <span className="w-[26px] shrink-0 text-right text-[9px] font-extrabold text-ink-900">
                {r.cpoRbTon}
              </span>
            </span>
            <span className={`text-right text-[8.5px] font-bold ${utilColor(r.utilisasiPct)}`}>
              Util {r.utilisasiPct}%
            </span>
          </li>
        ))}
      </ul>

      <p className="mt-1.5 truncate text-[9px] text-ink-500">
        33% stok terkonsentrasi di Regional Sumut — risiko logistik satu koridor.
      </p>
      </>
      )}
    </div>
  );
}
