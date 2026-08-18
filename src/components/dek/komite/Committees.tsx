import { committees } from "@/lib/dek-data-detail";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

/** Profil tiga komite penunjang: ketua, anggota, rapat, fokus, dan keluaran. */
export function Committees() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Profil Tiga Komite" action="Lihat Piagam Komite" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        11 Kursi · 24 Rapat YTD · 5 Kursi Diisi Profesional Independen Non-Dekom
      </p>

      <div className="mt-2 grid min-h-0 flex-1 grid-cols-3 gap-3">
        {committees.map((c) => (
          <div
            key={c.komite}
            className="scroll-thin flex min-h-0 flex-col overflow-y-auto rounded-xl border border-[#eef2f6] bg-[#f8fafc] px-3 pb-2.5 pt-2.5"
          >
            <div className="flex items-start gap-2">
              <span
                className="mt-[3px] h-[8px] w-[8px] shrink-0 rounded-[2px]"
                style={{ backgroundColor: c.color }}
              />
              <div className="min-w-0">
                <div className="text-[10px] font-bold leading-snug text-ink-900">{c.komite}</div>
                <div className="mt-[2px] text-[8.5px] font-semibold text-ink-500">
                  Ketua: {c.ketua}
                </div>
              </div>
            </div>

            <div className="mt-2 grid grid-cols-2 gap-1.5">
              <div className="rounded-lg bg-[var(--surface)] px-2 py-1.5">
                <div className="text-[7.5px] font-extrabold uppercase tracking-[0.05em] text-ink-400">
                  Kursi
                </div>
                <div className="mt-[2px] text-[12px] font-extrabold tabular-nums text-ink-900">
                  {c.kursi}
                  <span className="ml-[3px] text-[9px] font-bold text-ink-500">
                    · {c.anggotaIndependenNonDekom} independen
                  </span>
                </div>
              </div>
              <div className="rounded-lg bg-[var(--surface)] px-2 py-1.5">
                <div className="text-[7.5px] font-extrabold uppercase tracking-[0.05em] text-ink-400">
                  Rapat YTD
                </div>
                <div className="mt-[2px] text-[12px] font-extrabold tabular-nums text-ink-900">
                  {c.rapatYtd}
                  <span className="ml-[3px] text-[9px] font-bold text-ink-500">rapat</span>
                </div>
              </div>
            </div>

            <p className="mt-2 text-[8.5px] leading-snug text-ink-500">
              <span className="font-bold text-ink-700">Anggota:</span> {c.anggota}
            </p>
            <p className="mt-1.5 text-[8.5px] leading-snug text-ink-500">
              <span className="font-bold text-ink-700">Fokus 2026:</span> {c.fokus2026}
            </p>
            <p className="mt-1.5 text-[8.5px] leading-snug text-ink-500">
              <span className="font-bold text-ink-700">Output:</span> {c.output}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
