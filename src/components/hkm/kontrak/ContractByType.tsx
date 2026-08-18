import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { contractByType } from "@/lib/hkm-data";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const total = contractByType.reduce((a, c) => a + c.count, 0);
const maxCount = Math.max(...contractByType.map((c) => c.count));

const rpT = (v: number) => v.toLocaleString("id-ID", { minimumFractionDigits: 1 });

/** Distribusi 1.842 kontrak aktif per kategori; kategori bertautan ke modul pemiliknya. */
export function ContractByType() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Kontrak per Kategori" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {total.toLocaleString("id-ID")} Kontrak Aktif · 6 Kategori · nilai agregat Rp 34,6 T
      </p>

      <div className="mt-2 flex min-h-0 flex-1 flex-col justify-between gap-1">
        {contractByType.map((c) => (
          <div key={c.tipe}>
            <div className="flex items-baseline justify-between gap-2">
              {c.href ? (
                <Link
                  href={c.href}
                  className="flex min-w-0 items-center gap-1 truncate text-[9.5px] font-semibold text-ink-900 hover:text-ptpn-green hover:underline"
                  title={c.hrefLabel ?? c.tipe}
                >
                  <span className="truncate">{c.tipe}</span>
                  <ArrowUpRight size={10} className="shrink-0 text-ptpn-green" />
                </Link>
              ) : (
                <span className="truncate text-[9.5px] font-semibold text-ink-900" title={c.tipe}>
                  {c.tipe}
                </span>
              )}
              <span className="shrink-0 text-[9px] font-bold tabular-nums text-ink-500">
                {c.count.toLocaleString("id-ID")} · Rp {rpT(c.nilaiRpT)} T
              </span>
            </div>
            <div className="mt-[3px] h-[7px] w-full overflow-hidden rounded-full bg-[#eef2f6]">
              <div
                className="h-full rounded-full"
                style={{ width: `${(c.count / maxCount) * 100}%`, backgroundColor: c.color }}
              />
            </div>
          </div>
        ))}
      </div>

      <p className="mt-1.5 border-t border-[#f5f8fa] pt-1.5 text-[9px] leading-snug text-ink-500">
        Pengadaan mendominasi jumlah (1.246 kontrak, 67,6%), tetapi nilai terkonsentrasi pada
        off-take dan KSO — tiga kategori bertaut langsung ke modul pemilik prosesnya.
      </p>
    </div>
  );
}
