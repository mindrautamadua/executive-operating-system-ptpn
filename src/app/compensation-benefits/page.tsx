import { SdmSidebar } from "@/components/sdm/SdmSidebar";
import { CompHeader } from "@/components/comp/CompHeader";
import { CompKpiStrip } from "@/components/comp/CompKpiStrip";
import { KomposisiTotalRewards } from "@/components/comp/KomposisiTotalRewards";
import { TrenBiayaKompensasi } from "@/components/comp/TrenBiayaKompensasi";
import { BenchmarkGaji } from "@/components/comp/BenchmarkGaji";
import { PayGapAnalisis } from "@/components/comp/PayGapAnalisis";
import { DistribusiGaji } from "@/components/comp/DistribusiGaji";
import { RealisasiKenaikanGaji } from "@/components/comp/RealisasiKenaikanGaji";
import { KomposisiBenefits } from "@/components/comp/KomposisiBenefits";
import { RingkasanUnitKompensasi } from "@/components/comp/RingkasanUnitKompensasi";
import { RasioKinerja } from "@/components/comp/RasioKinerja";
import { InsightComp } from "@/components/comp/InsightComp";
import { CompaRangePanel } from "@/components/comp/CompaRangePanel";
import { PayEquityRemediation } from "@/components/comp/PayEquityRemediation";
import { PayForPerformance } from "@/components/comp/PayForPerformance";
import { PeopleCostEfficiency } from "@/components/comp/PeopleCostEfficiency";
import { CriticalTalentCompRisk } from "@/components/comp/CriticalTalentCompRisk";
import { CompDecisionCenter } from "@/components/comp/CompDecisionCenter";
import { CompFootnote } from "@/components/comp/CompFootnote";

export const metadata = { title: "Compensation & Benefits — PTPN Group" };

export default function CompensationBenefitsPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <SdmSidebar
        assistantCard="coach"
        assistantTitle="AI Comp Assistant"
        assistantText="Butuh insight kompensasi atau benchmark gaji? Tanya AI Assistant sekarang."
        assistantCta="Tanya AI Assistant"
      />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <CompHeader />

        <div className="mx-5 mb-4 flex flex-col gap-3">
          <CompKpiStrip />

          <div className="grid auto-rows-[minmax(266px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,380fr)_minmax(0,450fr)_minmax(0,457fr)]">
            <KomposisiTotalRewards />
            <TrenBiayaKompensasi />
            <BenchmarkGaji />
          </div>

          <div className="grid auto-rows-[minmax(230px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,380fr)_minmax(0,308fr)_minmax(0,307fr)_minmax(0,283fr)]">
            <PayGapAnalisis />
            <DistribusiGaji />
            <RealisasiKenaikanGaji />
            <KomposisiBenefits />
          </div>

          <div className="grid auto-rows-[minmax(236px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,58fr)_minmax(0,42fr)]">
            <CompaRangePanel />
            <PayEquityRemediation />
          </div>

          <div className="grid auto-rows-[minmax(240px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,36fr)_minmax(0,32fr)_minmax(0,32fr)]">
            <PayForPerformance />
            <PeopleCostEfficiency />
            <CriticalTalentCompRisk />
          </div>

          <div className="grid auto-rows-[minmax(228px,auto)] grid-cols-1">
            <CompDecisionCenter />
          </div>

          <div className="grid auto-rows-[minmax(216px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,495fr)_minmax(0,328fr)_minmax(0,468fr)]">
            <RingkasanUnitKompensasi />
            <RasioKinerja />
            <InsightComp />
          </div>

          <CompFootnote />
        </div>
      </main>
    </div>
  );
}
