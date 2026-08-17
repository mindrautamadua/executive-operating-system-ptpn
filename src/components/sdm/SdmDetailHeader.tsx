"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { ExportButton, ModuleHeader, SelectBox } from "@/components/ui/ModuleHeader";

/** Header standar halaman detail kartu HC Executive Operating System (SDM & Talenta). */
export function SdmDetailHeader({
  icon,
  title,
  subtitle,
  stat,
  breadcrumb,
  backHref = "/sdm-talenta",
  backLabel = "HC Operating System",
}: {
  icon: ReactNode;
  title: string;
  subtitle: string;
  /** Angka utama di secondary bar, mis. "12 alert aktif". */
  stat: string;
  /** Bagian setelah "SDM & Talenta /" pada breadcrumb. */
  breadcrumb: string;
  /** Override tautan kembali; default ke overview SDM & Talenta. */
  backHref?: string;
  backLabel?: string;
}) {
  return (
    <ModuleHeader
      icon={icon}
      title={title}
      subtitle={subtitle}
      titleExtra={
        <Link
          href={backHref}
          className="flex items-center gap-1 rounded-lg border border-[#e3e9ef] px-2 py-[3px] text-[9px] font-semibold text-ink-500 transition-colors hover:bg-[#f5f8fa]"
        >
          <ChevronLeft size={11} />
          {backLabel}
        </Link>
      }
      controls={
        <>
          <SelectBox label="Periode" value="Mei 2026 (YTD)" width="170px" />
          <SelectBox label="Level Organisasi" value="PTPN Group (Holding)" width="200px" />
        </>
      }
      secondaryLeft={
        <span className="flex items-center gap-2 text-[9.5px] text-ink-500">
          <span className="font-bold text-ink-900">{stat}</span>
          <span className="text-ink-400">·</span>
          SDM &amp; Talenta / {breadcrumb} · Sumber: HRIS konsolidasi &amp; Talent Management
          System · Data per 31 Mei 2026
        </span>
      }
      actions={<ExportButton />}
    />
  );
}
