import { ProdSidebar } from "@/components/prod/ProdSidebar";
import { ScopeGuard } from "@/components/ui/ScopeGuard";
import { DataTrustStrip } from "@/components/hc/DataTrustStrip";
import { PlasmaHeader } from "@/components/prod/plasma-kemitraan/PlasmaHeader";
import { PlasmaKpiStrip } from "@/components/prod/plasma-kemitraan/PlasmaKpiStrip";
import { IntiVsPlasmaChart } from "@/components/prod/plasma-kemitraan/IntiVsPlasmaChart";
import { PlasmaYieldGap } from "@/components/prod/plasma-kemitraan/PlasmaYieldGap";
import { PsrProgress } from "@/components/prod/plasma-kemitraan/PsrProgress";
import { KemitraanRisiko } from "@/components/prod/plasma-kemitraan/KemitraanRisiko";
import { PlasmaInsight } from "@/components/prod/plasma-kemitraan/PlasmaInsight";
import { prodDataTrust } from "@/lib/produksi-data";

export const metadata = { title: "Plasma & Kemitraan — PTPN Group" };

export default function PlasmaKemitraanPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <ProdSidebar active="Plasma & Kemitraan" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <PlasmaHeader />

        <ScopeGuard owner="palmco">

        <div className="flex flex-col gap-3 px-5 pb-5">
          <div className="-mb-3">
            <DataTrustStrip data={prodDataTrust} />
          </div>

          <PlasmaKpiStrip />

          {/* Pasokan & yield gap plasma */}
          <div className="grid auto-rows-[minmax(250px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,52fr)_minmax(0,48fr)]">
            <IntiVsPlasmaChart />
            <PlasmaYieldGap />
          </div>

          {/* PSR & risiko kemitraan */}
          <div className="grid auto-rows-[minmax(235px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,36fr)_minmax(0,64fr)]">
            <PsrProgress />
            <KemitraanRisiko />
          </div>

          <PlasmaInsight />
        </div>
        </ScopeGuard>
      </main>
    </div>
  );
}
