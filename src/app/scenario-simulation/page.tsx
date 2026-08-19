import { SdmSidebar } from "@/components/sdm/SdmSidebar";
import { SsHeader } from "@/components/ss/SsHeader";
import { SsKpiStrip } from "@/components/ss/SsKpiStrip";
import { ScenarioManager } from "@/components/ss/ScenarioManager";
import { ImpactComparison } from "@/components/ss/ImpactComparison";
import { HeadcountProjection } from "@/components/ss/HeadcountProjection";
import { ScenarioAssumptions } from "@/components/ss/ScenarioAssumptions";
import { FinancialImpact } from "@/components/ss/FinancialImpact";
import { TalentImpactSummary } from "@/components/ss/TalentImpactSummary";
import { SsInsightRekomendasi } from "@/components/ss/SsInsightRekomendasi";
import { NextBestAction } from "@/components/ss/NextBestAction";
import { ModelConfidenceRisk } from "@/components/ss/ModelConfidenceRisk";
import { ValueCreationBridge } from "@/components/ss/ValueCreationBridge";
import { SensitivityTornado } from "@/components/ss/SensitivityTornado";
import { OutcomeRange } from "@/components/ss/OutcomeRange";
import { ExecutionFeasibility } from "@/components/ss/ExecutionFeasibility";
import { StressScenario } from "@/components/ss/StressScenario";
import { GoalSeekPanel } from "@/components/ss/GoalSeekPanel";
import { SsDecisionCenter } from "@/components/ss/SsDecisionCenter";
import { SsFootnote } from "@/components/ss/SsFootnote";

export const metadata = { title: "Scenario Simulation — PTPN Group" };

export default function ScenarioSimulationPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <SdmSidebar active="Scenario Simulation" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <SsHeader />

        <div className="flex flex-col gap-3 px-5 pb-5">
          <SsKpiStrip />

          <div className="grid auto-rows-[minmax(255px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,40fr)_minmax(0,30fr)_minmax(0,30fr)]">
            <ScenarioManager />
            <ImpactComparison />
            <HeadcountProjection />
          </div>

          <div className="grid auto-rows-[minmax(250px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,31fr)_minmax(0,33fr)_minmax(0,36fr)]">
            <ScenarioAssumptions />
            <FinancialImpact />
            <TalentImpactSummary />
          </div>

          <div className="grid auto-rows-[minmax(250px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,36fr)_minmax(0,33fr)_minmax(0,31fr)]">
            <ValueCreationBridge />
            <SensitivityTornado />
            <OutcomeRange />
          </div>

          <div className="grid auto-rows-[minmax(260px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,33fr)_minmax(0,36fr)_minmax(0,31fr)]">
            <ExecutionFeasibility />
            <StressScenario />
            <GoalSeekPanel />
          </div>

          <div className="grid auto-rows-[minmax(235px,auto)] grid-cols-1">
            <SsDecisionCenter />
          </div>

          <div className="grid auto-rows-[minmax(225px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,36fr)_minmax(0,32fr)_minmax(0,32fr)]">
            <SsInsightRekomendasi />
            <NextBestAction />
            <ModelConfidenceRisk />
          </div>

          <SsFootnote />
        </div>
      </main>
    </div>
  );
}
