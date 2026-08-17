"use client";

import { PackageSearch } from "lucide-react";
import { ModuleHeader, SelectBox } from "@/components/ui/ModuleHeader";

/** Header dimensi Pengadaan — halaman Executive Overview (/pengadaan). */
export function PgdHeader() {
  return (
    <ModuleHeader
      icon={<PackageSearch size={19} strokeWidth={1.9} />}
      title="Pengadaan"
      subtitle={<>Operating System Belanja, Vendor &amp; Integritas Pengadaan</>}
      controls={
        <>
          <SelectBox label="Periode" value="Mei 2026 (YTD)" width="170px" />
          <SelectBox label="Subholding" value="PTPN Group (Holding)" width="190px" />
          <SelectBox label="Kategori" value="Seluruh Kategori" width="170px" />
        </>
      }
      dataAsOf="Data per 31 Mei 2026 (YTD)"
    />
  );
}
