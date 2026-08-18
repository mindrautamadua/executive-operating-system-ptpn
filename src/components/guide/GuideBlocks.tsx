import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";

/** Kartu standar guide — mengikuti pola card app (border tipis, radius xl). */
export function GuideCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`anim-rise rounded-xl border border-[#e9eef3] bg-white p-4 shadow-card ${className}`}
    >
      {children}
    </section>
  );
}

/** Judul seksi di dalam kartu, gaya seragam dengan SectionLabel dashboard. */
export function GuideTitle({ kicker, children }: { kicker?: string; children: ReactNode }) {
  return (
    <div className="mb-3">
      {kicker && (
        <div className="text-[8.5px] font-bold uppercase tracking-[0.08em] text-ptpn-green">
          {kicker}
        </div>
      )}
      <h2 className="mt-[2px] text-[13px] font-extrabold tracking-tight text-[#1b3a6b]">
        {children}
      </h2>
    </div>
  );
}

/**
 * Alur vertikal berpanah — dipakai untuk journey, pola baca, framework
 * keputusan, dan tangga literasi. Setiap langkah bisa berupa tautan.
 */
export function FlowList({
  items,
}: {
  items: {
    lead: string;
    title: string;
    desc?: string;
    href?: string;
    hrefLabel?: string;
  }[];
}) {
  return (
    <ol className="flex flex-col">
      {items.map((it, i) => (
        <li key={it.lead + it.title} className="flex flex-col">
          <div className="flex items-start gap-2.5 rounded-lg border border-[#eef2f6] bg-[#f8fafc] px-3 py-2">
            <span className="mt-[1px] shrink-0 rounded bg-[#e8f1fd] px-1.5 py-[2px] text-[9px] font-extrabold uppercase tracking-[0.04em] text-[#1b3a6b]">
              {it.lead}
            </span>
            <span className="min-w-0">
              <span className="block text-[10.5px] font-bold leading-snug text-ink-900">
                {it.title}
              </span>
              {it.desc && (
                <span className="mt-[2px] block text-[9px] leading-relaxed text-ink-500">
                  {it.desc}
                </span>
              )}
              {it.href && (
                <Link
                  href={it.href}
                  className="mt-1 inline-flex items-center gap-1 text-[8.5px] font-bold text-ptpn-green hover:underline"
                >
                  {it.hrefLabel ?? "Buka"}
                  <ArrowRight size={9} />
                </Link>
              )}
            </span>
          </div>
          {i < items.length - 1 && (
            <span className="flex justify-center py-[3px] text-ink-300">
              <ArrowDown size={11} />
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}

/** Baris tanya-jawab ringkas (pertanyaan eksekutif, aturan trust, dsb.). */
export function QaRow({ q, a }: { q: string; a: string }) {
  return (
    <div className="flex items-start gap-2.5 border-b border-[#f0f3f6] py-2 last:border-b-0">
      <span className="w-[110px] shrink-0 text-[9.5px] font-extrabold text-[#1b3a6b]">{q}</span>
      <span className="min-w-0 text-[9.5px] leading-relaxed text-ink-700">{a}</span>
    </div>
  );
}

const TONE_CLS: Record<"green" | "amber" | "red", string> = {
  green: "bg-ptpn-greenLight text-ptpn-green",
  amber: "bg-[#fdf3e0] text-[#d98b06]",
  red: "bg-[#fdecec] text-[#ef4444]",
};

/** Pill kecil berwarna tone status. */
export function TonePill({
  tone,
  children,
}: {
  tone: "green" | "amber" | "red";
  children: ReactNode;
}) {
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded px-1.5 py-[2px] text-[9px] font-extrabold ${TONE_CLS[tone]}`}
    >
      {children}
    </span>
  );
}
