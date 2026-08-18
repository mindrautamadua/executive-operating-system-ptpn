"use client";

import { BookText, Search } from "lucide-react";
import { ModuleHeader } from "@/components/ui/ModuleHeader";

export function DdHeader() {
  return (
    <ModuleHeader
      icon={<BookText size={19} strokeWidth={1.9} />}
      title="Data Dictionary"
      subtitle="Satu definisi, satu formula, satu pemilik, satu sumber resmi untuk setiap angka di dashboard"
      controls={
        <div className="flex w-[240px] items-center gap-2 rounded-lg border border-[#e3e9ef] bg-white px-3 py-2 shadow-card">
          <Search size={13} className="shrink-0 text-ink-400" />
          <span className="text-[10px] text-ink-500">Cari istilah atau metrik…</span>
        </div>
      }
      dataAsOf="Versi katalog: review triwulanan, pembaruan terakhir 31 Mei 2026"
    />
  );
}
