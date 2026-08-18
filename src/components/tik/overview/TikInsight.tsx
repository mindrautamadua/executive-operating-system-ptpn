import { tikInsights } from "@/lib/tik-data";
import { TikInsightGrid } from "../TikInsightGrid";

export function TikInsight() {
  return <TikInsightGrid items={tikInsights} cols="grid-cols-2 md:grid-cols-3" />;
}
