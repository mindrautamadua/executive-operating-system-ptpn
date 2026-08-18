import { RiskSidebar } from "@/components/risk/RiskSidebar";
import { DataTrustStrip } from "@/components/hc/DataTrustStrip";
import { AuditHeader } from "@/components/risk/audit-temuan/AuditHeader";
import { AuditKpiStrip } from "@/components/risk/audit-temuan/AuditKpiStrip";
import { FindingsBySource } from "@/components/risk/audit-temuan/FindingsBySource";
import { AgingBuckets } from "@/components/risk/audit-temuan/AgingBuckets";
import { FindingsByCategory } from "@/components/risk/audit-temuan/FindingsByCategory";
import { TindakLanjutTrend } from "@/components/risk/audit-temuan/TindakLanjutTrend";
import { RepeatFindings } from "@/components/risk/audit-temuan/RepeatFindings";
import { PkptCoverage } from "@/components/risk/audit-temuan/PkptCoverage";
import { TopFindingsTable } from "@/components/risk/audit-temuan/TopFindingsTable";
import { AuditInsight } from "@/components/risk/audit-temuan/AuditInsight";
import { riskDataTrust } from "@/lib/risk-data";

export const metadata = { title: "Audit & Temuan — PTPN Group" };

export default function AuditTemuanPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <RiskSidebar active="Audit & Temuan" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <AuditHeader />

        <div className="flex flex-col gap-3 px-5 pb-5">
          <div className="-mb-3">
            <DataTrustStrip data={riskDataTrust} />
          </div>

          <AuditKpiStrip />

          <div className="grid auto-rows-[250px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,32fr)_minmax(0,34fr)_minmax(0,34fr)]">
            <FindingsBySource />
            <AgingBuckets />
            <FindingsByCategory />
          </div>

          <div className="grid auto-rows-[240px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,40fr)_minmax(0,38fr)_minmax(0,22fr)]">
            <TindakLanjutTrend />
            <RepeatFindings />
            <PkptCoverage />
          </div>

          <div className="grid auto-rows-[250px] grid-cols-1 gap-3">
            <TopFindingsTable />
          </div>

          <AuditInsight />
        </div>
      </main>
    </div>
  );
}
