import { stageFunnel } from "@/lib/risk-data-detail";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";
import { PALETTE } from "@/lib/chart-palette";

const TOTAL = stageFunnel.reduce((s, r) => s + r.count, 0);
const MAX = Math.max(...stageFunnel.map((r) => r.count));

const COLORS = [
  PALETTE.green,
  PALETTE.blue,
  PALETTE.teal,
  PALETTE.amber,
  "#f0662d",
  PALETTE.red,
];

/** Sebaran perkara aktif menurut tahapan proses hukum. */
export function CaseStageFunnel() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Tahapan Perkara" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Posisi {TOTAL} Perkara Aktif: Mediasi hingga Eksekusi Putusan
      </p>

      <ul className="mt-2 flex min-h-0 flex-1 flex-col justify-around gap-y-1">
        {stageFunnel.map((s, i) => (
          <li key={s.stage} className="flex shrink-0 items-center gap-2">
            <span className="w-[92px] shrink-0 text-[8.5px] font-semibold text-ink-700">
              {s.stage}
            </span>
            <span className="h-[11px] min-w-0 flex-1 overflow-hidden rounded-full bg-[#eef2f6]">
              <span
                className="anim-grow-x block h-full rounded-full"
                style={{ width: `${(s.count / MAX) * 100}%`, background: COLORS[i] }}
              />
            </span>
            <span className="w-[20px] shrink-0 text-right text-[10px] font-extrabold text-ink-900">
              {s.count}
            </span>
          </li>
        ))}
      </ul>

      <p className="mt-1.5 rounded-md bg-[#f8fafc] px-2 py-[5px] text-[9px] leading-[1.4] text-ink-500">
        7 perkara sudah pada tahap eksekusi putusan — prioritas pengamanan aset dan pemulihan hak.
      </p>
    </div>
  );
}
