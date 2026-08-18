import { actionItemsFromMinutes, actionItemsNote } from "@/lib/dek-data";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";
import { ToneBadge } from "@/components/shared/ToneBadge";

/** Butir tindak lanjut yang lahir dari risalah rapat, per triwulan. */
export function ActionItemsFromMinutes() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "150ms" } as React.CSSProperties}
    >
      <SectionHead title="Butir Tindak Lanjut dari Risalah" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        214 Butir · 168 selesai · 46 terbuka · penyelesaian menurun tiap triwulan
      </p>

      <div className="scroll-thin mt-2 min-h-0 flex-1 overflow-y-auto pr-1">
        <div className="grid grid-cols-4 gap-2">
          {actionItemsFromMinutes.map((a) => (
            <div key={a.periode} className="rounded-lg border border-[#eef2f6] bg-[#f8fafc] p-2">
              <div className="truncate text-[9px] font-extrabold text-ink-900" title={a.periode}>
                {a.periode}
              </div>
              <div className="mt-1.5 whitespace-nowrap text-[18px] font-extrabold leading-none tracking-[-0.01em] text-ink-900">
                {a.total}
                <span className="text-[9px] font-bold text-ink-500"> butir</span>
              </div>
              <div className="mt-1.5 flex items-center gap-1.5">
                <ToneBadge label={`${a.selesai} selesai`} tone="good" />
                <ToneBadge
                  label={`${a.terbuka} terbuka`}
                  tone={a.terbuka > 10 ? "bad" : "warn"}
                />
              </div>
              <div className="mt-1.5 text-[9px] font-semibold text-ink-500">
                Penyelesaian {a.penyelesaian}
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="pb-1 pt-1 text-[9px] leading-snug text-ink-500">{actionItemsNote}</p>
    </div>
  );
}
