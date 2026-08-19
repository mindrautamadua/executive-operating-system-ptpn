import { ProdSidebar } from "@/components/prod/ProdSidebar";
import { ScopeGuard } from "@/components/ui/ScopeGuard";
import { DataTrustStrip } from "@/components/hc/DataTrustStrip";
import { PanenHeader } from "@/components/prod/panen-logistik/PanenHeader";
import { PanenKpiStrip } from "@/components/prod/panen-logistik/PanenKpiStrip";
import { RestanTrend } from "@/components/prod/panen-logistik/RestanTrend";
import { FfaVsOerChart } from "@/components/prod/panen-logistik/FfaVsOerChart";
import { ArmadaLogistik } from "@/components/prod/panen-logistik/ArmadaLogistik";
import { HarvestCycleCard } from "@/components/prod/panen-logistik/HarvestCycleCard";
import { PanenInsight } from "@/components/prod/panen-logistik/PanenInsight";
import { prodDataTrust } from "@/lib/produksi-data";

export const metadata = { title: "Panen & Logistik — PTPN Group" };

export default function PanenLogistikPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <ProdSidebar active="Panen & Logistik" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <PanenHeader />

        <ScopeGuard owner="palmco">

        <div className="flex flex-col gap-3 px-5 pb-5">
          <div className="-mb-3">
            <DataTrustStrip data={prodDataTrust} />
          </div>

          <PanenKpiStrip />

          {/* Restan sebagai akar FFA tinggi → gap OER */}
          <div className="grid auto-rows-[minmax(250px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,46fr)_minmax(0,54fr)]">
            <RestanTrend />
            <FfaVsOerChart />
          </div>

          {/* Armada & disiplin rotasi panen */}
          <div className="grid auto-rows-[minmax(240px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,38fr)_minmax(0,62fr)]">
            <ArmadaLogistik />
            <HarvestCycleCard />
          </div>

          <PanenInsight />
        </div>
        </ScopeGuard>
      </main>
    </div>
  );
}
