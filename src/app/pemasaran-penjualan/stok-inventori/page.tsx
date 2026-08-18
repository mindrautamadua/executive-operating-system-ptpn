import { MktSidebar } from "@/components/mkt/MktSidebar";
import { DataTrustStrip } from "@/components/hc/DataTrustStrip";
import { StokHeader } from "@/components/mkt/stok-inventori/StokHeader";
import { StokKpiStrip } from "@/components/mkt/stok-inventori/StokKpiStrip";
import { StokTrendChart } from "@/components/mkt/stok-inventori/StokTrendChart";
import { StokByLokasi } from "@/components/mkt/stok-inventori/StokByLokasi";
import { AgingInventory } from "@/components/mkt/stok-inventori/AgingInventory";
import { StokVsHargaCard } from "@/components/mkt/stok-inventori/StokVsHargaCard";
import { WorkingCapitalImpact } from "@/components/mkt/stok-inventori/WorkingCapitalImpact";
import { StokInsight } from "@/components/mkt/stok-inventori/StokInsight";
import { mktDataTrust } from "@/lib/pemasaran-data";

export const metadata = { title: "Stok & Posisi Inventori — PTPN Group" };

export default function StokInventoriPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <MktSidebar active="Stok & Inventori" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <StokHeader />

        <div className="flex flex-col gap-3 px-5 pb-5">
          <div className="-mb-3">
            <DataTrustStrip data={mktDataTrust} />
          </div>

          <StokKpiStrip />

          <div className="grid auto-rows-[250px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,58fr)_minmax(0,42fr)]">
            <StokTrendChart />
            <StokByLokasi />
          </div>

          <div className="grid auto-rows-[255px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,36fr)_minmax(0,37fr)_minmax(0,27fr)]">
            <AgingInventory />
            <StokVsHargaCard />
            <WorkingCapitalImpact />
          </div>

          <StokInsight />
        </div>
      </main>
    </div>
  );
}
