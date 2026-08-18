import { EsgSidebar } from "@/components/esg/EsgSidebar";
import { DataTrustStrip } from "@/components/hc/DataTrustStrip";
import { LhHeader } from "@/components/esg/lingkungan-hayati/LhHeader";
import { LhKpiStrip } from "@/components/esg/lingkungan-hayati/LhKpiStrip";
import { WaterIntensityTrend } from "@/components/esg/lingkungan-hayati/WaterIntensityTrend";
import { EffluentCompliance } from "@/components/esg/lingkungan-hayati/EffluentCompliance";
import { WasteCircularity } from "@/components/esg/lingkungan-hayati/WasteCircularity";
import { HcvManagement } from "@/components/esg/lingkungan-hayati/HcvManagement";
import { InsidenLingkungan } from "@/components/esg/lingkungan-hayati/InsidenLingkungan";
import { ProperFootnote } from "@/components/esg/lingkungan-hayati/ProperFootnote";
import { LhInsight } from "@/components/esg/lingkungan-hayati/LhInsight";
import { esgDataTrust } from "@/lib/esg-data";

export const metadata = { title: "Air, Limbah & Biodiversitas — PTPN Group" };

export default function LingkunganHayatiPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <EsgSidebar active="Air, Limbah & Biodiversitas" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <LhHeader />

        <div className="flex flex-col gap-3 px-5 pb-5">
          <div className="-mb-3">
            <DataTrustStrip data={esgDataTrust} />
          </div>

          <LhKpiStrip />

          <div className="grid auto-rows-[250px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,36fr)_minmax(0,36fr)_minmax(0,28fr)]">
            <WaterIntensityTrend />
            <EffluentCompliance />
            <WasteCircularity />
          </div>

          <div className="grid auto-rows-[240px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,52fr)_minmax(0,48fr)]">
            <HcvManagement />
            <InsidenLingkungan />
          </div>

          <ProperFootnote />

          <LhInsight />
        </div>
      </main>
    </div>
  );
}
