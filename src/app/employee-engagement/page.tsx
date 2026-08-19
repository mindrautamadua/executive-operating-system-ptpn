import { SdmSidebar } from "@/components/sdm/SdmSidebar";
import { EngagementHeader } from "@/components/engagement/EngagementHeader";
import { EngagementKpiStrip } from "@/components/engagement/EngagementKpiStrip";
import { EngagementOverview } from "@/components/engagement/EngagementOverview";
import { TrenEngagement } from "@/components/engagement/TrenEngagement";
import { EnpsTrend } from "@/components/engagement/EnpsTrend";
import { EngagementUnit } from "@/components/engagement/EngagementUnit";
import { EngagementDemografi } from "@/components/engagement/EngagementDemografi";
import { FaktorEngagement } from "@/components/engagement/FaktorEngagement";
import { KomentarSentimen } from "@/components/engagement/KomentarSentimen";
import { PartisipasiSurvey } from "@/components/engagement/PartisipasiSurvey";
import { InsightEngagement } from "@/components/engagement/InsightEngagement";
import { EngagementDriverModel } from "@/components/engagement/EngagementDriverModel";
import { ManagerIntelligence } from "@/components/engagement/ManagerIntelligence";
import { EngagementOutcomeLink } from "@/components/engagement/EngagementOutcomeLink";
import { EngagementRiskMatrix } from "@/components/engagement/EngagementRiskMatrix";
import { VoiceOfEmployee } from "@/components/engagement/VoiceOfEmployee";
import { CapacityDiagnosis } from "@/components/engagement/CapacityDiagnosis";
import { EngagementActionEngine } from "@/components/engagement/EngagementActionEngine";
import { EngagementFootnote } from "@/components/engagement/EngagementFootnote";

export const metadata = { title: "Employee Engagement — PTPN Group" };

export default function EmployeeEngagementPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <SdmSidebar
        assistantCard="coach"
        assistantTitle="AI Engagement Assistant"
        assistantText="Dapatkan insight dan rekomendasi untuk meningkatkan engagement di organisasi Anda."
        assistantCta="Tanya AI Assistant"
      />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <EngagementHeader />

        <div className="mx-5 mb-4 flex flex-col gap-3">
          <EngagementKpiStrip />

          <div className="grid auto-rows-[minmax(268px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,373fr)_minmax(0,415fr)_minmax(0,495fr)]">
            <EngagementOverview />
            <TrenEngagement />
            <EnpsTrend />
          </div>

          <div className="grid auto-rows-[minmax(250px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,373fr)_minmax(0,370fr)_minmax(0,540fr)]">
            <EngagementUnit />
            <EngagementDemografi />
            <FaktorEngagement />
          </div>

          <div className="grid auto-rows-[minmax(252px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,46fr)_minmax(0,54fr)]">
            <EngagementDriverModel />
            <ManagerIntelligence />
          </div>

          <div className="grid auto-rows-[minmax(248px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,52fr)_minmax(0,48fr)]">
            <EngagementOutcomeLink />
            <EngagementRiskMatrix />
          </div>

          <div className="grid auto-rows-[minmax(240px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,50fr)_minmax(0,50fr)]">
            <VoiceOfEmployee />
            <CapacityDiagnosis />
          </div>

          <div className="grid auto-rows-[minmax(228px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,440fr)_minmax(0,348fr)_minmax(0,495fr)]">
            <KomentarSentimen />
            <PartisipasiSurvey />
            <InsightEngagement />
          </div>

          <div className="grid auto-rows-[minmax(236px,auto)] grid-cols-1">
            <EngagementActionEngine />
          </div>

          <EngagementFootnote />
        </div>
      </main>
    </div>
  );
}
