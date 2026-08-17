"use client";

import { Factory } from "lucide-react";
import { ModuleHeader, SelectBox } from "@/components/ui/ModuleHeader";

export function ProdHeader() {
  return (
    <ModuleHeader
      icon={<Factory size={19} strokeWidth={1.9} />}
      title="Produksi & Operasi"
      subtitle={<>Operating System Produksi, Pabrik &amp; Agronomi PTPN Group</>}
      controls={
        <>
          <SelectBox label="Periode" value="Mei 2026 (YTD)" width="170px" />
          <SelectBox label="Subholding" value="Semua Subholding" width="180px" />
          <SelectBox label="Regional" value="Semua Regional" width="170px" />
        </>
      }
      dataAsOf="Data per 31 Mei 2026 (YTD)"
    />
  );
}
