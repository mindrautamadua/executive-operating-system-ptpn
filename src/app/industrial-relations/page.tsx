import { Info } from "lucide-react";
import { SdmSidebar } from "@/components/sdm/SdmSidebar";
import { IrHeader } from "@/components/ir/IrHeader";
import { IrKpiStrip } from "@/components/ir/IrKpiStrip";
import { IrDisruptionBanner } from "@/components/ir/IrDisruptionBanner";
import { CaseCategoryBreakdown } from "@/components/ir/CaseCategoryBreakdown";
import { IrCaseTrend } from "@/components/ir/IrCaseTrend";
import { IrEarlyWarning } from "@/components/ir/IrEarlyWarning";
import { CaseSeverity } from "@/components/ir/CaseSeverity";
import { CaseAging } from "@/components/ir/CaseAging";
import { RepeatRootCause } from "@/components/ir/RepeatRootCause";
import { CaseResolution } from "@/components/ir/CaseResolution";
import { IrCompliance } from "@/components/ir/IrCompliance";
import { UnionRelationsHealth } from "@/components/ir/UnionRelationsHealth";
import { RegionIrIndex } from "@/components/ir/RegionIrIndex";
import { TopIrIssues } from "@/components/ir/TopIrIssues";
import { IrAiIntelligence } from "@/components/ir/IrAiIntelligence";
import { IrBusinessImpact } from "@/components/ir/IrBusinessImpact";
import { IrCostLegal } from "@/components/ir/IrCostLegal";
import { CrossModuleSignals } from "@/components/ir/CrossModuleSignals";
import { irMethodology } from "@/lib/ir-intel-data";

export const metadata = { title: "Industrial Relations — PTPN Group" };

export default function IndustrialRelationsPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <SdmSidebar active="Industrial Relations" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <IrHeader />

        <div className="flex flex-col gap-3 px-5 pb-5">
          <IrKpiStrip />

          <IrDisruptionBanner />

          <div className="grid auto-rows-[300px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,32fr)_minmax(0,34fr)_minmax(0,34fr)]">
            <CaseCategoryBreakdown />
            <IrCaseTrend />
            <IrEarlyWarning />
          </div>

          <div className="grid auto-rows-[310px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,38fr)_minmax(0,27fr)_minmax(0,35fr)]">
            <CaseSeverity />
            <CaseAging />
            <RepeatRootCause />
          </div>

          <div className="grid auto-rows-[300px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,31fr)_minmax(0,35fr)_minmax(0,34fr)]">
            <CaseResolution />
            <IrCompliance />
            <UnionRelationsHealth />
          </div>

          <div className="grid auto-rows-[330px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,37fr)_minmax(0,28fr)_minmax(0,35fr)]">
            <RegionIrIndex />
            <TopIrIssues />
            <IrAiIntelligence />
          </div>

          <div className="grid auto-rows-[300px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,37fr)_minmax(0,29fr)_minmax(0,34fr)]">
            <IrBusinessImpact />
            <IrCostLegal />
            <CrossModuleSignals />
          </div>

          <div className="anim-rise grid grid-cols-2 md:grid-cols-3 gap-3 rounded-xl border border-[#d8e6f7] bg-[#eef5fd] px-3.5 py-2.5">
            {irMethodology.map((m) => (
              <div key={m.title} className="flex items-start gap-2">
                <Info size={13} className="mt-[1px] shrink-0 text-[#2f6fe4]" />
                <span className="text-[9px] leading-[1.45] text-ink-700">
                  <span className="font-bold text-ink-900">{m.title}: </span>
                  {m.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
