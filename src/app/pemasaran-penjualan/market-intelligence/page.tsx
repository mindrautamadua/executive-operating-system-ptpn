import { MktSidebar } from "@/components/mkt/MktSidebar";
import { DataTrustStrip } from "@/components/hc/DataTrustStrip";
import { MiHeader } from "@/components/mkt/market-intelligence/MiHeader";
import { MiKpiStrip } from "@/components/mkt/market-intelligence/MiKpiStrip";
import { SignalFeed } from "@/components/mkt/market-intelligence/SignalFeed";
import { MiAiSynthesis } from "@/components/mkt/market-intelligence/MiAiSynthesis";
import { CompetitorBenchmark } from "@/components/mkt/market-intelligence/CompetitorBenchmark";
import { GlobalSupplyDemand } from "@/components/mkt/market-intelligence/GlobalSupplyDemand";
import { PolicyWatchCard } from "@/components/mkt/market-intelligence/PolicyWatchCard";
import { MiInsight } from "@/components/mkt/market-intelligence/MiInsight";
import { mktDataTrust } from "@/lib/pemasaran-data";

export const metadata = { title: "Market Intelligence — PTPN Group" };

export default function MarketIntelligencePage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <MktSidebar active="Market Intelligence" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <MiHeader />

        <div className="flex flex-col gap-3 px-5 pb-5">
          <div className="-mb-3">
            <DataTrustStrip data={mktDataTrust} />
          </div>

          <MiKpiStrip />

          <div className="grid auto-rows-[300px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,58fr)_minmax(0,42fr)]">
            <SignalFeed />
            <MiAiSynthesis />
          </div>

          <div className="grid auto-rows-[240px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,55fr)_minmax(0,45fr)]">
            <CompetitorBenchmark />
            <GlobalSupplyDemand />
          </div>

          <div className="grid auto-rows-[195px] grid-cols-1 gap-3">
            <PolicyWatchCard />
          </div>

          <MiInsight />
        </div>
      </main>
    </div>
  );
}
