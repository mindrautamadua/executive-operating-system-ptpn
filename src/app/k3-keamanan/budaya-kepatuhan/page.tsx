import { HseSidebar } from "@/components/hse/HseSidebar";
import { DataTrustStrip } from "@/components/hc/DataTrustStrip";
import { BudayaHeader } from "@/components/hse/budaya-kepatuhan/BudayaHeader";
import { BudayaKpiStrip } from "@/components/hse/budaya-kepatuhan/BudayaKpiStrip";
import { Smk3ByUnit } from "@/components/hse/budaya-kepatuhan/Smk3ByUnit";
import { AuditFindings } from "@/components/hse/budaya-kepatuhan/AuditFindings";
import { TrainingProgram } from "@/components/hse/budaya-kepatuhan/TrainingProgram";
import { InspectionCoverage } from "@/components/hse/budaya-kepatuhan/InspectionCoverage";
import { SafetyCultureIndex } from "@/components/hse/budaya-kepatuhan/SafetyCultureIndex";
import { HealthSurveillance } from "@/components/hse/budaya-kepatuhan/HealthSurveillance";
import { BudayaInsight } from "@/components/hse/budaya-kepatuhan/BudayaInsight";
import { hseDataTrust } from "@/lib/hse-data";

export const metadata = { title: "Budaya & Kepatuhan K3 — PTPN Group" };

export default function BudayaKepatuhanPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <HseSidebar active="Budaya & Kepatuhan K3" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <BudayaHeader />

        <div className="flex flex-col gap-3 px-5 pb-5">
          <div className="-mb-3">
            <DataTrustStrip data={hseDataTrust} />
          </div>

          <BudayaKpiStrip />

          <div className="grid auto-rows-[250px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,44fr)_minmax(0,56fr)]">
            <Smk3ByUnit />
            <AuditFindings />
          </div>

          <div className="grid auto-rows-[230px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,50fr)_minmax(0,50fr)]">
            <TrainingProgram />
            <InspectionCoverage />
          </div>

          <div className="grid auto-rows-[250px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,36fr)_minmax(0,64fr)]">
            <SafetyCultureIndex />
            <HealthSurveillance />
          </div>

          <BudayaInsight />
        </div>
      </main>
    </div>
  );
}
