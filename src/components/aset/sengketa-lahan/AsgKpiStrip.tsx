import { asgKpi } from "@/lib/asg-data";
import { ScopeNote } from "@/components/ui/ScopeNote";
import { AsetKpiCards } from "../AsetKpiCards";

export function AsgKpiStrip() {
  return (
    <div className="flex flex-col gap-1.5">
      {/* Areal & eksposur sengketa ditampilkan sebagai total grup. */}
      <ScopeNote className="self-start" />
      <AsetKpiCards items={asgKpi} cols="grid-cols-2 md:grid-cols-3 xl:grid-cols-5" />
    </div>
  );
}
