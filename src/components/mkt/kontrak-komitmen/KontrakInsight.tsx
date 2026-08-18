import { kontrakInsights } from "@/lib/kontrak-buyer-data";
import { ScopeNote } from "@/components/ui/ScopeNote";
import { MktInsightGrid } from "../MktInsightGrid";

/** Narasi rekomendasi disusun pada tingkat grup — tidak menyesuaikan filter. */
export function KontrakInsight() {
  return (
    <div className="flex flex-col gap-1.5">
      <ScopeNote className="self-start" />
      <MktInsightGrid items={kontrakInsights} cols="grid-cols-2 md:grid-cols-3" />
    </div>
  );
}
