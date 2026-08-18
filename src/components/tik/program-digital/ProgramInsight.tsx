import { programInsights } from "@/lib/tik-data";
import { TikInsightGrid } from "../TikInsightGrid";

export function ProgramInsight() {
  return <TikInsightGrid items={programInsights} cols="grid-cols-2 md:grid-cols-3" />;
}
