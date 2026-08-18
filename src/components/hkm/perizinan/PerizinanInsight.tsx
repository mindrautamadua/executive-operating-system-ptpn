import { perizinanInsights } from "@/lib/hkm-data";
import { HkmInsightGrid } from "../HkmInsightGrid";

export function PerizinanInsight() {
  return <HkmInsightGrid items={perizinanInsights} cols="grid-cols-2 md:grid-cols-3" />;
}
