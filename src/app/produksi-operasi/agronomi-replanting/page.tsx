import { ProdSidebar } from "@/components/prod/ProdSidebar";
import { ScopeGuard } from "@/components/ui/ScopeGuard";
import { DataTrustStrip } from "@/components/hc/DataTrustStrip";
import { AgroHeader } from "@/components/prod/agronomi-replanting/AgroHeader";
import { AgroKpiStrip } from "@/components/prod/agronomi-replanting/AgroKpiStrip";
import { AgeProfileChart } from "@/components/prod/agronomi-replanting/AgeProfileChart";
import { ReplantingRoadmap } from "@/components/prod/agronomi-replanting/ReplantingRoadmap";
import { PemupukanCard } from "@/components/prod/agronomi-replanting/PemupukanCard";
import { CurahHujanElNino } from "@/components/prod/agronomi-replanting/CurahHujanElNino";
import { DampakIklimSimulasi } from "@/components/prod/agronomi-replanting/DampakIklimSimulasi";
import { AgroInsight } from "@/components/prod/agronomi-replanting/AgroInsight";
import { prodDataTrust } from "@/lib/produksi-data";

export const metadata = { title: "Agronomi & Replanting — PTPN Group" };

export default function AgronomiReplantingPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <ProdSidebar active="Agronomi & Replanting" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <AgroHeader />

        <ScopeGuard owner="palmco">

        <div className="flex flex-col gap-3 px-5 pb-5">
          <div className="-mb-3">
            <DataTrustStrip data={prodDataTrust} />
          </div>

          <AgroKpiStrip />

          {/* Profil umur + roadmap replanting: tuas yield terbesar */}
          <div className="grid auto-rows-[minmax(250px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,56fr)_minmax(0,44fr)]">
            <AgeProfileChart />
            <ReplantingRoadmap />
          </div>

          {/* Input agronomi & iklim */}
          <div className="grid auto-rows-[minmax(240px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,38fr)_minmax(0,62fr)]">
            <PemupukanCard />
            <CurahHujanElNino />
          </div>

          <div className="grid auto-rows-[minmax(215px,auto)] grid-cols-1 gap-3">
            <DampakIklimSimulasi />
          </div>

          <AgroInsight />
        </div>
        </ScopeGuard>
      </main>
    </div>
  );
}
