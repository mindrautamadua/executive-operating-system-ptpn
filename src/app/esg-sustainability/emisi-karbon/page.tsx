import { EsgSidebar } from "@/components/esg/EsgSidebar";
import { DataTrustStrip } from "@/components/hc/DataTrustStrip";
import { EmisiHeader } from "@/components/esg/emisi-karbon/EmisiHeader";
import { EmisiKpiStrip } from "@/components/esg/emisi-karbon/EmisiKpiStrip";
import { ScopeBreakdownDonut } from "@/components/esg/emisi-karbon/ScopeBreakdownDonut";
import { EmissionBySource } from "@/components/esg/emisi-karbon/EmissionBySource";
import { IntensityTrend } from "@/components/esg/emisi-karbon/IntensityTrend";
import { EmissionBySubholding } from "@/components/esg/emisi-karbon/EmissionBySubholding";
import { CarbonPricePotential } from "@/components/esg/emisi-karbon/CarbonPricePotential";
import { EmisiFootnote } from "@/components/esg/emisi-karbon/EmisiFootnote";
import { EmisiInsight } from "@/components/esg/emisi-karbon/EmisiInsight";
import { esgDataTrust } from "@/lib/esg-data";

export const metadata = { title: "Emisi & Jejak Karbon — PTPN Group" };

export default function EmisiKarbonPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <EsgSidebar active="Emisi & Jejak Karbon" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <EmisiHeader />

        <div className="flex flex-col gap-3 px-5 pb-5">
          <div className="-mb-3">
            <DataTrustStrip data={esgDataTrust} />
          </div>

          <EmisiKpiStrip />

          <div className="grid auto-rows-[250px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,42fr)_minmax(0,58fr)]">
            <ScopeBreakdownDonut />
            <EmissionBySource />
          </div>

          <div className="grid auto-rows-[240px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,38fr)_minmax(0,29fr)_minmax(0,33fr)]">
            <IntensityTrend />
            <EmissionBySubholding />
            <CarbonPricePotential />
          </div>

          <EmisiFootnote />

          <EmisiInsight />
        </div>
      </main>
    </div>
  );
}
