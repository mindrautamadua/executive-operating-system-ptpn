import { StgSidebar } from "@/components/stg/StgSidebar";
import { DataTrustStrip } from "@/components/hc/DataTrustStrip";
import { SpiHeader } from "@/components/stg/portofolio-inisiatif/SpiHeader";
import { SpiKpiStrip } from "@/components/stg/portofolio-inisiatif/SpiKpiStrip";
import { InitiativeByTheme } from "@/components/stg/portofolio-inisiatif/InitiativeByTheme";
import { InitiativeStatusBoard } from "@/components/stg/portofolio-inisiatif/InitiativeStatusBoard";
import { ImpactVsEffort } from "@/components/stg/portofolio-inisiatif/ImpactVsEffort";
import { AtRiskInitiatives } from "@/components/stg/portofolio-inisiatif/AtRiskInitiatives";
import { InitiativeFunding } from "@/components/stg/portofolio-inisiatif/InitiativeFunding";
import { SpiInsight } from "@/components/stg/portofolio-inisiatif/SpiInsight";
import { stgDataTrust } from "@/lib/stg-core";

export const metadata = { title: "Portofolio Inisiatif — PTPN Group" };

export default function PortofolioInisiatifPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <StgSidebar active="Portofolio Inisiatif" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <SpiHeader />

        <div className="flex flex-col gap-3 px-5 pb-5">
          <div className="-mb-3">
            <DataTrustStrip data={stgDataTrust} />
          </div>

          <SpiKpiStrip />

          <div className="grid auto-rows-[minmax(250px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,38fr)_minmax(0,62fr)]">
            <InitiativeByTheme />
            <InitiativeStatusBoard />
          </div>

          <div className="grid auto-rows-[minmax(250px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,45fr)_minmax(0,55fr)]">
            <ImpactVsEffort />
            <InitiativeFunding />
          </div>

          <div className="grid auto-rows-[minmax(250px,auto)] grid-cols-1 gap-3">
            <AtRiskInitiatives />
          </div>

          <SpiInsight />
        </div>
      </main>
    </div>
  );
}
