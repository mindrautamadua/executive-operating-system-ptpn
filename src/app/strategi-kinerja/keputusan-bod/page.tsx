import { StgSidebar } from "@/components/stg/StgSidebar";
import { DataTrustStrip } from "@/components/hc/DataTrustStrip";
import { SbdHeader } from "@/components/stg/keputusan-bod/SbdHeader";
import { SbdKpiStrip } from "@/components/stg/keputusan-bod/SbdKpiStrip";
import { DecisionPipeline } from "@/components/stg/keputusan-bod/DecisionPipeline";
import { OverdueDecisions } from "@/components/stg/keputusan-bod/OverdueDecisions";
import { DecisionRegister } from "@/components/stg/keputusan-bod/DecisionRegister";
import { DecisionByCategory } from "@/components/stg/keputusan-bod/DecisionByCategory";
import { UpcomingBoardAgenda } from "@/components/stg/keputusan-bod/UpcomingBoardAgenda";
import { DecisionOutcomeCard } from "@/components/stg/keputusan-bod/DecisionOutcomeCard";
import { DecisionPortfolioCard } from "@/components/stg/keputusan-bod/DecisionPortfolioCard";
import { SbdInsight } from "@/components/stg/keputusan-bod/SbdInsight";
import { stgDataTrust } from "@/lib/stg-core";

export const metadata = { title: "Keputusan Direksi & Dekom — PTPN Group" };

export default function KeputusanBodPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <StgSidebar active="Keputusan Direksi & Dekom" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <SbdHeader />

        <div className="flex flex-col gap-3 px-5 pb-5">
          <div className="-mb-3">
            <DataTrustStrip data={stgDataTrust} />
          </div>

          <SbdKpiStrip />

          <div className="grid auto-rows-[240px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,34fr)_minmax(0,66fr)]">
            <DecisionPipeline />
            <OverdueDecisions />
          </div>

          <div className="grid auto-rows-[250px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,60fr)_minmax(0,40fr)]">
            <DecisionRegister />
            <DecisionByCategory />
          </div>

          <div className="grid auto-rows-[280px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-3">
            <DecisionPortfolioCard />
            <UpcomingBoardAgenda />
            <DecisionOutcomeCard />
          </div>

          <SbdInsight />
        </div>
      </main>
    </div>
  );
}
