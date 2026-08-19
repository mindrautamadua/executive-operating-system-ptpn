import { Info } from "lucide-react";
import { SdmSidebar } from "@/components/sdm/SdmSidebar";
import { DdHeader } from "@/components/dd/DdHeader";
import { DdStats } from "@/components/dd/DdStats";
import { DdTable } from "@/components/dd/DdTable";
import { DdCategories } from "@/components/dd/DdCategories";
import { ddFootnote } from "@/lib/dd-data";

export const metadata = { title: "Data Dictionary — PTPN Group" };

export default function DataDictionaryPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <SdmSidebar active="Data Dictionary" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <DdHeader />

        <div className="flex flex-col gap-3 px-5 pb-5">
          <DdStats />

          <div className="grid auto-rows-[minmax(600px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,68fr)_minmax(0,32fr)]">
            <DdTable />
            <DdCategories />
          </div>

          <div className="anim-rise flex items-center gap-2 rounded-xl border border-[#d8e6f7] bg-[#eef5fd] px-3.5 py-2.5">
            <Info size={13} className="shrink-0 text-[#2f6fe4]" />
            <span className="text-[9px] text-ink-700">{ddFootnote}</span>
          </div>
        </div>
      </main>
    </div>
  );
}
