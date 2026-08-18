import { rekomendasiInsights } from "@/lib/dek-data";
import { DekInsightGrid } from "../DekInsightGrid";

export function RekomendasiInsight() {
  return <DekInsightGrid items={rekomendasiInsights} cols="grid-cols-2 md:grid-cols-4" />;
}
