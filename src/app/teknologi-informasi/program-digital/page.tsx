import { TikSidebar } from "@/components/tik/TikSidebar";
import { DataTrustStrip } from "@/components/hc/DataTrustStrip";
import { ProgramHeader } from "@/components/tik/program-digital/ProgramHeader";
import { ProgramKpiStrip } from "@/components/tik/program-digital/ProgramKpiStrip";
import { ErpModuleStatus } from "@/components/tik/program-digital/ErpModuleStatus";
import { RolloutTimeline } from "@/components/tik/program-digital/RolloutTimeline";
import { AdoptionBySubholding } from "@/components/tik/program-digital/AdoptionBySubholding";
import { BenefitWaterfall } from "@/components/tik/program-digital/BenefitWaterfall";
import { DeliveryRisks } from "@/components/tik/program-digital/DeliveryRisks";
import { ProjectPortfolio } from "@/components/tik/program-digital/ProjectPortfolio";
import { ProgramInsight } from "@/components/tik/program-digital/ProgramInsight";
import { tikDataTrust } from "@/lib/tik-data";

export const metadata = { title: "Program & Delivery Digital — PTPN Group" };

export default function ProgramDigitalPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <TikSidebar active="Program & Delivery Digital" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <ProgramHeader />

        <div className="flex flex-col gap-3 px-5 pb-5">
          <div className="-mb-3">
            <DataTrustStrip data={tikDataTrust} />
          </div>

          <ProgramKpiStrip />

          <div className="grid auto-rows-[minmax(250px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,56fr)_minmax(0,44fr)]">
            <ErpModuleStatus />
            <RolloutTimeline />
          </div>

          <div className="grid auto-rows-[minmax(250px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,42fr)_minmax(0,58fr)]">
            <AdoptionBySubholding />
            <BenefitWaterfall />
          </div>

          <div className="grid auto-rows-[minmax(250px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,38fr)_minmax(0,62fr)]">
            <DeliveryRisks />
            <ProjectPortfolio />
          </div>

          <ProgramInsight />
        </div>
      </main>
    </div>
  );
}
