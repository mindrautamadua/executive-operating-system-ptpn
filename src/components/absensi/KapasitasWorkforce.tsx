import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";
import { kapasitasWorkforce } from "@/lib/absensi-data";

const STAT = [
  { label: "Kebutuhan", value: kapasitasWorkforce.required, sub: "FTE" },
  { label: "Tersedia Efektif", value: kapasitasWorkforce.tersedia, sub: "setelah absence" },
  { label: "Gap Kapasitas", value: kapasitasWorkforce.gap, sub: `FTE (${kapasitasWorkforce.gapPct})`, bad: true },
];

/** Absensi diterjemahkan ke kapasitas workforce — jembatan ke Workforce Planning. */
export function KapasitasWorkforce() {
  const s = kapasitasWorkforce.spotlight;
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "180ms" } as React.CSSProperties}
    >
      <div className="flex items-center gap-1.5">
        <h3 className="card-title-navy">Kapasitas Workforce Efektif</h3>
        <span className="tone-blue ml-auto flex items-center gap-1 rounded px-1.5 py-[1px] text-[9px] font-bold">
          <Users size={10} strokeWidth={2} /> Mei 2026
        </span>
      </div>

      <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-1.5">
        {STAT.map((t) => (
          <div key={t.label} className="rounded-lg bg-[#f6f9fc] px-2 py-1.5">
            <div className="text-[8.5px] font-semibold uppercase tracking-[0.04em] text-ink-400">
              {t.label}
            </div>
            <div
              className={`mt-[3px] text-[13px] font-bold leading-none tabular-nums ${
                t.bad ? "text-[#c2402a]" : "text-ink-900"
              }`}
            >
              {t.value}
            </div>
            <div className="mt-[3px] text-[8.5px] leading-tight text-ink-500">{t.sub}</div>
          </div>
        ))}
      </div>

      {/* Spotlight unit dengan gap terbesar — diagnosis, bukan vonis disiplin */}
      <div className="mt-1.5 flex min-h-0 flex-1 flex-col justify-center rounded-lg border border-[#eef2f6] px-2.5 py-1.5">
        <div className="flex items-center justify-between">
          <span className="text-[9.5px] font-bold text-ink-900">{s.unit}</span>
          <span className="tone-red rounded px-1.5 py-[1px] text-[9px] font-bold">
            Gap {s.gap}
          </span>
        </div>
        <div className="mt-[4px] flex gap-3 text-[9px] tabular-nums text-ink-700">
          <span>Butuh {s.butuh}</span>
          <span>Efektif {s.efektif}</span>
          <span>Lembur {s.lembur}</span>
        </div>
        <p className="mt-[4px] text-[9px] leading-[1.4] text-ink-500">{s.diagnosis}</p>
      </div>

      <p className="mt-1.5 text-[9px] leading-[1.4] text-ink-500">
        {kapasitasWorkforce.asosiasiProduktivitas}
      </p>

      <Link
        href="/workforce-planning"
        className="link-more mt-auto flex items-center gap-1 pt-1.5"
      >
        Lihat Workforce Planning <ArrowRight size={11} />
      </Link>
    </div>
  );
}
