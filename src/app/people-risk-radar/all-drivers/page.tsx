import { SdmSidebar } from "@/components/sdm/SdmSidebar";
import { AllDriversHeader } from "@/components/prr/drivers/AllDriversHeader";
import { DriversKpiStrip } from "@/components/prr/drivers/DriversKpiStrip";
import { DriverPareto } from "@/components/prr/drivers/DriverPareto";
import { DriverFamilyDonut } from "@/components/prr/drivers/DriverFamilyDonut";
import { DriverFamilyTrend } from "@/components/prr/drivers/DriverFamilyTrend";
import { DriverControlMatrix } from "@/components/prr/drivers/DriverControlMatrix";
import { DriversExplorer } from "@/components/prr/drivers/DriversExplorer";

export const metadata = { title: "All Risk Drivers — People Risk Radar — PTPN Group" };

export default function AllDriversPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <SdmSidebar active="People Risk Radar" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <AllDriversHeader />

        <div className="flex flex-col gap-3 px-5 pb-5 pt-3">
          <DriversKpiStrip />

          <div className="grid auto-rows-[minmax(280px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,34fr)_minmax(0,26fr)_minmax(0,30fr)_minmax(0,28fr)]">
            <DriverPareto />
            <DriverFamilyDonut />
            <DriverFamilyTrend />
            <DriverControlMatrix />
          </div>

          <DriversExplorer />
        </div>
      </main>
    </div>
  );
}
