import { Sparkles } from "lucide-react";
import { SdmSidebar } from "@/components/sdm/SdmSidebar";
import { WpHeader } from "@/components/wp/WpHeader";
import { WpKpiStrip } from "@/components/wp/WpKpiStrip";
import { HeadcountProjection } from "@/components/wp/HeadcountProjection";
import { KebutuhanJenjang } from "@/components/wp/KebutuhanJenjang";
import { KebutuhanFungsi } from "@/components/wp/KebutuhanFungsi";
import { GapTalentaKritis } from "@/components/wp/GapTalentaKritis";
import { SumberPemenuhan } from "@/components/wp/SumberPemenuhan";
import { SupplyDemandBalance } from "@/components/wp/SupplyDemandBalance";
import { ScenarioPlanning } from "@/components/wp/ScenarioPlanning";
import { RekomendasiStrategis } from "@/components/wp/RekomendasiStrategis";
import { BusinessDemandDrivers } from "@/components/wp/BusinessDemandDrivers";
import { WorkforceCapacity } from "@/components/wp/WorkforceCapacity";
import { WorkforceRebalancing } from "@/components/wp/WorkforceRebalancing";
import { SkillGap4B } from "@/components/wp/SkillGap4B";
import { WorkforceWaterfall } from "@/components/wp/WorkforceWaterfall";
import { ScenarioDecisionMatrix } from "@/components/wp/ScenarioDecisionMatrix";
import { WorkforceRiskOverlay } from "@/components/wp/WorkforceRiskOverlay";
import { WpControlTower } from "@/components/wp/WpControlTower";
import { WpFootnote } from "@/components/wp/WpFootnote";
import { wpQuote } from "@/lib/wp-data";

export const metadata = { title: "Workforce Planning — PTPN Group" };

export default function WorkforcePlanningPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <SdmSidebar active="Workforce Planning" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <WpHeader />

        <div className="flex flex-col gap-3 px-5 pb-5">
          <WpKpiStrip />

          <div className="grid auto-rows-[minmax(268px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,32fr)_minmax(0,33fr)_minmax(0,35fr)]">
            <HeadcountProjection />
            <KebutuhanJenjang />
            <KebutuhanFungsi />
          </div>

          <div className="grid auto-rows-[minmax(236px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,40fr)_minmax(0,26fr)_minmax(0,34fr)]">
            <BusinessDemandDrivers />
            <WorkforceCapacity />
            <WorkforceRebalancing />
          </div>

          <div className="grid auto-rows-[minmax(258px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,32fr)_minmax(0,34fr)_minmax(0,34fr)]">
            <GapTalentaKritis />
            <SumberPemenuhan />
            <SupplyDemandBalance />
          </div>

          <div className="grid auto-rows-[minmax(240px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,56fr)_minmax(0,44fr)]">
            <SkillGap4B />
            <WorkforceWaterfall />
          </div>

          <div className="grid grid-cols-1 gap-3 xl:auto-rows-[minmax(248px,auto)] xl:grid-cols-[minmax(0,64fr)_minmax(0,36fr)]">
            <ScenarioPlanning />
            <RekomendasiStrategis />
          </div>

          <div className="grid grid-cols-1 gap-3 xl:auto-rows-[minmax(230px,auto)] xl:grid-cols-[minmax(0,68fr)_minmax(0,32fr)]">
            <ScenarioDecisionMatrix />
            <WorkforceRiskOverlay />
          </div>

          <div className="grid grid-cols-1 gap-3 xl:auto-rows-[minmax(224px,auto)]">
            <WpControlTower />
          </div>

          <WpFootnote />

          <div
            className="card anim-rise flex items-center gap-2.5 px-4 py-3"
            style={{ "--d": "180ms" } as React.CSSProperties}
          >
            <Sparkles size={14} className="shrink-0 text-ptpn-green" />
            <p className="text-[9.5px] font-semibold text-ink-700">{wpQuote}</p>
          </div>
        </div>
      </main>
    </div>
  );
}
