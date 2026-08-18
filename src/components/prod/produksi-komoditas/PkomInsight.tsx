import { prodInsights } from "@/lib/produksi-data";
import { ProdInsightGrid } from "../ProdInsightGrid";
import { ScopeNote } from "@/components/ui/ScopeNote";

export function PkomInsight() {
  // Narasi insight disusun lintas komoditas di level grup - tandai konsolidasi.
  return (
    <div className="flex flex-col gap-1">
      <ScopeNote className="self-end" />
      <ProdInsightGrid items={prodInsights} cols="grid-cols-2 md:grid-cols-4" />
    </div>
  );
}
