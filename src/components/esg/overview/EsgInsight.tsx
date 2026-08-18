import { esgInsights } from "@/lib/esg-data";
import { EsgInsightGrid } from "../EsgInsightGrid";

export function EsgInsight() {
  return <EsgInsightGrid items={esgInsights} cols="grid-cols-2 md:grid-cols-3" />;
}
