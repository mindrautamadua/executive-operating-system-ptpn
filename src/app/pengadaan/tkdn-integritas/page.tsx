import { PgdSidebar } from "@/components/pgd/PgdSidebar";
import { DataTrustStrip } from "@/components/hc/DataTrustStrip";
import { TkdnHeader } from "@/components/pgd/tkdn-integritas/TkdnHeader";
import { TkdnKpiStrip } from "@/components/pgd/tkdn-integritas/TkdnKpiStrip";
import { TkdnByCategory } from "@/components/pgd/tkdn-integritas/TkdnByCategory";
import { TkdnTrend } from "@/components/pgd/tkdn-integritas/TkdnTrend";
import { IntegrityFunnel } from "@/components/pgd/tkdn-integritas/IntegrityFunnel";
import { IntegrityCases } from "@/components/pgd/tkdn-integritas/IntegrityCases";
import { ControlEffectiveness } from "@/components/pgd/tkdn-integritas/ControlEffectiveness";
import { TkdnInsight } from "@/components/pgd/tkdn-integritas/TkdnInsight";
import { pgdDataTrust } from "@/lib/pgd-data";

export const metadata = { title: "TKDN & Integritas — PTPN Group" };

export default function TkdnIntegritasPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <PgdSidebar active="TKDN & Integritas" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <TkdnHeader />

        <div className="flex flex-col gap-3 px-5 pb-5">
          <div className="-mb-3">
            <DataTrustStrip data={pgdDataTrust} />
          </div>

          <TkdnKpiStrip />

          <div className="grid auto-rows-[minmax(250px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,40fr)_minmax(0,34fr)_minmax(0,26fr)]">
            <TkdnByCategory />
            <TkdnTrend />
            <IntegrityFunnel />
          </div>

          <div className="grid auto-rows-[minmax(250px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,54fr)_minmax(0,46fr)]">
            <IntegrityCases />
            <ControlEffectiveness />
          </div>

          <TkdnInsight />
        </div>
      </main>
    </div>
  );
}
