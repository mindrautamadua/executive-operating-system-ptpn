import Link from "next/link";
import { ArrowRight, Banknote } from "lucide-react";
import { ekonomiAbsensi } from "@/lib/absensi-data";

const STAT = [
  { label: "Biaya Absensi", value: ekonomiAbsensi.biayaAbsensi, sub: `${ekonomiAbsensi.hariHilang} hari kerja hilang` },
  { label: "Biaya Lembur", value: ekonomiAbsensi.biayaLembur, sub: `${ekonomiAbsensi.jamLembur} jam · ${ekonomiAbsensi.lemburPerPayroll} payroll` },
  { label: "Produktivitas Loss", value: ekonomiAbsensi.produktivitasLoss, sub: "estimasi output hilang" },
];

/** Cost of absence + overtime economics — absensi sebagai eksposur ekonomi. */
export function EkonomiAbsensi() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <div className="flex items-center gap-1.5">
        <h3 className="card-title-navy">Ekonomi Absensi &amp; Lembur</h3>
        <span className="tone-amber ml-auto flex items-center gap-1 rounded px-1.5 py-[1px] text-[9px] font-bold">
          <Banknote size={10} strokeWidth={2} /> Bulanan
        </span>
      </div>

      <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-1.5">
        {STAT.map((s) => (
          <div key={s.label} className="rounded-lg bg-[#f6f9fc] px-2 py-1.5">
            <div className="text-[8.5px] font-semibold uppercase tracking-[0.04em] text-ink-400">
              {s.label}
            </div>
            <div className="mt-[3px] text-[13px] font-bold leading-none tabular-nums text-ink-900">
              {s.value}
            </div>
            <div className="mt-[3px] text-[8.5px] leading-tight text-ink-500">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="tone-red mt-1.5 flex items-center justify-between rounded-lg px-2.5 py-[5px]">
        <span className="text-[9.5px] font-semibold">Total Eksposur Ekonomi</span>
        <span className="text-[12px] font-bold tabular-nums">
          {ekonomiAbsensi.totalEksposur}
        </span>
      </div>

      <p className="mt-1.5 text-[9px] leading-[1.4] text-ink-500">
        {ekonomiAbsensi.konsentrasi}
      </p>

      {/* Skenario hire vs overtime — jembatan ke Scenario Simulation */}
      <div className="mt-1.5 flex min-h-0 flex-1 flex-col justify-center gap-[3px] rounded-lg border border-[#eef2f6] px-2.5 py-1.5">
        <div className="text-[9px] text-ink-700">{ekonomiAbsensi.skenario.current}</div>
        <div className="text-[9px] text-ink-700">{ekonomiAbsensi.skenario.alternatif}</div>
        <div className="text-[9.5px] font-bold text-ptpn-green">
          {ekonomiAbsensi.skenario.verdict}
        </div>
      </div>

      <Link
        href="/scenario-simulation"
        className="link-more mt-auto flex items-center gap-1 pt-1.5"
      >
        Uji skenario Hire vs Overtime <ArrowRight size={11} />
      </Link>
    </div>
  );
}
