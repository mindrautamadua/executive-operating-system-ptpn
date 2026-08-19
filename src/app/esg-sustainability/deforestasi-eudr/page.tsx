import { EsgSidebar } from "@/components/esg/EsgSidebar";
import { DataTrustStrip } from "@/components/hc/DataTrustStrip";
import { EudrHeader } from "@/components/esg/deforestasi-eudr/EudrHeader";
import { EudrKpiStrip } from "@/components/esg/deforestasi-eudr/EudrKpiStrip";
import { EudrReadinessGauge } from "@/components/esg/deforestasi-eudr/EudrReadinessGauge";
import { TraceabilityFunnel } from "@/components/esg/deforestasi-eudr/TraceabilityFunnel";
import { ExportExposure } from "@/components/esg/deforestasi-eudr/ExportExposure";
import { SatelliteAlertLog } from "@/components/esg/deforestasi-eudr/SatelliteAlertLog";
import { NdpeGrievanceTracker } from "@/components/esg/deforestasi-eudr/NdpeGrievanceTracker";
import { DeadlineTimeline } from "@/components/esg/deforestasi-eudr/DeadlineTimeline";
import { EudrInsight } from "@/components/esg/deforestasi-eudr/EudrInsight";
import { esgDataTrust } from "@/lib/esg-data";

export const metadata = { title: "Deforestasi, NDPE & EUDR — PTPN Group" };

export default function DeforestasiEudrPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <EsgSidebar active="Deforestasi & EUDR" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <EudrHeader />

        <div className="flex flex-col gap-3 px-5 pb-5">
          <div className="-mb-3">
            <DataTrustStrip data={esgDataTrust} />
          </div>

          <EudrKpiStrip />

          <div className="grid auto-rows-[minmax(250px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,38fr)_minmax(0,32fr)_minmax(0,30fr)]">
            <EudrReadinessGauge />
            <TraceabilityFunnel />
            <ExportExposure />
          </div>

          <div className="grid auto-rows-[minmax(250px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,58fr)_minmax(0,42fr)]">
            <SatelliteAlertLog />
            <NdpeGrievanceTracker />
          </div>

          <div className="grid auto-rows-[minmax(215px,auto)] grid-cols-1 gap-3">
            <DeadlineTimeline />
          </div>

          <EudrInsight />
        </div>
      </main>
    </div>
  );
}
