import { PgdSidebar } from "@/components/pgd/PgdSidebar";
import { DataTrustStrip } from "@/components/hc/DataTrustStrip";
import { ProsesHeader } from "@/components/pgd/proses-tender/ProsesHeader";
import { ProsesKpiStrip } from "@/components/pgd/proses-tender/ProsesKpiStrip";
import { CycleTimeByStage } from "@/components/pgd/proses-tender/CycleTimeByStage";
import { TenderPipeline } from "@/components/pgd/proses-tender/TenderPipeline";
import { CompetitionLevel } from "@/components/pgd/proses-tender/CompetitionLevel";
import { FailedTenderCauses } from "@/components/pgd/proses-tender/FailedTenderCauses";
import { EProcAdoption } from "@/components/pgd/proses-tender/EProcAdoption";
import { ProsesInsight } from "@/components/pgd/proses-tender/ProsesInsight";
import { pgdDataTrust } from "@/lib/pgd-data";

export const metadata = { title: "Proses & Tender — PTPN Group" };

export default function ProsesTenderPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <PgdSidebar active="Proses & Tender" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <ProsesHeader />

        <div className="flex flex-col gap-3 px-5 pb-5">
          <div className="-mb-3">
            <DataTrustStrip data={pgdDataTrust} />
          </div>

          <ProsesKpiStrip />

          <div className="grid auto-rows-[minmax(250px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,38fr)_minmax(0,34fr)_minmax(0,28fr)]">
            <CycleTimeByStage />
            <TenderPipeline />
            <CompetitionLevel />
          </div>

          <div className="grid auto-rows-[minmax(240px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,44fr)_minmax(0,56fr)]">
            <FailedTenderCauses />
            <EProcAdoption />
          </div>

          <ProsesInsight />
        </div>
      </main>
    </div>
  );
}
