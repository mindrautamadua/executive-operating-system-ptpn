import { SdmSidebar } from "@/components/sdm/SdmSidebar";
import { PriorityHeader } from "@/components/prr/priority/PriorityHeader";
import { PriorityKpiStrip } from "@/components/prr/priority/PriorityKpiStrip";
import { PriorityMatrix } from "@/components/prr/priority/PriorityMatrix";
import { ImpactRanking } from "@/components/prr/priority/ImpactRanking";
import { MitigationProgress } from "@/components/prr/priority/MitigationProgress";
import { SlaAging } from "@/components/prr/priority/SlaAging";
import { PriorityQueue } from "@/components/prr/priority/PriorityQueue";

export const metadata = { title: "Prioritas Risiko — People Risk Radar — PTPN Group" };

export default function PrioritasRisikoPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <SdmSidebar active="People Risk Radar" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <PriorityHeader />

        <div className="flex flex-col gap-3 px-5 pb-5 pt-3">
          <PriorityKpiStrip />

          <div className="grid auto-rows-[minmax(280px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,32fr)_minmax(0,28fr)_minmax(0,30fr)_minmax(0,24fr)]">
            <PriorityMatrix />
            <ImpactRanking />
            <MitigationProgress />
            <SlaAging />
          </div>

          <PriorityQueue />
        </div>
      </main>
    </div>
  );
}
