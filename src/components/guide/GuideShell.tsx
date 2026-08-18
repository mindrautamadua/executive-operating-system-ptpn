import type { ReactNode } from "react";
import Link from "next/link";
import { BookOpen, Library } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { ModuleHeader } from "@/components/ui/ModuleHeader";
import { GUIDE_PAGES } from "@/lib/guide-data";
import { STEMPEL_DATA } from "@/lib/group-baseline";

/**
 * Kerangka halaman Executive Guide: Sidebar utama + ModuleHeader standar
 * (Tipe A) + pill navigasi antar bab guide. `active` = href halaman berjalan,
 * dipakai untuk menandai pill aktif tanpa perlu usePathname (halaman tetap
 * server component).
 */
export function GuideShell({
  title,
  subtitle,
  active,
  children,
}: {
  title: string;
  subtitle: string;
  active: string;
  children: ReactNode;
}) {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <Sidebar />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <ModuleHeader
          icon={<BookOpen size={19} strokeWidth={1.9} />}
          title={title}
          subtitle={subtitle}
          dataAsOf={`Angka contoh mengikuti data per ${STEMPEL_DATA.snapshot} (YTD)`}
          actions={
            <Link
              href="/data-dictionary"
              className="flex items-center gap-1.5 rounded-lg bg-ptpn-green px-3 py-[7px] text-[10px] font-semibold text-white shadow-pill transition-opacity hover:opacity-90"
            >
              <Library size={12} />
              Data Dictionary
            </Link>
          }
        />

        {/* pill navigasi bab */}
        <div className="flex flex-wrap items-center gap-1.5 px-5 pb-3">
          {GUIDE_PAGES.map((p) => {
            const on = p.href === active;
            return (
              <Link
                key={p.href}
                href={p.href}
                className={`rounded-full px-3 py-[5px] text-[9.5px] font-bold transition-colors ${
                  on
                    ? "bg-[#1b3a6b] text-white"
                    : "border border-[#e3e9ef] bg-white text-ink-500 hover:text-[#1b3a6b]"
                }`}
              >
                {p.label}
              </Link>
            );
          })}
        </div>

        <div className="flex flex-col gap-3 px-5 pb-6">{children}</div>
      </main>
    </div>
  );
}
