import { CircleCheck } from "lucide-react";
import { hedgingPolicy } from "@/lib/kontrak-buyer-data";
import { ScopeNote } from "@/components/ui/ScopeNote";
import { SectionHead } from "@/components/hc/SectionHead";
import { ToneBadge } from "@/components/shared/ToneBadge";

/** Posisi forward selling vs batas kebijakan + instrumen yang diizinkan. */
export function HedgingPolicyCard() {
  const { posisiPct, batasForwardPct, headroomPct, instrumen, catatan } = hedgingPolicy;
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "180ms" } as React.CSSProperties}
    >
      {/* Kebijakan komite pemasaran berlaku satu grup — bukan per subholding. */}
      <SectionHead title="Kebijakan Forward & Hedging" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Posisi forward selling H2 vs batas kebijakan komite pemasaran
      </p>

      <div className="mt-2.5 grid min-h-0 flex-1 grid-cols-[minmax(0,55fr)_minmax(0,45fr)] gap-5">
        {/* Kiri: progress posisi vs batas */}
        <div className="flex min-w-0 flex-col justify-between">
          <div>
            <div className="flex items-end justify-between">
              <span className="text-[26px] font-extrabold leading-none tracking-[-0.01em] text-ink-900">
                {posisiPct}%
              </span>
              <ToneBadge label={`Headroom ${headroomPct} pts`} tone="good" />
            </div>
            <p className="mt-1 text-[8.5px] text-ink-500">
              Committed dari proyeksi produksi CPO H2 · batas maks {batasForwardPct}%
            </p>

            <div className="relative mt-2.5 h-[12px] w-full overflow-hidden rounded-full bg-[#eef2f6]">
              <div
                className="h-full rounded-full bg-ptpn-green"
                style={{ width: `${(posisiPct / batasForwardPct) * 100}%` }}
              />
              <div className="absolute inset-y-0 right-0 w-[2px] bg-[#ef4444]" />
            </div>
            <div className="mt-1 flex justify-between text-[9px] text-ink-500">
              <span>0%</span>
              <span className="font-bold text-[#ef4444]">Batas {batasForwardPct}%</span>
            </div>
          </div>

          <p className="line-clamp-3 text-[9px] leading-snug text-ink-500" title={catatan}>
            {catatan}
          </p>
        </div>

        {/* Kanan: instrumen diizinkan */}
        <div className="flex min-w-0 flex-col">
          <span className="text-[9px] font-semibold uppercase tracking-[0.04em] text-ink-500">
            Instrumen Diizinkan
          </span>
          <ul className="mt-1.5 flex min-h-0 flex-1 flex-col justify-between gap-1">
            {instrumen.map((ins) => (
              <li
                key={ins}
                className="flex items-center gap-1.5 rounded-lg border border-[#eef2f6] bg-[#fbfcfd] px-2.5 py-1.5"
              >
                <CircleCheck size={11} strokeWidth={2} className="shrink-0 text-ptpn-green" />
                <span className="min-w-0 truncate text-[8.5px] font-semibold text-ink-700" title={ins}>
                  {ins}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
