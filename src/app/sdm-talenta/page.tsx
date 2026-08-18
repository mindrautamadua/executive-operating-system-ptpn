import { SdmSidebar } from "@/components/sdm/SdmSidebar";
import { SdmHeader } from "@/components/sdm/SdmHeader";
import { HcKpiStrip } from "@/components/hc/HcKpiStrip";
import { ExecutiveIntelligence } from "@/components/hc/ExecutiveIntelligence";
import { StrategicAlignment } from "@/components/hc/StrategicAlignment";
import { PeopleRiskRadar } from "@/components/hc/PeopleRiskRadar";
import { PeopleMathHpi } from "@/components/hc/PeopleMathHpi";
import { BodDecisionCenter } from "@/components/hc/BodDecisionCenter";
import { PeopleProductivity } from "@/components/hc/PeopleProductivity";
import { ScenarioSimulation } from "@/components/hc/ScenarioSimulation";
import { SkillsIntelligence } from "@/components/hc/SkillsIntelligence";
import { DataTrustStrip } from "@/components/hc/DataTrustStrip";
import { TalentPortfolio } from "@/components/hc/TalentPortfolio";
import { TalentActionIntelligence } from "@/components/hc/TalentActionIntelligence";
import { AlertsNotifications } from "@/components/hc/AlertsNotifications";
import { HcCopilot } from "@/components/hc/HcCopilot";

export const metadata = { title: "HC Executive Operating System — PTPN Group" };

export default function SdmTalentaPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <SdmSidebar active="Executive Overview" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <SdmHeader />

        <div className="px-5 pb-5">
          <DataTrustStrip />
          <h2 className="mb-2 text-[10px] font-extrabold uppercase tracking-[0.05em] text-ink-900">
            Key Strategic KPI
          </h2>

          <div className="grid grid-cols-1 items-start gap-3 xl:grid-cols-[minmax(0,1fr)_330px]">
            {/* kolom utama */}
            <div className="flex min-w-0 flex-col gap-3">
              <HcKpiStrip />
              <ExecutiveIntelligence />
              <div className="grid grid-cols-1 items-stretch gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,52fr)_minmax(0,48fr)]">
                <PeopleRiskRadar />
                <PeopleMathHpi />
              </div>
              <div className="grid grid-cols-1 items-stretch gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,46fr)_minmax(0,54fr)]">
                <PeopleProductivity />
                <ScenarioSimulation />
              </div>
              <SkillsIntelligence />
              <AlertsNotifications />
            </div>

            {/* rail kanan */}
            <div className="flex min-w-0 flex-col gap-3">
              <StrategicAlignment />
              <BodDecisionCenter />
              <TalentPortfolio />
              <TalentActionIntelligence />
              <HcCopilot />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
