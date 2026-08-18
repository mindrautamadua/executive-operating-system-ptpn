import { MktSidebar } from "@/components/mkt/MktSidebar";
import { DataTrustStrip } from "@/components/hc/DataTrustStrip";
import { HargaHeader } from "@/components/mkt/harga-pasar/HargaHeader";
import { HargaKpiStrip } from "@/components/mkt/harga-pasar/HargaKpiStrip";
import { CpoPriceChart } from "@/components/mkt/harga-pasar/CpoPriceChart";
import { PriceDriversCard } from "@/components/mkt/harga-pasar/PriceDriversCard";
import { GulaKaretPriceChart } from "@/components/mkt/harga-pasar/GulaKaretPriceChart";
import { OutlookKonsensus } from "@/components/mkt/harga-pasar/OutlookKonsensus";
import { KursSensitivity } from "@/components/mkt/harga-pasar/KursSensitivity";
import { HargaInsight } from "@/components/mkt/harga-pasar/HargaInsight";
import { mktDataTrust } from "@/lib/pemasaran-data";

export const metadata = { title: "Harga Pasar & Outlook — PTPN Group" };

export default function HargaPasarPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <MktSidebar active="Harga & Outlook" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <HargaHeader />

        <div className="flex flex-col gap-3 px-5 pb-5">
          <div className="-mb-3">
            <DataTrustStrip data={mktDataTrust} />
          </div>

          <HargaKpiStrip />

          <div className="grid auto-rows-[250px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,62fr)_minmax(0,38fr)]">
            <CpoPriceChart />
            <PriceDriversCard />
          </div>

          <div className="grid auto-rows-[230px] grid-cols-1 gap-3">
            <GulaKaretPriceChart />
          </div>

          <div className="grid auto-rows-[225px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,56fr)_minmax(0,44fr)]">
            <OutlookKonsensus />
            <KursSensitivity />
          </div>

          <HargaInsight />
        </div>
      </main>
    </div>
  );
}
