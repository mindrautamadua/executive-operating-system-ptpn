import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { fireCauses } from "@/lib/hse-data-detail";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

/** Penyebab kebakaran lahan; penyebab konflik lahan menaut ke Sengketa Lahan. */
export function FireCauses() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Penyebab Kebakaran" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">18 Kejadian · 142 ha Terbakar YTD</p>

      <div className="mt-2 flex min-h-0 flex-1 flex-col justify-between">
        {fireCauses.map((c) => (
          <div key={c.penyebab}>
            <div className="flex items-baseline justify-between gap-2">
              {c.href ? (
                <Link
                  href={c.href}
                  className="flex min-w-0 items-center gap-1 truncate text-[9.5px] font-bold text-ptpn-green hover:underline"
                  title={c.catatan}
                >
                  <span className="truncate">{c.penyebab}</span>
                  <ArrowUpRight size={10} className="shrink-0" />
                </Link>
              ) : (
                <span className="truncate text-[9.5px] font-bold text-ink-900" title={c.catatan}>
                  {c.penyebab}
                </span>
              )}
              <span className="shrink-0 text-[11px] font-extrabold tabular-nums text-ink-900">
                {c.kejadian}
                <span className="text-[9px] font-bold text-ink-500"> kejadian</span>
              </span>
            </div>
            <div className="mt-[5px] h-[7px] w-full overflow-hidden rounded-full bg-[#eef2f6]">
              <div
                className="h-full rounded-full"
                style={{ width: `${c.pct}%`, backgroundColor: c.color }}
              />
            </div>
            <p className="mt-[3px] truncate text-[8.5px] text-ink-500">
              {c.pct.toLocaleString("id-ID", { minimumFractionDigits: 1 })}% · {c.luasHa} ha
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
