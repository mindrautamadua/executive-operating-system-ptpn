import { stfInsights } from "@/lib/stf-data";
import { StgInsightGrid } from "../StgInsightGrid";

/** Insight & rekomendasi halaman Program Transformasi. */
export function StfInsight() {
  return <StgInsightGrid items={stfInsights} cols="grid-cols-2 md:grid-cols-3" />;
}
