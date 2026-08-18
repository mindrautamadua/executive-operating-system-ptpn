import { ArrowRight, ThumbsUp, TriangleAlert } from "lucide-react";
import { faktorKekuatan, faktorPerbaikan, type FaktorRow } from "@/lib/engagement-data";
import { PALETTE } from "@/lib/chart-palette";

function Panel({
  judul,
  sub,
  rows,
  chip,
  bar,
  icon: Icon,
}: {
  judul: string;
  sub: string;
  rows: FaktorRow[];
  /** kelas tone dark-safe untuk chip judul & ikon baris */
  chip: string;
  bar: string;
  icon: typeof ThumbsUp;
}) {
  return (
    <div className="flex min-w-0 flex-1 flex-col rounded-xl border border-[#eef2f6] px-3 pb-2.5 pt-2.5">
      <div className="flex items-center gap-1.5">
        <span className={`${chip} rounded-md px-2 py-[2px] text-[9px] font-semibold`}>
          {judul}
        </span>
        <span className="text-[9px] text-ink-500">{sub}</span>
      </div>

      <div className="mt-2 flex flex-1 flex-col justify-around gap-2">
        {rows.map((r, i) => (
          <div key={r.faktor} className="flex items-center gap-2">
            <span
              className={`${chip} flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-md`}
            >
              <Icon size={10} strokeWidth={2} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="truncate text-[9.5px] text-ink-900">{r.faktor}</span>
                <span
                  className={`${
                    r.impact === "Very High"
                      ? "tone-red"
                      : r.impact === "High"
                        ? "tone-amber"
                        : "tone-slate"
                  } shrink-0 rounded px-1 py-[1px] text-[9px] font-bold leading-none`}
                >
                  Impact: {r.impact}
                </span>
              </div>
              <span className="mt-[4px] block h-[6px] w-full overflow-hidden rounded-full bg-[#eef2f6]">
                <span
                  className="anim-grow-x block h-full rounded-full"
                  style={
                    {
                      width: `${r.pct}%`,
                      background: bar,
                      "--d": `${90 * i}ms`,
                    } as React.CSSProperties
                  }
                />
              </span>
            </div>
            <span className="w-[26px] shrink-0 text-right text-[9.5px] font-semibold tabular-nums text-ink-900">
              {r.pct}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function FaktorEngagement() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "400ms" } as React.CSSProperties}
    >
      <h3 className="card-title-navy">Faktor Engagement Tertinggi &amp; Terendah</h3>

      <div className="mt-2 flex min-h-0 flex-1 gap-3">
        <Panel
          judul="Kekuatan (Top 3)"
          sub=""
          rows={faktorKekuatan}
          icon={ThumbsUp}
          chip="tone-green"
          bar={PALETTE.green}
        />
        <Panel
          judul="Area Perlu Ditingkatkan"
          sub="(Bottom 3)"
          rows={faktorPerbaikan}
          icon={TriangleAlert}
          chip="tone-amber"
          bar={PALETTE.amber}
        />
      </div>

      <button className="link-more mt-2 flex items-center gap-1 self-start">
        Lihat rekomendasi perbaikan <ArrowRight size={11} />
      </button>
    </div>
  );
}
