import { ProdSidebar } from "@/components/prod/ProdSidebar";
import { DataTrustStrip } from "@/components/hc/DataTrustStrip";
import { OpexHeader } from "@/components/prod/operational-excellence/OpexHeader";
import { OpexKpiStrip } from "@/components/prod/operational-excellence/OpexKpiStrip";
import { InitiativePortfolio } from "@/components/prod/operational-excellence/InitiativePortfolio";
import { ImpactWaterfall } from "@/components/prod/operational-excellence/ImpactWaterfall";
import { MaturityRadar } from "@/components/prod/operational-excellence/MaturityRadar";
import { MilestoneTimeline } from "@/components/prod/operational-excellence/MilestoneTimeline";
import { OpexInsight } from "@/components/prod/operational-excellence/OpexInsight";
import { prodDataTrust } from "@/lib/produksi-data";

export const metadata = { title: "Operational Excellence — PTPN Group" };

export default function OperationalExcellencePage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <ProdSidebar active="Operational Excellence" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <OpexHeader />

        <div className="flex flex-col gap-3 px-5 pb-5">
          <div className="-mb-3">
            <DataTrustStrip data={prodDataTrust} />
          </div>

          <OpexKpiStrip />

          {/* Portofolio inisiatif + dampak EBITDA */}
          <div className="grid auto-rows-[250px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,58fr)_minmax(0,42fr)]">
            <InitiativePortfolio />
            <ImpactWaterfall />
          </div>

          {/* Maturitas & roadmap eksekusi */}
          <div className="grid auto-rows-[240px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,42fr)_minmax(0,58fr)]">
            <MaturityRadar />
            <MilestoneTimeline />
          </div>

          <OpexInsight />
        </div>
      </main>
    </div>
  );
}
