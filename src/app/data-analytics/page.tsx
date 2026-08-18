import { SdmSidebar } from "@/components/sdm/SdmSidebar";
import { DataHeader } from "@/components/data/DataHeader";
import { DataKpiStrip } from "@/components/data/DataKpiStrip";
import { DataQualityOverview } from "@/components/data/DataQualityOverview";
import { TrenDataQuality } from "@/components/data/TrenDataQuality";
import { KelengkapanDomain } from "@/components/data/KelengkapanDomain";
import { SumberDataTerhubung } from "@/components/data/SumberDataTerhubung";
import { AnomalyDetection } from "@/components/data/AnomalyDetection";
import { PerbandinganUnit } from "@/components/data/PerbandinganUnit";
import { DataToDecision } from "@/components/data/DataToDecision";
import { TopInsightData } from "@/components/data/TopInsightData";
import { GovernanceStatus } from "@/components/data/GovernanceStatus";
import { DataReconciliation } from "@/components/data/DataReconciliation";
import { ElemenKritis } from "@/components/data/ElemenKritis";
import { DqIncidents } from "@/components/data/DqIncidents";

export const metadata = { title: "Data & Analytics — PTPN Group" };

export default function DataAnalyticsPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <SdmSidebar
        active="Data & Analytics"
        assistantCard="coach"
        assistantTitle="AI Data Assistant"
        assistantText="Tanya, analisa, dan dapatkan insight dari data SDM Anda dengan mudah."
        assistantCta="Tanya AI Assistant"
      />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <DataHeader />

        <div className="mx-5 mb-4 flex flex-col gap-3">
          <DataKpiStrip />

          <div className="grid auto-rows-[250px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,375fr)_minmax(0,450fr)_minmax(0,470fr)]">
            <DataQualityOverview />
            <TrenDataQuality />
            <KelengkapanDomain />
          </div>

          <div className="grid auto-rows-[255px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,470fr)_minmax(0,355fr)_minmax(0,470fr)]">
            <SumberDataTerhubung />
            <AnomalyDetection />
            <PerbandinganUnit />
          </div>

          <div className="grid auto-rows-[235px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,470fr)_minmax(0,355fr)_minmax(0,470fr)]">
            <DataReconciliation />
            <ElemenKritis />
            <DqIncidents />
          </div>

          <div className="grid auto-rows-[225px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,470fr)_minmax(0,355fr)_minmax(0,470fr)]">
            <DataToDecision />
            <TopInsightData />
            <GovernanceStatus />
          </div>
        </div>
      </main>
    </div>
  );
}
