"use client";

import { CircleDollarSign } from "lucide-react";
import { ModuleHeader, SelectBox } from "@/components/ui/ModuleHeader";

export function KeuHeader() {
  return (
    <ModuleHeader
      icon={<CircleDollarSign size={19} strokeWidth={1.9} />}
      title="Keuangan"
      subtitle={<>Finance Executive Operating System PTPN Group</>}
      controls={
        <>
          <SelectBox label="Periode" value="Mei 2026 (YTD)" width="170px" />
          <SelectBox label="Subholding" value="Semua Subholding" width="180px" />
          <SelectBox label="Mata Uang" value="IDR (Rp)" width="120px" />
        </>
      }
      dataAsOf="Data per 31 Mei 2026 (YTD)"
    />
  );
}
