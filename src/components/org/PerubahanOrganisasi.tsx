import { ChevronRight, Building2, FilePlus2, FileMinus2, Network } from "lucide-react";
import { perubahanOrganisasi, type PerubahanTile } from "@/lib/org-data";
import { Delta } from "../ui/Delta";

const ICON = {
  unit: Building2,
  jabatan: Network,
  baru: FilePlus2,
  hapus: FileMinus2,
} as const;

function Tile({ t, delay }: { t: PerubahanTile; delay: number }) {
  const Icon = ICON[t.icon];
  return (
    <div
      className="anim-rise flex items-start gap-2 rounded-lg border border-[#eef2f6] bg-white px-2.5 py-2 transition-shadow hover:shadow-card"
      style={{ "--d": `${delay}ms` } as React.CSSProperties}
    >
      <span
        className={`tone-${t.tone} flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-lg`}
      >
        <Icon size={13} strokeWidth={1.9} />
      </span>
      <div className="min-w-0 leading-tight">
        <div className="truncate text-[9px] text-ink-500">{t.label}</div>
        <div className="mt-[2px] text-[15px] font-extrabold leading-none text-ink-900">
          {t.value}
        </div>
        {t.delta && t.trend && (
          <Delta value={t.delta} trend={t.trend} size={9} className="mt-[3px]" />
        )}
        <div className="mt-[3px] truncate text-[9px] text-ink-500">{t.compare}</div>
      </div>
    </div>
  );
}

export function PerubahanOrganisasi() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "180ms" } as React.CSSProperties}
    >
      <h3 className="card-title-navy">Perubahan Organisasi (YOY)</h3>
      <p className="mt-[3px] text-[9.5px] text-ink-500">Perubahan Struktur Organisasi</p>

      <div className="mt-2 grid min-h-0 flex-1 grid-cols-2 grid-rows-2 gap-2">
        {perubahanOrganisasi.map((t, i) => (
          <Tile key={t.label} t={t} delay={220 + i * 60} />
        ))}
      </div>

      <button className="link-more mt-2 flex items-center gap-1 self-start">
        Lihat riwayat perubahan <ChevronRight size={11} />
      </button>
    </div>
  );
}
