"use client";

import { Search, Sparkles } from "lucide-react";
import { ModuleHeader, SelectBox } from "@/components/ui/ModuleHeader";

export function AiHrHeader() {
  return (
    <ModuleHeader
      icon={<Sparkles size={19} strokeWidth={1.9} />}
      title="AI HR Assistant"
      subtitle="Asisten cerdas Anda untuk semua kebutuhan Human Capital"
      controls={
        <>
          <SelectBox label="Mode" value="Standard" width="130px" />

          <div className="flex w-[210px] items-center gap-2 rounded-lg border border-[#e3e9ef] bg-white px-3 py-2 shadow-card">
            <Search size={13} className="shrink-0 text-ink-400" />
            <span className="min-w-0 flex-1 truncate text-[10px] text-ink-500">
              Cari informasi HR...
            </span>
            <span className="shrink-0 rounded border border-[#e3e9ef] bg-[#f8fafc] px-1 py-[1px] text-[9px] font-semibold text-ink-500">
              ⌘K
            </span>
          </div>
        </>
      }
      showSecondary={false}
    />
  );
}
