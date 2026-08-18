import Link from "next/link";
import { ChevronDown, ChevronRight } from "lucide-react";
import {
  kesiapanSeri,
  pipelineLevel,
  pipelineMax,
  pipelineTotal,
} from "@/lib/succession-data";

/**
 * Ambang lebar segmen (persen dari seluruh area bar) agar angka masih muat
 * ditulis di dalam segmen; di bawah ini angka cukup dibaca lewat tooltip.
 */
const MIN_INLINE_PCT = 5;

export function PipelineKepemimpinan() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "540ms" } as React.CSSProperties}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="card-title-navy">Pipeline Kepemimpinan per Level</h3>
          <p className="mt-[3px] text-[9px] text-ink-500">
            Jumlah Kandidat Berdasarkan Kesiapan
          </p>
        </div>
        <button className="select-chip whitespace-nowrap px-2.5 py-[5px] text-[9.5px]">
          Semua Level <ChevronDown size={11} />
        </button>
      </div>

      {/* legenda */}
      <div className="mt-2 flex items-center gap-3 pl-[74px]">
        {kesiapanSeri.map((s) => (
          <span key={s.key} className="flex items-center gap-1 whitespace-nowrap">
            <span
              className="h-[7px] w-[7px] rounded-[2px]"
              style={{ background: s.color }}
            />
            <span className="text-[9px] text-ink-500">{s.nama}</span>
          </span>
        ))}
      </div>

      <div className="mt-1 flex items-center gap-2 border-b border-[#eef2f6] pb-1">
        <span className="w-[70px] shrink-0 text-[9px] font-semibold text-ink-500">
          Level
        </span>
        <span className="min-w-0 flex-1" />
        <span className="w-[30px] shrink-0 text-right text-[9px] font-semibold text-ink-500">
          Total
        </span>
      </div>

      <div className="flex min-h-0 flex-1 flex-col justify-around">
        {pipelineLevel.map((r, ri) => (
          <div key={r.level} className="group relative flex items-center gap-2">
            <span className="w-[70px] shrink-0 text-[9px] text-ink-700">{r.level}</span>
            <span className="flex h-[14px] min-w-0 flex-1 items-stretch overflow-hidden rounded-full bg-[#f2f5f8]">
              {/* lebar proporsional terhadap level terbesar — tanpa lantai minimum */}
              <span
                className="anim-grow-x flex items-stretch overflow-hidden rounded-full"
                style={
                  {
                    width: `${(r.total / pipelineMax) * 100}%`,
                    "--d": `${540 + ri * 80}ms`,
                  } as React.CSSProperties
                }
              >
                {r.nilai.map((v, i) => {
                  const segPct = (v / pipelineMax) * 100;
                  return (
                    <span
                      key={kesiapanSeri[i].key}
                      className="flex items-center justify-center overflow-hidden text-[9px] font-bold text-white"
                      style={{
                        width: `${(v / r.total) * 100}%`,
                        background: kesiapanSeri[i].color,
                      }}
                    >
                      {segPct >= MIN_INLINE_PCT ? v : ""}
                    </span>
                  );
                })}
              </span>
            </span>
            <span className="w-[30px] shrink-0 text-right text-[9.5px] font-bold tabular-nums text-ink-900">
              {r.total}
            </span>

            {/* tooltip rincian per baris — pengganti title bawaan */}
            <div className="pointer-events-none absolute left-[74px] top-0 z-20 hidden -translate-y-full rounded-md border border-[#e3e9ef] bg-white px-2 py-1 shadow-cardHover group-hover:block">
              <div className="mb-0.5 text-[9px] font-bold text-ink-900">{r.level}</div>
              {r.nilai.map((v, i) => (
                <div
                  key={kesiapanSeri[i].key}
                  className="flex items-center gap-1.5 whitespace-nowrap text-[9px] text-ink-700"
                >
                  <span
                    className="h-[6px] w-[6px] rounded-[2px]"
                    style={{ background: kesiapanSeri[i].color }}
                  />
                  {kesiapanSeri[i].nama}:{" "}
                  <strong className="font-semibold text-ink-900">{v}</strong>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* baris total */}
        <div className="flex items-center gap-2 border-t border-[#eef2f6] pt-1.5">
          <span className="w-[70px] shrink-0 text-[9px] font-bold text-ink-900">Total</span>
          <span className="flex min-w-0 flex-1 items-center">
            {pipelineTotal.nilai.map((v, i) => (
              <span
                key={kesiapanSeri[i].key}
                className="text-center text-[9.5px] font-semibold tabular-nums text-ink-700"
                style={{ width: "25%" }}
              >
                {v}
              </span>
            ))}
          </span>
          <span className="w-[30px] shrink-0 text-right text-[9.5px] font-bold tabular-nums text-ink-900">
            {pipelineTotal.total}
          </span>
        </div>
      </div>

      <Link href="/succession-planning/pipeline" className="link-more mt-1.5 flex cursor-pointer items-center gap-0.5">
        Lihat pipeline lengkap <ChevronRight size={12} />
      </Link>
    </div>
  );
}
