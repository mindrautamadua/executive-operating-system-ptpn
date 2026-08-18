"use client";

import { Banknote, Landmark, Sprout, UsersRound } from "lucide-react";
import { psrProgress } from "@/lib/agro-data";
import { SectionHead } from "@/components/hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";
import { ScopeEmpty, inScope } from "@/components/ui/CommodityScope";

const rb = (v: number) => v.toLocaleString("id-ID");

export function PsrProgress() {
  // Domain: PSR = Peremajaan Sawit Rakyat (hibah BPDPKS) → milik PalmCo.
  const { active, def } = useSubholding();
  const luarCakupan = !inScope(active, "sawit rakyat");
  const danaPct = Math.round((psrProgress.tersalurRpM / psrProgress.totalDanaRpM) * 1000) / 10;
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Progress PSR 2026" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">Peremajaan Sawit Rakyat — Plasma Binaan</p>

      {luarCakupan ? (
        <ScopeEmpty label={def.fullLabel} />
      ) : (
      <>
      <div className="mt-2.5 flex items-baseline gap-2">
        <span className="text-[19px] font-extrabold leading-none tracking-[-0.01em] text-ink-900">
          {rb(psrProgress.realisasiYtdHa)} ha
        </span>
        <span className="text-[9px] text-ink-500">
          dari target {rb(psrProgress.target2026Ha)} ha
        </span>
        <span className="ml-auto text-[11px] font-extrabold text-[#d98b06]">
          {psrProgress.capaianPct.toLocaleString("id-ID")}%
        </span>
      </div>
      <div className="mt-1.5 h-[8px] w-full overflow-hidden rounded-full bg-[#eef2f6]">
        <div
          className="h-full rounded-full bg-[#f5a524]"
          style={{ width: `${psrProgress.capaianPct}%` }}
        />
      </div>

      <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2.5">
        <div className="flex items-start gap-2">
          <Landmark size={13} strokeWidth={1.9} className="mt-[1px] shrink-0 text-ink-400" />
          <div>
            <div className="text-[7.5px] text-ink-400">Dana BPDPKS 2026</div>
            <div className="text-[11px] font-extrabold text-ink-900">
              Rp {rb(psrProgress.totalDanaRpM)} M
            </div>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <Banknote size={13} strokeWidth={1.9} className="mt-[1px] shrink-0 text-ink-400" />
          <div>
            <div className="text-[7.5px] text-ink-400">Tersalur YTD</div>
            <div className="text-[11px] font-extrabold text-ink-900">
              Rp {psrProgress.tersalurRpM.toLocaleString("id-ID")} M{" "}
              <span className="text-[9px] font-semibold text-ink-500">({danaPct}%)</span>
            </div>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <Sprout size={13} strokeWidth={1.9} className="mt-[1px] shrink-0 text-ink-400" />
          <div>
            <div className="text-[7.5px] text-ink-400">Hibah per Ha</div>
            <div className="text-[11px] font-extrabold text-ink-900">
              Rp {psrProgress.danaPerHaRpJt} jt
            </div>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <UsersRound size={13} strokeWidth={1.9} className="mt-[1px] shrink-0 text-ink-400" />
          <div>
            <div className="text-[7.5px] text-ink-400">Petani Peserta</div>
            <div className="text-[11px] font-extrabold text-ink-900">
              {rb(psrProgress.petaniPeserta)}
            </div>
          </div>
        </div>
      </div>

      <p className="mt-auto pt-2 text-[9px] leading-snug text-ink-500">{psrProgress.note}</p>
      </>
      )}
    </div>
  );
}
