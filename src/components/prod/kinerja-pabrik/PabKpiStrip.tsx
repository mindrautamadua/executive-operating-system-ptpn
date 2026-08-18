"use client";

import { pabKpi } from "@/lib/pabrik-data";
import { useSubholding } from "@/components/SubholdingProvider";
import { commodityScope } from "@/components/ui/CommodityScope";
import { ScopeNote } from "@/components/ui/ScopeNote";
import { filterBySubholding } from "@/lib/subholding";
import { ProdKpiCards } from "../ProdKpiCards";

export function PabKpiStrip() {
  const { active, isFiltered } = useSubholding();
  // Sebagian KPI terikat komoditas lewat namanya: "Utilisasi PKS", "Losses CPO"
  // & "Throughput PKS" milik PalmCo; sisanya (pabrik aktif, downtime) tetap
  // angka konsolidasi grup sehingga ditandai <ScopeNote />.
  const items = filterBySubholding(pabKpi, active, (k) => commodityScope(`${k.label} ${k.metric}`));

  return (
    <div>
      {isFiltered && (
        <div className="mb-1.5 flex justify-end">
          <ScopeNote />
        </div>
      )}
      <ProdKpiCards items={items} cols="grid-cols-2 md:grid-cols-3 xl:grid-cols-6" />
    </div>
  );
}
