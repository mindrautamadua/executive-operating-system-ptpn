"use client";

import { HandHeart } from "lucide-react";
import { communityFireMeta, communityFirePartnership } from "@/lib/hse-data-detail";
import { PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";

const ribuan = (v: number) => v.toLocaleString("id-ID");

const MAX_DESA = Math.max(...communityFirePartnership.map((c) => c.desa));

const RINGKAS = [
  { label: "Kelompok MPA", value: ribuan(communityFireMeta.kelompokTotal), color: PALETTE.green },
  { label: "Desa Binaan", value: ribuan(communityFireMeta.desaTotal), color: PALETTE.blue },
  { label: "Anggota Aktif", value: ribuan(communityFireMeta.anggotaTotal), color: PALETTE.teal },
  { label: "Anggaran YTD", value: "Rp 6,84 M", color: PALETTE.amber },
];

/** Kemitraan Masyarakat Peduli Api: kelompok binaan & desa per regional. */
export function CommunityFirePartnership() {
  const { active, isFiltered, def } = useSubholding();
  // Desa binaan MPA berada di sekitar blok rawan Regional 1–7, wilayah operasi
  // PalmCo (PTPN IV).
  const luarCakupan = isFiltered && active !== "palmco";

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Masyarakat Peduli Api" action="Lihat Detail" />
      <p className="mt-[3px] flex items-center gap-1 text-[9px] text-ink-500">
        <HandHeart size={10} strokeWidth={1.9} className="shrink-0 text-ptpn-green" />
        {luarCakupan
          ? `Desa binaan di regional PalmCo — di luar cakupan ${def.label}`
          : "Program Pembinaan TJSL di Desa Berbatasan Blok Rawan"}
      </p>

      <div className="mt-2 grid grid-cols-4 gap-2">
        {RINGKAS.map((r) => (
          <div key={r.label} className="rounded-lg bg-[#f8fafc] px-2 py-[6px]">
            <div
              className="text-[13px] font-extrabold leading-none tabular-nums"
              style={{ color: r.color }}
            >
              {r.value}
            </div>
            <div className="mt-[3px] truncate text-[9px] font-semibold text-ink-500">{r.label}</div>
          </div>
        ))}
      </div>

      <div
        className="mt-2 min-h-0 flex-1 overflow-hidden transition-opacity"
        style={luarCakupan ? { opacity: 0.25 } : undefined}
      >
        {communityFirePartnership.map((c) => (
          <div key={c.regional} className="flex items-center gap-2 py-[3px]">
            <span className="w-[112px] shrink-0 truncate text-[8.5px] font-bold text-ink-900">
              {c.regional}
            </span>
            <span className="h-[6px] min-w-0 flex-1 overflow-hidden rounded-full bg-[#eef2f6]">
              <span
                className="block h-full rounded-full bg-ptpn-green"
                style={{ width: `${(c.desa / MAX_DESA) * 100}%` }}
              />
            </span>
            <span className="w-[86px] shrink-0 text-right text-[8.5px] font-semibold tabular-nums text-ink-700">
              {c.kelompok} kel · {c.desa} desa
            </span>
          </div>
        ))}
      </div>

      <p className="mt-1 border-t border-[#f5f8fa] pt-1.5 text-[8.5px] leading-snug text-ink-500">
        {communityFireMeta.catatan}
      </p>
    </div>
  );
}
