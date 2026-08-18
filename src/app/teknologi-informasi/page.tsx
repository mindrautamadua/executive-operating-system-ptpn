import { TikSidebar } from "@/components/tik/TikSidebar";
import { TikHeader } from "@/components/tik/TikHeader";
import { DataTrustStrip } from "@/components/hc/DataTrustStrip";
import { TikKpiStrip } from "@/components/tik/overview/TikKpiStrip";
import { TikIntelligence } from "@/components/tik/overview/TikIntelligence";
import { TikRiskRadar } from "@/components/tik/overview/TikRiskRadar";
import { AvailabilityTrend } from "@/components/tik/overview/AvailabilityTrend";
import { SpendSnapshot } from "@/components/tik/overview/SpendSnapshot";
import { TikAlerts } from "@/components/tik/overview/TikAlerts";
import { ErpHealthCard } from "@/components/tik/overview/ErpHealthCard";
import { TikDecisionCenter } from "@/components/tik/overview/TikDecisionCenter";
import { TikInsight } from "@/components/tik/overview/TikInsight";
import { tikDataTrust } from "@/lib/tik-data";

export const metadata = { title: "Teknologi Informasi — PTPN Group" };

export default function TeknologiInformasiPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <TikSidebar active="Executive Overview" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <TikHeader />

        <div className="px-5 pb-5">
          <DataTrustStrip data={tikDataTrust} />

          <div className="grid grid-cols-1 items-start gap-3 xl:grid-cols-[minmax(0,1fr)_330px]">
            {/* kolom utama */}
            <div className="flex min-w-0 flex-col gap-3">
              <TikKpiStrip />
              <TikIntelligence />
              <div className="grid auto-rows-[250px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,44fr)_minmax(0,56fr)]">
                <TikRiskRadar />
                <AvailabilityTrend />
              </div>
              <div className="grid auto-rows-[215px] grid-cols-1 gap-3">
                <SpendSnapshot />
              </div>
              <TikAlerts />
            </div>

            {/* rail kanan */}
            <div className="flex min-w-0 flex-col gap-3">
              <ErpHealthCard />
              <TikDecisionCenter />
            </div>
          </div>

          <div className="mt-3">
            <TikInsight />
          </div>
        </div>
      </main>
    </div>
  );
}
