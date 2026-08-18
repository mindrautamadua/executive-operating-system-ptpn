import { astKpi } from "@/lib/ast-data";
import { ScopeNote } from "@/components/ui/ScopeNote";
import { AsetKpiCards } from "../AsetKpiCards";

export function AstKpiStrip() {
  return (
    <div className="flex flex-col gap-1.5">
      {/* KPI aset memakai angka konsolidasi grup — tandai saat filter aktif. */}
      <ScopeNote className="self-start" />
      <AsetKpiCards items={astKpi} cols="grid-cols-2 md:grid-cols-3 xl:grid-cols-6" />
    </div>
  );
}
