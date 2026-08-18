"use client";

import { Candy, Coffee, Droplets, FlaskConical, Gauge, Trees } from "lucide-react";
import { marginKpi } from "@/lib/hilir-stok-margin-data";
import { useSubholding } from "@/components/SubholdingProvider";
import { commodityScope, inScope } from "@/components/ui/CommodityScope";
import { ScopeNote } from "@/components/ui/ScopeNote";

const ICONS = [Gauge, Droplets, Candy, Trees, Coffee, FlaskConical] as const;

/** Kelas nada ikon — identik MktKpiCards agar tampilan tidak berubah. */
const TONES: Record<string, string> = {
  blue: "bg-[#e8f1fd] text-[#2f6fe4]",
  green: "bg-ptpn-greenLight text-ptpn-green",
  teal: "bg-[#e6f6f5] text-[#0d9488]",
  amber: "bg-[#fdf3e0] text-[#d98b06]",
  red: "bg-[#fdecec] text-[#ef4444]",
};

/**
 * KPI margin. Tile yang terikat komoditas mengikuti filter subholding —
 * CPO/olein/biodiesel → PalmCo, gula/tetes → SugarCo, karet & teh →
 * SupportingCo. Tile di luar cakupan diredupkan (bukan dihapus) supaya
 * perbandingan antar komoditas tetap terbaca. Tile blended/konsolidasi tidak
 * punya pecahan subholding, jadi angkanya dibiarkan dan ditandai <ScopeNote />.
 */
export function MarginKpiStrip() {
  const { active } = useSubholding();

  return (
    <div className="grid gap-3 grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
      {marginKpi.map((k, i) => {
        const Icon = ICONS[i];
        const terikatKomoditas = commodityScope(k.label) !== undefined;
        const redup = terikatKomoditas && !inScope(active, k.label);
        return (
          <div
            key={k.label}
            className={`card anim-rise px-3 pb-3 pt-3${redup ? " opacity-25" : ""}`}
            style={{ "--d": `${40 * i}ms` } as React.CSSProperties}
          >
            <div className="flex items-center gap-2">
              <span
                className={`flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-lg ${TONES[k.tone]}`}
              >
                <Icon size={14} strokeWidth={1.9} />
              </span>
              <span className="min-w-0 text-[9px] font-semibold leading-[1.25] text-ink-500">
                {k.label}
              </span>
              {!terikatKomoditas && <ScopeNote />}
            </div>
            <div className="mt-2.5 whitespace-nowrap text-[19px] font-extrabold leading-none tracking-[-0.01em] text-ink-900">
              {k.value}
            </div>
            <div className="mt-[4px] truncate text-[8.5px] text-ink-500" title={k.sub}>
              {k.sub}
            </div>
          </div>
        );
      })}
    </div>
  );
}
