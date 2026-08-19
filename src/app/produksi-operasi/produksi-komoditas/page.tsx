import { ProdSidebar } from "@/components/prod/ProdSidebar";
import { DataTrustStrip } from "@/components/hc/DataTrustStrip";
import { PkomHeader } from "@/components/prod/produksi-komoditas/PkomHeader";
import { PkomKpiStrip } from "@/components/prod/produksi-komoditas/PkomKpiStrip";
import { SawitProductionCard } from "@/components/prod/produksi-komoditas/SawitProductionCard";
import { GulaGilingCard } from "@/components/prod/produksi-komoditas/GulaGilingCard";
import { TargetVsRealisasiMatrix } from "@/components/prod/produksi-komoditas/TargetVsRealisasiMatrix";
import { SeasonalityChart } from "@/components/prod/produksi-komoditas/SeasonalityChart";
import { KaretTehCard } from "@/components/prod/produksi-komoditas/KaretTehCard";
import { PkomInsight } from "@/components/prod/produksi-komoditas/PkomInsight";
import { prodDataTrust } from "@/lib/produksi-data";

export const metadata = { title: "Produksi per Komoditas — PTPN Group" };

export default function ProduksiKomoditasPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <ProdSidebar active="Produksi Komoditas" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <PkomHeader />

        <div className="flex flex-col gap-3 px-5 pb-5">
          <div className="-mb-3">
            <DataTrustStrip data={prodDataTrust} />
          </div>

          <PkomKpiStrip />

          <div className="grid auto-rows-[minmax(250px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,55fr)_minmax(0,45fr)]">
            <SawitProductionCard />
            <GulaGilingCard />
          </div>

          <div className="grid auto-rows-[minmax(240px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,40fr)_minmax(0,32fr)_minmax(0,28fr)]">
            <TargetVsRealisasiMatrix />
            <SeasonalityChart />
            <KaretTehCard />
          </div>

          <PkomInsight />
        </div>
      </main>
    </div>
  );
}
