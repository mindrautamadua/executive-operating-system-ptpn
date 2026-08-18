"use client";

import { tenderKpbn } from "@/lib/kontrak-buyer-data";
import { useSubholding } from "@/components/SubholdingProvider";
import { inScope, ScopeEmpty } from "@/components/ui/CommodityScope";
import { SectionHead } from "@/components/hc/SectionHead";
import { ToneBadge } from "@/components/shared/ToneBadge";

const rp = (v: number) => v.toLocaleString("id-ID");

/** Rekap 6 tender KPBN terakhir: harga dasar vs terbentuk & premium. */
export function TenderKpbnCard() {
  const { active, def } = useSubholding();
  // Tender KPBN memperdagangkan CPO & PK — seluruhnya domain PalmCo.
  const luarCakupan = !inScope(active, "CPO PK");

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Tender KPBN Terakhir" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Harga dasar vs harga terbentuk 6 tender terakhir (CPO, Rp/kg)
      </p>

      {luarCakupan && <ScopeEmpty label={def.fullLabel} />}

      {!luarCakupan && (
        <>
      <div className="mt-2 grid grid-cols-[minmax(0,1fr)_52px_64px_64px_70px] items-center gap-x-2 text-[9px] font-semibold uppercase tracking-[0.04em] text-ink-500">
        <span>Tanggal</span>
        <span className="text-right">Volume</span>
        <span className="text-right">Dasar</span>
        <span className="text-right">Terbentuk</span>
        <span className="text-right">Premium</span>
      </div>

      <ul className="mt-1 flex min-h-0 flex-1 flex-col justify-between gap-1">
        {tenderKpbn.map((t) => (
          <li
            key={t.tanggal}
            className="grid grid-cols-[minmax(0,1fr)_52px_64px_64px_70px] items-center gap-x-2 rounded-lg border border-[#eef2f6] bg-[#fbfcfd] px-2.5 py-[5px]"
          >
            <span className="truncate text-[9.5px] font-extrabold text-ink-900">{t.tanggal}</span>
            <span className="text-right text-[9px] font-semibold text-ink-500">
              {t.volumeRbTon.toLocaleString("id-ID", { minimumFractionDigits: 1 })} rb t
            </span>
            <span className="text-right text-[9px] font-semibold text-ink-500">
              {rp(t.hargaDasar)}
            </span>
            <span className="text-right text-[9px] font-extrabold text-ink-900">
              {rp(t.hargaTerbentuk)}
            </span>
            <span className="flex justify-end">
              <ToneBadge label={`+Rp ${rp(t.premium)}`} tone={t.premium >= 100 ? "good" : "info"} />
            </span>
          </li>
        ))}
      </ul>
        </>
      )}

      <p className="mt-1.5 truncate text-[9px] text-ink-500">
        Premium terbentuk menguat: +Rp 50-85/kg (April) → +Rp 120/kg (akhir Mei).
      </p>
    </div>
  );
}
