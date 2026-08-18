import { SdmSidebar } from "@/components/sdm/SdmSidebar";
import { DirektoriHeader } from "@/components/direktori/DirektoriHeader";
import { DirektoriStats } from "@/components/direktori/DirektoriStats";
import { DirektoriSearch } from "@/components/direktori/DirektoriSearch";

export const metadata = { title: "Direktori Karyawan — SDM & Talenta — PTPN Group" };

export default function DirektoriKaryawanPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <SdmSidebar active="Direktori Karyawan" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <DirektoriHeader />

        <div className="flex flex-col gap-3 px-5 pb-5 pt-3">
          <DirektoriStats />
          <DirektoriSearch />
        </div>
      </main>
    </div>
  );
}
