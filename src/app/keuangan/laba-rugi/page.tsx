import { KeuSidebar } from "@/components/keu/KeuSidebar";
import { DataTrustStrip } from "@/components/hc/DataTrustStrip";
import { KplHeader } from "@/components/keu/laba-rugi/KplHeader";
import { KplKpiStrip } from "@/components/keu/laba-rugi/KplKpiStrip";
import { PnlWaterfall } from "@/components/keu/laba-rugi/PnlWaterfall";
import { EbitdaBridge } from "@/components/keu/laba-rugi/EbitdaBridge";
import { MarginTrend } from "@/components/keu/laba-rugi/MarginTrend";
import { PnlBySegment } from "@/components/keu/laba-rugi/PnlBySegment";
import { RevenueByCommodity } from "@/components/keu/laba-rugi/RevenueByCommodity";
import { KplInsight } from "@/components/keu/laba-rugi/KplInsight";
import { keuDataTrust } from "@/lib/keu-core";

export const metadata = { title: "Laba Rugi & EBITDA — PTPN Group" };

export default function LabaRugiPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <KeuSidebar active="Laba Rugi & EBITDA" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <KplHeader />

        <div className="flex flex-col gap-3 px-5 pb-5">
          <div className="-mb-3">
            <DataTrustStrip data={keuDataTrust} />
          </div>

          <KplKpiStrip />

          <div className="grid auto-rows-[250px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,55fr)_minmax(0,45fr)]">
            <PnlWaterfall />
            <EbitdaBridge />
          </div>

          <div className="grid auto-rows-[240px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,36fr)_minmax(0,36fr)_minmax(0,28fr)]">
            <MarginTrend />
            <PnlBySegment />
            <RevenueByCommodity />
          </div>

          <KplInsight />
        </div>
      </main>
    </div>
  );
}
