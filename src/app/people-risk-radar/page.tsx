import { Info } from "lucide-react";
import { SdmSidebar } from "@/components/sdm/SdmSidebar";
import { PrrHeader } from "@/components/prr/PrrHeader";
import { PrrKpiStrip } from "@/components/prr/PrrKpiStrip";
import { RiskRadarChart } from "@/components/prr/RiskRadarChart";
import { RiskSummary } from "@/components/prr/RiskSummary";
import { TopRisks } from "@/components/prr/TopRisks";
import { RiskTrend } from "@/components/prr/RiskTrend";
import { RiskHeatmapOrg } from "@/components/prr/RiskHeatmapOrg";
import { TopRiskDrivers } from "@/components/prr/TopRiskDrivers";
import { EarlyWarnings } from "@/components/prr/EarlyWarnings";
import { ControlEffectiveness } from "@/components/prr/ControlEffectiveness";
import { RekomendasiTindakan } from "@/components/prr/RekomendasiTindakan";
import { RiskInterdependency } from "@/components/prr/RiskInterdependency";
import { ExposureByBusiness } from "@/components/prr/ExposureByBusiness";
import { ScenarioImpact } from "@/components/prr/ScenarioImpact";
import { PrrDecisionCenter } from "@/components/prr/PrrDecisionCenter";
import { prrMethodology } from "@/lib/prr-data";

export const metadata = { title: "People Risk Radar — PTPN Group" };

export default function PeopleRiskRadarPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <SdmSidebar active="People Risk Radar" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <PrrHeader />

        <div className="flex flex-col gap-3 px-5 pb-5">
          <PrrKpiStrip />

          <div className="grid auto-rows-[340px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,33fr)_minmax(0,32fr)_minmax(0,35fr)]">
            <RiskRadarChart />
            <RiskSummary />
            <TopRisks />
          </div>

          <div className="grid auto-rows-[280px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,40fr)_minmax(0,31fr)_minmax(0,29fr)]">
            <RiskTrend />
            <RiskHeatmapOrg />
            <TopRiskDrivers />
          </div>

          <div className="grid auto-rows-[300px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,31fr)_minmax(0,32fr)_minmax(0,37fr)]">
            <EarlyWarnings />
            <ControlEffectiveness />
            <RekomendasiTindakan />
          </div>

          <div className="grid auto-rows-[290px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,33fr)_minmax(0,34fr)_minmax(0,33fr)]">
            <RiskInterdependency />
            <ExposureByBusiness />
            <ScenarioImpact />
          </div>

          <PrrDecisionCenter />

          <div className="anim-rise grid grid-cols-2 md:grid-cols-3 gap-3 rounded-xl border border-[#d8e6f7] bg-[#eef5fd] px-3.5 py-2.5">
            {prrMethodology.map((m) => (
              <div key={m.title} className="flex items-start gap-2">
                <Info size={13} className="mt-[1px] shrink-0 text-[#2f6fe4]" />
                <span className="text-[9px] leading-[1.45] text-ink-700">
                  <span className="font-bold text-ink-900">{m.title}: </span>
                  {m.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
