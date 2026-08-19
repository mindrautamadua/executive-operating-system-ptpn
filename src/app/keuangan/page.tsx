import { KeuSidebar } from "@/components/keu/KeuSidebar";
import { KeuHeader } from "@/components/keu/KeuHeader";
import { DataTrustStrip } from "@/components/hc/DataTrustStrip";
import { KeuKpiStrip } from "@/components/keu/overview/KeuKpiStrip";
import { FinanceIntelligence } from "@/components/keu/overview/FinanceIntelligence";
import { RevenueEbitdaTrend } from "@/components/keu/overview/RevenueEbitdaTrend";
import { SegmentContribution } from "@/components/keu/overview/SegmentContribution";
import { FinanceRiskRadar } from "@/components/keu/overview/FinanceRiskRadar";
import { CashPosition } from "@/components/keu/overview/CashPosition";
import { KeuStrategicAlignment } from "@/components/keu/overview/KeuStrategicAlignment";
import { KeuDecisionCenter } from "@/components/keu/overview/KeuDecisionCenter";
import { KeuAlerts } from "@/components/keu/overview/KeuAlerts";
import { KeuInsightRekomendasi } from "@/components/keu/overview/KeuInsightRekomendasi";
import { keuDataTrust } from "@/lib/keu-core";

export const metadata = { title: "Keuangan — PTPN Group" };

export default function KeuanganPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <KeuSidebar active="Executive Overview" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <KeuHeader />

        <div className="px-5 pb-5">
          <DataTrustStrip data={keuDataTrust} />

          <div className="grid grid-cols-1 items-start gap-3 xl:grid-cols-[minmax(0,1fr)_330px]">
            {/* kolom utama */}
            <div className="flex min-w-0 flex-col gap-3">
              <KeuKpiStrip />
              <FinanceIntelligence />
              <div className="grid auto-rows-[minmax(250px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,56fr)_minmax(0,44fr)]">
                <RevenueEbitdaTrend />
                <SegmentContribution />
              </div>
              <div className="grid auto-rows-[minmax(250px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,48fr)_minmax(0,52fr)]">
                <FinanceRiskRadar />
                <CashPosition />
              </div>
              <KeuAlerts />
            </div>

            {/* rail kanan */}
            <div className="flex min-w-0 flex-col gap-3">
              <KeuStrategicAlignment />
              <KeuDecisionCenter />
            </div>
          </div>

          <div className="mt-3">
            <KeuInsightRekomendasi />
          </div>
        </div>
      </main>
    </div>
  );
}
