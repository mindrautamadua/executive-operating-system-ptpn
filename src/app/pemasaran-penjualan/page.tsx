import { MktSidebar } from "@/components/mkt/MktSidebar";
import { MktHeader } from "@/components/mkt/MktHeader";
import { DataTrustStrip } from "@/components/hc/DataTrustStrip";
import { MktKpiStrip } from "@/components/mkt/overview/MktKpiStrip";
import { MktExecutiveIntelligence } from "@/components/mkt/overview/MktExecutiveIntelligence";
import { PriceTickerBoard } from "@/components/mkt/overview/PriceTickerBoard";
import { RevenueByKomoditas } from "@/components/mkt/overview/RevenueByKomoditas";
import { MarketRiskRadar } from "@/components/mkt/overview/MarketRiskRadar";
import { SalesVsTargetGauge } from "@/components/mkt/overview/SalesVsTargetGauge";
import { MktBodDecisionCenter } from "@/components/mkt/overview/MktBodDecisionCenter";
import { MktInsightRekomendasi } from "@/components/mkt/overview/MktInsightRekomendasi";
import { mktDataTrust } from "@/lib/pemasaran-data";

export const metadata = { title: "Pemasaran & Penjualan — PTPN Group" };

export default function PemasaranPenjualanPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <MktSidebar active="Executive Overview" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <MktHeader />

        <div className="px-5 pb-5">
          <DataTrustStrip data={mktDataTrust} />

          <div className="grid grid-cols-1 items-start gap-3 xl:grid-cols-[minmax(0,1fr)_330px]">
            {/* kolom utama */}
            <div className="flex min-w-0 flex-col gap-3">
              <MktKpiStrip />
              <MktExecutiveIntelligence />
              <div className="grid grid-cols-1 items-stretch gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,54fr)_minmax(0,46fr)]">
                <PriceTickerBoard />
                <RevenueByKomoditas />
              </div>
              <MarketRiskRadar />
            </div>

            {/* rail kanan */}
            <div className="flex min-w-0 flex-col gap-3">
              <SalesVsTargetGauge />
              <MktBodDecisionCenter />
            </div>
          </div>

          <div className="mt-3">
            <MktInsightRekomendasi />
          </div>
        </div>
      </main>
    </div>
  );
}
