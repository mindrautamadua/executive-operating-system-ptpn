import { downstreamProgress } from "@/lib/stf-data";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const barCls = (v: number) => (v >= 50 ? "bg-ptpn-green" : v >= 30 ? "bg-[#3b7ded]" : "bg-[#f5a524]");

/**
 * Progres onstream kapasitas hilirisasi (refinery, migor kemasan, bioetanol).
 * Baris lini produk tidak membawa label subholding — angka tetap grup, RULE B.
 */
export function DownstreamProgress() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "180ms" } as React.CSSProperties}
    >
      <SectionHead title="Progres Hilirisasi" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        % Kapasitas Onstream terhadap Kapasitas Desain &amp; Target Onstream Penuh
      </p>

      <ul className="mt-2 flex min-h-0 flex-1 flex-col justify-around gap-1.5">
        {downstreamProgress.map((d) => (
          <li key={d.name} className="rounded-lg border border-[#eef2f6] bg-[#fbfcfd] px-2.5 py-2">
            <div className="flex items-center justify-between gap-2">
              <span className="truncate text-[9.5px] font-extrabold text-ink-900">{d.name}</span>
              <span className="shrink-0 text-[8.5px] font-semibold text-ink-500">
                Kapasitas <span className="font-extrabold text-ink-900">{d.capacity}</span>
              </span>
            </div>
            <div className="mt-1.5 flex items-center gap-1.5">
              <span className="h-[7px] min-w-0 flex-1 overflow-hidden rounded-full bg-[#eef2f6]">
                <span
                  className={`block h-full rounded-full ${barCls(d.onstreamPct)}`}
                  style={{ width: `${d.onstreamPct}%` }}
                />
              </span>
              <span className="w-[34px] shrink-0 text-right text-[9.5px] font-extrabold text-ink-900">
                {d.onstreamPct}%
              </span>
            </div>
            <p className="mt-1 truncate text-[9px] text-ink-500">
              Target onstream penuh: {d.targetOnstream}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
