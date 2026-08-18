import { KeuSidebar } from "@/components/keu/KeuSidebar";
import { DataTrustStrip } from "@/components/hc/DataTrustStrip";
import { KrkHeader } from "@/components/keu/risiko-keuangan/KrkHeader";
import { KrkKpiStrip } from "@/components/keu/risiko-keuangan/KrkKpiStrip";
import { FinRiskRadarChart } from "@/components/keu/risiko-keuangan/FinRiskRadarChart";
import { CommodityPriceExposure } from "@/components/keu/risiko-keuangan/CommodityPriceExposure";
import { FxSensitivity } from "@/components/keu/risiko-keuangan/FxSensitivity";
import { InterestRateExposure } from "@/components/keu/risiko-keuangan/InterestRateExposure";
import { TopFinancialRisks } from "@/components/keu/risiko-keuangan/TopFinancialRisks";
import { KrkDecisionCenter } from "@/components/keu/risiko-keuangan/KrkDecisionCenter";
import { KrkInsight } from "@/components/keu/risiko-keuangan/KrkInsight";
import { keuDataTrust } from "@/lib/keu-core";

export const metadata = { title: "Risiko Keuangan — PTPN Group" };

export default function RisikoKeuanganPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <KeuSidebar active="Risiko Keuangan" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <KrkHeader />

        <div className="flex flex-col gap-3 px-5 pb-5">
          <div className="-mb-3">
            <DataTrustStrip data={keuDataTrust} />
          </div>

          <KrkKpiStrip />

          {/* Peta risiko & eksposur komoditas */}
          <div className="grid auto-rows-[250px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,38fr)_minmax(0,62fr)]">
            <FinRiskRadarChart />
            <CommodityPriceExposure />
          </div>

          {/* Sensitivitas kurs & suku bunga */}
          <div className="grid auto-rows-[230px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,55fr)_minmax(0,45fr)]">
            <FxSensitivity />
            <InterestRateExposure />
          </div>

          {/* Register risiko & keputusan mitigasi */}
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,56fr)_minmax(0,44fr)]">
            <TopFinancialRisks />
            <KrkDecisionCenter />
          </div>

          <KrkInsight />
        </div>
      </main>
    </div>
  );
}
