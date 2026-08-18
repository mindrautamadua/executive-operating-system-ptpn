"use client";

import Link from "next/link";
import { Info } from "lucide-react";
import { ddLookup, type DdStatus } from "@/lib/dd-data";
import { dataTrust } from "@/lib/hc-data";

const STATUS_CLS: Record<DdStatus, string> = {
  Certified: "bg-ptpn-greenLight text-ptpn-green",
  Provisional: "bg-[#fdf3e0] text-[#d98b06]",
  Deprecated: "bg-[#fdecec] text-[#ef4444]",
};

const trustColor = (v: number) =>
  v >= 95 ? "text-ptpn-green" : v >= 90 ? "text-[#2f6fe4]" : "text-[#d98b06]";

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline gap-1.5">
      <span className="w-[52px] shrink-0 text-[9px] uppercase tracking-[0.04em] text-ink-500">
        {label}
      </span>
      <span className="min-w-0 text-[8.5px] font-semibold leading-[1.35] text-ink-700">
        {value}
      </span>
    </div>
  );
}

/**
 * Tombol ⓘ pada angka dashboard yang membuka definisi resmi metrik dari Data Dictionary.
 * Membuat governance melekat pada angkanya, bukan terpisah di halaman lain.
 * Popover murni CSS (hover / focus) sehingga komponen induk tetap server component.
 *
 * Kartu induk harus memakai kelas `group/metric relative !overflow-visible` supaya popover
 * dapat berlabuh pada tepi kartu dan tidak terpotong. Pakai align="right" untuk kartu di
 * kolom kanan agar popover tidak keluar dari area konten.
 */
export function MetricInfo({
  term,
  asOf = dataTrust.asOf,
  align = "left",
  className = "",
}: {
  term: string;
  asOf?: string;
  align?: "left" | "right";
  /** Kelas posisi untuk tombol ⓘ, mis. "absolute right-3 top-3" agar tidak menyita ruang label. */
  className?: string;
}) {
  const e = ddLookup(term);
  if (!e) return null;

  return (
    <>
      <button
        type="button"
        aria-label={`Definisi metrik ${e.term}`}
        aria-haspopup="dialog"
        onClick={(ev) => ev.currentTarget.focus()}
        onKeyDown={(ev) => {
          if (ev.key === "Escape") ev.currentTarget.blur();
        }}
        className={`z-10 -m-2 flex items-center p-2 text-ink-400 transition-colors hover:text-ink-700 focus-visible:text-ink-700 ${className}`}
      >
        <Info size={11} strokeWidth={2.2} />
      </button>

      <span
        role="tooltip"
        className={`invisible absolute top-full z-30 mt-1.5 w-[252px] rounded-xl border border-[#e3e9ef] bg-[var(--surface,#fff)] p-3 text-left opacity-0 shadow-cardHover transition-[opacity,visibility] duration-150 group-hover/metric:visible group-hover/metric:opacity-100 group-hover/metric:delay-300 group-focus-within/metric:visible group-focus-within/metric:opacity-100 ${align === "right" ? "right-0" : "left-0"}`}
      >
        <span className="flex items-start justify-between gap-2">
          <span className="text-[9.5px] font-extrabold leading-[1.3] text-ink-900">
            {e.term}
          </span>
          <span
            className={`shrink-0 rounded-md px-1.5 py-[2px] text-[7.5px] font-extrabold uppercase tracking-[0.03em] ${STATUS_CLS[e.status]}`}
          >
            {e.status}
          </span>
        </span>

        <span className="mt-1.5 block text-[8.5px] leading-[1.45] text-ink-500">
          {e.definition}
        </span>

        <span className="mt-1.5 block rounded-lg bg-[#f8fafc] px-2 py-1.5 text-[8.5px] italic leading-[1.4] text-ink-700">
          {e.formula}
        </span>

        <span className="mt-2 flex flex-col gap-[3px]">
          <Row label="Sumber" value={e.source} />
          <Row label="Pemilik" value={e.owner} />
          <Row label="Update" value={e.frequency} />
          <Row label="As-of" value={asOf} />
          {/* Certified harus bisa menjawab: siapa, kapan, atas validasi apa. */}
          {e.certifiedBy && <Row label="Certifier" value={e.certifiedBy} />}
          {e.certifiedAt && <Row label="Sign-off" value={e.certifiedAt} />}
        </span>

        {e.validation && (
          <span className="mt-1.5 block rounded-lg bg-ptpn-greenLight px-2 py-1.5 text-[9px] leading-[1.4] text-ptpn-greenDark">
            Validasi: {e.validation}
          </span>
        )}

        <span className="mt-2 flex items-center justify-between border-t border-[#eef2f6] pt-2">
          <span className="flex items-baseline gap-1">
            <span className="text-[9px] uppercase tracking-[0.04em] text-ink-500">
              Trust
            </span>
            <span className={`text-[11px] font-extrabold tabular-nums ${trustColor(e.trust)}`}>
              {e.trust}
            </span>
            <span className="text-[9px] text-ink-500">/100</span>
          </span>
          <Link
            href="/data-dictionary"
            className="text-[8.5px] font-semibold text-ptpn-greenDark hover:underline"
          >
            Buka Data Dictionary
          </Link>
        </span>
      </span>
    </>
  );
}
