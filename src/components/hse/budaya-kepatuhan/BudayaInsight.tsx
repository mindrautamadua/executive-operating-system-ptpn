import { budayaInsights } from "@/lib/hse-data";
import { HseInsightGrid } from "../HseInsightGrid";

export function BudayaInsight() {
  return <HseInsightGrid items={budayaInsights} cols="grid-cols-2 md:grid-cols-4" />;
}
