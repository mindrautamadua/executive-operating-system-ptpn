import { kategoriInsights } from "@/lib/pgd-data";
import { PgdInsightGrid } from "../PgdInsightGrid";

export function KategoriInsight() {
  return <PgdInsightGrid items={kategoriInsights} cols="grid-cols-2 md:grid-cols-3" />;
}
