import { kinerjaInsights } from "@/lib/hse-data";
import { HseInsightGrid } from "../HseInsightGrid";

export function KinerjaInsight() {
  return <HseInsightGrid items={kinerjaInsights} cols="grid-cols-2 md:grid-cols-4" />;
}
