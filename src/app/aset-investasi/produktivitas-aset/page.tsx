import { AsetSidebar } from "@/components/aset/AsetSidebar";
import { DataTrustStrip } from "@/components/hc/DataTrustStrip";
import { ApdHeader } from "@/components/aset/produktivitas-aset/ApdHeader";
import { ApdKpiStrip } from "@/components/aset/produktivitas-aset/ApdKpiStrip";
import { YieldByRegional } from "@/components/aset/produktivitas-aset/YieldByRegional";
import { YieldTrend } from "@/components/aset/produktivitas-aset/YieldTrend";
import { AgeYieldProfile } from "@/components/aset/produktivitas-aset/AgeYieldProfile";
import { SugarProductivity } from "@/components/aset/produktivitas-aset/SugarProductivity";
import { AssetReturnQuadrant } from "@/components/aset/produktivitas-aset/AssetReturnQuadrant";
import { ProductivityGapValue } from "@/components/aset/produktivitas-aset/ProductivityGapValue";
import { ApdInsight } from "@/components/aset/produktivitas-aset/ApdInsight";
import { astDataTrust } from "@/lib/ast-core";

export const metadata = { title: "Produktivitas Aset — PTPN Group" };

export default function ProduktivitasAsetPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <AsetSidebar active="Produktivitas Aset" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <ApdHeader />

        <div className="flex flex-col gap-3 px-5 pb-5">
          <div className="-mb-3">
            <DataTrustStrip data={astDataTrust} />
          </div>

          <ApdKpiStrip />

          <div className="grid auto-rows-[minmax(250px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,54fr)_minmax(0,46fr)]">
            <YieldByRegional />
            <YieldTrend />
          </div>

          <div className="grid auto-rows-[minmax(240px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,52fr)_minmax(0,48fr)]">
            <AgeYieldProfile />
            <SugarProductivity />
          </div>

          <div className="grid auto-rows-[minmax(250px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,46fr)_minmax(0,54fr)]">
            <AssetReturnQuadrant />
            <ProductivityGapValue />
          </div>

          <ApdInsight />
        </div>
      </main>
    </div>
  );
}
