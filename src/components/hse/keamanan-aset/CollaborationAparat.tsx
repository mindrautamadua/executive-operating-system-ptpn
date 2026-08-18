import { Handshake } from "lucide-react";
import { collaborationAparat } from "@/lib/hse-data-detail";
import type { HseRagStatus } from "@/lib/hse-data";
import { ToneBadge, type BadgeTone } from "@/components/shared/ToneBadge";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const STATUS_TONE: Record<HseRagStatus, BadgeTone> = {
  Hijau: "good",
  Amber: "warn",
  Merah: "bad",
};

/** Kerja sama dengan aparat & pemda: MoU, patroli bersama, kasus ditangani. */
export function CollaborationAparat() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Kerja Sama Aparat & Pemda" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] flex items-center gap-1 text-[9px] text-ink-500">
        <Handshake size={10} strokeWidth={1.9} className="shrink-0 text-ptpn-green" />
        34 MoU Aktif · 486 Patroli Bersama · 84 Kasus Dilimpahkan ke APH
      </p>

      <div className="mt-2 flex min-h-0 flex-1 flex-col justify-between">
        {collaborationAparat.map((c) => (
          <div key={c.mitra} className="rounded-xl border border-[#eef2f6] bg-[#f8fafc] px-3 py-[7px]">
            <div className="flex items-start justify-between gap-2">
              <span className="truncate text-[9.5px] font-bold text-ink-900">{c.mitra}</span>
              <ToneBadge label={c.status} tone={STATUS_TONE[c.status]} />
            </div>
            <div className="mt-[4px] flex items-center gap-3">
              <span className="text-[8.5px] text-ink-500">
                MoU <span className="text-[10px] font-extrabold tabular-nums text-ink-900">{c.mou}</span>
              </span>
              <span className="text-[8.5px] text-ink-500">
                Patroli{" "}
                <span className="text-[10px] font-extrabold tabular-nums text-ink-900">
                  {c.patroliBersama}
                </span>
              </span>
              <span className="text-[8.5px] text-ink-500">
                Kasus{" "}
                <span className="text-[10px] font-extrabold tabular-nums text-ink-900">
                  {c.kasusDitangani}
                </span>
              </span>
              <span className="min-w-0 flex-1 truncate text-[9px] text-ink-500" title={c.cakupan}>
                {c.cakupan}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
