import { stokInsights } from "@/lib/hilir-stok-margin-data";
import { ScopeNote } from "@/components/ui/ScopeNote";
import { MktInsightGrid } from "../MktInsightGrid";

/**
 * Narasi insight ditulis pada level grup (lintas komoditas & subholding),
 * sehingga tidak ikut filter — cukup ditandai <ScopeNote /> saat filter aktif.
 */
export function StokInsight() {
  return (
    <div className="flex flex-col gap-1.5">
      <ScopeNote className="self-start" />
      <MktInsightGrid items={stokInsights} cols="grid-cols-2 md:grid-cols-3" />
    </div>
  );
}
