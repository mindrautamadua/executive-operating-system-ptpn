import { smsInsights } from "@/lib/sms-data";
import { StgInsightGrid } from "../StgInsightGrid";

/** Insight & rekomendasi halaman Milestone Tracking. */
export function SmsInsight() {
  return <StgInsightGrid items={smsInsights} cols="grid-cols-2 md:grid-cols-3" />;
}
