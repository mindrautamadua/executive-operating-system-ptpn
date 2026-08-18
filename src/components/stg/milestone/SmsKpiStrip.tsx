import { smsKpi } from "@/lib/sms-data";
import { StgKpiCards } from "../StgKpiCards";

/** KPI strip halaman Milestone Tracking — 5 kartu. */
export function SmsKpiStrip() {
  return <StgKpiCards items={smsKpi} cols="grid-cols-2 md:grid-cols-3 xl:grid-cols-5" />;
}
