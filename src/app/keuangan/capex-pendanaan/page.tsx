import { KeuSidebar } from "@/components/keu/KeuSidebar";
import { DataTrustStrip } from "@/components/hc/DataTrustStrip";
import { KcxHeader } from "@/components/keu/capex-pendanaan/KcxHeader";
import { KcxKpiStrip } from "@/components/keu/capex-pendanaan/KcxKpiStrip";
import { CapexByCategory } from "@/components/keu/capex-pendanaan/CapexByCategory";
import { CapexBySubholding } from "@/components/keu/capex-pendanaan/CapexBySubholding";
import { FundingMix } from "@/components/keu/capex-pendanaan/FundingMix";
import { CapexSCurve } from "@/components/keu/capex-pendanaan/CapexSCurve";
import { TopCapexVariance } from "@/components/keu/capex-pendanaan/TopCapexVariance";
import { KcxInsight } from "@/components/keu/capex-pendanaan/KcxInsight";
import { keuDataTrust } from "@/lib/keu-core";

export const metadata = { title: "Capex & Pendanaan — PTPN Group" };

export default function CapexPendanaanPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <KeuSidebar active="Capex & Pendanaan" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <KcxHeader />

        <div className="flex flex-col gap-3 px-5 pb-5">
          <div className="-mb-3">
            <DataTrustStrip data={keuDataTrust} />
          </div>

          <KcxKpiStrip />

          {/* Komposisi capex: kategori, subholding, sumber pendanaan */}
          <div className="grid auto-rows-[240px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,38fr)_minmax(0,31fr)_minmax(0,31fr)]">
            <CapexByCategory />
            <CapexBySubholding />
            <FundingMix />
          </div>

          {/* Eksekusi: kurva realisasi & proyek deviasi terbesar */}
          <div className="grid auto-rows-[250px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,52fr)_minmax(0,48fr)]">
            <CapexSCurve />
            <TopCapexVariance />
          </div>

          <KcxInsight />
        </div>
      </main>
    </div>
  );
}
