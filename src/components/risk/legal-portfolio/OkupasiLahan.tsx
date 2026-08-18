import { okupasiCompact } from "@/lib/risk-data-detail";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const PCT = Math.round(
  (okupasiCompact.okupasiBerperkaraRbHa / okupasiCompact.totalSengketaRbHa) * 100,
);

/** Tren penyelesaian okupasi (rb ha) — konteks penurunan sejak 2024. */
const TREN = [
  { periode: "Des 2024", nilai: 24.1 },
  { periode: "Des 2025", nilai: 20.7 },
  { periode: "Mei 2026", nilai: okupasiCompact.okupasiBerperkaraRbHa },
];

const MAX = Math.max(...TREN.map((t) => t.nilai));

const rb = (v: number) => v.toLocaleString("id-ID", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

export function OkupasiLahan() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "180ms" } as React.CSSProperties}
    >
      <SectionHead title="Okupasi Lahan Berperkara" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Luas Okupasi yang Sudah Masuk Proses Litigasi
      </p>

      <div className="mt-2.5 flex items-baseline gap-1">
        <span className="text-[24px] font-extrabold leading-none tracking-[-0.01em] text-ink-900">
          {rb(okupasiCompact.okupasiBerperkaraRbHa)}
        </span>
        <span className="text-[10px] font-bold text-ink-500">rb ha</span>
        <span className="ml-1 text-[8.5px] font-semibold text-ink-500">
          ({PCT}% dari {rb(okupasiCompact.totalSengketaRbHa)} rb ha sengketa)
        </span>
      </div>

      <ul className="mt-2.5 flex min-h-0 flex-1 flex-col justify-center gap-1.5">
        {TREN.map((t) => (
          <li key={t.periode} className="flex shrink-0 items-center gap-2">
            <span className="w-[54px] shrink-0 text-[9px] font-semibold text-ink-500">
              {t.periode}
            </span>
            <span className="h-[9px] min-w-0 flex-1 overflow-hidden rounded-full bg-[#eef2f6]">
              <span
                className="anim-grow-x block h-full rounded-full bg-[#f0662d]"
                style={{ width: `${(t.nilai / MAX) * 100}%` }}
              />
            </span>
            <span className="w-[36px] shrink-0 text-right text-[9.5px] font-extrabold text-ink-900">
              {rb(t.nilai)}
            </span>
          </li>
        ))}
      </ul>

      <p className="mt-1.5 rounded-md bg-[#f8fafc] px-2 py-[5px] text-[9px] leading-[1.4] text-ink-500">
        Subset dari {okupasiCompact.totalSengketaKasus} kasus / {rb(okupasiCompact.totalSengketaRbHa)}{" "}
        rb ha sengketa lahan pada dimensi Aset; sisanya ditangani non-litigasi.{" "}
        {okupasiCompact.note}
      </p>
    </div>
  );
}
