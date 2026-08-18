import { pgdInsights } from "@/lib/pgd-data";
import { PgdInsightGrid } from "../PgdInsightGrid";

export function PgdInsight() {
  return <PgdInsightGrid items={pgdInsights} cols="grid-cols-2 md:grid-cols-3" />;
}
