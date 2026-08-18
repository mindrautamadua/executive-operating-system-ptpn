import { hkmInsights } from "@/lib/hkm-data";
import { HkmInsightGrid } from "../HkmInsightGrid";

export function HkmInsight() {
  return <HkmInsightGrid items={hkmInsights} cols="grid-cols-2 md:grid-cols-3" />;
}
