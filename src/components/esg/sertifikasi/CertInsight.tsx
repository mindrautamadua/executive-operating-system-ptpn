import { certInsights } from "@/lib/esg-data";
import { EsgInsightGrid } from "../EsgInsightGrid";

export function CertInsight() {
  return <EsgInsightGrid items={certInsights} cols="grid-cols-2 md:grid-cols-3" />;
}
