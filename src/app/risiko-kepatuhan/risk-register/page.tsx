import { RiskSidebar } from "@/components/risk/RiskSidebar";
import { DataTrustStrip } from "@/components/hc/DataTrustStrip";
import { RegisterHeader } from "@/components/risk/risk-register/RegisterHeader";
import { RegisterKpiStrip } from "@/components/risk/risk-register/RegisterKpiStrip";
import { RegisterByCategory } from "@/components/risk/risk-register/RegisterByCategory";
import { InherentVsResidual } from "@/components/risk/risk-register/InherentVsResidual";
import { RiskMovement } from "@/components/risk/risk-register/RiskMovement";
import { RiskOwnerMatrix } from "@/components/risk/risk-register/RiskOwnerMatrix";
import { TopRiskDetail } from "@/components/risk/risk-register/TopRiskDetail";
import { RegisterFootnote } from "@/components/risk/risk-register/RegisterFootnote";
import { RegisterInsight } from "@/components/risk/risk-register/RegisterInsight";
import { riskDataTrust } from "@/lib/risk-data";

export const metadata = { title: "Risk Register Korporat — PTPN Group" };

export default function RiskRegisterPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <RiskSidebar active="Risk Register Korporat" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <RegisterHeader />

        <div className="flex flex-col gap-3 px-5 pb-5">
          <div className="-mb-3">
            <DataTrustStrip data={riskDataTrust} />
          </div>

          <RegisterKpiStrip />

          {/* Komposisi register & efektivitas kontrol */}
          <div className="grid auto-rows-[250px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,42fr)_minmax(0,58fr)]">
            <RegisterByCategory />
            <InherentVsResidual />
          </div>

          {/* Dinamika register & pemilik risiko */}
          <div className="grid auto-rows-[240px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,54fr)_minmax(0,46fr)]">
            <RiskMovement />
            <RiskOwnerMatrix />
          </div>

          <TopRiskDetail />
          <RegisterFootnote />
          <RegisterInsight />
        </div>
      </main>
    </div>
  );
}
