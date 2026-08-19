import { StgSidebar } from "@/components/stg/StgSidebar";
import { DataTrustStrip } from "@/components/hc/DataTrustStrip";
import { SmsHeader } from "@/components/stg/milestone/SmsHeader";
import { SmsKpiStrip } from "@/components/stg/milestone/SmsKpiStrip";
import { MilestoneTimeline } from "@/components/stg/milestone/MilestoneTimeline";
import { LateMilestones } from "@/components/stg/milestone/LateMilestones";
import { MilestoneByOwner } from "@/components/stg/milestone/MilestoneByOwner";
import { CriticalPath30Days } from "@/components/stg/milestone/CriticalPath30Days";
import { CompletionTrend } from "@/components/stg/milestone/CompletionTrend";
import { SmsInsight } from "@/components/stg/milestone/SmsInsight";
import { stgDataTrust } from "@/lib/stg-core";

export const metadata = { title: "Milestone Tracking — PTPN Group" };

export default function MilestonePage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <StgSidebar active="Milestone Tracking" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <SmsHeader />

        <div className="flex flex-col gap-3 px-5 pb-5">
          <div className="-mb-3">
            <DataTrustStrip data={stgDataTrust} />
          </div>

          <SmsKpiStrip />

          <div className="grid auto-rows-[minmax(320px,auto)] grid-cols-1 gap-3">
            <MilestoneTimeline />
          </div>

          <div className="grid auto-rows-[minmax(250px,auto)] grid-cols-1 gap-3">
            <LateMilestones />
          </div>

          <div className="grid auto-rows-[minmax(250px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,34fr)_minmax(0,34fr)_minmax(0,32fr)]">
            <MilestoneByOwner />
            <CriticalPath30Days />
            <CompletionTrend />
          </div>

          <SmsInsight />
        </div>
      </main>
    </div>
  );
}
