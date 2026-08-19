import { AsetSidebar } from "@/components/aset/AsetSidebar";
import { DataTrustStrip } from "@/components/hc/DataTrustStrip";
import { AfsHeader } from "@/components/aset/fasilitas-produksi/AfsHeader";
import { AfsKpiStrip } from "@/components/aset/fasilitas-produksi/AfsKpiStrip";
import { MillUtilization } from "@/components/aset/fasilitas-produksi/MillUtilization";
import { SugarMillHealth } from "@/components/aset/fasilitas-produksi/SugarMillHealth";
import { FacilityAgeCondition } from "@/components/aset/fasilitas-produksi/FacilityAgeCondition";
import { DowntimeAnalysis } from "@/components/aset/fasilitas-produksi/DowntimeAnalysis";
import { CapacityVsSupply } from "@/components/aset/fasilitas-produksi/CapacityVsSupply";
import { AfsInsight } from "@/components/aset/fasilitas-produksi/AfsInsight";
import { astDataTrust } from "@/lib/ast-core";

export const metadata = { title: "Fasilitas Produksi — PTPN Group" };

export default function FasilitasProduksiPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <AsetSidebar active="Fasilitas Produksi" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <AfsHeader />

        <div className="flex flex-col gap-3 px-5 pb-5">
          <div className="-mb-3">
            <DataTrustStrip data={astDataTrust} />
          </div>

          <AfsKpiStrip />

          <div className="grid auto-rows-[minmax(250px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,54fr)_minmax(0,46fr)]">
            <MillUtilization />
            <SugarMillHealth />
          </div>

          <div className="grid auto-rows-[minmax(250px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,34fr)_minmax(0,30fr)_minmax(0,36fr)]">
            <FacilityAgeCondition />
            <DowntimeAnalysis />
            <CapacityVsSupply />
          </div>

          <AfsInsight />
        </div>
      </main>
    </div>
  );
}
