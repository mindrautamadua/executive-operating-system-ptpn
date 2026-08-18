import { pdpReadiness, type PdpPillarRow } from "@/lib/tik-data";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";
import { ToneBadge, type BadgeTone } from "@/components/shared/ToneBadge";
import { PALETTE } from "@/lib/chart-palette";

const STATUS_TONE: Record<PdpPillarRow["status"], BadgeTone> = {
  Memadai: "good",
  "Perlu Penguatan": "warn",
  Kritis: "bad",
};

const BAR_COLOR: Record<PdpPillarRow["status"], string> = {
  Memadai: PALETTE.green,
  "Perlu Penguatan": PALETTE.amber,
  Kritis: PALETTE.red,
};

/** Kesiapan 5 pilar UU PDP: progress bar skor vs target per pilar. */
export function PdpReadiness() {
  return (
    <div
      className="card anim-rise flex h-full min-h-0 flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "150ms" } as React.CSSProperties}
    >
      <SectionHead title="Kesiapan Pelindungan Data Pribadi" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Skor 5 Pilar UU PDP vs Target · komposit kesiapan 76%
      </p>

      <div className="scroll-thin mt-2 flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto">
        {pdpReadiness.map((p) => (
          <div key={p.pilar}>
            <div className="flex items-center justify-between gap-2">
              <span className="min-w-0 truncate text-[9.5px] font-bold text-ink-900">{p.pilar}</span>
              <div className="flex shrink-0 items-center gap-1.5">
                <ToneBadge label={p.status} tone={STATUS_TONE[p.status]} />
                <span className="text-[8.5px] font-semibold text-ink-500">
                  {p.skor}/{p.target}
                </span>
              </div>
            </div>

            <div className="relative mt-1.5 h-[9px] w-full overflow-hidden rounded-full bg-[#eef2f6]">
              <div
                className="h-full rounded-full"
                style={{ width: `${p.skor}%`, backgroundColor: BAR_COLOR[p.status] }}
              />
              <span
                className="absolute inset-y-0 w-[2px] bg-[#1b3a6b]"
                style={{ left: `${p.target}%` }}
              />
            </div>

            <p className="mt-1 text-[9px] leading-snug text-ink-500">{p.catatan}</p>
          </div>
        ))}
      </div>

      <p className="pt-1.5 text-[9px] leading-snug text-ink-500">
        Hak subjek data (68) menjadi pilar terlemah — kanal permintaan belum terotomasi dan SLA
        respons belum diukur.
      </p>
    </div>
  );
}
