import { ArrowRight } from "lucide-react";
import { piramidaPopulasi } from "@/lib/di-data";
import { GENDER } from "@/lib/chart-palette";

/** Skala maksimum kedua sisi piramida. */
const MAX = Math.max(...piramidaPopulasi.flatMap((r) => [r.lakiLaki, r.perempuan]));

/**
 * Piramida populasi gender × generasi — bar horizontal back-to-back,
 * tumbuh dari sumbu tengah.
 */
export function PiramidaPopulasi() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <h3 className="card-title-navy">Piramida Populasi Gender × Generasi</h3>
      <p className="mt-[3px] text-[9px] text-ink-500">(Per 30 Jun 2026)</p>

      {/* header dua sisi */}
      <div className="mt-1.5 flex items-center text-[9.5px] font-semibold">
        <span className="flex flex-1 items-center justify-end gap-1.5 pr-3">
          <span className="h-[8px] w-[8px] rounded-[2px]" style={{ background: GENDER.lakiLaki }} />
          <span className="text-ink-700">Laki-laki</span>
        </span>
        <span className="w-[76px] shrink-0" />
        <span className="flex flex-1 items-center gap-1.5 pl-3">
          <span className="text-ink-700">Perempuan</span>
          <span className="h-[8px] w-[8px] rounded-[2px]" style={{ background: GENDER.perempuan }} />
        </span>
      </div>

      <div className="mt-1 flex min-h-0 flex-1 flex-col justify-around">
        {piramidaPopulasi.map((r, i) => (
          <div key={r.generasi} className="flex items-center">
            {/* sisi laki-laki (tumbuh dari tengah ke kiri) */}
            <div
              className="flex flex-1 items-center justify-end gap-1.5"
              title={`${r.generasi} — Laki-laki: ${r.labelL}`}
            >
              <span className="text-[9px] tabular-nums text-ink-500">{r.labelL}</span>
              <span className="flex h-[13px] flex-1 justify-end overflow-hidden rounded-l-[3px]">
                <span
                  className="anim-grow-x block h-full rounded-l-[3px]"
                  style={
                    {
                      width: `${(r.lakiLaki / MAX) * 100}%`,
                      background: GENDER.lakiLaki,
                      transformOrigin: "right",
                      "--d": `${i * 70}ms`,
                    } as React.CSSProperties
                  }
                />
              </span>
            </div>

            {/* sumbu tengah: label generasi */}
            <span className="w-[76px] shrink-0 text-center">
              <span className="inline-flex items-center gap-1 text-[9px] font-semibold text-ink-700">
                <span
                  className="h-[6px] w-[6px] rounded-full"
                  style={{ background: r.warnaGenerasi }}
                />
                {r.generasi}
              </span>
            </span>

            {/* sisi perempuan (tumbuh dari tengah ke kanan) */}
            <div
              className="flex flex-1 items-center gap-1.5"
              title={`${r.generasi} — Perempuan: ${r.labelP}`}
            >
              <span className="flex h-[13px] flex-1 overflow-hidden rounded-r-[3px]">
                <span
                  className="anim-grow-x block h-full rounded-r-[3px]"
                  style={
                    {
                      width: `${(r.perempuan / MAX) * 100}%`,
                      background: GENDER.perempuan,
                      "--d": `${i * 70}ms`,
                    } as React.CSSProperties
                  }
                />
              </span>
              <span className="text-[9px] tabular-nums text-ink-500">{r.labelP}</span>
            </div>
          </div>
        ))}
      </div>

      <button className="link-more mt-1 flex items-center gap-1">
        Lihat detail generasi <ArrowRight size={11} />
      </button>
    </div>
  );
}
