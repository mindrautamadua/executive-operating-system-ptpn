import { PgdSidebar } from "@/components/pgd/PgdSidebar";
import { DataTrustStrip } from "@/components/hc/DataTrustStrip";
import { KontrakHeader } from "@/components/pgd/kontrak/KontrakHeader";
import { KontrakKpiStrip } from "@/components/pgd/kontrak/KontrakKpiStrip";
import { ContractByStatus } from "@/components/pgd/kontrak/ContractByStatus";
import { ExpiryTimeline } from "@/components/pgd/kontrak/ExpiryTimeline";
import { ComplianceCheck } from "@/components/pgd/kontrak/ComplianceCheck";
import { ContractValueTop } from "@/components/pgd/kontrak/ContractValueTop";
import { FrameworkAgreements } from "@/components/pgd/kontrak/FrameworkAgreements";
import { AddendumAnalysis } from "@/components/pgd/kontrak/AddendumAnalysis";
import { KontrakInsight } from "@/components/pgd/kontrak/KontrakInsight";
import { pgdDataTrust } from "@/lib/pgd-data";

export const metadata = { title: "Kontrak Pengadaan — PTPN Group" };

export default function KontrakPengadaanPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <PgdSidebar active="Kontrak Pengadaan" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <KontrakHeader />

        <div className="flex flex-col gap-3 px-5 pb-5">
          <div className="-mb-3">
            <DataTrustStrip data={pgdDataTrust} />
          </div>

          <KontrakKpiStrip />

          <div className="grid auto-rows-[250px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,32fr)_minmax(0,44fr)_minmax(0,24fr)]">
            <ContractByStatus />
            <ExpiryTimeline />
            <ComplianceCheck />
          </div>

          <div className="grid auto-rows-[250px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,38fr)_minmax(0,34fr)_minmax(0,28fr)]">
            <ContractValueTop />
            <FrameworkAgreements />
            <AddendumAnalysis />
          </div>

          <KontrakInsight />
        </div>
      </main>
    </div>
  );
}
