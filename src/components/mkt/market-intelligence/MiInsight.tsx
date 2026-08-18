import { miInsights } from "@/lib/hilir-stok-margin-data";
import { ScopeNote } from "@/components/ui/ScopeNote";
import { MktInsightGrid } from "../MktInsightGrid";

/** Narasi rekomendasi disusun pada tingkat grup — tidak menyesuaikan filter. */
export function MiInsight() {
  return (
    <div className="flex flex-col gap-1.5">
      <ScopeNote className="self-start" />
      <MktInsightGrid items={miInsights} cols="grid-cols-2 md:grid-cols-3" />
    </div>
  );
}
