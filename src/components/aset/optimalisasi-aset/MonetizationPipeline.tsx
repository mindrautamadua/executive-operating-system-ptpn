import { monetizationPipeline, monetizationPipelineNote } from "@/lib/aop-data";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";
import { PALETTE } from "@/lib/chart-palette";

const rp = (v: number) => v.toLocaleString("id-ID");
const pct = (v: number) =>
  v.toLocaleString("id-ID", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

const MAX = Math.max(...monetizationPipeline.map((s) => s.nilaiRpM));

const COLORS = [PALETTE.slate, PALETTE.blue, PALETTE.amber, PALETTE.green];

/** Corong monetisasi: inventarisasi Rp 8,9 T → transaksi tuntas Rp 0,4 T. */
export function MonetizationPipeline() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Corong Monetisasi Aset" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Nilai Aset per Tahap (Rp M) · Konversi Total 4,5%
      </p>

      <ul className="mt-2 flex min-h-0 flex-1 flex-col justify-around gap-y-1">
        {monetizationPipeline.map((s, i) => (
          <li key={s.tahap} className="shrink-0">
            <div className="flex items-center gap-2">
              <span className="w-[104px] shrink-0 text-[8.5px] font-semibold leading-tight text-ink-700">
                {s.tahap}
              </span>
              <span className="h-[11px] min-w-0 flex-1 overflow-hidden rounded-full bg-[#eef2f6]">
                <span
                  className="anim-grow-x block h-full rounded-full"
                  style={{ width: `${(s.nilaiRpM / MAX) * 100}%`, background: COLORS[i] }}
                />
              </span>
              <span className="w-[58px] shrink-0 text-right text-[9.5px] font-extrabold text-ink-900">
                Rp {rp(s.nilaiRpM)} M
              </span>
            </div>
            <div className="mt-[2px] pl-[112px] text-[9px] text-ink-500">
              {s.jumlahPaket} paket · konversi {pct(s.konversiPct)}%
              {s.note ? ` · ${s.note}` : ""}
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-1 rounded-md bg-[#f8fafc] px-2 py-[5px] text-[9px] leading-[1.4] text-ink-500">
        {monetizationPipelineNote}
      </p>
    </div>
  );
}
