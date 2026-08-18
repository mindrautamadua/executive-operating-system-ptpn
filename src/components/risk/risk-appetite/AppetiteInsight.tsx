import { appetiteInsights } from "@/lib/risk-data";
import { RiskInsightGrid } from "../RiskInsightGrid";

export function AppetiteInsight() {
  return <RiskInsightGrid items={appetiteInsights} cols="grid-cols-2 md:grid-cols-3" />;
}
