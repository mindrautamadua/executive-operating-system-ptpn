import { asgInsights } from "@/lib/asg-data";
import { ScopeNote } from "@/components/ui/ScopeNote";
import { AsetInsightGrid } from "../AsetInsightGrid";

export function AsgInsight() {
  return (
    <div className="flex flex-col gap-1.5">
      <ScopeNote className="self-start" />
      <AsetInsightGrid items={asgInsights} cols="grid-cols-2 md:grid-cols-3" />
    </div>
  );
}
