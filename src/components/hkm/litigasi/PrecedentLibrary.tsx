import { precedentLibrary, type HkmPrecedentRow } from "@/lib/hkm-data-detail";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";
import { ToneBadge, type BadgeTone } from "@/components/shared/ToneBadge";

const HASIL_TONE: Record<HkmPrecedentRow["hasil"], BadgeTone> = {
  Menguntungkan: "good",
  Sebagian: "warn",
  Merugikan: "bad",
};

const totalRujukan = precedentLibrary.reduce((s, p) => s + p.perkaraTerkait, 0);

/** Pustaka putusan penting beserta pelajaran yang dipakai perkara berjalan. */
export function PrecedentLibrary() {
  return (
    <div
      className="card anim-rise flex h-full min-h-0 flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Pustaka Preseden & Pelajaran" action="Lihat Semua" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {precedentLibrary.length} Putusan Rujukan · Dipakai {totalRujukan} Perkara Aktif
      </p>

      <div className="scroll-thin mt-2 min-h-0 flex-1 overflow-y-auto pr-1">
        {precedentLibrary.map((p) => (
          <div key={p.putusan} className="border-b border-[#f4f7fa] py-[7px] last:border-0">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <div className="truncate text-[9.5px] font-bold text-ink-900" title={p.putusan}>
                  {p.putusan}
                </div>
                <div className="mt-[2px] text-[9px] text-ink-500">
                  {p.forum} · {p.tahun} · dirujuk {p.perkaraTerkait} perkara aktif
                </div>
              </div>
              <ToneBadge label={p.hasil} tone={HASIL_TONE[p.hasil]} />
            </div>
            <p className="mt-[4px] text-[8.5px] leading-snug text-ink-500">{p.pelajaran}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
