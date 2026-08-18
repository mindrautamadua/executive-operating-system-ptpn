import { MktSidebar } from "@/components/mkt/MktSidebar";
import { DataTrustStrip } from "@/components/hc/DataTrustStrip";
import { HilirHeader } from "@/components/mkt/hilirisasi/HilirHeader";
import { HilirKpiStrip } from "@/components/mkt/hilirisasi/HilirKpiStrip";
import { HilirRevenueTrend } from "@/components/mkt/hilirisasi/HilirRevenueTrend";
import { MarginUpliftChart } from "@/components/mkt/hilirisasi/MarginUpliftChart";
import { ProdukTurunanTable } from "@/components/mkt/hilirisasi/ProdukTurunanTable";
import { BiodieselMandateCard } from "@/components/mkt/hilirisasi/BiodieselMandateCard";
import { RefineryPipeline } from "@/components/mkt/hilirisasi/RefineryPipeline";
import { HilirInsight } from "@/components/mkt/hilirisasi/HilirInsight";
import { mktDataTrust } from "@/lib/pemasaran-data";

export const metadata = { title: "Hilirisasi & Produk Turunan — PTPN Group" };

export default function HilirisasiPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <MktSidebar active="Hilirisasi" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <HilirHeader />

        <div className="flex flex-col gap-3 px-5 pb-5">
          <div className="-mb-3">
            <DataTrustStrip data={mktDataTrust} />
          </div>

          <HilirKpiStrip />

          <div className="grid auto-rows-[255px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,58fr)_minmax(0,42fr)]">
            <HilirRevenueTrend />
            <MarginUpliftChart />
          </div>

          <div className="grid auto-rows-[245px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,55fr)_minmax(0,45fr)]">
            <ProdukTurunanTable />
            <BiodieselMandateCard />
          </div>

          <div className="grid auto-rows-[205px] grid-cols-1 gap-3">
            <RefineryPipeline />
          </div>

          <HilirInsight />
        </div>
      </main>
    </div>
  );
}
