import { DekSidebar } from "@/components/dek/DekSidebar";
import { DataTrustStrip } from "@/components/hc/DataTrustStrip";
import { RekomendasiHeader } from "@/components/dek/rekomendasi/RekomendasiHeader";
import { RekomendasiKpiStrip } from "@/components/dek/rekomendasi/RekomendasiKpiStrip";
import { RecommendationRegister } from "@/components/dek/rekomendasi/RecommendationRegister";
import { ByDirektorat } from "@/components/dek/rekomendasi/ByDirektorat";
import { ByTheme } from "@/components/dek/rekomendasi/ByTheme";
import { OverdueDetail } from "@/components/dek/rekomendasi/OverdueDetail";
import { AgingBuckets } from "@/components/dek/rekomendasi/AgingBuckets";
import { ClosureTrend } from "@/components/dek/rekomendasi/ClosureTrend";
import { RekomendasiInsight } from "@/components/dek/rekomendasi/RekomendasiInsight";
import { dekDataTrust } from "@/lib/dek-data";

export const metadata = { title: "Rekomendasi & Tindak Lanjut — PTPN Group" };

export default function RekomendasiPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <DekSidebar active="Rekomendasi & Tindak Lanjut" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <RekomendasiHeader />

        <div className="flex flex-col gap-3 px-5 pb-5">
          <div className="-mb-3">
            <DataTrustStrip data={dekDataTrust} />
          </div>

          <RekomendasiKpiStrip />

          <div className="grid auto-rows-[250px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,60fr)_minmax(0,40fr)]">
            <RecommendationRegister />
            <ByDirektorat />
          </div>

          <div className="grid auto-rows-[250px] grid-cols-1 gap-3">
            <OverdueDetail />
          </div>

          <div className="grid auto-rows-[240px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,30fr)_minmax(0,30fr)_minmax(0,40fr)]">
            <ByTheme />
            <AgingBuckets />
            <ClosureTrend />
          </div>

          <RekomendasiInsight />
        </div>
      </main>
    </div>
  );
}
