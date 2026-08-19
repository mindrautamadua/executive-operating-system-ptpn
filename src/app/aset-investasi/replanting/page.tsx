import { AsetSidebar } from "@/components/aset/AsetSidebar";
import { ScopeGuard } from "@/components/ui/ScopeGuard";
import { DataTrustStrip } from "@/components/hc/DataTrustStrip";
import { ArpHeader } from "@/components/aset/replanting/ArpHeader";
import { ArpKpiStrip } from "@/components/aset/replanting/ArpKpiStrip";
import { ReplantingProgress } from "@/components/aset/replanting/ReplantingProgress";
import { ReplantingSCurve } from "@/components/aset/replanting/ReplantingSCurve";
import { AgeProfileProjection } from "@/components/aset/replanting/AgeProfileProjection";
import { MaintenanceBacklog } from "@/components/aset/replanting/MaintenanceBacklog";
import { ReplantingFunding } from "@/components/aset/replanting/ReplantingFunding";
import { ArpInsight } from "@/components/aset/replanting/ArpInsight";
import { astDataTrust } from "@/lib/ast-core";

export const metadata = { title: "Replanting & Pemeliharaan — PTPN Group" };

export default function ReplantingPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <AsetSidebar active="Replanting & Pemeliharaan" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <ArpHeader />

        <ScopeGuard owner="palmco">

        <div className="flex flex-col gap-3 px-5 pb-5">
          <div className="-mb-3">
            <DataTrustStrip data={astDataTrust} />
          </div>

          <ArpKpiStrip />

          <div className="grid auto-rows-[minmax(250px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,55fr)_minmax(0,45fr)]">
            <ReplantingProgress />
            <ReplantingSCurve />
          </div>

          <div className="grid auto-rows-[minmax(240px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,56fr)_minmax(0,44fr)]">
            <AgeProfileProjection />
            <MaintenanceBacklog />
          </div>

          <div className="grid auto-rows-[minmax(215px,auto)] grid-cols-1 gap-3">
            <ReplantingFunding />
          </div>

          <ArpInsight />
        </div>
        </ScopeGuard>
      </main>
    </div>
  );
}
