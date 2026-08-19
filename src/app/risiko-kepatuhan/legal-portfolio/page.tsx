import { RiskSidebar } from "@/components/risk/RiskSidebar";
import { DataTrustStrip } from "@/components/hc/DataTrustStrip";
import { LegalHeader } from "@/components/risk/legal-portfolio/LegalHeader";
import { LegalKpiStrip } from "@/components/risk/legal-portfolio/LegalKpiStrip";
import { LegalCaseByType } from "@/components/risk/legal-portfolio/LegalCaseByType";
import { ExposureByCase } from "@/components/risk/legal-portfolio/ExposureByCase";
import { CaseStageFunnel } from "@/components/risk/legal-portfolio/CaseStageFunnel";
import { GeoConcentration } from "@/components/risk/legal-portfolio/GeoConcentration";
import { OkupasiLahan } from "@/components/risk/legal-portfolio/OkupasiLahan";
import { ProvisionAdequacy } from "@/components/risk/legal-portfolio/ProvisionAdequacy";
import { LegalInsight } from "@/components/risk/legal-portfolio/LegalInsight";
import { riskDataTrust } from "@/lib/risk-data";

export const metadata = { title: "Legal Case Portfolio — PTPN Group" };

export default function LegalPortfolioPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <RiskSidebar active="Legal Case Portfolio" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <LegalHeader />

        <div className="flex flex-col gap-3 px-5 pb-5">
          <div className="-mb-3">
            <DataTrustStrip data={riskDataTrust} />
          </div>

          <LegalKpiStrip />

          <div className="grid auto-rows-[minmax(250px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,33fr)_minmax(0,67fr)]">
            <LegalCaseByType />
            <ExposureByCase />
          </div>

          <div className="grid auto-rows-[minmax(240px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,34fr)_minmax(0,34fr)_minmax(0,32fr)]">
            <CaseStageFunnel />
            <GeoConcentration />
            <OkupasiLahan />
          </div>

          <div className="grid auto-rows-[minmax(230px,auto)] grid-cols-1 gap-3">
            <ProvisionAdequacy />
          </div>

          <LegalInsight />
        </div>
      </main>
    </div>
  );
}
