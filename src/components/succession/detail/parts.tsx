import type { ReactNode } from "react";
import { SectionHead } from "@/components/hc/SectionHead";
import type { NineBoxCell } from "@/lib/succession-detail";

/* ── 9 Box grid versi detail ──────────────────────────────────────── */

const CELL_TONES: Record<NineBoxCell["tone"], string> = {
  green: "bg-[#d2ecd9] text-[#0f7a44]",
  greenSoft: "bg-[#e4f3e0] text-[#2f7a3f]",
  greenPale: "bg-[#eef7ea] text-[#3d7a4a]",
  amber: "bg-[#fdeccb] text-[#a06b08]",
  red: "bg-[#fbe1e1] text-[#b53d3d]",
};

const POTENSI = ["Tinggi", "Menengah", "Rendah"];
const KINERJA = ["Rendah", "Menengah", "Tinggi"];

/** Grid 9-box ukuran penuh: nama kotak, jumlah, porsi populasi, dan tindakan talenta. */
export function NineBoxDetailGrid({
  cells,
  title = "Peta Suksesi — 9 Box Talent Grid",
  subtitle,
}: {
  /** 9 sel dalam urutan kanonik: baris atas = potensi tinggi, kolom kanan = kinerja tinggi. */
  cells: NineBoxCell[];
  title?: string;
  subtitle?: string;
}) {
  return (
    <div className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3">
      <SectionHead title={title} />
      {subtitle && <p className="mt-[3px] text-[9px] text-ink-500">{subtitle}</p>}

      <div className="mt-3 flex min-h-0 flex-1 gap-2">
        <div
          className="flex shrink-0 items-center justify-center text-[9px] font-bold uppercase tracking-[0.12em] text-ink-500"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          Potensi
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex min-h-0 flex-1 gap-2">
            <div className="flex w-[52px] shrink-0 flex-col gap-2">
              {POTENSI.map((l) => (
                <div
                  key={l}
                  className="flex flex-1 items-center justify-end pr-1 text-[8.5px] font-semibold text-ink-400"
                >
                  {l}
                </div>
              ))}
            </div>

            <div className="grid min-w-0 flex-1 grid-cols-3 grid-rows-3 gap-2">
              {cells.map((cell) => (
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
                    <span className="text-[8.5px] font-semibold opacity-75">({cell.pct}%)</span>
                  </div>
                  <span className="mt-1 truncate text-[9px] font-medium opacity-80" title={cell.action}>
                    {cell.action}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="ml-[60px] mt-1.5 grid grid-cols-3 gap-2">
            {KINERJA.map((l) => (
              <div key={l} className="text-center text-[8.5px] font-semibold text-ink-400">
                {l}
              </div>
            ))}
          </div>
          <div className="ml-[60px] mt-[3px] text-center text-[9px] font-bold uppercase tracking-[0.12em] text-ink-500">
            Kinerja
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Kartu daftar progres ─────────────────────────────────────────── */

const HEALTH_COLOR = {
  "on-track": "#1a9c5b",
  "at-risk": "#f5a524",
  behind: "#ef4444",
} as const;

/** Daftar inisiatif dengan bar progres berwarna menurut kesehatan program. */
export function ProgressListCard({
  title,
  subtitle,
  rows,
  footer,
  delay = 0,
}: {
  title: string;
  subtitle?: ReactNode;
  rows: { label: string; value: number; note?: string; kesehatan: keyof typeof HEALTH_COLOR }[];
  footer?: ReactNode;
  delay?: number;
}) {
  return (
    <div
      className="card anim-rise flex h-full min-w-0 flex-col px-4 pb-3 pt-3"
      style={{ "--d": `${delay}ms` } as React.CSSProperties}
    >
      <SectionHead title={title} />
      {subtitle && <p className="mt-[3px] text-[9px] text-ink-500">{subtitle}</p>}

      <div className="mt-2 flex min-h-0 flex-1 flex-col justify-between gap-1">
        {rows.map((r) => (
          <div key={r.label} className="shrink-0">
            <div className="flex items-center justify-between gap-2">
              <span className="min-w-0 truncate text-[9px] text-ink-700" title={r.label}>
                {r.label}
              </span>
              <span className="flex shrink-0 items-center gap-1.5">
                <span className="text-[9px] font-extrabold text-ink-900">{r.value}%</span>
                {r.note && <span className="text-[8.5px] text-ink-400">{r.note}</span>}
              </span>
            </div>
            <div className="mt-[3px] h-[5px] w-full overflow-hidden rounded-full bg-[#eef2f6]">
              <div
                className="anim-grow-x h-full rounded-full"
                style={{ width: `${r.value}%`, background: HEALTH_COLOR[r.kesehatan] }}
              />
            </div>
          </div>
        ))}
      </div>

      {footer && (
        <p className="mt-2 border-t border-[#eef2f6] pt-1.5 text-[9px] leading-[1.4] text-ink-500">
          {footer}
        </p>
      )}
    </div>
  );
}
