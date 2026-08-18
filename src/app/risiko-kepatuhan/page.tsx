import { RiskSidebar } from "@/components/risk/RiskSidebar";
import { RiskHeader } from "@/components/risk/RiskHeader";
import { DataTrustStrip } from "@/components/hc/DataTrustStrip";
import { RiskKpiStrip } from "@/components/risk/overview/RiskKpiStrip";
import { RiskIntelligence } from "@/components/risk/overview/RiskIntelligence";
import { EnterpriseHeatmap } from "@/components/risk/overview/EnterpriseHeatmap";
import { Top10Risks } from "@/components/risk/overview/Top10Risks";
import { RiskCategoryRadar } from "@/components/risk/overview/RiskCategoryRadar";
import { EarlyWarningIndicators } from "@/components/risk/overview/EarlyWarningIndicators";
import { RiskBodDecisionCenter } from "@/components/risk/overview/RiskBodDecisionCenter";
import { ComplianceSnapshot } from "@/components/risk/overview/ComplianceSnapshot";
import { RiskInsight } from "@/components/risk/overview/RiskInsight";
import { riskDataTrust } from "@/lib/risk-data";

export const metadata = { title: "Risiko & Kepatuhan — PTPN Group" };

export default function RisikoKepatuhanPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <RiskSidebar active="Executive Overview" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <RiskHeader />

        <div className="px-5 pb-5">
          <DataTrustStrip data={riskDataTrust} />

          <div className="grid grid-cols-1 items-start gap-3 xl:grid-cols-[minmax(0,1fr)_330px]">
            {/* kolom utama */}
            <div className="flex min-w-0 flex-col gap-3">
              <RiskKpiStrip />
              <RiskIntelligence />

              <div className="grid auto-rows-[250px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,46fr)_minmax(0,54fr)]">
                <EnterpriseHeatmap />
                <Top10Risks />
              </div>

              <div className="grid auto-rows-[250px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,42fr)_minmax(0,58fr)]">
                <RiskCategoryRadar />
                <EarlyWarningIndicators />
              </div>
            </div>

            {/* rail kanan */}
            <div className="flex min-w-0 flex-col gap-3">
              <RiskBodDecisionCenter />
              <ComplianceSnapshot />
            </div>
          </div>

          <div className="mt-3">
            <RiskInsight />
          </div>
        </div>
      </main>
    </div>
  );
}
