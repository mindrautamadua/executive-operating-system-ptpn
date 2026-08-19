import { TikSidebar } from "@/components/tik/TikSidebar";
import { DataTrustStrip } from "@/components/hc/DataTrustStrip";
import { DataAiHeader } from "@/components/tik/data-ai-governance/DataAiHeader";
import { DataKpiStrip } from "@/components/tik/data-ai-governance/DataKpiStrip";
import { DataQualityByDomain } from "@/components/tik/data-ai-governance/DataQualityByDomain";
import { AiUseCases } from "@/components/tik/data-ai-governance/AiUseCases";
import { GovernanceMaturity } from "@/components/tik/data-ai-governance/GovernanceMaturity";
import { IntegrationLandscape } from "@/components/tik/data-ai-governance/IntegrationLandscape";
import { DataStewardship } from "@/components/tik/data-ai-governance/DataStewardship";
import { AiRiskGuardrails } from "@/components/tik/data-ai-governance/AiRiskGuardrails";
import { DataInsight } from "@/components/tik/data-ai-governance/DataInsight";
import { tikDataTrust } from "@/lib/tik-data";

export const metadata = { title: "Data & AI Governance — PTPN Group" };

export default function DataAiGovernancePage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <TikSidebar active="Data & AI Governance" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <DataAiHeader />

        <div className="flex flex-col gap-3 px-5 pb-5">
          <div className="-mb-3">
            <DataTrustStrip data={tikDataTrust} />
          </div>

          <DataKpiStrip />

          <div className="grid auto-rows-[minmax(250px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,45fr)_minmax(0,55fr)]">
            <DataQualityByDomain />
            <AiUseCases />
          </div>

          <div className="grid auto-rows-[minmax(240px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,30fr)_minmax(0,42fr)_minmax(0,28fr)]">
            <GovernanceMaturity />
            <IntegrationLandscape />
            <DataStewardship />
          </div>

          <div className="grid auto-rows-[minmax(215px,auto)] grid-cols-1 gap-3">
            <AiRiskGuardrails />
          </div>

          <DataInsight />
        </div>
      </main>
    </div>
  );
}
