import { SdmSidebar } from "@/components/sdm/SdmSidebar";
import { AllRisksHeader } from "@/components/prr/all/AllRisksHeader";
import { AllRisksKpiStrip } from "@/components/prr/all/AllRisksKpiStrip";
import { InherentHeatmap } from "@/components/prr/all/InherentHeatmap";
import { RiskCategoryDonut } from "@/components/prr/all/RiskCategoryDonut";
import { RiskLevelTrend } from "@/components/prr/all/RiskLevelTrend";
import { DriversPanel } from "@/components/prr/all/DriversPanel";
import { AllRisksExplorer } from "@/components/prr/all/AllRisksExplorer";
import { allRisks, RISK_LEVELS } from "@/lib/prr-registry";

export const metadata = { title: "All Risks — People Risk Radar — PTPN Group" };

const LEVEL_COUNTS = Object.fromEntries(
  RISK_LEVELS.map((l) => [l, allRisks.filter((r) => r.level === l).length]),
);

export default function AllRisksPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <SdmSidebar active="People Risk Radar" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <AllRisksHeader />

        <div className="flex flex-col gap-3 px-5 pb-5 pt-3">
          <AllRisksKpiStrip />

          <div className="grid auto-rows-[260px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,32fr)_minmax(0,30fr)_minmax(0,32fr)_minmax(0,24fr)]">
            <InherentHeatmap counts={LEVEL_COUNTS} />
            <RiskCategoryDonut />
            <RiskLevelTrend />
            <DriversPanel />
          </div>

          <AllRisksExplorer />
        </div>
      </main>
    </div>
  );
}
