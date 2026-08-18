import { DekSidebar } from "@/components/dek/DekSidebar";
import { DataTrustStrip } from "@/components/hc/DataTrustStrip";
import { AgendaHeader } from "@/components/dek/agenda-risalah/AgendaHeader";
import { AgendaKpiStrip } from "@/components/dek/agenda-risalah/AgendaKpiStrip";
import { MeetingCalendar } from "@/components/dek/agenda-risalah/MeetingCalendar";
import { AgendaByTheme } from "@/components/dek/agenda-risalah/AgendaByTheme";
import { RisalahStatus } from "@/components/dek/agenda-risalah/RisalahStatus";
import { ActionItemsFromMinutes } from "@/components/dek/agenda-risalah/ActionItemsFromMinutes";
import { UpcomingAgenda } from "@/components/dek/agenda-risalah/UpcomingAgenda";
import { AttendanceTrend } from "@/components/dek/agenda-risalah/AttendanceTrend";
import { AgendaInsight } from "@/components/dek/agenda-risalah/AgendaInsight";
import { dekDataTrust } from "@/lib/dek-data";

export const metadata = { title: "Agenda & Risalah Rapat — PTPN Group" };

export default function AgendaRisalahPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <DekSidebar active="Agenda & Risalah Rapat" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <AgendaHeader />

        <div className="flex flex-col gap-3 px-5 pb-5">
          <div className="-mb-3">
            <DataTrustStrip data={dekDataTrust} />
          </div>

          <AgendaKpiStrip />

          <div className="grid auto-rows-[250px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,62fr)_minmax(0,38fr)]">
            <MeetingCalendar />
            <AgendaByTheme />
          </div>

          <div className="grid auto-rows-[240px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,38fr)_minmax(0,62fr)]">
            <RisalahStatus />
            <ActionItemsFromMinutes />
          </div>

          <div className="grid auto-rows-[215px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,58fr)_minmax(0,42fr)]">
            <UpcomingAgenda />
            <AttendanceTrend />
          </div>

          <AgendaInsight />
        </div>
      </main>
    </div>
  );
}
