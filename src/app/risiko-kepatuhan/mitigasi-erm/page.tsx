import { RiskSidebar } from "@/components/risk/RiskSidebar";
import { DataTrustStrip } from "@/components/hc/DataTrustStrip";
import { ErmHeader } from "@/components/risk/mitigasi-erm/ErmHeader";
import { ErmKpiStrip } from "@/components/risk/mitigasi-erm/ErmKpiStrip";
import { InsuranceCoverageMap } from "@/components/risk/mitigasi-erm/InsuranceCoverageMap";
import { ClaimHistory } from "@/components/risk/mitigasi-erm/ClaimHistory";
import { MitigationPortfolio } from "@/components/risk/mitigasi-erm/MitigationPortfolio";
import { ErmMaturitySpider } from "@/components/risk/mitigasi-erm/ErmMaturitySpider";
import { ControlEffectiveness } from "@/components/risk/mitigasi-erm/ControlEffectiveness";
import { ParametricPilot } from "@/components/risk/mitigasi-erm/ParametricPilot";
import { ErmDecisionCenter } from "@/components/risk/mitigasi-erm/ErmDecisionCenter";
import { ErmInsight } from "@/components/risk/mitigasi-erm/ErmInsight";
import { riskDataTrust } from "@/lib/risk-data";

export const metadata = { title: "Asuransi, Mitigasi & ERM — PTPN Group" };

export default function MitigasiErmPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <RiskSidebar active="Asuransi, Mitigasi & ERM" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <ErmHeader />

        <div className="flex flex-col gap-3 px-5 pb-5">
          <div className="-mb-3">
            <DataTrustStrip data={riskDataTrust} />
          </div>

          <ErmKpiStrip />

          <div className="grid auto-rows-[minmax(250px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,62fr)_minmax(0,38fr)]">
            <InsuranceCoverageMap />
            <ClaimHistory />
          </div>

          <div className="grid auto-rows-[minmax(250px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,36fr)_minmax(0,34fr)_minmax(0,30fr)]">
            <MitigationPortfolio />
            <ErmMaturitySpider />
            <ControlEffectiveness />
          </div>

          <div className="grid auto-rows-[minmax(240px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,45fr)_minmax(0,55fr)]">
            <ParametricPilot />
            <ErmDecisionCenter />
          </div>

          <ErmInsight />
        </div>
      </main>
    </div>
  );
}
