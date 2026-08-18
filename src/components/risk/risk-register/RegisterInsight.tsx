import { registerInsights } from "@/lib/risk-data";
import { RiskInsightGrid } from "../RiskInsightGrid";

export function RegisterInsight() {
  return <RiskInsightGrid items={registerInsights} cols="grid-cols-2 md:grid-cols-3" />;
}
