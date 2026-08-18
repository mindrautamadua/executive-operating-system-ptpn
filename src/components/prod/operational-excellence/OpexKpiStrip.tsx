"use client";

import { opexKpi } from "@/lib/biaya-opex-data";
import { useSubholding } from "@/components/SubholdingProvider";
import { ScopeNote } from "@/components/ui/ScopeNote";
import { ProdKpiCards } from "../ProdKpiCards";

export function OpexKpiStrip() {
  // KPI program OPEX dihitung enterprise-wide (24 inisiatif, 5 workstream)
  // sehingga angkanya tetap konsolidasi grup saat filter subholding aktif.
  const { isFiltered } = useSubholding();

  return (
    <div>
      {isFiltered && (
        <div className="mb-1.5 flex justify-end">
          <ScopeNote />
        </div>
      )}
      <ProdKpiCards items={opexKpi} cols="grid-cols-2 md:grid-cols-4" />
    </div>
  );
}
