import { AsetSidebar } from "@/components/aset/AsetSidebar";
import { DataTrustStrip } from "@/components/hc/DataTrustStrip";
import { AsgHeader } from "@/components/aset/sengketa-lahan/AsgHeader";
import { AsgKpiStrip } from "@/components/aset/sengketa-lahan/AsgKpiStrip";
import { SengketaByType } from "@/components/aset/sengketa-lahan/SengketaByType";
import { SengketaBySubholding } from "@/components/aset/sengketa-lahan/SengketaBySubholding";
import { ResolutionTrend } from "@/components/aset/sengketa-lahan/ResolutionTrend";
import { TopDisputeCases } from "@/components/aset/sengketa-lahan/TopDisputeCases";
import { SengketaRiskMatrix } from "@/components/aset/sengketa-lahan/SengketaRiskMatrix";
import { AsgDecisionCenter } from "@/components/aset/sengketa-lahan/AsgDecisionCenter";
import { AsgInsight } from "@/components/aset/sengketa-lahan/AsgInsight";
import { astDataTrust } from "@/lib/ast-core";

export const metadata = { title: "Sengketa Lahan — PTPN Group" };

export default function SengketaLahanPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <AsetSidebar active="Sengketa Lahan" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <AsgHeader />

        <div className="flex flex-col gap-3 px-5 pb-5">
          <div className="-mb-3">
            <DataTrustStrip data={astDataTrust} />
          </div>

          <AsgKpiStrip />

          <div className="grid auto-rows-[250px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,30fr)_minmax(0,36fr)_minmax(0,34fr)]">
            <SengketaByType />
            <SengketaBySubholding />
            <ResolutionTrend />
          </div>

          <div className="grid auto-rows-[250px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,56fr)_minmax(0,44fr)]">
            <TopDisputeCases />
            <SengketaRiskMatrix />
          </div>

          <AsgDecisionCenter />

          <AsgInsight />
        </div>
      </main>
    </div>
  );
}
