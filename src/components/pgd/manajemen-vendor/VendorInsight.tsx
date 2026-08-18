import { vendorInsights } from "@/lib/pgd-data-detail";
import { PgdInsightGrid } from "../PgdInsightGrid";

export function VendorInsight() {
  return <PgdInsightGrid items={vendorInsights} cols="grid-cols-2 md:grid-cols-3" />;
}
