import { DekSidebar } from "@/components/dek/DekSidebar";
import { DekHeader } from "@/components/dek/DekHeader";
import { DataTrustStrip } from "@/components/hc/DataTrustStrip";
import { DekKpiStrip } from "@/components/dek/overview/DekKpiStrip";
import { DekIntelligence } from "@/components/dek/overview/DekIntelligence";
import { OversightFocusRadar } from "@/components/dek/overview/OversightFocusRadar";
import { FollowUpTrend } from "@/components/dek/overview/FollowUpTrend";
import { AttendanceByMember } from "@/components/dek/overview/AttendanceByMember";
import { DekAlerts } from "@/components/dek/overview/DekAlerts";
import { DekAgendaNext } from "@/components/dek/overview/DekAgendaNext";
import { CrossLinkCard } from "@/components/dek/overview/CrossLinkCard";
import { DekInsight } from "@/components/dek/overview/DekInsight";
import { dekDataTrust } from "@/lib/dek-data";

export const metadata = { title: "Dewan Komisaris — PTPN Group" };

export default function DewanKomisarisPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <DekSidebar active="Executive Overview" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <DekHeader />

        <div className="px-5 pb-5">
          <DataTrustStrip data={dekDataTrust} />

          <div className="grid grid-cols-1 items-start gap-3 xl:grid-cols-[minmax(0,1fr)_330px]">
            {/* kolom utama */}
            <div className="flex min-w-0 flex-col gap-3">
              <DekKpiStrip />
              <DekIntelligence />
              <div className="grid auto-rows-[250px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,44fr)_minmax(0,56fr)]">
                <OversightFocusRadar />
                <FollowUpTrend />
              </div>
              <div className="grid auto-rows-[215px] grid-cols-1 gap-3">
                <AttendanceByMember />
              </div>
              <DekAlerts />
            </div>

            {/* rail kanan */}
            <div className="flex min-w-0 flex-col gap-3">
              <DekAgendaNext />
              <CrossLinkCard />
            </div>
          </div>

          <div className="mt-3">
            <DekInsight />
          </div>
        </div>
      </main>
    </div>
  );
}
