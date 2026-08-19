import { DekSidebar } from "@/components/dek/DekSidebar";
import { DataTrustStrip } from "@/components/hc/DataTrustStrip";
import { EvaluasiHeader } from "@/components/dek/evaluasi-direksi/EvaluasiHeader";
import { EvaluasiKpiStrip } from "@/components/dek/evaluasi-direksi/EvaluasiKpiStrip";
import { EvaluasiSumber } from "@/components/dek/evaluasi-direksi/EvaluasiSumber";
import { CollectiveScorecard } from "@/components/dek/evaluasi-direksi/CollectiveScorecard";
import { ByDirektorat } from "@/components/dek/evaluasi-direksi/ByDirektorat";
import { RedKpiWatch } from "@/components/dek/evaluasi-direksi/RedKpiWatch";
import { ScoreTrend } from "@/components/dek/evaluasi-direksi/ScoreTrend";
import { ReportingCompliance } from "@/components/dek/evaluasi-direksi/ReportingCompliance";
import { EvaluationCalendar } from "@/components/dek/evaluasi-direksi/EvaluationCalendar";
import { EvaluasiInsight } from "@/components/dek/evaluasi-direksi/EvaluasiInsight";
import { dekDataTrust } from "@/lib/dek-data";

export const metadata = { title: "Evaluasi Kinerja Direksi — PTPN Group" };

export default function EvaluasiDireksiPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <DekSidebar active="Evaluasi Kinerja Direksi" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <EvaluasiHeader />

        <div className="flex flex-col gap-3 px-5 pb-5">
          <div className="-mb-3">
            <DataTrustStrip data={dekDataTrust} />
          </div>

          <EvaluasiKpiStrip />

          <EvaluasiSumber />

          <div className="grid auto-rows-[minmax(240px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,40fr)_minmax(0,60fr)]">
            <CollectiveScorecard />
            <ByDirektorat />
          </div>

          <div className="grid auto-rows-[minmax(260px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,58fr)_minmax(0,42fr)]">
            <RedKpiWatch />
            <ScoreTrend />
          </div>

          <div className="grid auto-rows-[minmax(230px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,45fr)_minmax(0,55fr)]">
            <ReportingCompliance />
            <EvaluationCalendar />
          </div>

          <EvaluasiInsight />
        </div>
      </main>
    </div>
  );
}
