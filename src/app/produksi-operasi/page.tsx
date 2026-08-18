import { ProdSidebar } from "@/components/prod/ProdSidebar";
import { ProdHeader } from "@/components/prod/ProdHeader";
import { DataTrustStrip } from "@/components/hc/DataTrustStrip";
import { ProdKpiStrip } from "@/components/prod/overview/ProdKpiStrip";
import { ProdExecutiveIntelligence } from "@/components/prod/overview/ProdExecutiveIntelligence";
import { ProdRiskRadar } from "@/components/prod/overview/ProdRiskRadar";
import { KomoditasScoreboard } from "@/components/prod/overview/KomoditasScoreboard";
import { ProduksiTrend } from "@/components/prod/overview/ProduksiTrend";
import { GulaGilingTrend } from "@/components/prod/overview/GulaGilingTrend";
import { ProdBodDecisionCenter } from "@/components/prod/overview/ProdBodDecisionCenter";
import { RegionalHeatStrip } from "@/components/prod/overview/RegionalHeatStrip";
import { GulaPgReadiness } from "@/components/prod/overview/GulaPgReadiness";
import { ProdInsightRekomendasi } from "@/components/prod/overview/ProdInsightRekomendasi";
import { prodDataTrust } from "@/lib/produksi-data";

export const metadata = { title: "Produksi & Operasi — PTPN Group" };

export default function ProduksiOperasiPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <ProdSidebar active="Executive Overview" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <ProdHeader />

        <div className="px-5 pb-5">
          <DataTrustStrip data={prodDataTrust} />

          <div className="grid grid-cols-1 items-start gap-3 xl:grid-cols-[minmax(0,1fr)_330px]">
            {/* kolom utama */}
            <div className="flex min-w-0 flex-col gap-3">
              <ProdKpiStrip />
              <ProdExecutiveIntelligence />
              <div className="grid grid-cols-1 items-stretch gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,52fr)_minmax(0,48fr)]">
                <ProdRiskRadar />
                <KomoditasScoreboard />
              </div>
              <div className="grid grid-cols-1 items-stretch gap-3 lg:grid-cols-2">
                <ProduksiTrend />
                <GulaGilingTrend />
              </div>
              <ProdInsightRekomendasi />
            </div>

            {/* rail kanan */}
            <div className="flex min-w-0 flex-col gap-3">
              <ProdBodDecisionCenter />
              <RegionalHeatStrip />
              <GulaPgReadiness />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
