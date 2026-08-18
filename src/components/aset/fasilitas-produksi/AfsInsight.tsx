import { afsInsights } from "@/lib/afs-data";
import { ScopeNote } from "@/components/ui/ScopeNote";
import { AsetInsightGrid } from "../AsetInsightGrid";

export function AfsInsight() {
  return (
    <div className="flex flex-col gap-1.5">
      <ScopeNote className="self-start" />
      <AsetInsightGrid items={afsInsights} cols="grid-cols-2 md:grid-cols-3 xl:grid-cols-5" />
    </div>
  );
}
