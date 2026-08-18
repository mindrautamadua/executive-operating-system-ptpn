import { TikSidebar } from "@/components/tik/TikSidebar";
import { DataTrustStrip } from "@/components/hc/DataTrustStrip";
import { PortofolioHeader } from "@/components/tik/portofolio-aplikasi/PortofolioHeader";
import { PortofolioKpiStrip } from "@/components/tik/portofolio-aplikasi/PortofolioKpiStrip";
import { ApplicationPortfolio } from "@/components/tik/portofolio-aplikasi/ApplicationPortfolio";
import { AppLifecycleQuadrant } from "@/components/tik/portofolio-aplikasi/AppLifecycleQuadrant";
import { ConnectivityByRegion } from "@/components/tik/portofolio-aplikasi/ConnectivityByRegion";
import { UptimeByService } from "@/components/tik/portofolio-aplikasi/UptimeByService";
import { InfrastructureFootprint } from "@/components/tik/portofolio-aplikasi/InfrastructureFootprint";
import { ServiceDesk } from "@/components/tik/portofolio-aplikasi/ServiceDesk";
import { TechnicalDebt } from "@/components/tik/portofolio-aplikasi/TechnicalDebt";
import { PortofolioInsight } from "@/components/tik/portofolio-aplikasi/PortofolioInsight";
import { tikDataTrust } from "@/lib/tik-data";

export const metadata = { title: "Portofolio Aplikasi & Infrastruktur — PTPN Group" };

export default function PortofolioAplikasiPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <TikSidebar active="Portofolio Aplikasi & Infrastruktur" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <PortofolioHeader />

        <div className="flex flex-col gap-3 px-5 pb-5">
          <div className="-mb-3">
            <DataTrustStrip data={tikDataTrust} />
          </div>

          <PortofolioKpiStrip />

          <div className="grid auto-rows-[250px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,58fr)_minmax(0,42fr)]">
            <ApplicationPortfolio />
            <AppLifecycleQuadrant />
          </div>

          <div className="grid auto-rows-[240px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,48fr)_minmax(0,52fr)]">
            <ConnectivityByRegion />
            <UptimeByService />
          </div>

          <div className="grid auto-rows-[250px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,38fr)_minmax(0,30fr)_minmax(0,32fr)]">
            <InfrastructureFootprint />
            <ServiceDesk />
            <TechnicalDebt />
          </div>

          <PortofolioInsight />
        </div>
      </main>
    </div>
  );
}
