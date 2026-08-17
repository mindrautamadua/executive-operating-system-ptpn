"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BOARD_NAV_SECTIONS, CEO_NAV_SECTIONS } from "@/lib/nav";
import { useNavMode } from "@/components/shared/useNavMode";

/**
 * Blok menu mode CEO/Dekom di puncak sidebar modul — sidebar halaman modul
 * tetap konsisten dengan mode navigasi aktif, sehingga eksekutif tidak
 * "terjebak" di submenu fungsional dan selalu satu klik dari pintu mode-nya.
 * Mode fungsional: tidak merender apa pun (perilaku lama utuh). Seksi tanpa
 * judul (Overview dkk.) dilewati karena tombol "Dashboard Utama" sudah
 * mewakili jalan pulang.
 */
export function ModeNavBlock({ collapsed }: { collapsed: boolean }) {
  const { mode } = useNavMode();
  const pathname = usePathname();

  if (mode === "fungsional") return null;
  const sections = (mode === "ceo" ? CEO_NAV_SECTIONS : BOARD_NAV_SECTIONS).filter(
    (s) => s.title,
  );

  return (
    <>
      {sections.map((section) => (
        <div key={section.title}>
          {collapsed ? (
            <div className="mx-1.5 my-2 border-t border-[#f0f3f6]" />
          ) : (
            <div className="mb-1 mt-1 px-2.5 text-[8.5px] font-bold uppercase tracking-[0.09em] text-[#1b3a6b]">
              {section.title}
            </div>
          )}
          {section.items.map(({ label, href, icon: Icon }) => {
            const on = pathname === href;
            return (
              <Link
                key={label}
                href={href}
                title={collapsed ? label : undefined}
                className={`mb-[2px] flex w-full items-center rounded-lg py-[7px] text-left text-[10.5px] transition-colors ${
                  collapsed ? "justify-center px-0" : "gap-2.5 px-2.5"
                } ${
                  on
                    ? "bg-ptpn-greenLight font-semibold text-ptpn-green"
                    : "font-medium text-ink-500 hover:bg-[#f5f8fa]"
                }`}
              >
                <Icon size={14} strokeWidth={1.8} className="shrink-0" />
                {!collapsed && <span className="min-w-0 flex-1 truncate leading-[1.2]">{label}</span>}
              </Link>
            );
          })}
        </div>
      ))}
      {collapsed ? (
        <div className="mx-1.5 my-2 border-t border-[#f0f3f6]" />
      ) : (
        <div className="mb-1 mt-3 px-2.5 text-[8.5px] font-bold uppercase tracking-[0.09em] text-ink-400">
          Menu Modul
        </div>
      )}
    </>
  );
}
