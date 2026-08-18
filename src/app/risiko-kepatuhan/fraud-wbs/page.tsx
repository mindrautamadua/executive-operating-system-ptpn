import { RiskSidebar } from "@/components/risk/RiskSidebar";
import { DataTrustStrip } from "@/components/hc/DataTrustStrip";
import { WbsHeader } from "@/components/risk/fraud-wbs/WbsHeader";
import { WbsKpiStrip } from "@/components/risk/fraud-wbs/WbsKpiStrip";
import { WbsTrend } from "@/components/risk/fraud-wbs/WbsTrend";
import { CaseByType } from "@/components/risk/fraud-wbs/CaseByType";
import { FraudTriangleHeat } from "@/components/risk/fraud-wbs/FraudTriangleHeat";
import { InvestigationFunnel } from "@/components/risk/fraud-wbs/InvestigationFunnel";
import { SanksiSummary } from "@/components/risk/fraud-wbs/SanksiSummary";
import { GratifikasiUpg } from "@/components/risk/fraud-wbs/GratifikasiUpg";
import { WbsFootnote } from "@/components/risk/fraud-wbs/WbsFootnote";
import { WbsInsight } from "@/components/risk/fraud-wbs/WbsInsight";
import { riskDataTrust } from "@/lib/risk-data";

export const metadata = { title: "Whistleblowing & Fraud — PTPN Group" };

export default function FraudWbsPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <RiskSidebar active="Whistleblowing & Fraud" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <WbsHeader />

        <div className="flex flex-col gap-3 px-5 pb-5">
          <div className="-mb-3">
            <DataTrustStrip data={riskDataTrust} />
          </div>

          <WbsKpiStrip />

          <div className="grid auto-rows-[250px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,60fr)_minmax(0,40fr)]">
            <WbsTrend />
            <CaseByType />
          </div>

          <div className="grid auto-rows-[240px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,52fr)_minmax(0,48fr)]">
            <FraudTriangleHeat />
            <InvestigationFunnel />
          </div>

          <div className="grid auto-rows-[230px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,50fr)_minmax(0,50fr)]">
            <SanksiSummary />
            <GratifikasiUpg />
          </div>

          <WbsFootnote />

          <WbsInsight />
        </div>
      </main>
    </div>
  );
}
