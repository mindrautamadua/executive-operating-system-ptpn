"use client";

import { kemitraanRisks } from "@/lib/agro-data";
import type { ProdRiskLevel } from "@/lib/produksi-data";
import { SectionHead } from "@/components/hc/SectionHead";
import { ToneBadge, type BadgeTone } from "@/components/shared/ToneBadge";
import { useSubholding } from "@/components/SubholdingProvider";
import { ScopeEmpty, inScope } from "@/components/ui/CommodityScope";

const LEVEL_TONE: Record<ProdRiskLevel, BadgeTone> = {
  Ekstrem: "bad",
  Tinggi: "bad",
  Sedang: "warn",
  Rendah: "good",
};

export function KemitraanRisiko() {
  // Domain: risiko kemitraan plasma TBS sawit (side-selling, PSR, koperasi) →
  // milik PalmCo; tidak ada baris tebu/karet sehingga kartu dikosongkan.
  const { active, def } = useSubholding();
  const luarCakupan = !inScope(active, "plasma TBS");

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Risiko Kemitraan" action="Lihat Risk Register" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        5 Risiko Utama Kemitraan Plasma &amp; Mitigasinya
      </p>

      {luarCakupan ? (
        <ScopeEmpty label={def.fullLabel} />
      ) : (
      <div className="scroll-thin mt-1.5 min-h-0 flex-1 overflow-y-auto">
        <table className="w-full border-separate border-spacing-0">
          <thead className="sticky top-0 bg-[var(--surface)]">
            <tr className="text-left text-[7.5px] font-extrabold uppercase tracking-[0.05em] text-ink-400">
              <th className="border-b border-[#eef2f6] pb-1.5 pr-2">Risiko</th>
              <th className="border-b border-[#eef2f6] pb-1.5 pr-2">Deskripsi</th>
              <th className="border-b border-[#eef2f6] pb-1.5 pr-2">Level</th>
              <th className="border-b border-[#eef2f6] pb-1.5">Mitigasi</th>
            </tr>
          </thead>
          <tbody>
            {kemitraanRisks.map((r) => (
              <tr key={r.risk} className="align-top">
                <td className="border-b border-[#f3f6f9] py-1.5 pr-2 text-[8.5px] font-bold leading-snug text-ink-900">
                  {r.risk}
                </td>
                <td className="border-b border-[#f3f6f9] py-1.5 pr-2 text-[9px] leading-snug text-ink-500">
                  {r.desc}
                </td>
                <td className="border-b border-[#f3f6f9] py-1.5 pr-2">
                  <ToneBadge label={r.level} tone={LEVEL_TONE[r.level]} />
                </td>
                <td className="border-b border-[#f3f6f9] py-1.5 text-[9px] leading-snug text-ink-700">
                  {r.mitigasi}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )}
    </div>
  );
}
