import { RiskSidebar } from "@/components/risk/RiskSidebar";
import { DataTrustStrip } from "@/components/hc/DataTrustStrip";
import { KiHeader } from "@/components/risk/komoditas-iklim/KiHeader";
import { KiKpiStrip } from "@/components/risk/komoditas-iklim/KiKpiStrip";
import { CpoPriceBand } from "@/components/risk/komoditas-iklim/CpoPriceBand";
import { ElNinoScenario } from "@/components/risk/komoditas-iklim/ElNinoScenario";
import { RainfallAnomalyChart } from "@/components/risk/komoditas-iklim/RainfallAnomaly";
import { CommodityScenarioTable } from "@/components/risk/komoditas-iklim/CommodityScenarioTable";
import { SugarImportRisk } from "@/components/risk/komoditas-iklim/SugarImportRisk";
import { ClimateAdaptasi } from "@/components/risk/komoditas-iklim/ClimateAdaptasi";
import { KiDecisionCenter } from "@/components/risk/komoditas-iklim/KiDecisionCenter";
import { KiInsight } from "@/components/risk/komoditas-iklim/KiInsight";
import { riskDataTrust } from "@/lib/risk-data";

export const metadata = { title: "Risiko Komoditas & Iklim — PTPN Group" };

export default function KomoditasIklimPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <RiskSidebar active="Risiko Komoditas & Iklim" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <KiHeader />

        <div className="flex flex-col gap-3 px-5 pb-5">
          <div className="-mb-3">
            <DataTrustStrip data={riskDataTrust} />
          </div>

          <KiKpiStrip />

          {/* Eksposur harga & skenario iklim */}
          <div className="grid auto-rows-[250px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,58fr)_minmax(0,42fr)]">
            <CpoPriceBand />
            <ElNinoScenario />
          </div>

          {/* Anomali iklim & sensitivitas komoditas */}
          <div className="grid auto-rows-[240px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,38fr)_minmax(0,62fr)]">
            <RainfallAnomalyChart />
            <CommodityScenarioTable />
          </div>

          {/* Risiko gula, adaptasi, dan keputusan mitigasi */}
          <div className="grid auto-rows-[230px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,28fr)_minmax(0,38fr)_minmax(0,34fr)]">
            <SugarImportRisk />
            <ClimateAdaptasi />
            <KiDecisionCenter />
          </div>

          <KiInsight />
        </div>
      </main>
    </div>
  );
}
