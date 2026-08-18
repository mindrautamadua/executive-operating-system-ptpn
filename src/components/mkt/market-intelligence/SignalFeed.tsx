"use client";

import { signalFeed, type MiSignal } from "@/lib/hilir-stok-margin-data";
import { filterBySubholding } from "@/lib/subholding";
import { useSubholding } from "@/components/SubholdingProvider";
import { commodityScope, ScopeEmpty } from "@/components/ui/CommodityScope";
import { ToneBadge, type BadgeTone } from "@/components/shared/ToneBadge";
import { SectionHead } from "../../hc/SectionHead";

const TONE: Record<MiSignal["tone"], BadgeTone> = {
  Bullish: "good",
  Bearish: "bad",
  Netral: "neutral",
};

/** Feed sinyal pasar terprioritas dampak (kebijakan, cuaca, supply-demand). */
export function SignalFeed() {
  const { active, def } = useSubholding();
  // Sinyal terikat komoditas yang dibahas: sawit/CPO = PalmCo, gula = SugarCo;
  // sinyal makro tanpa komoditas tetap relevan untuk semua cakupan.
  const rows = filterBySubholding(signalFeed, active, (s) =>
    commodityScope(`${s.judul} ${s.dampak} ${s.sumber}`),
  );

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Signal Feed" action="Lihat Semua Sinyal" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {rows.length} sinyal prioritas dari 18 sinyal aktif · diurutkan terbaru
      </p>

      {rows.length === 0 ? (
        <ScopeEmpty label={def.fullLabel} />
      ) : (
      <ul className="scroll-thin mt-2 flex min-h-0 flex-1 flex-col gap-1.5 overflow-y-auto pr-1">
        {rows.map((s) => (
          <li
            key={s.judul}
            className="rounded-lg border border-[#eef2f6] bg-[#fbfcfd] px-2.5 py-1.5"
          >
            <div className="flex items-start justify-between gap-2">
              <span className="min-w-0 text-[9.5px] font-bold leading-[1.3] text-ink-900">
                {s.judul}
              </span>
              <span className="flex shrink-0 items-center gap-1">
                <ToneBadge label={s.kategori} tone="info" />
                <ToneBadge label={s.tone} tone={TONE[s.tone]} />
              </span>
            </div>
            <p className="mt-[3px] text-[8.5px] leading-snug text-ink-500">{s.dampak}</p>
            <div className="mt-[3px] text-[9px] text-ink-500">
              {s.tanggal} · {s.sumber}
            </div>
          </li>
        ))}
      </ul>
      )}
    </div>
  );
}
