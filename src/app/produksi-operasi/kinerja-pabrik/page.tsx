import { ProdSidebar } from "@/components/prod/ProdSidebar";
import { DataTrustStrip } from "@/components/hc/DataTrustStrip";
import { PabHeader } from "@/components/prod/kinerja-pabrik/PabHeader";
import { PabKpiStrip } from "@/components/prod/kinerja-pabrik/PabKpiStrip";
import { UtilisasiByJenis } from "@/components/prod/kinerja-pabrik/UtilisasiByJenis";
import { DowntimePareto } from "@/components/prod/kinerja-pabrik/DowntimePareto";
import { LossesBreakdown } from "@/components/prod/kinerja-pabrik/LossesBreakdown";
import { PabrikLeagueTable } from "@/components/prod/kinerja-pabrik/PabrikLeagueTable";
import { PgReadiness } from "@/components/prod/kinerja-pabrik/PgReadiness";
import { PgLeagueTable } from "@/components/prod/kinerja-pabrik/PgLeagueTable";
import { PgDowntimePareto } from "@/components/prod/kinerja-pabrik/PgDowntimePareto";
import { GulaLossesBreakdown } from "@/components/prod/kinerja-pabrik/GulaLossesBreakdown";
import { CapexRevitalisasi } from "@/components/prod/kinerja-pabrik/CapexRevitalisasi";
import { PabInsight } from "@/components/prod/kinerja-pabrik/PabInsight";
import { prodDataTrust } from "@/lib/produksi-data";

export const metadata = { title: "Kinerja Pabrik & Utilisasi — PTPN Group" };

export default function KinerjaPabrikPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <ProdSidebar active="Kinerja Pabrik" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <PabHeader />

        <div className="flex flex-col gap-3 px-5 pb-5">
          <div className="-mb-3">
            <DataTrustStrip data={prodDataTrust} />
          </div>

          <PabKpiStrip />

          <div className="grid auto-rows-[minmax(235px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,36fr)_minmax(0,36fr)_minmax(0,28fr)]">
            <UtilisasiByJenis />
            <DowntimePareto />
            <LossesBreakdown />
          </div>

          <div className="grid auto-rows-[minmax(250px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,36fr)_minmax(0,35fr)_minmax(0,29fr)]">
            <PabrikLeagueTable />
            <PgReadiness />
            <CapexRevitalisasi />
          </div>

          {/* baris gula: kinerja giling 17 PG */}
          <div className="grid auto-rows-[minmax(235px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,36fr)_minmax(0,36fr)_minmax(0,28fr)]">
            <PgLeagueTable />
            <PgDowntimePareto />
            <GulaLossesBreakdown />
          </div>

          <PabInsight />
        </div>
      </main>
    </div>
  );
}
