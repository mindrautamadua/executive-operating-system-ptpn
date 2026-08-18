import { spiInsights } from "@/lib/spi-data";
import { StgInsightGrid } from "../StgInsightGrid";

/** Insight & rekomendasi halaman Portofolio Inisiatif. */
export function SpiInsight() {
  return <StgInsightGrid items={spiInsights} cols="grid-cols-2 md:grid-cols-3" />;
}
