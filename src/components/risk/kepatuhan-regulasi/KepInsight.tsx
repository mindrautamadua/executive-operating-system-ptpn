import { kepInsights } from "@/lib/risk-data-detail";
import { RiskInsightGrid } from "../RiskInsightGrid";

export function KepInsight() {
  return <RiskInsightGrid items={kepInsights} cols="grid-cols-2 md:grid-cols-3" />;
}
