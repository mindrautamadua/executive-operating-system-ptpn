"use client";

import { Scale } from "lucide-react";
import { ModuleHeader, SelectBox } from "@/components/ui/ModuleHeader";

export function HkmHeader() {
  return (
    <ModuleHeader
      icon={<Scale size={19} strokeWidth={1.9} />}
      title="Hukum"
      subtitle={<>Operating System Kontrak, Perizinan &amp; Korporasi PTPN Group</>}
      controls={
        <>
          <SelectBox label="Periode" value="Mei 2026 (YTD)" width="170px" />
          <SelectBox label="Subholding" value="Semua Subholding" width="180px" />
          <SelectBox label="Jenis Dokumen" value="Semua Jenis" width="160px" />
        </>
      }
      dataAsOf="Data per 31 Mei 2026 (YTD)"
    />
  );
}
