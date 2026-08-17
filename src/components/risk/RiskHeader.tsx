"use client";

import { ShieldCheck } from "lucide-react";
import { ModuleHeader, SelectBox } from "@/components/ui/ModuleHeader";

export function RiskHeader() {
  return (
    <ModuleHeader
      icon={<ShieldCheck size={19} strokeWidth={1.9} />}
      title={<>Risiko &amp; Kepatuhan</>}
      subtitle={<>Enterprise Risk &amp; Compliance Operating System</>}
      controls={
        <>
          <SelectBox label="Periode" value="Mei 2026 (YTD)" width="160px" />
          <SelectBox label="Subholding" value="PTPN Group (Holding)" width="190px" />
          <SelectBox label="Kategori Risiko" value="Semua Kategori" width="165px" />
        </>
      }
      dataAsOf="Data per 31 Mei 2026 (YTD)"
    />
  );
}
