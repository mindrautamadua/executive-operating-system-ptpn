import { albInsights } from "@/lib/alb-data";
import { ScopeNote } from "@/components/ui/ScopeNote";
import { AsetInsightGrid } from "../AsetInsightGrid";

export function AlbInsight() {
  return (
    <div className="flex flex-col gap-1.5">
      <ScopeNote className="self-start" />
      <AsetInsightGrid items={albInsights} cols="grid-cols-2 md:grid-cols-4" />
    </div>
  );
}
