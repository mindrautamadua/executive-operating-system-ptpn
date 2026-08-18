import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { SectionHead } from "@/components/hc/SectionHead";
import { nineBoxDetail, type NineBoxDetail } from "@/lib/ti-detail";

/* ── 9 Box Grid versi detail ──────────────────────────────────────── */

const CELL_TONES: Record<NineBoxDetail["tone"], string> = {
  lavender: "bg-[#edeaf8] text-[#5b4a9e]",
  greenSoft: "bg-[#e4f3e0] text-[#2f7a3f]",
  green: "bg-[#d2ecd9] text-[#0f7a44]",
  amber: "bg-[#fdeccb] text-[#a06b08]",
  amberSoft: "bg-[#fdf3dc] text-[#a06b08]",
  red: "bg-[#fbe1e1] text-[#b53d3d]",
};

const POTENTIAL_LABELS = ["High", "Medium", "Low"];
const PERFORMANCE_LABELS = ["Low", "Medium", "High"];

/** Grid 9-box berukuran penuh: nama kotak, jumlah, porsi, dan tindakan talenta. */
export function NineBoxDetailGrid() {
  return (
    <div className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3">
      <SectionHead title="Talent Portfolio — 9 Box Grid" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Setiap kotak menampilkan jumlah talenta, porsi populasi, dan tindakan talenta yang disepakati
      </p>

      <div className="mt-3 flex min-h-0 flex-1 gap-2">
        <div
          className="flex shrink-0 items-center justify-center text-[9px] font-bold uppercase tracking-[0.12em] text-ink-500"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          Potential
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex min-h-0 flex-1 gap-2">
            <div className="flex w-[44px] shrink-0 flex-col gap-2">
              {POTENTIAL_LABELS.map((l) => (
                <div
                  key={l}
                  className="flex flex-1 items-center justify-end pr-1 text-[8.5px] font-semibold text-ink-400"
                >
                  {l}
                </div>
              ))}
            </div>

            <div className="grid min-w-0 flex-1 grid-cols-3 grid-rows-3 gap-2">
              {nineBoxDetail.flat().map((cell) => (
                <div
                  key={cell.box}
                  className={`flex flex-col justify-between rounded-lg px-2.5 py-2 ${CELL_TONES[cell.tone]}`}
                >
                  <div className="flex items-start justify-between gap-1">
                    <span className="text-[8.5px] font-extrabold uppercase tracking-[0.04em]">
                      {cell.name}
                    </span>
                    <span className="shrink-0 rounded-[4px] bg-white/60 px-1 text-[7.5px] font-bold">
                      Box {cell.box}
                    </span>
                  </div>
                  <div className="mt-1 flex items-end gap-1.5">
                    <span className="text-[19px] font-extrabold leading-none">
                      {cell.value.toLocaleString("id-ID")}
                    </span>
                    <span className="text-[8.5px] font-semibold opacity-75">({cell.pct})</span>
                  </div>
                  <span className="mt-1 truncate text-[9px] font-medium opacity-80" title={cell.action}>
                    {cell.action}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="ml-[52px] mt-1.5 grid grid-cols-3 gap-2">
            {PERFORMANCE_LABELS.map((l) => (
              <div key={l} className="text-center text-[8.5px] font-semibold text-ink-400">
                {l}
              </div>
            ))}
          </div>
          <div className="ml-[52px] mt-[3px] text-center text-[9px] font-bold uppercase tracking-[0.12em] text-ink-500">
            Performance
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Funnel readiness ─────────────────────────────────────────────── */

export function PipelineFunnel({
  stages,
}: {
  stages: {
    label: string;
    value: number;
    pct: string;
    color: string;
    width: number;
    konversi: string;
    keterangan: string;
  }[];
}) {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "40ms" } as React.CSSProperties}
    >
      <SectionHead title="Funnel Kesiapan Suksesi" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Lebar bar mengikuti posisi tahap pada funnel, angka kanan = konversi 12 bulan terakhir
      </p>

      <div className="mt-2.5 flex min-h-0 flex-1 flex-col justify-between gap-2">
        {stages.map((s) => (
          <div key={s.label} className="shrink-0">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[9.5px] font-bold text-ink-900">{s.label}</span>
              <span className="flex items-center gap-1.5">
                <span className="text-[10px] font-extrabold text-ink-900">
                  {s.value.toLocaleString("id-ID")}
                </span>
                <span className="text-[8.5px] font-semibold text-ink-400">{s.pct}</span>
              </span>
            </div>
            <div
              className="anim-grow-x mt-[3px] flex h-[22px] items-center justify-end rounded-md px-2"
              style={{ width: `${s.width}%`, background: s.color }}
            >
              <span className="text-[9px] font-bold text-white/90">{s.konversi}</span>
            </div>
            <p className="mt-[3px] text-[9px] leading-[1.4] text-ink-500">{s.keterangan}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Bar coverage bertumpuk per posisi ────────────────────────────── */

const COVERAGE_LEGEND = [
  { label: "Ready Now", color: "#0f7a44" },
  { label: "Ready in 1–2 Tahun", color: "#3cae6a" },
  { label: "Ready in 3–5 Tahun", color: "#f2c53d" },
  { label: "Tanpa Suksesor", color: "#cbd5e1" },
];

export function CoverageStackBars({
  rows,
}: {
  rows: { posisi: string; total: number; coverage: number; split: [number, number, number, number] }[];
}) {
  return (
    <div className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3">
      <SectionHead title="Komposisi Kesiapan per Posisi Kritikal" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Coverage = Ready Now + Ready in 1–2 Tahun terhadap seluruh posisi pada kelompok
      </p>

      <div className="mt-2.5 flex min-h-0 flex-1 flex-col justify-between gap-1.5">
        {rows.map((r) => (
          <div key={r.posisi} className="shrink-0">
            <div className="flex items-center justify-between gap-2">
              <span className="truncate text-[9px] font-semibold text-ink-700">
                {r.posisi}
                <span className="ml-1.5 font-medium text-ink-400">{r.total} posisi</span>
              </span>
              <span
                className={`shrink-0 text-[9px] font-extrabold ${
                  r.coverage >= 70 ? "text-ptpn-green" : r.coverage >= 62 ? "text-[#d98b06]" : "text-[#ef4444]"
                }`}
              >
                {r.coverage}%
              </span>
            </div>
            <div className="mt-[3px] flex h-[7px] w-full overflow-hidden rounded-full bg-[#eef2f6]">
              {r.split.map((v, i) => (
                <div
                  key={i}
                  className="h-full"
                  style={{ width: `${v}%`, background: COVERAGE_LEGEND[i].color }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <ul className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-[#eef2f6] pt-1.5">
        {COVERAGE_LEGEND.map((l) => (
          <li key={l.label} className="flex items-center gap-1">
            <span
              className="h-[6px] w-[6px] shrink-0 rounded-[2px]"
              style={{ background: l.color }}
            />
            <span className="text-[9px] font-medium text-ink-500">{l.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── Rantai outcome development ───────────────────────────────────── */

export function RoiChain({
  steps,
  note,
}: {
  steps: { label: string; value: string; sub: string }[];
  note?: ReactNode;
}) {
  return (
    <div className="card anim-rise flex flex-col px-4 pb-3 pt-3">
      <SectionHead title="Rantai Outcome Development" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Kontribusi terestimasi dari investasi ke dampak kinerja
      </p>

      <div className="mt-3 flex items-stretch gap-2">
        {steps.map((s, i) => (
          <div key={s.label} className="flex min-w-0 flex-1 items-center gap-2">
            <div className="min-w-0 flex-1 rounded-lg border border-[#e9eef3] bg-[#fbfdfe] px-3 py-2.5">
              <div className="truncate text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
                {s.label}
              </div>
              <div className="mt-1 text-[16px] font-extrabold leading-none text-ink-900">
                {s.value}
              </div>
              <div className="mt-1 truncate text-[9px] text-ink-500">{s.sub}</div>
            </div>
            {i < steps.length - 1 && (
              <ArrowRight size={13} className="shrink-0 text-ink-300" />
            )}
          </div>
        ))}
      </div>

      {note && (
        <p className="mt-2 border-t border-[#eef2f6] pt-1.5 text-[9px] leading-[1.4] text-ink-500">
          {note}
        </p>
      )}
    </div>
  );
}

/* ── Pil status ───────────────────────────────────────────────────── */

const PILL_TONES = {
  green: "bg-ptpn-greenLight text-ptpn-green",
  amber: "bg-[#fdf3e0] text-[#d98b06]",
  red: "bg-[#fdecec] text-[#ef4444]",
  slate: "bg-[#eef2f6] text-ink-500",
} as const;

/** Pil kecil untuk kolom readiness, flight risk, dan prioritas pada tabel. */
export function Pill({
  label,
  tone,
}: {
  label: string;
  tone: keyof typeof PILL_TONES;
}) {
  return (
    <span className={`inline-block rounded-full px-2 py-[2px] text-[8.5px] font-bold ${PILL_TONES[tone]}`}>
      {label}
    </span>
  );
}

/** Pemetaan baku status ke warna pil, agar konsisten lintas halaman detail. */
export const readinessTone = (v: string): keyof typeof PILL_TONES =>
  v === "Ready Now" ? "green" : v.includes("1-2") || v.includes("1–2") ? "amber" : "slate";

export const riskTone = (v: string): keyof typeof PILL_TONES =>
  v === "High" ? "red" : v === "Medium" ? "amber" : "green";
