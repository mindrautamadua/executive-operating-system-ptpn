"use client";

import { stgKpi } from "@/lib/stg-data";
import { initiatives } from "@/lib/stg-core";
import { filterBySubholding } from "@/lib/subholding";
import { useSubholding } from "@/components/SubholdingProvider";
import { ScopeNote } from "@/components/ui/ScopeNote";
import { StgKpiCards } from "../StgKpiCards";

/** KPI yang punya pecahan subholding; sisanya tetap angka konsolidasi grup. */
const SCOPED = "Inisiatif Strategis RJPP";

/** KPI strip Executive Overview Strategi & Kinerja — 6 kartu. */
export function StgKpiStrip() {
  const { active, isFiltered, def } = useSubholding();
  // `owner` (PalmCo / SGN / PTPN I / Holding) adalah dimensi subholding register.
  const rows = filterBySubholding(initiatives, active, (i) => i.owner);

  const items = stgKpi.map((k) => {
    if (!isFiltered || k.label !== SCOPED) return k;
    const on = rows.filter((i) => i.status === "On Track").length;
    const at = rows.filter((i) => i.status === "At Risk").length;
    const off = rows.filter((i) => i.status === "Off Track").length;
    return {
      ...k,
      value: `${rows.length}`,
      sub: `${on} On Track · ${at} At Risk · ${off} Off Track`,
      delta: undefined,
      trend: undefined,
      deltaTone: undefined,
      compare: `${def.label} + inisiatif Holding`,
    };
  });

  return (
    <StgKpiCards
      items={items}
      cols="grid-cols-2 md:grid-cols-3 xl:grid-cols-6"
      badge={(k) => (k.label === SCOPED ? null : <ScopeNote />)}
    />
  );
}
