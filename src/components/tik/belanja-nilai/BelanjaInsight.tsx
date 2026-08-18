import { belanjaInsights } from "@/lib/tik-data-detail";
import { TikInsightGrid } from "../TikInsightGrid";

export function BelanjaInsight() {
  return <TikInsightGrid items={belanjaInsights} cols="grid-cols-2 md:grid-cols-3" />;
}
