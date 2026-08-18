"use client";

import {
  PSR_TARGET_HA,
  REPLANTING_FUNDING_TOTAL_HA,
  REPLANTING_FUNDING_TOTAL_RP_M,
  replantingFunding,
  replantingFundingNote,
} from "@/lib/arp-data";
import { SectionHead } from "@/components/hc/SectionHead";
import { ToneBadge, type BadgeTone } from "@/components/shared/ToneBadge";
import { useSubholding } from "@/components/SubholdingProvider";

const rp = (v: number) => v.toLocaleString("id-ID");
const pct = (v: number) => v.toLocaleString("id-ID", { minimumFractionDigits: 1 });

const SEGMEN_TONE: Record<string, BadgeTone> = { Inti: "info", Plasma: "good" };

/** Komposisi pendanaan program replanting 2026: kas internal, pinjaman & PSR/BPDPKS. */
export function ReplantingFunding() {
  const { active } = useSubholding();
  // Pemetaan domain: kas internal PalmCo + hibah BPDPKS untuk PSR sawit —
  // seluruh pendanaan pada kartu ini berada di cakupan PalmCo.
  const outOfScope = active !== "all" && active !== "palmco";

  return (
    <div
      className="card anim-rise flex h-full min-h-0 flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Sumber Pendanaan Replanting 2026" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {outOfScope ? (
          "Pendanaan replanting sawit hanya untuk PalmCo"
        ) : (
          <>
            Total Program Rp {rp(REPLANTING_FUNDING_TOTAL_RP_M)} M ·{" "}
            {rp(REPLANTING_FUNDING_TOTAL_HA)} Ha · PSR Plasma {rp(PSR_TARGET_HA)} Ha
          </>
        )}
      </p>

      <div
        className="mt-2 grid min-h-0 flex-1 grid-cols-3 gap-2.5 transition-opacity"
        style={{ opacity: outOfScope ? 0.25 : 1 }}
      >
        {replantingFunding.map((f) => (
          <div
            key={f.sumber}
            className="flex min-h-0 flex-col rounded-xl border border-[#eef2f6] px-3 pb-2 pt-2"
          >
            <div className="flex items-start justify-between gap-2">
              <span className="min-w-0 text-[9.5px] font-bold leading-snug text-ink-900">
                {f.sumber}
              </span>
              <ToneBadge label={f.segmen} tone={SEGMEN_TONE[f.segmen] ?? "neutral"} />
            </div>
            <div className="mt-1.5 flex items-baseline gap-1.5">
              <span className="text-[17px] font-extrabold leading-none tracking-[-0.01em] text-ink-900">
                Rp {rp(f.nilaiRpM)} M
              </span>
              <span className="text-[8.5px] font-semibold text-ink-400">
                {pct(f.porsiPct)}% · {rp(f.luasHa)} ha
              </span>
            </div>
            <div className="mt-1.5 h-[7px] overflow-hidden rounded-full bg-[#eef2f6]">
              <div
                className={`h-full rounded-full ${
                  f.segmen === "Plasma" ? "bg-ptpn-green" : "bg-[#3b7ded]"
                }`}
                style={{ width: `${f.porsiPct}%` }}
              />
            </div>
            {f.note && (
              <p className="mt-1.5 text-[8.5px] leading-snug text-ink-500">{f.note}</p>
            )}
          </div>
        ))}
      </div>

      <p className="pt-1.5 text-[9px] leading-snug text-ink-500">{replantingFundingNote}</p>
    </div>
  );
}
