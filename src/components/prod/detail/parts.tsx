import Link from "next/link";
import { ArrowLeft } from "lucide-react";

/** Elemen bersama halaman detail (mockup) dimensi Produksi & Operasi. */

export const TH =
  "px-2 py-1.5 text-left text-[9px] font-extrabold uppercase tracking-[0.04em] text-ink-500";
export const TD = "px-2 py-1.5 text-[9px] text-ink-700 border-t border-[var(--border-hair)]";

export function Pill({
  tone,
  children,
}: {
  tone: "good" | "warn" | "bad";
  children: React.ReactNode;
}) {
  const cls =
    tone === "good"
      ? "bg-emerald-500/10 text-emerald-600"
      : tone === "warn"
        ? "bg-amber-500/10 text-amber-600"
        : "bg-red-500/10 text-red-600";
  return (
    <span className={`inline-block rounded-full px-2 py-[2px] text-[9px] font-bold ${cls}`}>
      {children}
    </span>
  );
}

export function DetailCard({
  id,
  title,
  subtitle,
  children,
  note,
}: {
  id: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  note?: string;
}) {
  return (
    <section id={id} className="card scroll-mt-4 px-4 pb-3 pt-3">
      <h3 className="text-[10px] font-extrabold uppercase tracking-[0.05em] text-ink-900">
        {title}
      </h3>
      <p className="mt-[3px] text-[9px] text-ink-500">{subtitle}</p>
      <div className="mt-2 overflow-x-auto">{children}</div>
      {note && <p className="mt-2 text-[9px] leading-snug text-ink-500">{note}</p>}
    </section>
  );
}

export function DetailHeader({
  backHref,
  backLabel,
  title,
  subtitle,
}: {
  backHref: string;
  backLabel: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="px-5 pt-4">
      <Link
        href={backHref}
        className="flex items-center gap-1 text-[9.5px] font-semibold text-ptpn-green hover:underline"
      >
        <ArrowLeft size={11} /> {backLabel}
      </Link>
      <div className="mt-1.5 flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <h1 className="text-[17px] font-extrabold text-ink-900">{title}</h1>
          <p className="mt-0.5 text-[9.5px] text-ink-500">{subtitle}</p>
        </div>
        <span className="text-[8.5px] font-semibold text-amber-600">
          Mockup — angka ilustratif konsisten dengan kartu ringkas
        </span>
      </div>
    </div>
  );
}

/** Panel penutup: Catatan Analitik & Definisi/Sumber berdampingan. */
export function DetailNotes({
  analitik,
  definisi,
}: {
  analitik: string[];
  definisi: string[];
}) {
  return (
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
      {(
        [
          ["Catatan Analitik", analitik],
          ["Definisi & Sumber", definisi],
        ] as const
      ).map(([title, items]) => (
        <section key={title} className="card px-4 pb-3 pt-3">
          <h3 className="text-[10px] font-extrabold uppercase tracking-[0.05em] text-ink-900">
            {title}
          </h3>
          <ul className="mt-2 space-y-1.5 text-[9px] leading-snug text-ink-600">
            {items.map((t) => (
              <li key={t}>· {t}</li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
