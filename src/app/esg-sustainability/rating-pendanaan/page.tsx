import { EsgSidebar } from "@/components/esg/EsgSidebar";
import { DataTrustStrip } from "@/components/hc/DataTrustStrip";
import { RatingHeader } from "@/components/esg/rating-pendanaan/RatingHeader";
import { RatingKpiStrip } from "@/components/esg/rating-pendanaan/RatingKpiStrip";
import { RatingTrend } from "@/components/esg/rating-pendanaan/RatingTrend";
import { RatingPeerBench } from "@/components/esg/rating-pendanaan/RatingPeerBench";
import { SllKpiTracker } from "@/components/esg/rating-pendanaan/SllKpiTracker";
import { GreenFinancePipeline } from "@/components/esg/rating-pendanaan/GreenFinancePipeline";
import { DisclosureCalendar } from "@/components/esg/rating-pendanaan/DisclosureCalendar";
import { RatingDecisionCenter } from "@/components/esg/rating-pendanaan/RatingDecisionCenter";
import { RatingInsight } from "@/components/esg/rating-pendanaan/RatingInsight";
import { esgDataTrust } from "@/lib/esg-data";

export const metadata = { title: "Governance, Rating & Sustainable Finance — PTPN Group" };

export default function RatingPendanaanPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <EsgSidebar active="Rating & Sustainable Finance" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <RatingHeader />

        <div className="flex flex-col gap-3 px-5 pb-5">
          <div className="-mb-3">
            <DataTrustStrip data={esgDataTrust} />
          </div>

          <RatingKpiStrip />

          <div className="grid auto-rows-[minmax(250px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,55fr)_minmax(0,45fr)]">
            <RatingTrend />
            <RatingPeerBench />
          </div>

          <div className="grid auto-rows-[minmax(240px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,58fr)_minmax(0,42fr)]">
            <SllKpiTracker />
            <GreenFinancePipeline />
          </div>

          <div className="grid auto-rows-[minmax(250px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,45fr)_minmax(0,55fr)]">
            <DisclosureCalendar />
            <RatingDecisionCenter />
          </div>

          <RatingInsight />
        </div>
      </main>
    </div>
  );
}
