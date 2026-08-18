import { ProdSidebar } from "@/components/prod/ProdSidebar";
import { ScopeGuard } from "@/components/ui/ScopeGuard";
import { DataTrustStrip } from "@/components/hc/DataTrustStrip";
import { KebunHeader } from "@/components/prod/produktivitas-kebun/KebunHeader";
import { KebunKpiStrip } from "@/components/prod/produktivitas-kebun/KebunKpiStrip";
import { YieldByRegional } from "@/components/prod/produktivitas-kebun/YieldByRegional";
import { YieldQuadrant } from "@/components/prod/produktivitas-kebun/YieldQuadrant";
import { ProtasTrend } from "@/components/prod/produktivitas-kebun/ProtasTrend";
import { TopBottomKebun } from "@/components/prod/produktivitas-kebun/TopBottomKebun";
import { GapAnalysisCard } from "@/components/prod/produktivitas-kebun/GapAnalysisCard";
import { KebunInsight } from "@/components/prod/produktivitas-kebun/KebunInsight";
import { prodDataTrust } from "@/lib/produksi-data";

export const metadata = { title: "Produktivitas Kebun per Regional — PTPN Group" };

export default function ProduktivitasKebunPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <ProdSidebar active="Produktivitas Kebun" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <KebunHeader />

        <ScopeGuard owner="palmco">

        <div className="flex flex-col gap-3 px-5 pb-5">
          <div className="-mb-3">
            <DataTrustStrip data={prodDataTrust} />
          </div>

          <KebunKpiStrip />

          <div className="grid auto-rows-[250px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,38fr)_minmax(0,34fr)_minmax(0,28fr)]">
            <YieldByRegional />
            <YieldQuadrant />
            <ProtasTrend />
          </div>

          <div className="grid auto-rows-[240px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,55fr)_minmax(0,45fr)]">
            <TopBottomKebun />
            <GapAnalysisCard />
          </div>

          <KebunInsight />
        </div>
        </ScopeGuard>
      </main>
    </div>
  );
}
