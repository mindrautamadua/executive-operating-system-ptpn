"use client";

import { MonitorCog } from "lucide-react";
import { ModuleHeader, SelectBox } from "@/components/ui/ModuleHeader";

/** Header dimensi Teknologi Informasi (halaman Executive Overview). */
export function TikHeader() {
  return (
    <ModuleHeader
      icon={<MonitorCog size={19} strokeWidth={1.9} />}
      title="Teknologi Informasi"
      subtitle={<>Operating System Digital, Data &amp; Keamanan Siber PTPN Group</>}
      controls={
        <>
          <SelectBox label="Periode" value="Mei 2026 (YTD)" width="170px" />
          <SelectBox label="Subholding" value="PTPN Group (Konsolidasi)" width="200px" />
          <SelectBox label="Domain" value="Seluruh Domain TI" width="180px" />
        </>
      }
      dataAsOf="Data per 31 Mei 2026 (YTD)"
    />
  );
}
