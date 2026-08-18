import { Compass } from "lucide-react";
import { aspirasiMobilitas } from "@/lib/profil-data";

const ROWS = [
  { label: "Aspirasi Karier", value: aspirasiMobilitas.aspirasi, bold: true },
  { label: "Jalur Pilihan", value: aspirasiMobilitas.jalur },
  { label: "Kesediaan Relokasi", value: aspirasiMobilitas.relokasi, badge: true },
  { label: "Cakupan", value: aspirasiMobilitas.cakupanRelokasi },
  { label: "Kendala", value: aspirasiMobilitas.kendala },
];

/**
 * Aspirasi & preferensi mobilitas dari career conversation — memastikan
 * rekomendasi mobility/rotasi bisa dieksekusi, bukan asumsi.
 */
export function AspirasiMobilitasCard() {
  return (
    <div className="card flex h-full flex-col px-4 pb-3.5 pt-3.5">
      <h3 className="flex items-center gap-1.5 text-[11px] font-bold text-ink-900">
        <Compass size={13} className="text-[#8b5cf6]" />
        Aspirasi &amp; Mobilitas
      </h3>

      <div className="mt-2.5 min-h-0 flex-1 space-y-2">
        {ROWS.map((r) => (
          <div key={r.label} className="flex items-start justify-between gap-3">
            <span className="shrink-0 text-[9px] text-ink-500">{r.label}</span>
            {r.badge ? (
              <span className="rounded-full bg-ptpn-greenLight px-2 py-[2px] text-[8.5px] font-extrabold text-ptpn-greenDark">
                {r.value}
              </span>
            ) : (
              <span
                className={`min-w-0 text-right text-[9px] leading-snug ${
                  r.bold ? "font-extrabold text-ink-900" : "font-semibold text-ink-700"
                }`}
              >
                {r.value}
              </span>
            )}
          </div>
        ))}
      </div>

      <p className="mt-2 rounded-lg bg-[#f5f8fa] px-2.5 py-[6px] text-[9px] leading-snug text-ink-500">
        {aspirasiMobilitas.wawancara}
      </p>
    </div>
  );
}
