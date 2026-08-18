import { risalahStatus } from "@/lib/dek-data";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const total = risalahStatus.reduce((a, r) => a + r.jumlah, 0);

/** Status penerbitan 41 risalah beserta kepatuhan SLA 14 hari kerja. */
export function RisalahStatus() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Status Penerbitan Risalah" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {total} Risalah YTD · SLA penerbitan 14 hari kerja sejak tanggal rapat
      </p>

      <div className="scroll-thin mt-2 flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto pr-1">
        {risalahStatus.map((r) => (
          <div key={r.status}>
            <div className="flex items-center justify-between gap-2">
              <span className="flex items-center gap-1.5">
                <span
                  className="h-[8px] w-[8px] shrink-0 rounded-[2px]"
                  style={{ backgroundColor: r.color }}
                />
                <span className="text-[9px] font-bold text-ink-900">{r.status}</span>
              </span>
              <span className="shrink-0 text-[8.5px] font-semibold tabular-nums text-ink-500">
                {r.jumlah} risalah · {r.porsi}
              </span>
            </div>
            <div className="mt-1.5 h-[9px] w-full overflow-hidden rounded-full bg-[#eef2f6]">
              <div
                className="h-full rounded-full"
                style={{ width: `${(r.jumlah / total) * 100}%`, backgroundColor: r.color }}
              />
            </div>
            <p className="mt-1 text-[9px] leading-snug text-ink-500">{r.catatanSla}</p>
          </div>
        ))}
      </div>

      <p className="pb-1 pt-1 text-[9px] leading-snug text-ink-500">
        Risalah tertunda menahan mulainya penghitungan tenggat tindak lanjut Direksi — keterlambatan
        administratif ikut memperlambat siklus pengawasan.
      </p>
    </div>
  );
}
