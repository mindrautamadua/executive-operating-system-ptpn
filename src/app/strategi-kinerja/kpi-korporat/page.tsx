import { StgSidebar } from "@/components/stg/StgSidebar";
import { DataTrustStrip } from "@/components/hc/DataTrustStrip";
import { SkcHeader } from "@/components/stg/kpi-korporat/SkcHeader";
import { SkcKpiStrip } from "@/components/stg/kpi-korporat/SkcKpiStrip";
import { ScorecardByPerspective } from "@/components/stg/kpi-korporat/ScorecardByPerspective";
import { ScoreTrend } from "@/components/stg/kpi-korporat/ScoreTrend";
import { KpiMatrix } from "@/components/stg/kpi-korporat/KpiMatrix";
import { RedKpiFocus } from "@/components/stg/kpi-korporat/RedKpiFocus";
import { KpiCascadeMap } from "@/components/stg/kpi-korporat/KpiCascadeMap";
import { SkcInsight } from "@/components/stg/kpi-korporat/SkcInsight";
import { stgDataTrust } from "@/lib/stg-core";

export const metadata = { title: "KPI Korporat & Scorecard — PTPN Group" };

export default function KpiKorporatPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <StgSidebar active="KPI Korporat & Scorecard" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <SkcHeader />

        <div className="flex flex-col gap-3 px-5 pb-5">
          <div className="-mb-3">
            <DataTrustStrip data={stgDataTrust} />
          </div>

          <SkcKpiStrip />

          <div className="grid auto-rows-[minmax(240px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,40fr)_minmax(0,60fr)]">
            <ScorecardByPerspective />
            <ScoreTrend />
          </div>

          <div className="grid auto-rows-[minmax(250px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,55fr)_minmax(0,45fr)]">
            <KpiMatrix />
            <RedKpiFocus />
          </div>

          <div className="grid auto-rows-[minmax(230px,auto)] grid-cols-1 gap-3">
            <KpiCascadeMap />
          </div>

          <SkcInsight />
        </div>
      </main>
    </div>
  );
}
