import { hargaInsights } from "@/lib/harga-outlook-data";
import { MktInsightGrid } from "../MktInsightGrid";

export function HargaInsight() {
  return <MktInsightGrid items={hargaInsights} cols="grid-cols-2 md:grid-cols-4" />;
}
