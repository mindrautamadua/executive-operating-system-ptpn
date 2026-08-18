import { HseSidebar } from "@/components/hse/HseSidebar";
import { DataTrustStrip } from "@/components/hc/DataTrustStrip";
import { KinerjaK3Header } from "@/components/hse/kinerja-k3/KinerjaK3Header";
import { KinerjaKpiStrip } from "@/components/hse/kinerja-k3/KinerjaKpiStrip";
import { LtifrTrend } from "@/components/hse/kinerja-k3/LtifrTrend";
import { IncidentBySeverity } from "@/components/hse/kinerja-k3/IncidentBySeverity";
import { IncidentByActivity } from "@/components/hse/kinerja-k3/IncidentByActivity";
import { IncidentByCause } from "@/components/hse/kinerja-k3/IncidentByCause";
import { FatalityCases } from "@/components/hse/kinerja-k3/FatalityCases";
import { NearMissReporting } from "@/components/hse/kinerja-k3/NearMissReporting";
import { LostTimeByRegional } from "@/components/hse/kinerja-k3/LostTimeByRegional";
import { KinerjaInsight } from "@/components/hse/kinerja-k3/KinerjaInsight";
import { hseDataTrust } from "@/lib/hse-data";

export const metadata = { title: "Kinerja K3 — PTPN Group" };

export default function KinerjaK3Page() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <HseSidebar active="Kinerja K3" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <KinerjaK3Header />

        <div className="flex flex-col gap-3 px-5 pb-5">
          <div className="-mb-3">
            <DataTrustStrip data={hseDataTrust} />
          </div>

          <KinerjaKpiStrip />

          <div className="grid auto-rows-[250px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,60fr)_minmax(0,40fr)]">
            <LtifrTrend />
            <IncidentBySeverity />
          </div>

          <div className="grid auto-rows-[230px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,50fr)_minmax(0,50fr)]">
            <IncidentByActivity />
            <IncidentByCause />
          </div>

          <div className="grid auto-rows-[250px] grid-cols-1 gap-3">
            <FatalityCases />
          </div>

          <div className="grid auto-rows-[215px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,48fr)_minmax(0,52fr)]">
            <NearMissReporting />
            <LostTimeByRegional />
          </div>

          <KinerjaInsight />
        </div>
      </main>
    </div>
  );
}
