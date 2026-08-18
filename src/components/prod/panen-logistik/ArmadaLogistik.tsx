"use client";

import { Gauge, Route, Truck, Wallet } from "lucide-react";
import { armada } from "@/lib/agro-data";
import { SectionHead } from "@/components/hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";
import { ScopeEmpty, inScope } from "@/components/ui/CommodityScope";
import { Delta } from "@/components/ui/Delta";

const rp = (v: number) => `Rp ${v.toLocaleString("id-ID")}`;

export function ArmadaLogistik() {
  // Domain: armada angkut TBS kebun sawit ke PKS → milik PalmCo.
  const { active, def } = useSubholding();
  const luarCakupan = !inScope(active, "angkut TBS");
  const gapPct =
    Math.round(((armada.biayaAngkutRpTon - armada.targetBiayaRpTon) / armada.targetBiayaRpTon) * 1000) / 10;
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Armada & Logistik TBS" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">Utilisasi Armada Angkut &amp; Biaya per Ton</p>

      {luarCakupan ? (
        <ScopeEmpty label={def.fullLabel} />
      ) : (
      <>
      <div className="mt-2.5 grid grid-cols-2 gap-x-3 gap-y-2.5">
        <div className="flex items-start gap-2">
          <Truck size={13} strokeWidth={1.9} className="mt-[1px] shrink-0 text-ink-400" />
          <div>
            <div className="text-[7.5px] text-ink-400">Unit Truk</div>
            <div className="text-[13px] font-extrabold leading-none text-ink-900">
              {armada.unitTruk.toLocaleString("id-ID")}
            </div>
            <div className="mt-[2px] text-[7.5px] text-ink-500">
              Milik sendiri {armada.porsiMilikPct}% · sewa {100 - armada.porsiMilikPct}%
            </div>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <Route size={13} strokeWidth={1.9} className="mt-[1px] shrink-0 text-ink-400" />
          <div>
            <div className="text-[7.5px] text-ink-400">Ritase per Hari</div>
            <div className="text-[13px] font-extrabold leading-none text-ink-900">
              {armada.ritasePerHari.toLocaleString("id-ID")}
            </div>
            <div className="mt-[2px] text-[7.5px] text-ink-500">rit/truk · target 3,0</div>
          </div>
        </div>
      </div>

      <div className="mt-2.5">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-[8.5px] text-ink-500">
            <Gauge size={12} strokeWidth={1.9} className="text-ink-400" /> Utilisasi Armada
          </span>
          <span className="text-[10px] font-extrabold text-ink-900">
            {armada.utilisasiPct.toLocaleString("id-ID")}%
          </span>
        </div>
        <div className="mt-1 h-[7px] w-full overflow-hidden rounded-full bg-[#eef2f6]">
          <div
            className="h-full rounded-full bg-ptpn-green"
            style={{ width: `${armada.utilisasiPct}%` }}
          />
        </div>
      </div>

      <div className="mt-2.5 rounded-xl border border-[#f5d9a8] bg-[#fdf3e0]/40 px-3 py-2">
        <div className="flex items-center justify-between gap-2">
          <span className="flex items-center gap-1.5 text-[8.5px] font-semibold text-ink-700">
            <Wallet size={12} strokeWidth={1.9} className="text-[#d98b06]" /> Biaya Angkut
          </span>
          <Delta value={`+${gapPct.toLocaleString("id-ID")}%`} trend="up" tone="bad" size={10} />
        </div>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-[15px] font-extrabold leading-none text-ink-900">
            {rp(armada.biayaAngkutRpTon)}
          </span>
          <span className="text-[8.5px] text-ink-500">
            /ton · target {rp(armada.targetBiayaRpTon)}
          </span>
        </div>
      </div>

      <p className="mt-auto pt-2 text-[9px] leading-snug text-ink-500">{armada.note}</p>
      </>
      )}
    </div>
  );
}
