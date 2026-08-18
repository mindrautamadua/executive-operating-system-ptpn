import { SdmSidebar } from "@/components/sdm/SdmSidebar";
import { TiHeader } from "@/components/ti/TiHeader";
import { TiKpiStrip } from "@/components/ti/TiKpiStrip";
import { TalentPortfolioBox } from "@/components/ti/TalentPortfolioBox";
import { TalentPipelineReadiness } from "@/components/ti/TalentPipelineReadiness";
import { TopTalentPotential } from "@/components/ti/TopTalentPotential";
import { TalentRiskOverview } from "@/components/ti/TalentRiskOverview";
import { TalentAttributesInsight } from "@/components/ti/TalentAttributesInsight";
import { CriticalRoleCoverage } from "@/components/ti/CriticalRoleCoverage";
import { TalentDevelopmentFocus } from "@/components/ti/TalentDevelopmentFocus";
import { TalentMobilityOverview } from "@/components/ti/TalentMobilityOverview";
import { ExecutiveTalentIntelligence } from "@/components/ti/ExecutiveTalentIntelligence";
import { RoleTalentMatch } from "@/components/ti/RoleTalentMatch";
import { TalentDecisions } from "@/components/ti/TalentDecisions";
import { TalentIntelligenceIndex } from "@/components/ti/TalentIntelligenceIndex";
import { TrenTalenta } from "@/components/talent/TrenTalenta";
import { HeatmapUnitKerja } from "@/components/talent/HeatmapUnitKerja";

export const metadata = { title: "Talent Intelligence — PTPN Group" };

export default function TalentIntelligencePage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <SdmSidebar active="Talent Intelligence" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <TiHeader />

        <div className="px-5 pb-5 pt-3">
          <div className="flex flex-col gap-3">
            <TiKpiStrip />

            <ExecutiveTalentIntelligence />

            <div className="grid grid-cols-1 items-stretch gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,35fr)_minmax(0,30fr)_minmax(0,35fr)]">
              <TalentPortfolioBox />
              <TalentPipelineReadiness />
              <TopTalentPotential />
            </div>

            <div className="grid grid-cols-1 items-stretch gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,34fr)_minmax(0,32fr)_minmax(0,34fr)]">
              <TalentRiskOverview />
              <TalentAttributesInsight />
              <CriticalRoleCoverage />
            </div>

            <div className="grid grid-cols-1 items-stretch gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,60fr)_minmax(0,40fr)]">
              <RoleTalentMatch />
              <TalentDecisions />
            </div>

            <div className="grid grid-cols-1 items-stretch gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,60fr)_minmax(0,40fr)]">
              <TalentDevelopmentFocus />
              <TalentMobilityOverview />
            </div>

            <div className="grid auto-rows-[260px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,34fr)_minmax(0,32fr)_minmax(0,34fr)]">
              <TrenTalenta />
              <TalentIntelligenceIndex />
              <HeatmapUnitKerja />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
