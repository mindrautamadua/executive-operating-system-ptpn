import { PgdSidebar } from "@/components/pgd/PgdSidebar";
import { PgdHeader } from "@/components/pgd/PgdHeader";
import { DataTrustStrip } from "@/components/hc/DataTrustStrip";
import { PgdKpiStrip } from "@/components/pgd/overview/PgdKpiStrip";
import { PgdIntelligence } from "@/components/pgd/overview/PgdIntelligence";
import { PgdRiskRadar } from "@/components/pgd/overview/PgdRiskRadar";
import { SpendTrend } from "@/components/pgd/overview/SpendTrend";
import { SavingsTrend } from "@/components/pgd/overview/SavingsTrend";
import { PgdAlerts } from "@/components/pgd/overview/PgdAlerts";
import { PgdDecisionCenter } from "@/components/pgd/overview/PgdDecisionCenter";
import { VendorConcentrationCompact } from "@/components/pgd/overview/VendorConcentrationCompact";
import { PgdInsight } from "@/components/pgd/overview/PgdInsight";
import { pgdDataTrust } from "@/lib/pgd-data";

export const metadata = { title: "Pengadaan — PTPN Group" };

export default function PengadaanPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <PgdSidebar active="Executive Overview" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <PgdHeader />

        <div className="px-5 pb-5">
          <DataTrustStrip data={pgdDataTrust} />

          <div className="grid grid-cols-1 items-start gap-3 xl:grid-cols-[minmax(0,1fr)_330px]">
            {/* kolom utama */}
            <div className="flex min-w-0 flex-col gap-3">
              <PgdKpiStrip />
              <PgdIntelligence />
              <div className="grid auto-rows-[250px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,44fr)_minmax(0,56fr)]">
                <PgdRiskRadar />
                <SpendTrend />
              </div>
              <div className="grid auto-rows-[215px] grid-cols-1 gap-3">
                <SavingsTrend />
              </div>
              <PgdAlerts />
            </div>

            {/* rail kanan */}
            <div className="flex min-w-0 flex-col gap-3">
              <VendorConcentrationCompact />
              <PgdDecisionCenter />
            </div>
          </div>

          <div className="mt-3">
            <PgdInsight />
          </div>
        </div>
      </main>
    </div>
  );
}
