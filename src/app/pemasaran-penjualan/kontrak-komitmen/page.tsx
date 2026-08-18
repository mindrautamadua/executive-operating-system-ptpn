import { MktSidebar } from "@/components/mkt/MktSidebar";
import { DataTrustStrip } from "@/components/hc/DataTrustStrip";
import { KontrakHeader } from "@/components/mkt/kontrak-komitmen/KontrakHeader";
import { KontrakKpiStrip } from "@/components/mkt/kontrak-komitmen/KontrakKpiStrip";
import { ForwardCoverageChart } from "@/components/mkt/kontrak-komitmen/ForwardCoverageChart";
import { KontrakMaturityLadder } from "@/components/mkt/kontrak-komitmen/KontrakMaturityLadder";
import { TenderKpbnCard } from "@/components/mkt/kontrak-komitmen/TenderKpbnCard";
import { CounterpartyExposure } from "@/components/mkt/kontrak-komitmen/CounterpartyExposure";
import { HedgingPolicyCard } from "@/components/mkt/kontrak-komitmen/HedgingPolicyCard";
import { KontrakInsight } from "@/components/mkt/kontrak-komitmen/KontrakInsight";
import { mktDataTrust } from "@/lib/pemasaran-data";

export const metadata = { title: "Kontrak & Komitmen Penjualan — PTPN Group" };

export default function KontrakKomitmenPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <MktSidebar active="Kontrak & Komitmen" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <KontrakHeader />

        <div className="flex flex-col gap-3 px-5 pb-5">
          <div className="-mb-3">
            <DataTrustStrip data={mktDataTrust} />
          </div>

          <KontrakKpiStrip />

          <div className="grid auto-rows-[250px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,62fr)_minmax(0,38fr)]">
            <ForwardCoverageChart />
            <KontrakMaturityLadder />
          </div>

          <div className="grid auto-rows-[240px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,48fr)_minmax(0,52fr)]">
            <TenderKpbnCard />
            <CounterpartyExposure />
          </div>

          <div className="grid auto-rows-[215px] grid-cols-1 gap-3">
            <HedgingPolicyCard />
          </div>

          <KontrakInsight />
        </div>
      </main>
    </div>
  );
}
