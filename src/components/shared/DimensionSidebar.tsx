"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, LayoutGrid, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { PtpnLogo } from "../PtpnLogo";
import { useSubholding } from "@/components/SubholdingProvider";
import { useSidebarCollapsed } from "@/components/shared/useSidebarCollapsed";
import type {
  DimensionDataTrust,
  DimensionMenuItem,
  DimensionMenuSection,
} from "@/lib/dimension-menu";

interface Props {
  sections: DimensionMenuSection[];
  dataTrust: DimensionDataTrust;
  /** Override label menu aktif. Default: dicocokkan dari URL. */
  active?: string;
  /** Tag kecil nama dimensi di bawah brand, mis. "Keuangan". */
  dimensionLabel?: string;
}

function MenuRow({
  item,
  on,
  outOfScope,
  collapsed,
}: {
  item: DimensionMenuItem;
  on: boolean;
  /** Halaman milik subholding lain dari cakupan filter aktif. */
  outOfScope?: boolean;
  collapsed: boolean;
}) {
  const { label, icon: Icon, href, badge } = item;
  const base = `mb-[2px] flex w-full items-center rounded-lg py-[7px] text-left text-[10.5px] transition-colors ${
    collapsed ? "justify-center px-0" : "gap-2.5 px-2.5"
  }`;
  const inner = (
    <>
      <Icon size={14} strokeWidth={1.8} className="shrink-0" />
      {!collapsed && (
        <>
          <span className="min-w-0 flex-1 truncate leading-[1.2]">{label}</span>
          {badge && (
            <span className="shrink-0 rounded bg-ptpn-greenLight px-1 py-[1px] text-[8px] font-bold text-ptpn-green">
              {badge}
            </span>
          )}
        </>
      )}
    </>
  );

  if (!href) {
    return (
      <button
        type="button"
        className={`${base} cursor-default font-medium text-ink-500 opacity-50`}
        title={collapsed ? `${label} — Segera hadir` : "Segera hadir"}
        aria-disabled
      >
        {inner}
      </button>
    );
  }

  return (
    <Link
      href={href}
      title={
        collapsed
          ? label
          : outOfScope
            ? "Data halaman ini di luar cakupan subholding aktif"
            : undefined
      }
      className={`${base} ${outOfScope ? "opacity-40" : ""} ${
        on
          ? "bg-ptpn-greenLight font-semibold text-ptpn-green"
          : "font-medium text-ink-500 hover:bg-[#f5f8fa]"
      }`}
    >
      {inner}
    </Link>
  );
}

/**
 * Sidebar dimensi non-SDM — clone visual SdmSidebar dengan menu dan
 * data-trust yang diparameterkan. Halaman SDM tetap memakai SdmSidebar.
 */
export function DimensionSidebar({ sections, dataTrust, active, dimensionLabel }: Props) {
  const pathname = usePathname();
  const { active: scope } = useSubholding();
  const { collapsed, toggle } = useSidebarCollapsed();

  return (
    <aside
      className={`flex h-full shrink-0 flex-col border-r border-[#e9eef3] bg-white transition-[width] duration-200 ${
        collapsed ? "w-[56px]" : "w-[200px]"
      }`}
    >
      <div
        className={`border-b border-[#f0f3f6] pb-3 pt-3.5 ${collapsed ? "px-0 text-center" : "px-4"}`}
      >
        <Link
          href="/"
          className={`flex items-center gap-2 ${collapsed ? "justify-center" : ""}`}
          title="Kembali ke Dashboard Utama"
        >
          <PtpnLogo size={22} />
          {!collapsed && (
            <div className="leading-none">
              <div className="text-[14px] font-extrabold tracking-tight text-[#1b3a6b]">
                PTPN <span className="text-ptpn-green">GROUP</span>
              </div>
              <div className="mt-[3px] whitespace-nowrap text-[7.5px] font-semibold text-ptpn-green">
                Executive Operating System
              </div>
            </div>
          )}
        </Link>
        {!collapsed && dimensionLabel && (
          <div className="mt-2 inline-flex rounded bg-[#eef2f6] px-1.5 py-[2px] text-[8px] font-bold uppercase tracking-[0.06em] text-ink-500">
            {dimensionLabel}
          </div>
        )}
      </div>

      <div className="border-b border-[#f0f3f6] px-2.5 py-2">
        <Link
          href="/"
          title={collapsed ? "Dashboard Utama" : undefined}
          className={`flex w-full items-center rounded-lg bg-[#f5f8fa] py-[7px] text-[10.5px] font-semibold text-ink-700 transition-colors hover:bg-ptpn-greenLight hover:text-ptpn-green ${
            collapsed ? "justify-center px-0" : "gap-2 px-2.5"
          }`}
        >
          {!collapsed && <ChevronLeft size={13} strokeWidth={2} className="shrink-0" />}
          <LayoutGrid size={13} strokeWidth={1.8} className="shrink-0" />
          {!collapsed && (
            <span className="min-w-0 flex-1 truncate leading-[1.2]">Dashboard Utama</span>
          )}
        </Link>
      </div>

      <nav className="scroll-thin min-h-0 flex-1 overflow-y-auto px-2.5 pb-2 pt-2">
        {sections.map((section, si) => (
          <div key={section.title ?? si}>
            {section.title &&
              (collapsed ? (
                <div className="mx-1.5 my-2 border-t border-[#f0f3f6]" />
              ) : (
                <div className="mb-1 mt-3 px-2.5 text-[8.5px] font-bold uppercase tracking-[0.09em] text-ink-400">
                  {section.title}
                </div>
              ))}
            {section.items.map((item) => (
              <MenuRow
                key={item.label}
                item={item}
                collapsed={collapsed}
                on={item.label === active || (!!item.href && item.href === pathname)}
                outOfScope={scope !== "all" && !!item.owner && item.owner !== scope}
              />
            ))}
          </div>
        ))}
      </nav>

      <div className="shrink-0 border-t border-[#f0f3f6] px-2.5 py-1.5">
        <button
          type="button"
          onClick={toggle}
          title={collapsed ? "Perlebar menu" : "Ciutkan menu"}
          className={`flex w-full items-center rounded-lg py-[7px] text-[10px] font-semibold text-ink-500 transition-colors hover:bg-[#f5f8fa] hover:text-ink-700 ${
            collapsed ? "justify-center px-0" : "gap-2 px-2.5"
          }`}
        >
          {collapsed ? (
            <PanelLeftOpen size={14} strokeWidth={1.8} className="shrink-0" />
          ) : (
            <>
              <PanelLeftClose size={14} strokeWidth={1.8} className="shrink-0" />
              <span className="min-w-0 flex-1 truncate text-left">Ciutkan Menu</span>
            </>
          )}
        </button>
      </div>

      {!collapsed && (
        <div className="shrink-0 border-t border-[#f0f3f6] px-3.5 pb-3 pt-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[8.5px] font-semibold text-ink-400">Data as-of</span>
            <span className="text-[9px] font-semibold text-ink-700">{dataTrust.asOf}</span>
          </div>
          <div className="mt-1.5 flex items-center justify-between">
            <span className="text-[8.5px] font-semibold text-ink-400">Last Refresh</span>
            <span className="flex items-center gap-1.5">
              <span className="h-[6px] w-[6px] rounded-full bg-ptpn-green" />
              <span className="text-[9px] font-semibold text-ink-700">{dataTrust.lastRefresh}</span>
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-[9px] text-ink-500">Data Trust Index</span>
            <span className="rounded-md bg-ptpn-green px-1.5 py-[2px] text-[9px] font-bold text-white">
              {dataTrust.quality}
            </span>
          </div>
        </div>
      )}
    </aside>
  );
}
