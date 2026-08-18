import { StgSidebar } from "@/components/stg/StgSidebar";
import { DataTrustStrip } from "@/components/hc/DataTrustStrip";
import { SbmHeader } from "@/components/stg/benchmark/SbmHeader";
import { SbmKpiStrip } from "@/components/stg/benchmark/SbmKpiStrip";
import { MarginBenchmark } from "@/components/stg/benchmark/MarginBenchmark";
import { YieldBenchmark } from "@/components/stg/benchmark/YieldBenchmark";
import { CostPositionCurve } from "@/components/stg/benchmark/CostPositionCurve";
import { SugarBenchmark } from "@/components/stg/benchmark/SugarBenchmark";
import { GapToBestInClass } from "@/components/stg/benchmark/GapToBestInClass";
import { SbmInsight } from "@/components/stg/benchmark/SbmInsight";
import { stgDataTrust } from "@/lib/stg-core";

export const metadata = { title: "Benchmark Industri — PTPN Group" };

export default function BenchmarkPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <StgSidebar active="Benchmark Industri" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <SbmHeader />

        <div className="flex flex-col gap-3 px-5 pb-5">
          <div className="-mb-3">
            <DataTrustStrip data={stgDataTrust} />
          </div>

          <SbmKpiStrip />

          <div className="grid auto-rows-[240px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,50fr)_minmax(0,50fr)]">
            <MarginBenchmark />
            <YieldBenchmark />
          </div>

          <div className="grid auto-rows-[235px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,54fr)_minmax(0,46fr)]">
            <CostPositionCurve />
            <SugarBenchmark />
          </div>

          <div className="grid auto-rows-[230px] grid-cols-1 gap-3">
            <GapToBestInClass />
          </div>

          <SbmInsight />
        </div>
      </main>
    </div>
  );
}
