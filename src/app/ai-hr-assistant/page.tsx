import { SdmSidebar } from "@/components/sdm/SdmSidebar";
import { AiHrHeader } from "@/components/aihr/AiHrHeader";
import { ChatPanel } from "@/components/aihr/ChatPanel";
import { InsightSummary } from "@/components/aihr/InsightSummary";
import { QuickAccess } from "@/components/aihr/QuickAccess";
import { ChatHistory } from "@/components/aihr/ChatHistory";
import { FeatureStrip } from "@/components/aihr/FeatureStrip";

export const metadata = { title: "AI HR Assistant — PTPN Group" };

export default function AiHrAssistantPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <SdmSidebar active="AI HR Assistant" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <AiHrHeader />

        <div className="flex flex-col gap-3 px-5 pb-5 pt-4">
          <div className="grid grid-cols-1 items-start gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,66fr)_minmax(0,34fr)]">
            <ChatPanel />
            <div className="flex flex-col gap-3">
              <InsightSummary />
              <QuickAccess />
              <ChatHistory />
            </div>
          </div>

          <FeatureStrip />
        </div>
      </main>
    </div>
  );
}
