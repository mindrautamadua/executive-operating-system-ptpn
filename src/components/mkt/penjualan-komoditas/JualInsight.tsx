import { mktInsights } from "@/lib/pemasaran-data";
import { MktInsightGrid } from "../MktInsightGrid";

export function JualInsight() {
  return <MktInsightGrid items={mktInsights} cols="grid-cols-2 md:grid-cols-4" />;
}
