"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { PtpnLogo } from "./PtpnLogo";
import { BOARD_NAV_SECTIONS, CEO_NAV_SECTIONS, NAV_SECTIONS } from "@/lib/nav";
import { dataTrust } from "@/lib/hc-data";
import { useSidebarCollapsed } from "@/components/shared/useSidebarCollapsed";
import {
  CEO_MODE_ENABLED,
  KOMISARIS_MODE_ENABLED,
  useNavMode,
  type NavMode,
} from "@/components/shared/useNavMode";

const MODE_OPTIONS: { id: NavMode; label: string }[] = [
  ...(CEO_MODE_ENABLED ? [{ id: "ceo" as const, label: "CEO" }] : []),
  { id: "fungsional", label: "Fungsional" },
  ...(KOMISARIS_MODE_ENABLED ? [{ id: "komisaris" as const, label: "Dekom" }] : []),
];

export function Sidebar() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const [pill, setPill] = useState<{ top: number; height: number } | null>(null);
  const { collapsed, toggle } = useSidebarCollapsed();
  const { mode, set: setMode } = useNavMode();
  const sections =
    mode === "ceo" ? CEO_NAV_SECTIONS : mode === "komisaris" ? BOARD_NAV_SECTIONS : NAV_SECTIONS;

  // Pill hijau meluncur mengikuti item aktif, diukur ulang saat rute berubah.
  useLayoutEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const measure = () => {
      const el = nav.querySelector<HTMLElement>('[data-active="true"]');
      setPill(el ? { top: el.offsetTop, height: el.offsetHeight } : null);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [pathname, collapsed, mode]);

  return (
    <aside
      className={`flex h-full shrink-0 flex-col border-r border-[#e9eef3] bg-white transition-[width] duration-200 ${
        collapsed ? "w-[56px]" : "w-[196px]"
      }`}
    >
      {/* brand */}
      <div className={`flex items-center gap-2 pb-4 pt-4 ${collapsed ? "justify-center px-0" : "px-4"}`}>
        <PtpnLogo size={22} />
        {!collapsed && (
          <div className="leading-none">
            <div className="text-[19px] font-extrabold tracking-tight text-[#1b3a6b]">
              PTPN
            </div>
            <div className="mt-[3px] text-[6.5px] font-semibold tracking-[0.02em] text-ink-500">
              Holding Perkebunan Nusantara
            </div>
          </div>
        )}
      </div>

      {/* mode navigasi: CEO (tujuh pintu keputusan) vs fungsional (per dimensi) */}
      {!collapsed && MODE_OPTIONS.length > 1 && (
        <div className="mx-3 mb-1.5 flex rounded-lg bg-[#f0f3f6] p-[3px]">
          {MODE_OPTIONS.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setMode(m.id)}
              className={`flex-1 rounded-md py-[5px] text-[9px] font-bold transition-colors ${
                mode === m.id
                  ? "bg-white text-ptpn-green shadow-card"
                  : "text-ink-500 hover:text-ink-700"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      )}

      {/* nav */}
      <nav ref={navRef} className="scroll-thin relative flex-1 overflow-y-auto px-3 pb-2">
        {pill && (
          <span
            aria-hidden
            className="absolute left-3 right-3 top-0 rounded-lg bg-ptpn-greenLight transition-[transform,height] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
            style={{ transform: `translateY(${pill.top}px)`, height: pill.height }}
          />
        )}
        {sections.map((section, si) => (
          <div key={section.title ?? si}>
            {section.title &&
              (collapsed ? (
                <div className="mx-1 my-2 border-t border-[#f0f3f6]" />
              ) : (
                <div className="mb-1 mt-2.5 px-3 text-[8.5px] font-bold uppercase tracking-[0.09em] text-ink-400">
                  {section.title}
                </div>
              ))}
            {section.items.map(({ label, href, icon: Icon, ready }) => {
              const on = pathname === href;
              const cls = `relative mb-[3px] flex w-full items-center rounded-lg py-[9px] text-left text-[11.5px] transition-[background-color,color,transform] duration-150 active:scale-[0.98] motion-reduce:transition-none motion-reduce:active:scale-100 ${
                collapsed ? "justify-center px-0" : "gap-2.5 px-3"
              } ${
                on
                  ? "font-semibold text-ptpn-green"
                  : "font-medium text-ink-500 hover:bg-[#f5f8fa]"
              }`;
              const inner = (
                <>
                  <Icon size={15} strokeWidth={1.8} className="shrink-0" />
                  {!collapsed && <span className="leading-[1.25]">{label}</span>}
                </>
              );

              return ready ? (
                <Link
                  key={label}
                  href={href}
                  data-active={on || undefined}
                  title={collapsed ? label : undefined}
                  className={cls}
                >
                  {inner}
                </Link>
              ) : (
                <button
                  key={label}
                  type="button"
                  className={`${cls} opacity-50`}
                  title={collapsed ? `${label} — Segera hadir` : "Segera hadir"}
                >
                  {inner}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* toggle collapse */}
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

      {/* data trust — konsisten dengan footer sidebar modul */}
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
