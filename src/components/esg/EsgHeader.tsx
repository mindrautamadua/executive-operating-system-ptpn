"use client";

import { Leaf } from "lucide-react";
import { ModuleHeader, SelectBox } from "@/components/ui/ModuleHeader";

export function EsgHeader() {
  return (
    <ModuleHeader
      icon={<Leaf size={19} strokeWidth={1.9} />}
      title="ESG & Sustainability"
      subtitle={<>Operating System Keberlanjutan PTPN Group</>}
      controls={
        <>
          <SelectBox label="Periode" value="Mei 2026 (YTD)" width="170px" />
          <SelectBox label="Subholding" value="Semua Subholding" width="180px" />
          <SelectBox label="Skema" value="ISPO + RSPO + ISCC" width="180px" />
        </>
      }
      dataAsOf="Data per 31 Mei 2026 (YTD)"
    />
  );
}
