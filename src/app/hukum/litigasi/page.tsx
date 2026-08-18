import { HkmSidebar } from "@/components/hkm/HkmSidebar";
import { DataTrustStrip } from "@/components/hc/DataTrustStrip";
import { LitigasiHeader } from "@/components/hkm/litigasi/LitigasiHeader";
import { LitigasiKpiStrip } from "@/components/hkm/litigasi/LitigasiKpiStrip";
import { CaseSummaryByType } from "@/components/hkm/litigasi/CaseSummaryByType";
import { LandDisputeLegalTrack } from "@/components/hkm/litigasi/LandDisputeLegalTrack";
import { LegalSpendBreakdown } from "@/components/hkm/litigasi/LegalSpendBreakdown";
import { ExternalCounsel } from "@/components/hkm/litigasi/ExternalCounsel";
import { PrecedentLibrary } from "@/components/hkm/litigasi/PrecedentLibrary";
import { AdvocacyAgenda } from "@/components/hkm/litigasi/AdvocacyAgenda";
import { LitigasiInsight } from "@/components/hkm/litigasi/LitigasiInsight";
import { hkmDataTrust } from "@/lib/hkm-data";

export const metadata = { title: "Litigasi & Advokasi — PTPN Group" };

export default function LitigasiPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <HkmSidebar active="Litigasi & Advokasi" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <LitigasiHeader />

        <div className="flex flex-col gap-3 px-5 pb-5">
          <div className="-mb-3">
            <DataTrustStrip data={hkmDataTrust} />
          </div>

          <LitigasiKpiStrip />

          <div className="grid auto-rows-[290px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,40fr)_minmax(0,60fr)]">
            <CaseSummaryByType />
            <LandDisputeLegalTrack />
          </div>

          <div className="grid auto-rows-[250px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,42fr)_minmax(0,58fr)]">
            <LegalSpendBreakdown />
            <ExternalCounsel />
          </div>

          <div className="grid auto-rows-[250px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,50fr)_minmax(0,50fr)]">
            <PrecedentLibrary />
            <AdvocacyAgenda />
          </div>

          <LitigasiInsight />
        </div>
      </main>
    </div>
  );
}
