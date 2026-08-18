import { infrastructureFootprint } from "@/lib/tik-data-detail";
import { PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";
import { ToneBadge, type BadgeTone } from "@/components/shared/ToneBadge";

const STATUS_TONE: Record<string, BadgeTone> = {
  Sehat: "good",
  "Perlu Perhatian": "warn",
  Kritis: "bad",
};

const BAR_COLOR: Record<string, string> = {
  Sehat: PALETTE.green,
  "Perlu Perhatian": PALETTE.amber,
  Kritis: PALETTE.red,
};

export function InfrastructureFootprint() {
  return (
    <div
      className="card anim-rise flex h-full min-h-0 flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Jejak Infrastruktur" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Data Center, Cloud &amp; Edge · Utilisasi Kapasitas dan Porsi Beban Kerja
      </p>

      <div className="scroll-thin mt-2 flex min-h-0 flex-1 flex-col gap-1.5 overflow-y-auto pr-1">
        {infrastructureFootprint.map((r) => (
          <div key={r.lokasi} className="rounded-xl border border-[#eef2f6] px-2.5 py-[7px]">
            <div className="flex items-center justify-between gap-2">
              <span className="truncate text-[9.5px] font-bold text-ink-900">{r.lokasi}</span>
              <ToneBadge label={r.tipe} tone="info" />
            </div>
            <div className="mt-[3px] flex items-center justify-between gap-2">
              <span className="truncate text-[8.5px] text-ink-500">{r.kapasitas}</span>
              <ToneBadge label={r.status} tone={STATUS_TONE[r.status]} />
            </div>
            <div className="mt-1 flex items-center gap-2">
              <div className="h-[7px] min-w-0 flex-1 overflow-hidden rounded-full bg-[#eef2f6]">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${r.utilisasiPct}%`,
                    backgroundColor: BAR_COLOR[r.status],
                  }}
                />
              </div>
              <span className="shrink-0 text-[9px] font-bold text-ink-700">
                {r.utilisasiPct}% utilisasi
              </span>
              <span className="shrink-0 text-[9px] font-semibold text-ink-500">
                {r.bebanKerjaPct}% beban
              </span>
            </div>
            <p className="mt-[3px] text-[9px] leading-snug text-ink-500">{r.catatan}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
