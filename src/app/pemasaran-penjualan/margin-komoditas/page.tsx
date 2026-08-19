import { MktSidebar } from "@/components/mkt/MktSidebar";
import { DataTrustStrip } from "@/components/hc/DataTrustStrip";
import { MarginHeader } from "@/components/mkt/margin-komoditas/MarginHeader";
import { MarginKpiStrip } from "@/components/mkt/margin-komoditas/MarginKpiStrip";
import { MarginWaterfall } from "@/components/mkt/margin-komoditas/MarginWaterfall";
import { MarginTrendChart } from "@/components/mkt/margin-komoditas/MarginTrendChart";
import { MarginMatrix } from "@/components/mkt/margin-komoditas/MarginMatrix";
import { MarginBySubholding } from "@/components/mkt/margin-komoditas/MarginBySubholding";
import { KomoditasMerugi } from "@/components/mkt/margin-komoditas/KomoditasMerugi";
import { MarginInsight } from "@/components/mkt/margin-komoditas/MarginInsight";
import { mktDataTrust } from "@/lib/pemasaran-data";

export const metadata = { title: "Margin & Profitabilitas Komoditas — PTPN Group" };

export default function MarginKomoditasPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <MktSidebar active="Margin Komoditas" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <MarginHeader />

        <div className="flex flex-col gap-3 px-5 pb-5">
          <div className="-mb-3">
            <DataTrustStrip data={mktDataTrust} />
          </div>

          <MarginKpiStrip />

          <div className="grid auto-rows-[minmax(260px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,55fr)_minmax(0,45fr)]">
            <MarginWaterfall />
            <MarginTrendChart />
          </div>

          <div className="grid auto-rows-[minmax(250px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,55fr)_minmax(0,45fr)]">
            <MarginMatrix />
            <MarginBySubholding />
          </div>

          <div className="grid auto-rows-[minmax(280px,auto)] grid-cols-1 gap-3">
            <KomoditasMerugi />
          </div>

          <MarginInsight />
        </div>
      </main>
    </div>
  );
}
