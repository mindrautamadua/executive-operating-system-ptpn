import { hseInsights } from "@/lib/hse-data";
import { HseInsightGrid } from "../HseInsightGrid";

export function HseInsight() {
  return <HseInsightGrid items={hseInsights} cols="grid-cols-2 md:grid-cols-4" />;
}
