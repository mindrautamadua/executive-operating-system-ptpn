import { astInsights } from "@/lib/ast-data";
import { ScopeNote } from "@/components/ui/ScopeNote";
import { AsetRekomendasiGrid } from "../AsetInsightGrid";

/** Insight naratif tingkat grup (menyandingkan tiga subholding sekaligus). */
export function AstInsight() {
  return (
    <div className="flex flex-col gap-1.5">
      <ScopeNote className="self-start" />
      <AsetRekomendasiGrid items={astInsights} cols="grid-cols-2 md:grid-cols-3" />
    </div>
  );
}
