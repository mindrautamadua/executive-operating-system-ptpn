import { KeuSidebar } from "@/components/keu/KeuSidebar";
import { DataTrustStrip } from "@/components/hc/DataTrustStrip";
import { KsbHeader } from "@/components/keu/struktur-biaya/KsbHeader";
import { KsbKpiStrip } from "@/components/keu/struktur-biaya/KsbKpiStrip";
import { CostStructureBreakdown } from "@/components/keu/struktur-biaya/CostStructureBreakdown";
import { UnitCostTrend } from "@/components/keu/struktur-biaya/UnitCostTrend";
import { CostPerRegional } from "@/components/keu/struktur-biaya/CostPerRegional";
import { FertilizerFuelExposure } from "@/components/keu/struktur-biaya/FertilizerFuelExposure";
import { CostSavingPrograms } from "@/components/keu/struktur-biaya/CostSavingPrograms";
import { KsbInsight } from "@/components/keu/struktur-biaya/KsbInsight";
import { keuDataTrust } from "@/lib/keu-core";

export const metadata = { title: "Struktur Biaya & HPP — PTPN Group" };

export default function StrukturBiayaPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <KeuSidebar active="Struktur Biaya & HPP" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <KsbHeader />

        <div className="flex flex-col gap-3 px-5 pb-5">
          <div className="-mb-3">
            <DataTrustStrip data={keuDataTrust} />
          </div>

          <KsbKpiStrip />

          <div className="grid auto-rows-[minmax(245px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,42fr)_minmax(0,58fr)]">
            <CostStructureBreakdown />
            <UnitCostTrend />
          </div>

          <div className="grid auto-rows-[minmax(235px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,36fr)_minmax(0,32fr)_minmax(0,32fr)]">
            <CostPerRegional />
            <FertilizerFuelExposure />
            <CostSavingPrograms />
          </div>

          <KsbInsight />
        </div>
      </main>
    </div>
  );
}
