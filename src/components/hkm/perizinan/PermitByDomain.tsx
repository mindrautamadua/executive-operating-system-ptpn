import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { permitByDomain } from "@/lib/hkm-data";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const total = permitByDomain.reduce((a, d) => a + d.count, 0);
const totalKritikal = permitByDomain.reduce((a, d) => a + d.kritikal, 0);
const maxCount = Math.max(...permitByDomain.map((d) => d.count));

/** Distribusi 612 izin aktif per domain; domain bertautan ke modul pemiliknya. */
export function PermitByDomain() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Izin per Domain" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {total} Izin &amp; Lisensi Aktif · 6 Domain · {totalKritikal} kritikal operasi
      </p>

      <div className="mt-2 flex min-h-0 flex-1 flex-col justify-between gap-1">
        {permitByDomain.map((d) => (
          <div key={d.domain}>
            <div className="flex items-baseline justify-between gap-2">
              {d.href ? (
                <Link
                  href={d.href}
                  className="flex min-w-0 items-center gap-1 truncate text-[9.5px] font-semibold text-ink-900 hover:text-ptpn-green hover:underline"
                  title={d.hrefLabel ?? d.domain}
                >
                  <span className="truncate">{d.domain}</span>
                  <ArrowUpRight size={10} className="shrink-0 text-ptpn-green" />
                </Link>
              ) : (
                <span className="truncate text-[9.5px] font-semibold text-ink-900" title={d.domain}>
                  {d.domain}
                </span>
              )}
              <span className="shrink-0 text-[9px] font-bold tabular-nums text-ink-500">
                {d.count} · {d.kritikal} kritikal · {d.berakhir6Bulan} berakhir
              </span>
            </div>
            <div className="mt-[3px] h-[7px] w-full overflow-hidden rounded-full bg-[#eef2f6]">
              <div
                className="h-full rounded-full"
                style={{ width: `${(d.count / maxCount) * 100}%`, backgroundColor: d.color }}
              />
            </div>
          </div>
        ))}
      </div>

      <p className="mt-1.5 border-t border-[#f5f8fa] pt-1.5 text-[9px] leading-snug text-ink-500">
        Lingkungan (168) dan Pertanahan &amp; HGU (142) menguasai 50,7% portofolio izin dan
        menyumbang 23 dari 43 izin yang berakhir ≤6 bulan.
      </p>
    </div>
  );
}
