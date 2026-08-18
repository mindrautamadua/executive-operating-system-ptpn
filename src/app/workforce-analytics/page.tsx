import { SdmSidebar } from "@/components/sdm/SdmSidebar";
import { WaHeader } from "@/components/wa/WaHeader";
import { WaKpiStrip } from "@/components/wa/WaKpiStrip";
import { DataTrustStrip } from "@/components/hc/DataTrustStrip";
import { WorkforceIntelligence } from "@/components/wa/WorkforceIntelligence";
import { DemandSupplyGap } from "@/components/wa/DemandSupplyGap";
import { WorkforceCapacity } from "@/components/wa/WorkforceCapacity";
import { HeadcountTrend } from "@/components/wa/HeadcountTrend";
import { DonutBreakdown } from "@/components/wa/DonutBreakdown";
import { HeadcountByGeneration } from "@/components/wa/HeadcountByGeneration";
import { HeadcountByAgeGroup } from "@/components/wa/HeadcountByAgeGroup";
import { DiversitySnapshot } from "@/components/wa/DiversitySnapshot";
import { HeadcountByJobLevel } from "@/components/wa/HeadcountByJobLevel";
import { TurnoverTrend } from "@/components/wa/TurnoverTrend";
import { HeadcountMovement } from "@/components/wa/HeadcountMovement";
import { WaProductivity } from "@/components/wa/WaProductivity";
import { WaSkillsGap } from "@/components/wa/WaSkillsGap";
import { WaRiskCompact } from "@/components/wa/WaRiskCompact";
import { WaScenarioCompact } from "@/components/wa/WaScenarioCompact";
import { InsightRekomendasi } from "@/components/wa/InsightRekomendasi";
import { headcountByOrg, headcountByType, waDataTrust } from "@/lib/wa-data";

export const metadata = { title: "Workforce Analytics — PTPN Group" };

export default function WorkforceAnalyticsPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <SdmSidebar active="Workforce Analytics" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <WaHeader />

        <div className="flex flex-col gap-3 px-5 pb-5">
          <div className="-mb-3">
            <DataTrustStrip data={waDataTrust} />
          </div>

          <WaKpiStrip />

          {/* Lapisan intelligence: sintesis + future readiness */}
          <WorkforceIntelligence />

          <div className="grid auto-rows-[250px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,62fr)_minmax(0,38fr)]">
            <DemandSupplyGap />
            <WorkforceCapacity />
          </div>

          {/* Lapisan foundation: komposisi & dinamika current workforce */}
          <div className="grid auto-rows-[235px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,40fr)_minmax(0,31fr)_minmax(0,29fr)]">
            <HeadcountTrend />
            <DonutBreakdown
              title="Headcount by Organization"
              subtitle="Distribusi Headcount per Holding/Sub Holding"
              data={headcountByOrg}
              delay={120}
              href="/workforce-analytics/headcount-organisasi"
              orgDimension
            />
            <DonutBreakdown
              title="Headcount by Employment Type"
              subtitle="Komposisi berdasarkan Jenis Karyawan"
              data={headcountByType}
              delay={180}
              href="/workforce-analytics/headcount-status-kerja"
            />
          </div>

          <div className="grid auto-rows-[225px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,33fr)_minmax(0,32fr)_minmax(0,35fr)]">
            <HeadcountByGeneration />
            <HeadcountByAgeGroup />
            <DiversitySnapshot />
          </div>

          <div className="grid auto-rows-[230px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,32fr)_minmax(0,32fr)_minmax(0,36fr)]">
            <HeadcountByJobLevel />
            <TurnoverTrend />
            <HeadcountMovement />
          </div>

          {/* Lapisan decision: produktivitas, skills, risk, scenario (ringkas, link ke modul spesialis) */}
          <div className="grid auto-rows-[235px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,55fr)_minmax(0,45fr)]">
            <WaProductivity />
            <WaSkillsGap />
          </div>

          <div className="grid auto-rows-[215px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,55fr)_minmax(0,45fr)]">
            <WaRiskCompact />
            <WaScenarioCompact />
          </div>

          <InsightRekomendasi />
        </div>
      </main>
    </div>
  );
}
