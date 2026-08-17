"use client";

import { ShoppingBag } from "lucide-react";
import { ModuleHeader, SelectBox } from "@/components/ui/ModuleHeader";

export function MktHeader() {
  return (
    <ModuleHeader
      icon={<ShoppingBag size={19} strokeWidth={1.9} />}
      title="Pemasaran & Penjualan"
      subtitle={<>Commercial Operating System Komoditas PTPN Group</>}
      controls={
        <>
          <SelectBox label="Periode" value="Mei 2026 (YTD)" width="170px" />
          <SelectBox label="Komoditas" value="Semua Komoditas" width="180px" />
          <SelectBox label="Pasar" value="Ekspor + Domestik" width="170px" />
        </>
      }
      dataAsOf="Data per 31 Mei 2026 (YTD)"
    />
  );
}
