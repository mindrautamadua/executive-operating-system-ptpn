import { afsKpi } from "@/lib/afs-data";
import { ScopeNote } from "@/components/ui/ScopeNote";
import { AsetKpiCards } from "../AsetKpiCards";

export function AfsKpiStrip() {
  return (
    <div className="flex flex-col gap-1.5">
      {/* KPI menggabungkan PKS, PG, karet & teh — angka konsolidasi grup. */}
      <ScopeNote className="self-start" />
      <AsetKpiCards items={afsKpi} cols="grid-cols-2 md:grid-cols-3 xl:grid-cols-6" />
    </div>
  );
}
