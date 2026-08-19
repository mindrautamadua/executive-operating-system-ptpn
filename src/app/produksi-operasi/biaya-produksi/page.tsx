import { ProdSidebar } from "@/components/prod/ProdSidebar";
import { ScopeGuard } from "@/components/ui/ScopeGuard";
import { DataTrustStrip } from "@/components/hc/DataTrustStrip";
import { BppHeader } from "@/components/prod/biaya-produksi/BppHeader";
import { BppKpiStrip } from "@/components/prod/biaya-produksi/BppKpiStrip";
import { HppWaterfall } from "@/components/prod/biaya-produksi/HppWaterfall";
import { HppTrend } from "@/components/prod/biaya-produksi/HppTrend";
import { HppBenchmark } from "@/components/prod/biaya-produksi/HppBenchmark";
import { CostPerRegional } from "@/components/prod/biaya-produksi/CostPerRegional";
import { EfisiensiInisiatif } from "@/components/prod/biaya-produksi/EfisiensiInisiatif";
import { BppInsight } from "@/components/prod/biaya-produksi/BppInsight";
import { prodDataTrust } from "@/lib/produksi-data";

export const metadata = { title: "Biaya Produksi & Cost Leadership — PTPN Group" };

export default function BiayaProduksiPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <ProdSidebar active="Biaya Produksi" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <BppHeader />

        <ScopeGuard owner="palmco">

        <div className="flex flex-col gap-3 px-5 pb-5">
          <div className="-mb-3">
            <DataTrustStrip data={prodDataTrust} />
          </div>

          <BppKpiStrip />

          <div className="grid auto-rows-[minmax(250px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,42fr)_minmax(0,58fr)]">
            <HppWaterfall />
            <HppTrend />
          </div>

          <div className="grid auto-rows-[minmax(240px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,27fr)_minmax(0,41fr)_minmax(0,32fr)]">
            <HppBenchmark />
            <CostPerRegional />
            <EfisiensiInisiatif />
          </div>

          <BppInsight />
        </div>
        </ScopeGuard>
      </main>
    </div>
  );
}
