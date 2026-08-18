import { healthSurveillance, HSE_RAG_COLOR, type HseRagStatus } from "@/lib/hse-data";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";
import { ToneBadge, type BadgeTone } from "@/components/shared/ToneBadge";

const RAG_TONE: Record<HseRagStatus, BadgeTone> = {
  Hijau: "good",
  Amber: "warn",
  Merah: "bad",
};

/** Kartu indikator surveilans kesehatan kerja: MCU, PAK, dan fasilitas klinik kebun. */
export function HealthSurveillance() {
  return (
    <div
      className="card anim-rise flex h-full min-h-0 flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "150ms" } as React.CSSProperties}
    >
      <SectionHead title="Surveilans Kesehatan Kerja" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Pemeriksaan Berkala, Penyakit Akibat Kerja &amp; Fasilitas Klinik Kebun · YTD 2026
      </p>

      <div className="mt-2 grid min-h-0 flex-1 grid-cols-3 grid-rows-2 gap-2">
        {healthSurveillance.map((h) => (
          <div
            key={h.indikator}
            className="flex flex-col rounded-xl border border-[#eef2f6] bg-[#f8fafc] px-3 pb-2 pt-2"
          >
            <div className="flex items-start justify-between gap-2">
              <span className="min-w-0 text-[9px] font-semibold leading-[1.25] text-ink-500">
                {h.indikator}
              </span>
              <span
                className="mt-[3px] h-[7px] w-[7px] shrink-0 rounded-full"
                style={{ backgroundColor: HSE_RAG_COLOR[h.status] }}
              />
            </div>
            <div className="mt-1.5 whitespace-nowrap text-[17px] font-extrabold leading-none tracking-[-0.01em] text-ink-900">
              {h.nilai}
            </div>
            <p className="mt-1 flex-1 text-[9px] leading-[1.4] text-ink-500">{h.sub}</p>
            <div className="mt-1.5">
              <ToneBadge label={h.status} tone={RAG_TONE[h.status]} />
            </div>
          </div>
        ))}
      </div>

      <p className="pt-2 text-[9px] leading-snug text-ink-500">
        Deteksi dini PAK masih parsial: MCU berkala baru 78,4% terhadap target 90% dan pemantauan
        lingkungan kerja baru berjalan di 64 dari 76 unit.
      </p>
    </div>
  );
}
