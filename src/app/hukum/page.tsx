import { HkmSidebar } from "@/components/hkm/HkmSidebar";
import { HkmHeader } from "@/components/hkm/HkmHeader";
import { DataTrustStrip } from "@/components/hc/DataTrustStrip";
import { HkmKpiStrip } from "@/components/hkm/overview/HkmKpiStrip";
import { HkmIntelligence } from "@/components/hkm/overview/HkmIntelligence";
import { HkmRiskRadar } from "@/components/hkm/overview/HkmRiskRadar";
import { ExpiryHeatmap } from "@/components/hkm/overview/ExpiryHeatmap";
import { LegalWorkloadTrend } from "@/components/hkm/overview/LegalWorkloadTrend";
import { HkmAlerts } from "@/components/hkm/overview/HkmAlerts";
import { HkmDecisionCenter } from "@/components/hkm/overview/HkmDecisionCenter";
import { LitigationCompact } from "@/components/hkm/overview/LitigationCompact";
import { HkmInsight } from "@/components/hkm/overview/HkmInsight";
import { hkmDataTrust } from "@/lib/hkm-data";

export const metadata = { title: "Hukum — PTPN Group" };

export default function HukumPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <HkmSidebar active="Executive Overview" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <HkmHeader />

        <div className="px-5 pb-5">
          <DataTrustStrip data={hkmDataTrust} />

          <div className="grid grid-cols-1 items-start gap-3 xl:grid-cols-[minmax(0,1fr)_330px]">
            {/* kolom utama */}
            <div className="flex min-w-0 flex-col gap-3">
              <HkmKpiStrip />
              <HkmIntelligence />
              <div className="grid auto-rows-[250px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,42fr)_minmax(0,58fr)]">
                <HkmRiskRadar />
                <ExpiryHeatmap />
              </div>
              <div className="grid auto-rows-[240px] grid-cols-1 gap-3">
                <LegalWorkloadTrend />
              </div>
              <HkmAlerts />
            </div>

            {/* rail kanan */}
            <div className="flex min-w-0 flex-col gap-3">
              <LitigationCompact />
              <HkmDecisionCenter />
            </div>
          </div>

          <div className="mt-3">
            <HkmInsight />
          </div>
        </div>
      </main>
    </div>
  );
}
