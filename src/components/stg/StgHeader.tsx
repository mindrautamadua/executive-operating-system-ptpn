"use client";

import { LineChart } from "lucide-react";
import { ModuleHeader, SelectBox } from "@/components/ui/ModuleHeader";

export function StgHeader() {
  return (
    <ModuleHeader
      icon={<LineChart size={19} strokeWidth={1.9} />}
      title={<>Strategi &amp; Kinerja</>}
      subtitle={<>Operating System Eksekusi Strategi &amp; Kinerja Korporat</>}
      controls={
        <>
          <SelectBox label="Periode" value="Mei 2026 (YTD)" width="170px" />
          <SelectBox label="Subholding" value="PTPN Group (Konsolidasi)" width="200px" />
          <SelectBox label="Horizon" value="RJPP 2025-2029" width="160px" />
        </>
      }
      dataAsOf="Data per 31 Mei 2026 (YTD)"
    />
  );
}
