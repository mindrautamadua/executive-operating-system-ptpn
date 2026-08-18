import { stfKpi } from "@/lib/stf-data";
import { StgKpiCards } from "../StgKpiCards";

/** KPI strip halaman Program Transformasi — 4 kartu. */
export function StfKpiStrip() {
  return <StgKpiCards items={stfKpi} cols="grid-cols-2 md:grid-cols-4" />;
}
