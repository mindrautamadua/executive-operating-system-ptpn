import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { securityIncidentType } from "@/lib/hse-data-detail";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const desimal = (v: number) => v.toLocaleString("id-ID", { minimumFractionDigits: 1 });

/** Komposisi 408 insiden keamanan; penyerobotan lahan menaut ke Sengketa Lahan. */
export function SecurityIncidentType() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Jenis Gangguan Keamanan" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">408 Insiden YTD · Kerugian Rp 12,7 M</p>

      <div className="mt-2 flex min-h-0 flex-1 flex-col justify-between">
        {securityIncidentType.map((s) => (
          <div key={s.jenis}>
            <div className="flex items-baseline justify-between gap-2">
              {s.href ? (
                <Link
                  href={s.href}
                  className="flex min-w-0 items-center gap-1 truncate text-[9.5px] font-bold text-ptpn-green hover:underline"
                  title={s.catatan}
                >
                  <span className="truncate">{s.jenis}</span>
                  <ArrowUpRight size={10} className="shrink-0" />
                </Link>
              ) : (
                <span className="truncate text-[9.5px] font-bold text-ink-900" title={s.catatan}>
                  {s.jenis}
                </span>
              )}
              <span className="shrink-0 text-[11px] font-extrabold tabular-nums text-ink-900">
                {s.kasus}
                <span className="text-[9px] font-bold text-ink-500"> kasus</span>
              </span>
            </div>
            <div className="mt-[5px] h-[7px] w-full overflow-hidden rounded-full bg-[#eef2f6]">
              <div
                className="h-full rounded-full"
                style={{ width: `${s.pct}%`, backgroundColor: s.color }}
              />
            </div>
            <p className="mt-[3px] truncate text-[8.5px] text-ink-500">
              {desimal(s.pct)}% · rugi Rp {desimal(s.kerugianRpM)} M
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
