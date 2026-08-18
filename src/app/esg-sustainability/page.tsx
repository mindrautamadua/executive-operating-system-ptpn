import { EsgSidebar } from "@/components/esg/EsgSidebar";
import { EsgHeader } from "@/components/esg/EsgHeader";
import { DataTrustStrip } from "@/components/hc/DataTrustStrip";
import { EsgKpiStrip } from "@/components/esg/overview/EsgKpiStrip";
import { EsgIntelligence } from "@/components/esg/overview/EsgIntelligence";
import { EsgPillarRadar } from "@/components/esg/overview/EsgPillarRadar";
import { EmissionTrajectory } from "@/components/esg/overview/EmissionTrajectory";
import { CertCoverageCompact } from "@/components/esg/overview/CertCoverageCompact";
import { EsgAlerts } from "@/components/esg/overview/EsgAlerts";
import { EsgRatingCard } from "@/components/esg/overview/EsgRatingCard";
import { EsgBodDecisionCenter } from "@/components/esg/overview/EsgBodDecisionCenter";
import { EsgInsight } from "@/components/esg/overview/EsgInsight";
import { esgDataTrust } from "@/lib/esg-data";

export const metadata = { title: "ESG & Sustainability — PTPN Group" };

export default function EsgSustainabilityPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <EsgSidebar active="Executive Overview" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <EsgHeader />

        <div className="px-5 pb-5">
          <DataTrustStrip data={esgDataTrust} />

          <div className="grid grid-cols-1 items-start gap-3 xl:grid-cols-[minmax(0,1fr)_330px]">
            {/* kolom utama */}
            <div className="flex min-w-0 flex-col gap-3">
              <EsgKpiStrip />
              <EsgIntelligence />
              <div className="grid auto-rows-[250px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,44fr)_minmax(0,56fr)]">
                <EsgPillarRadar />
                <EmissionTrajectory />
              </div>
              <div className="grid auto-rows-[215px] grid-cols-1 gap-3">
                <CertCoverageCompact />
              </div>
              <EsgAlerts />
            </div>

            {/* rail kanan */}
            <div className="flex min-w-0 flex-col gap-3">
              <EsgRatingCard />
              <EsgBodDecisionCenter />
            </div>
          </div>

          <div className="mt-3">
            <EsgInsight />
          </div>
        </div>
      </main>
    </div>
  );
}
