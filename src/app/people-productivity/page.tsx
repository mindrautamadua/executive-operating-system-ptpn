import { Sparkles } from "lucide-react";
import { SdmSidebar } from "@/components/sdm/SdmSidebar";
import { ProduktivitasHeader } from "@/components/produktivitas/ProduktivitasHeader";
import { ProduktivitasKpiStrip } from "@/components/produktivitas/ProduktivitasKpiStrip";
import { ProduktivitasIntelligence } from "@/components/produktivitas/ProduktivitasIntelligence";
import { ProduktivitasTrend } from "@/components/produktivitas/ProduktivitasTrend";
import { ProduktivitasUnitKerja } from "@/components/produktivitas/ProduktivitasUnitKerja";
import { ProduktivitasJenisUsaha } from "@/components/produktivitas/ProduktivitasJenisUsaha";
import { ProduktivitasBiaya } from "@/components/produktivitas/ProduktivitasBiaya";
import { BreakdownProduktivitas } from "@/components/produktivitas/BreakdownProduktivitas";
import { DriversProduktivitas } from "@/components/produktivitas/DriversProduktivitas";
import { InsightProduktivitas } from "@/components/produktivitas/InsightProduktivitas";
import { BenchmarkingEksternal } from "@/components/produktivitas/BenchmarkingEksternal";

export const metadata = { title: "People Productivity — PTPN Group" };

export default function PeopleProductivityPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <SdmSidebar />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <ProduktivitasHeader />

        <div className="mx-5 mb-4 flex flex-col gap-3">
          <ProduktivitasKpiStrip />

          <ProduktivitasIntelligence />

          <div className="grid auto-rows-[300px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,430fr)_minmax(0,430fr)_minmax(0,440fr)]">
            <ProduktivitasTrend />
            <ProduktivitasUnitKerja />
            <ProduktivitasJenisUsaha />
          </div>

          <div className="grid auto-rows-[300px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,375fr)_minmax(0,455fr)_minmax(0,470fr)]">
            <ProduktivitasBiaya />
            <BreakdownProduktivitas />
            <DriversProduktivitas />
          </div>

          <div className="grid auto-rows-[176px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,720fr)_minmax(0,580fr)]">
            <InsightProduktivitas />
            <BenchmarkingEksternal />
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-[#dcf1e6] bg-[#f2faf5] px-4 py-2.5">
            <Sparkles size={14} className="shrink-0 text-ptpn-green" />
            <p className="text-[10px] font-medium text-ink-700">
              People Productivity adalah ukuran kemampuan karyawan dalam menciptakan nilai (value)
              bagi perusahaan secara efisien dan berkelanjutan.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
