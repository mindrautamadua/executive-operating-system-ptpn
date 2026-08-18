import { ArrowRight } from "lucide-react";
import { payEquityDi, rataGaji } from "@/lib/di-data";
import { PALETTE } from "@/lib/chart-palette";
import { CountUp } from "../ui/CountUp";

/* Semua angka diturunkan dari data — tidak ada rasio hardcode di JSX. */
const [PRIA, WANITA] = rataGaji;
const RASIO = WANITA.jt / PRIA.jt;
const RASIO_LABEL = RASIO.toFixed(2).replace(".", ",");
const GAP_LABEL = `${((1 - RASIO) * 100).toFixed(1).replace(".", ",")}%`;

/* Skala dumbbell dipersempit (11,9-12,9 Jt) agar selisih 3% terlihat. */
const MIN = 11.9;
const MAX = 12.9;
const posisi = (v: number) => ((v - MIN) / (MAX - MIN)) * 100;

export function GenderPayGap() {
  const posPria = posisi(PRIA.jt);
  const posWanita = posisi(WANITA.jt);

  return (
    <div className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3">
      <h3 className="card-title-navy">Perbandingan Rata-rata Gaji (Gender Pay Gap)</h3>
      <p className="mt-[3px] text-[9px] text-ink-500">(Per 30 Jun 2026)</p>

      {/* dumbbell gap */}
      <div className="relative mx-2 mt-2 h-[86px] min-h-0">
        {/* label laki-laki (atas, di posisi marker) */}
        <div
          className="anim-fade absolute top-0 -translate-x-1/2 whitespace-nowrap text-center leading-tight"
          style={{ left: `${posPria}%` }}
        >
          <span className="block text-[9px] text-ink-500">{PRIA.label}</span>
          <span
            className="block text-[11px] font-extrabold tabular-nums"
            style={{ color: PRIA.color }}
          >
            {PRIA.nilai}
          </span>
        </div>

        {/* lintasan + segmen gap */}
        <div className="absolute inset-x-0 top-[46px] h-[4px] rounded-full bg-[#f2f5f8]" />
        <div
          className="anim-grow-x absolute top-[46px] h-[4px] rounded-full"
          style={{
            left: `${posWanita}%`,
            width: `${posPria - posWanita}%`,
            background: PALETTE.amber,
          }}
        />
        {/* chip gap di tengah bracket */}
        <span
          className="tone-amber anim-fade absolute top-[20px] -translate-x-1/2 whitespace-nowrap rounded-md px-1.5 py-[2px] text-[9px] font-bold"
          style={{ left: `${(posPria + posWanita) / 2}%`, "--d": "500ms" } as React.CSSProperties}
        >
          Gap {GAP_LABEL}
        </span>

        {/* dua marker gender */}
        {[PRIA, WANITA].map((g) => (
          <span
            key={g.label}
            className="anim-fade absolute top-[41px] h-[14px] w-[14px] -translate-x-1/2 rounded-full border-2 border-white shadow-card"
            style={
              { left: `${posisi(g.jt)}%`, background: g.color, "--d": "250ms" } as React.CSSProperties
            }
            title={`${g.label}: ${g.nilai}`}
          />
        ))}

        {/* label perempuan (bawah) */}
        <div
          className="anim-fade absolute bottom-0 -translate-x-1/2 whitespace-nowrap text-center leading-tight"
          style={{ left: `${posWanita}%` }}
        >
          <span
            className="block text-[11px] font-extrabold tabular-nums"
            style={{ color: WANITA.color }}
          >
            {WANITA.nilai}
          </span>
          <span className="block text-[9px] text-ink-500">{WANITA.label}</span>
        </div>
      </div>

      <div className="mt-2 flex min-h-0 flex-1 items-center gap-3 rounded-xl bg-[#f6f9fc] px-3 py-2">
        <div className="shrink-0 text-center leading-tight">
          <div className="text-[9px] text-ink-500">Unadjusted</div>
          <CountUp
            value={RASIO_LABEL}
            className="mt-1 block text-[17px] font-extrabold leading-none text-ink-900"
          />
          <div className="mt-[3px] text-[8.5px] tabular-nums text-ink-400">
            Gap {payEquityDi.unadjustedGap}
          </div>
        </div>
        <div className="shrink-0 text-center leading-tight">
          <div className="text-[9px] text-ink-500">Adjusted</div>
          <CountUp
            value={payEquityDi.adjustedRatio}
            className="mt-1 block text-[17px] font-extrabold leading-none text-ptpn-green"
          />
          <div className="mt-[3px] text-[8.5px] tabular-nums text-ink-400">
            Gap {payEquityDi.adjustedGap}
          </div>
        </div>
        <p className="min-w-0 flex-1 text-[8.5px] leading-[1.4] text-ink-500">
          {payEquityDi.catatan}
        </p>
      </div>

      <button className="link-more mt-2 flex items-center gap-1">
        Lihat analisis pay gap <ArrowRight size={11} />
      </button>
    </div>
  );
}
