import { albKpi } from "@/lib/alb-data";
import { ScopeNote } from "@/components/ui/ScopeNote";
import { AsetKpiCards } from "../AsetKpiCards";

export function AlbKpiStrip() {
  return (
    <div className="flex flex-col gap-1.5">
      {/* Total land bank & status legal adalah angka konsolidasi grup. */}
      <ScopeNote className="self-start" />
      <AsetKpiCards items={albKpi} cols="grid-cols-2 md:grid-cols-3 xl:grid-cols-5" />
    </div>
  );
}
