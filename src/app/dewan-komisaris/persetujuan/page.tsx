import { DekSidebar } from "@/components/dek/DekSidebar";
import { DataTrustStrip } from "@/components/hc/DataTrustStrip";
import { PersetujuanHeader } from "@/components/dek/persetujuan/PersetujuanHeader";
import { PersetujuanKpiStrip } from "@/components/dek/persetujuan/PersetujuanKpiStrip";
import { ApprovalRegister } from "@/components/dek/persetujuan/ApprovalRegister";
import { PendingDetail } from "@/components/dek/persetujuan/PendingDetail";
import { AuthorityMatrix } from "@/components/dek/persetujuan/AuthorityMatrix";
import { ResponseTimeTrend } from "@/components/dek/persetujuan/ResponseTimeTrend";
import { ApprovalByCategory } from "@/components/dek/persetujuan/ApprovalByCategory";
import { PersetujuanInsight } from "@/components/dek/persetujuan/PersetujuanInsight";
import { dekDataTrust } from "@/lib/dek-data";

export const metadata = { title: "Persetujuan & Kewenangan — PTPN Group" };

export default function PersetujuanPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <DekSidebar active="Persetujuan & Kewenangan" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <PersetujuanHeader />

        <div className="flex flex-col gap-3 px-5 pb-5">
          <div className="-mb-3">
            <DataTrustStrip data={dekDataTrust} />
          </div>

          <PersetujuanKpiStrip />

          <div className="grid auto-rows-[300px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,58fr)_minmax(0,42fr)]">
            <ApprovalRegister />
            <PendingDetail />
          </div>

          <div className="grid auto-rows-[260px] grid-cols-1 gap-3">
            <AuthorityMatrix />
          </div>

          <div className="grid auto-rows-[240px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,58fr)_minmax(0,42fr)]">
            <ResponseTimeTrend />
            <ApprovalByCategory />
          </div>

          <PersetujuanInsight />
        </div>
      </main>
    </div>
  );
}
