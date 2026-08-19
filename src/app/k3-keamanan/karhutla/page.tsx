import { HseSidebar } from "@/components/hse/HseSidebar";
import { DataTrustStrip } from "@/components/hc/DataTrustStrip";
import { KarhutlaHeader } from "@/components/hse/karhutla/KarhutlaHeader";
import { KarhutlaKpiStrip } from "@/components/hse/karhutla/KarhutlaKpiStrip";
import { HotspotTrend } from "@/components/hse/karhutla/HotspotTrend";
import { FireByRegional } from "@/components/hse/karhutla/FireByRegional";
import { FireCauses } from "@/components/hse/karhutla/FireCauses";
import { ResponseCapability } from "@/components/hse/karhutla/ResponseCapability";
import { PreparednessLevel } from "@/components/hse/karhutla/PreparednessLevel";
import { EmergencyDrills } from "@/components/hse/karhutla/EmergencyDrills";
import { CommunityFirePartnership } from "@/components/hse/karhutla/CommunityFirePartnership";
import { KarhutlaDecisionCenter } from "@/components/hse/karhutla/KarhutlaDecisionCenter";
import { KarhutlaInsight } from "@/components/hse/karhutla/KarhutlaInsight";
import { hseDataTrust } from "@/lib/hse-data";

export const metadata = { title: "Kebakaran Lahan & Tanggap Darurat — PTPN Group" };

export default function KarhutlaPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <HseSidebar active="Kebakaran Lahan & Tanggap Darurat" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <KarhutlaHeader />

        <div className="flex flex-col gap-3 px-5 pb-5">
          <div className="-mb-3">
            <DataTrustStrip data={hseDataTrust} />
          </div>

          <KarhutlaKpiStrip />

          <div className="grid auto-rows-[minmax(250px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,56fr)_minmax(0,44fr)]">
            <HotspotTrend />
            <FireByRegional />
          </div>

          <div className="grid auto-rows-[minmax(240px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,30fr)_minmax(0,44fr)_minmax(0,26fr)]">
            <FireCauses />
            <ResponseCapability />
            <PreparednessLevel />
          </div>

          <div className="grid auto-rows-[minmax(230px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,50fr)_minmax(0,50fr)]">
            <EmergencyDrills />
            <CommunityFirePartnership />
          </div>

          <KarhutlaDecisionCenter />

          <KarhutlaInsight />
        </div>
      </main>
    </div>
  );
}
