"use client";

import { CircleCheck, CircleX } from "lucide-react";
import { stokVsHarga } from "@/lib/hilir-stok-margin-data";
import { ToneBadge } from "@/components/shared/ToneBadge";
import { useSubholding } from "@/components/SubholdingProvider";
import { ScopeEmpty, inScope } from "@/components/ui/CommodityScope";
import { SectionHead } from "../../hc/SectionHead";

/**
 * Keputusan tahan/lepas stok CPO vs level harga spot KPBN.
 * Stok CPO dan harga CPO → seluruh kartu milik PalmCo.
 */
export function StokVsHargaCard() {
  const { active, def } = useSubholding();
  const relevan = inScope(active, "CPO");

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "240ms" } as React.CSSProperties}
    >
      <div className="flex items-center justify-between gap-2">
        <SectionHead title="Stok vs Harga: Tahan / Lepas" className="min-w-0 flex-1" />
        {relevan && <ToneBadge label={stokVsHarga.posisi} tone="good" />}
      </div>

      {!relevan && <ScopeEmpty label={def.fullLabel} />}

      {relevan && (
      <>
      <div className="mt-2 grid grid-cols-2 gap-2">
        <div className="rounded-lg border border-[#eef2f6] bg-[#fbfcfd] px-2.5 py-2">
          <div className="text-[9px] font-semibold uppercase tracking-[0.04em] text-ink-500">
            Spot KPBN
          </div>
          <div className="mt-1 text-[13px] font-extrabold leading-none text-ptpn-green">
            {stokVsHarga.spotLabel}
          </div>
        </div>
        <div className="rounded-lg border border-[#eef2f6] bg-[#fbfcfd] px-2.5 py-2">
          <div className="text-[9px] font-semibold uppercase tracking-[0.04em] text-ink-500">
            Rata-rata YTD
          </div>
          <div className="mt-1 text-[13px] font-extrabold leading-none text-ink-900">
            {stokVsHarga.avgYtdLabel}
          </div>
        </div>
      </div>

      <p className="mt-2 text-[8.5px] leading-snug text-ink-500">{stokVsHarga.narasi}</p>

      <div className="mt-auto flex flex-col gap-1.5 pt-2">
        {stokVsHarga.skenario.map((s) => {
          const good = s.tone === "good";
          const Icon = good ? CircleCheck : CircleX;
          return (
            <div
              key={s.label}
              className="flex items-start gap-2 rounded-lg border border-[#eef2f6] bg-[#fbfcfd] px-2.5 py-1.5"
            >
              <Icon
                size={12}
                className={`mt-[1px] shrink-0 ${good ? "text-ptpn-green" : "text-[#ef4444]"}`}
              />
              <div className="min-w-0 leading-[1.3]">
                <span className="block text-[9px] font-bold text-ink-900">{s.label}</span>
                <span className="block text-[8.5px] text-ink-500">{s.dampak}</span>
              </div>
            </div>
          );
        })}
      </div>
      </>
      )}
    </div>
  );
}
