import { StgSidebar } from "@/components/stg/StgSidebar";
import { StgHeader } from "@/components/stg/StgHeader";
import { DataTrustStrip } from "@/components/hc/DataTrustStrip";
import { StgKpiStrip } from "@/components/stg/overview/StgKpiStrip";
import { StrategyIntelligence } from "@/components/stg/overview/StrategyIntelligence";
import { InitiativePortfolioMap } from "@/components/stg/overview/InitiativePortfolioMap";
import { ScorecardSnapshot } from "@/components/stg/overview/ScorecardSnapshot";
import { ExecutionRiskRadar } from "@/components/stg/overview/ExecutionRiskRadar";
import { ValueCreationTrend } from "@/components/stg/overview/ValueCreationTrend";
import { StgStrategicAlignment } from "@/components/stg/overview/StgStrategicAlignment";
import { StgDecisionCenter } from "@/components/stg/overview/StgDecisionCenter";
import { StgAlerts } from "@/components/stg/overview/StgAlerts";
import { StgInsight } from "@/components/stg/overview/StgInsight";
import { stgDataTrust } from "@/lib/stg-core";

export const metadata = { title: "Strategy Executive Operating System — PTPN Group" };

export default function StrategiKinerjaPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <StgSidebar active="Executive Overview" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <StgHeader />

        <div className="px-5 pb-5">
          <DataTrustStrip data={stgDataTrust} />

          <div className="grid grid-cols-1 items-start gap-3 xl:grid-cols-[minmax(0,1fr)_330px]">
            {/* kolom utama */}
            <div className="flex min-w-0 flex-col gap-3">
              <StgKpiStrip />
              <StrategyIntelligence />
              <div className="grid auto-rows-[260px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,56fr)_minmax(0,44fr)]">
                <InitiativePortfolioMap />
                <ScorecardSnapshot />
              </div>
              <div className="grid auto-rows-[250px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,44fr)_minmax(0,56fr)]">
                <ExecutionRiskRadar />
                <ValueCreationTrend />
              </div>
            </div>

            {/* rail kanan */}
            <div className="flex min-w-0 flex-col gap-3">
              <StgStrategicAlignment />
              <StgDecisionCenter />
              <StgAlerts />
            </div>
          </div>

          {/* insight lebar penuh */}
          <div className="mt-3">
            <StgInsight />
          </div>
        </div>
      </main>
    </div>
  );
}
