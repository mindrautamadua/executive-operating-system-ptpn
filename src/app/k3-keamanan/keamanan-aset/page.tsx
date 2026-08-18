import { HseSidebar } from "@/components/hse/HseSidebar";
import { DataTrustStrip } from "@/components/hc/DataTrustStrip";
import { KeamananHeader } from "@/components/hse/keamanan-aset/KeamananHeader";
import { KeamananKpiStrip } from "@/components/hse/keamanan-aset/KeamananKpiStrip";
import { TheftTrend } from "@/components/hse/keamanan-aset/TheftTrend";
import { TheftByRegional } from "@/components/hse/keamanan-aset/TheftByRegional";
import { SecurityIncidentType } from "@/components/hse/keamanan-aset/SecurityIncidentType";
import { SecurityCoverage } from "@/components/hse/keamanan-aset/SecurityCoverage";
import { ResolutionFunnel } from "@/components/hse/keamanan-aset/ResolutionFunnel";
import { LossRecovery } from "@/components/hse/keamanan-aset/LossRecovery";
import { CollaborationAparat } from "@/components/hse/keamanan-aset/CollaborationAparat";
import { KeamananDecisionCenter } from "@/components/hse/keamanan-aset/KeamananDecisionCenter";
import { KeamananInsight } from "@/components/hse/keamanan-aset/KeamananInsight";
import { hseDataTrust } from "@/lib/hse-data";

export const metadata = { title: "Keamanan Aset & Kebun — PTPN Group" };

export default function KeamananAsetPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <HseSidebar active="Keamanan Aset & Kebun" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <KeamananHeader />

        <div className="flex flex-col gap-3 px-5 pb-5">
          <div className="-mb-3">
            <DataTrustStrip data={hseDataTrust} />
          </div>

          <KeamananKpiStrip />

          <div className="grid auto-rows-[250px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,56fr)_minmax(0,44fr)]">
            <TheftTrend />
            <TheftByRegional />
          </div>

          <div className="grid auto-rows-[240px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,30fr)_minmax(0,44fr)_minmax(0,26fr)]">
            <SecurityIncidentType />
            <SecurityCoverage />
            <ResolutionFunnel />
          </div>

          <div className="grid auto-rows-[230px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,50fr)_minmax(0,50fr)]">
            <LossRecovery />
            <CollaborationAparat />
          </div>

          <KeamananDecisionCenter />

          <KeamananInsight />
        </div>
      </main>
    </div>
  );
}
