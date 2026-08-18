import { HkmSidebar } from "@/components/hkm/HkmSidebar";
import { DataTrustStrip } from "@/components/hc/DataTrustStrip";
import { PerizinanHeader } from "@/components/hkm/perizinan/PerizinanHeader";
import { PerizinanKpiStrip } from "@/components/hkm/perizinan/PerizinanKpiStrip";
import { PermitByDomain } from "@/components/hkm/perizinan/PermitByDomain";
import { ExpiryCalendar } from "@/components/hkm/perizinan/ExpiryCalendar";
import { RenewalFunnel } from "@/components/hkm/perizinan/RenewalFunnel";
import { PermitRiskMatrix } from "@/components/hkm/perizinan/PermitRiskMatrix";
import { ComplianceByRegion } from "@/components/hkm/perizinan/ComplianceByRegion";
import { SanctionLog } from "@/components/hkm/perizinan/SanctionLog";
import { PerizinanInsight } from "@/components/hkm/perizinan/PerizinanInsight";
import { hkmDataTrust } from "@/lib/hkm-data";

export const metadata = { title: "Perizinan & Lisensi — PTPN Group" };

export default function PerizinanPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <HkmSidebar active="Perizinan & Lisensi" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <PerizinanHeader />

        <div className="flex flex-col gap-3 px-5 pb-5">
          <div className="-mb-3">
            <DataTrustStrip data={hkmDataTrust} />
          </div>

          <PerizinanKpiStrip />

          <div className="grid auto-rows-[250px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,40fr)_minmax(0,60fr)]">
            <PermitByDomain />
            <ExpiryCalendar />
          </div>

          <div className="grid auto-rows-[240px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,36fr)_minmax(0,64fr)]">
            <RenewalFunnel />
            <PermitRiskMatrix />
          </div>

          <div className="grid auto-rows-[240px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,58fr)_minmax(0,42fr)]">
            <ComplianceByRegion />
            <SanctionLog />
          </div>

          <PerizinanInsight />
        </div>
      </main>
    </div>
  );
}
