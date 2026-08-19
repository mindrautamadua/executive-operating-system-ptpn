import { MktSidebar } from "@/components/mkt/MktSidebar";
import { DataTrustStrip } from "@/components/hc/DataTrustStrip";
import { BuyerHeader } from "@/components/mkt/ekspor-buyer/BuyerHeader";
import { BuyerKpiStrip } from "@/components/mkt/ekspor-buyer/BuyerKpiStrip";
import { EksporDomestikTrend } from "@/components/mkt/ekspor-buyer/EksporDomestikTrend";
import { BuyerConcentrationGauge } from "@/components/mkt/ekspor-buyer/BuyerConcentrationGauge";
import { TopBuyerTable } from "@/components/mkt/ekspor-buyer/TopBuyerTable";
import { DestinasiEkspor } from "@/components/mkt/ekspor-buyer/DestinasiEkspor";
import { RegulasiPasarCard } from "@/components/mkt/ekspor-buyer/RegulasiPasarCard";
import { BuyerInsight } from "@/components/mkt/ekspor-buyer/BuyerInsight";
import { mktDataTrust } from "@/lib/pemasaran-data";

export const metadata = { title: "Ekspor & Buyer — PTPN Group" };

export default function EksporBuyerPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <MktSidebar active="Ekspor & Buyer" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <BuyerHeader />

        <div className="flex flex-col gap-3 px-5 pb-5">
          <div className="-mb-3">
            <DataTrustStrip data={mktDataTrust} />
          </div>

          <BuyerKpiStrip />

          <div className="grid auto-rows-[minmax(250px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,60fr)_minmax(0,40fr)]">
            <EksporDomestikTrend />
            <BuyerConcentrationGauge />
          </div>

          <div className="grid auto-rows-[minmax(250px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,54fr)_minmax(0,46fr)]">
            <TopBuyerTable />
            <DestinasiEkspor />
          </div>

          <div className="grid auto-rows-[minmax(215px,auto)] grid-cols-1 gap-3">
            <RegulasiPasarCard />
          </div>

          <BuyerInsight />
        </div>
      </main>
    </div>
  );
}
