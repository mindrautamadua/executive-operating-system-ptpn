import type { ReactNode } from "react";
import { Delta } from "@/components/ui/Delta";
import { SectionHead } from "@/components/hc/SectionHead";

/* ── KPI strip ────────────────────────────────────────────────────── */

export interface DetailKpi {
  label: string;
  value: string;
  prefix?: string;
  suffix?: string;
  share?: string;
  delta: string;
  trend: "up" | "down" | "flat";
  tone: "neutral" | "red" | "amber" | "green";
  compare: string;
}

const TONE: Record<string, string> = {
  neutral: "text-ink-500",
  red: "text-[#ef4444]",
  amber: "text-[#d98b06]",
  green: "text-ptpn-green",
};

/** Strip KPI seragam untuk halaman detail (5-6 kartu). */
export function DetailKpiStrip({ items }: { items: DetailKpi[] }) {
  return (
    <div
      className={`grid grid-cols-2 gap-3 md:grid-cols-3 ${
        items.length === 5 ? "xl:grid-cols-5" : "xl:grid-cols-6"
      }`}
    >
      {items.map((k, i) => (
        <div
          key={k.label}
          className="card anim-rise px-3.5 pb-3 pt-3"
          style={{ "--d": `${40 * i}ms` } as React.CSSProperties}
        >
          <div className="text-[9.5px] font-semibold text-ink-500">
            <span className={i === 0 ? "" : TONE[k.tone]}>{k.label}</span>
          </div>
          <div className="mt-2 flex items-end justify-between gap-2">
            <span className="whitespace-nowrap text-[22px] font-extrabold leading-none tracking-[-0.02em] text-ink-900">
              {k.prefix && (
                <span className="mr-[2px] text-[11px] font-bold text-ink-400">{k.prefix}</span>
              )}
              {k.value}
              {k.suffix && (
                <span className="ml-1 text-[11px] font-bold text-ink-400">{k.suffix}</span>
              )}
            </span>
            {k.share && (
              <span className={`whitespace-nowrap text-[10px] font-bold ${TONE[k.tone]}`}>
                {k.share}
              </span>
            )}
          </div>
          <div className="mt-2.5 flex items-center gap-1.5">
            {k.trend === "flat" ? (
              <span className="text-[10px] font-semibold text-ink-500">{k.delta}</span>
            ) : (
              <Delta
                value={k.delta.replace("-", "")}
                trend={k.trend === "up" ? "up" : "down"}
                tone={k.tone === "red" ? "bad" : k.tone === "green" ? "good" : undefined}
                size={10}
              />
            )}
            <span className="truncate text-[8.5px] text-ink-400">{k.compare}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Kartu daftar bar ─────────────────────────────────────────────── */

export interface BarRow {
  label: string;
  /** Nilai numerik untuk panjang bar. */
  value: number;
  /** Teks nilai yang ditampilkan; default = value diformat ribuan. */
  valueLabel?: string;
  /** Keterangan kanan kecil, mis. persentase. */
  note?: string;
  color?: string;
}

/** Kartu daftar bar horizontal — dipakai lintas halaman detail. */
export function BarListCard({
  title,
  subtitle,
  rows,
  footer,
  delay = 0,
  max,
}: {
  title: string;
  subtitle?: ReactNode;
  rows: BarRow[];
  footer?: ReactNode;
  delay?: number;
  max?: number;
}) {
  const peak = max ?? Math.max(...rows.map((r) => r.value));
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": `${delay}ms` } as React.CSSProperties}
    >
      <SectionHead title={title} />
      {subtitle && <p className="mt-[3px] text-[9px] text-ink-500">{subtitle}</p>}

      <div className="scroll-thin mt-2 flex min-h-0 flex-1 flex-col justify-between gap-1 overflow-y-auto">
        {rows.map((r) => (
          <div key={r.label} className="shrink-0">
            <div className="flex items-center justify-between gap-2">
              <span className="min-w-0 truncate text-[9px] text-ink-700" title={r.label}>
                {r.label}
              </span>
              <span className="flex shrink-0 items-center gap-1.5">
                <span className="text-[9px] font-extrabold text-ink-900">
                  {r.valueLabel ?? r.value.toLocaleString("id-ID")}
                </span>
                {r.note && <span className="text-[8.5px] text-ink-400">{r.note}</span>}
              </span>
            </div>
            <div className="mt-[3px] h-[5px] w-full overflow-hidden rounded-full bg-[#eef2f6]">
              <div
                className="anim-grow-x h-full rounded-full"
                style={{
                  width: `${Math.max(2, (r.value / peak) * 100)}%`,
                  background: r.color ?? "#1a9c5b",
                }}
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

/* ── Tabel detail ─────────────────────────────────────────────────── */

export interface TableColumn {
  key: string;
  label: string;
  align?: "left" | "right" | "center";
  /** Kelas tambahan untuk sel isi, mis. penebalan atau warna. */
  cellClass?: string;
}

const ALIGN = {
  left: "text-left",
  right: "text-right",
  center: "text-center",
};

/** Tabel statis seragam untuk halaman detail. */
export function DetailTable({
  title,
  subtitle,
  columns,
  rows,
  footerRow,
  note,
}: {
  title: string;
  subtitle?: string;
  columns: TableColumn[];
  rows: Record<string, ReactNode>[];
  /** Baris total opsional, ditebalkan di bawah tabel. */
  footerRow?: Record<string, ReactNode>;
  note?: ReactNode;
}) {
  return (
    <div className="card anim-rise flex min-w-0 flex-col px-4 pb-3 pt-3">
      <SectionHead title={title} />
      {subtitle && <p className="mt-[3px] text-[9px] text-ink-500">{subtitle}</p>}

      <div className="scroll-thin mt-2 min-w-0 overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse">
          <thead>
            <tr className="border-b border-[#eef2f6] text-ink-500">
              {columns.map((c) => (
                <th
                  key={c.key}
                  className={`px-2 pb-1.5 text-[9px] font-bold ${ALIGN[c.align ?? "left"]}`}
                >
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-b border-[#f3f6f9] hover:bg-[#f8fbfd]">
                {columns.map((c) => (
                  <td
                    key={c.key}
                    className={`whitespace-nowrap px-2 py-[7px] text-[9px] text-ink-700 ${
                      ALIGN[c.align ?? "left"]
                    } ${c.cellClass ?? ""}`}
                  >
                    {r[c.key]}
                  </td>
                ))}
              </tr>
            ))}
            {footerRow && (
              <tr className="border-t border-[#e3e9ef] bg-[#fbfcfd]">
                {columns.map((c) => (
                  <td
                    key={c.key}
                    className={`whitespace-nowrap px-2 py-[7px] text-[9px] font-extrabold text-ink-900 ${
                      ALIGN[c.align ?? "left"]
                    }`}
                  >
                    {footerRow[c.key]}
                  </td>
                ))}
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {note && (
        <p className="mt-2 border-t border-[#eef2f6] pt-1.5 text-[9px] leading-[1.4] text-ink-500">
          {note}
        </p>
      )}
    </div>
  );
}

/* ── Panel catatan ────────────────────────────────────────────────── */

export interface DetailNote {
  title: string;
  detail: string;
  tone: "amber" | "blue" | "red" | "green";
}

const NOTE_TONE = {
  amber: "border-[#f6e2b4] bg-[#fdf3e0] text-[#d98b06]",
  blue: "border-[#cfe0fb] bg-[#e8f1fd] text-[#2f6fe4]",
  red: "border-[#f6c9c9] bg-[#fdecec] text-[#ef4444]",
  green: "border-[#c6e8d4] bg-ptpn-greenLight text-ptpn-green",
};

/** Panel catatan analitik + definisi data di kolom kanan halaman detail. */
export function NotesPanel({
  notes,
  definitions,
}: {
  notes: DetailNote[];
  definitions: { term: string; text: string }[];
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="card anim-rise px-3.5 pb-3.5 pt-3">
        <h3 className="text-[10px] font-extrabold uppercase tracking-[0.05em] text-ink-900">
          Catatan Analitik
        </h3>
        <div className="mt-2 flex flex-col gap-1.5">
          {notes.map((n) => (
            <div key={n.title} className={`rounded-lg border px-2.5 py-[7px] ${NOTE_TONE[n.tone]}`}>
              <div className="text-[9px] font-extrabold">{n.title}</div>
              <p className="mt-[2px] text-[8.5px] leading-[1.4] text-ink-700">{n.detail}</p>
            </div>
          ))}
        </div>
      </div>

      <div
        className="card anim-rise px-3.5 pb-3.5 pt-3"
        style={{ "--d": "80ms" } as React.CSSProperties}
      >
        <h3 className="text-[10px] font-extrabold uppercase tracking-[0.05em] text-ink-900">
          Definisi &amp; Sumber
        </h3>
        <dl className="mt-2 flex flex-col gap-1.5 text-[8.5px] leading-[1.4]">
          {definitions.map((d) => (
            <div key={d.term}>
              <dt className="font-bold text-ink-700">{d.term}</dt>
              <dd className="text-ink-500">{d.text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
