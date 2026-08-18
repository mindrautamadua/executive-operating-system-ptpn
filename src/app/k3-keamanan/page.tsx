import { HseSidebar } from "@/components/hse/HseSidebar";
import { HseHeader } from "@/components/hse/HseHeader";
import { DataTrustStrip } from "@/components/hc/DataTrustStrip";
import { HseKpiStrip } from "@/components/hse/overview/HseKpiStrip";
import { HseIntelligence } from "@/components/hse/overview/HseIntelligence";
import { HseRiskRadar } from "@/components/hse/overview/HseRiskRadar";
import { IncidentTrend } from "@/components/hse/overview/IncidentTrend";
import { HseRegionalStrip } from "@/components/hse/overview/HseRegionalStrip";
import { HseAlerts } from "@/components/hse/overview/HseAlerts";
import { HseDecisionCenter } from "@/components/hse/overview/HseDecisionCenter";
import { HseCrossLinkCard } from "@/components/hse/overview/HseCrossLinkCard";
import { HseInsight } from "@/components/hse/overview/HseInsight";
import { hseDataTrust } from "@/lib/hse-data";

export const metadata = { title: "K3 & Keamanan — PTPN Group" };

export default function K3KeamananPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <HseSidebar active="Executive Overview" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <HseHeader />

        <div className="px-5 pb-5">
          <DataTrustStrip data={hseDataTrust} />

          <div className="grid grid-cols-1 items-start gap-3 xl:grid-cols-[minmax(0,1fr)_330px]">
            {/* kolom utama */}
            <div className="flex min-w-0 flex-col gap-3">
              <HseKpiStrip />
              <HseIntelligence />
              <div className="grid auto-rows-[250px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,44fr)_minmax(0,56fr)]">
                <HseRiskRadar />
                <IncidentTrend />
              </div>
              <div className="grid auto-rows-[250px] grid-cols-1 gap-3">
                <HseRegionalStrip />
              </div>
              <HseAlerts />
            </div>

            {/* rail kanan */}
            <div className="flex min-w-0 flex-col gap-3">
              <HseDecisionCenter />
              <HseCrossLinkCard />
            </div>
          </div>

          <div className="mt-3">
            <HseInsight />
          </div>
        </div>
      </main>
    </div>
  );
}
