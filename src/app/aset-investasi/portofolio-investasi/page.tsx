import { AsetSidebar } from "@/components/aset/AsetSidebar";
import { DataTrustStrip } from "@/components/hc/DataTrustStrip";
import { InvHeader } from "@/components/aset/portofolio-investasi/InvHeader";
import { InvKpiStrip } from "@/components/aset/portofolio-investasi/InvKpiStrip";
import { ProjectPipelineFunnel } from "@/components/aset/portofolio-investasi/ProjectPipelineFunnel";
import { TopProjects } from "@/components/aset/portofolio-investasi/TopProjects";
import { ProjectRiskMatrix } from "@/components/aset/portofolio-investasi/ProjectRiskMatrix";
import { InvestmentBySector } from "@/components/aset/portofolio-investasi/InvestmentBySector";
import { ProjectSCurveWatch } from "@/components/aset/portofolio-investasi/ProjectSCurveWatch";
import { InvDecisionCenter } from "@/components/aset/portofolio-investasi/InvDecisionCenter";
import { InvInsight } from "@/components/aset/portofolio-investasi/InvInsight";
import { astDataTrust } from "@/lib/ast-core";

export const metadata = { title: "Portofolio Investasi — PTPN Group" };

export default function PortofolioInvestasiPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <AsetSidebar active="Portofolio Investasi" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <InvHeader />

        <div className="flex flex-col gap-3 px-5 pb-5">
          <div className="-mb-3">
            <DataTrustStrip data={astDataTrust} />
          </div>

          <InvKpiStrip />

          <div className="grid auto-rows-[minmax(250px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,42fr)_minmax(0,58fr)]">
            <ProjectPipelineFunnel />
            <TopProjects />
          </div>

          <div className="grid auto-rows-[minmax(240px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,52fr)_minmax(0,48fr)]">
            <ProjectRiskMatrix />
            <InvestmentBySector />
          </div>

          <div className="grid auto-rows-[minmax(250px,auto)] grid-cols-1 gap-3">
            <ProjectSCurveWatch />
          </div>

          <InvDecisionCenter />

          <InvInsight />
        </div>
      </main>
    </div>
  );
}
