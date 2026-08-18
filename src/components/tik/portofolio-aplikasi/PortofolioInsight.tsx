import { portofolioInsights } from "@/lib/tik-data-detail";
import { TikInsightGrid } from "../TikInsightGrid";

export function PortofolioInsight() {
  return <TikInsightGrid items={portofolioInsights} cols="grid-cols-2 md:grid-cols-3" />;
}
