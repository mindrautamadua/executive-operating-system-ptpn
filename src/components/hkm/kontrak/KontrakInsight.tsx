import { kontrakInsights } from "@/lib/hkm-data";
import { HkmInsightGrid } from "../HkmInsightGrid";

export function KontrakInsight() {
  return <HkmInsightGrid items={kontrakInsights} cols="grid-cols-2 md:grid-cols-3" />;
}
