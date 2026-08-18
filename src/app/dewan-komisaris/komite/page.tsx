import { DekSidebar } from "@/components/dek/DekSidebar";
import { DataTrustStrip } from "@/components/hc/DataTrustStrip";
import { KomiteHeader } from "@/components/dek/komite/KomiteHeader";
import { KomiteKpiStrip } from "@/components/dek/komite/KomiteKpiStrip";
import { Committees } from "@/components/dek/komite/Committees";
import { WorkPlanProgress } from "@/components/dek/komite/WorkPlanProgress";
import { CommitteeFindings } from "@/components/dek/komite/CommitteeFindings";
import { MeetingCadence } from "@/components/dek/komite/MeetingCadence";
import { KomiteInsight } from "@/components/dek/komite/KomiteInsight";
import { dekDataTrust } from "@/lib/dek-data";

export const metadata = { title: "Komite Dewan Komisaris — PTPN Group" };

export default function KomitePage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <DekSidebar active="Komite Dewan Komisaris" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <KomiteHeader />

        <div className="flex flex-col gap-3 px-5 pb-5">
          <div className="-mb-3">
            <DataTrustStrip data={dekDataTrust} />
          </div>

          <KomiteKpiStrip />

          <div className="grid auto-rows-[270px] grid-cols-1 gap-3">
            <Committees />
          </div>

          <div className="grid auto-rows-[250px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,42fr)_minmax(0,58fr)]">
            <WorkPlanProgress />
            <CommitteeFindings />
          </div>

          <div className="grid auto-rows-[230px] grid-cols-1 gap-3">
            <MeetingCadence />
          </div>

          <KomiteInsight />
        </div>
      </main>
    </div>
  );
}
