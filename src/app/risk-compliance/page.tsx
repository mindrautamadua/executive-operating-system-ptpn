import { Info } from "lucide-react";
import { SdmSidebar } from "@/components/sdm/SdmSidebar";
import { RcHeader } from "@/components/rc/RcHeader";
import { RcKpiStrip } from "@/components/rc/RcKpiStrip";
import { ComplianceRadarChart } from "@/components/rc/ComplianceRadarChart";
import { ComplianceSummary } from "@/components/rc/ComplianceSummary";
import { TopComplianceIssues } from "@/components/rc/TopComplianceIssues";
import { ComplianceTrend } from "@/components/rc/ComplianceTrend";
import { ComplianceHeatmapOrg } from "@/components/rc/ComplianceHeatmapOrg";
import { CaseBreakdown } from "@/components/rc/CaseBreakdown";
import { RekomendasiKepatuhan } from "@/components/rc/RekomendasiKepatuhan";
import { ControlEffectiveness } from "@/components/rc/ControlEffectiveness";
import { AuditAging } from "@/components/rc/AuditAging";
import { SpeakUpIntelligence } from "@/components/rc/SpeakUpIntelligence";
import { RegulatoryChangeRadar } from "@/components/rc/RegulatoryChangeRadar";
import { RcBodDecisionCenter } from "@/components/rc/RcBodDecisionCenter";
import { rcFootnote } from "@/lib/rc-data";

export const metadata = { title: "Risk & Compliance — PTPN Group" };

export default function RiskCompliancePage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <SdmSidebar active="Risk & Compliance" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <RcHeader />

        <div className="flex flex-col gap-3 px-5 pb-5">
          <RcKpiStrip />

          <div className="grid auto-rows-[minmax(340px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,33fr)_minmax(0,32fr)_minmax(0,35fr)]">
            <ComplianceRadarChart />
            <ComplianceSummary />
            <TopComplianceIssues />
          </div>

          <div className="grid auto-rows-[minmax(280px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,29fr)_minmax(0,22fr)_minmax(0,23fr)_minmax(0,26fr)]">
            <ComplianceTrend />
            <ComplianceHeatmapOrg />
            <CaseBreakdown />
            <RekomendasiKepatuhan />
          </div>

          <div className="grid auto-rows-[minmax(258px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,38fr)_minmax(0,28fr)_minmax(0,34fr)]">
            <ControlEffectiveness />
            <AuditAging />
            <SpeakUpIntelligence />
          </div>

          <div className="grid auto-rows-[minmax(252px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,42fr)_minmax(0,58fr)]">
            <RegulatoryChangeRadar />
            <RcBodDecisionCenter />
          </div>

          <div className="anim-rise flex items-center gap-2 rounded-xl border border-[#d8e6f7] bg-[#eef5fd] px-3.5 py-2.5">
            <Info size={13} className="shrink-0 text-[#2f6fe4]" />
            <span className="text-[9px] text-ink-700">{rcFootnote}</span>
          </div>
        </div>
      </main>
    </div>
  );
}
