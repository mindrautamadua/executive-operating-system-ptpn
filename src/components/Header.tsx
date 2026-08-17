"use client";

import { LayoutDashboard } from "lucide-react";
import { ExportButton, ModuleHeader, SelectBox } from "@/components/ui/ModuleHeader";
import { STEMPEL_DATA } from "@/lib/group-baseline";

/**
 * Header dashboard utama, memakai ModuleHeader standar (pola Tipe A) yang sama
 * dengan seluruh modul — sebelumnya halaman ini satu-satunya yang menggambar
 * header sendiri, sehingga terasa seperti aplikasi berbeda dari modulnya.
 *
 * Label "Entitas" otomatis digantikan SubholdingFilter oleh SelectBox, jadi
 * filter subholding di sini berfungsi dan berlaku lintas dimensi.
 */
export function Header() {
  return (
    <ModuleHeader
      icon={<LayoutDashboard size={19} strokeWidth={1.9} />}
      title="Executive Operating System"
      subtitle="PTPN Group · Corporate Performance Intelligence"
      controls={
        <>
          <SelectBox label="Periode" value="Mei 2026 (YTD)" width="170px" />
          <SelectBox label="Entitas" value="PTPN Group" width="180px" />
        </>
      }
      dataAsOf={`Data per ${STEMPEL_DATA.snapshot} (YTD)`}
      actions={<ExportButton label="Export Dashboard" />}
    />
  );
}
