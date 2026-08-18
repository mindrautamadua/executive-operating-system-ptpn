import { SdmSidebar } from "@/components/sdm/SdmSidebar";
import { LndHeader } from "@/components/lnd/LndHeader";
import { LndKpiStrip } from "@/components/lnd/LndKpiStrip";
import { DistribusiKompetensi } from "@/components/lnd/DistribusiKompetensi";
import { TrenJamPelatihan } from "@/components/lnd/TrenJamPelatihan";
import { LearningValueChain } from "@/components/lnd/LearningValueChain";
import { SkillGapClosure } from "@/components/lnd/SkillGapClosure";
import { LearningRoi } from "@/components/lnd/LearningRoi";
import { ProgramTipe } from "@/components/lnd/ProgramTipe";
import { TopProgram } from "@/components/lnd/TopProgram";
import { PersonalizedLearning } from "@/components/lnd/PersonalizedLearning";
import { EffectivenessUnit } from "@/components/lnd/EffectivenessUnit";
import { TopInstruktur } from "@/components/lnd/TopInstruktur";
import { InsightLnd } from "@/components/lnd/InsightLnd";
import { LndDecisionCenter } from "@/components/lnd/LndDecisionCenter";

export const metadata = { title: "Learning & Development — PTPN Group" };

export default function LearningDevelopmentPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <SdmSidebar />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <LndHeader />

        <div className="mx-5 mb-4 flex flex-col gap-3">
          <LndKpiStrip />

          <div className="grid auto-rows-[280px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,380fr)_minmax(0,473fr)_minmax(0,450fr)]">
            <DistribusiKompetensi />
            <TrenJamPelatihan />
            <LearningValueChain />
          </div>

          <div className="grid auto-rows-[256px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,865fr)_minmax(0,450fr)]">
            <SkillGapClosure />
            <LearningRoi />
          </div>

          <div className="grid auto-rows-[208px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,380fr)_minmax(0,473fr)_minmax(0,450fr)]">
            <ProgramTipe />
            <TopProgram />
            <PersonalizedLearning />
          </div>

          <div className="grid auto-rows-[262px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,523fr)_minmax(0,318fr)_minmax(0,454fr)]">
            <EffectivenessUnit />
            <TopInstruktur />
            <InsightLnd />
          </div>

          <LndDecisionCenter />
        </div>
      </main>
    </div>
  );
}
