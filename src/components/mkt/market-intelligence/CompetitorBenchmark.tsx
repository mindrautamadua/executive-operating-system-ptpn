import { competitorBench } from "@/lib/hilir-stok-margin-data";
import { ScopeNote } from "@/components/ui/ScopeNote";
import { SectionHead } from "../../hc/SectionHead";

const num = (v: number, d = 1) =>
  v.toLocaleString("id-ID", { minimumFractionDigits: d, maximumFractionDigits: d });

/** Benchmark ASP, yield & margin CPO vs emiten sawit publik. */
export function CompetitorBenchmark() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      {/* Baris PTPN dibandingkan sebagai satu grup terhadap emiten peer. */}
      <SectionHead title="Competitor Benchmark" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        ASP, Yield &amp; Margin CPO vs Emiten Sawit (estimasi publik YTD)
      </p>

      <div className="mt-2 grid grid-cols-[minmax(0,1.25fr)_72px_66px_66px_minmax(0,1.35fr)] items-center gap-x-2 text-[9px] font-semibold uppercase tracking-[0.04em] text-ink-500">
        <span>Perusahaan</span>
        <span className="text-right">ASP CPO</span>
        <span className="text-right">Yield TBS</span>
        <span className="text-right">Margin</span>
        <span>Catatan</span>
      </div>

      <ul className="mt-1 flex min-h-0 flex-1 flex-col justify-between gap-1">
        {competitorBench.map((c) => {
          const isPtpn = c.perusahaan === "PTPN Group";
          return (
            <li
              key={c.perusahaan}
              className={`grid grid-cols-[minmax(0,1.25fr)_72px_66px_66px_minmax(0,1.35fr)] items-center gap-x-2 rounded-lg border px-2.5 py-1.5 ${
                isPtpn
                  ? "border-ptpn-green/40 bg-ptpn-greenLight/40"
                  : "border-[#eef2f6] bg-[#fbfcfd]"
              }`}
            >
              <span
                className={`truncate text-[9.5px] font-extrabold ${
                  isPtpn ? "text-ptpn-green" : "text-ink-900"
                }`}
              >
                {c.perusahaan}
              </span>
              <span className="text-right text-[9px] font-bold text-ink-900">
                Rp {c.aspCpoRpKg.toLocaleString("id-ID")}
              </span>
              <span className="text-right text-[9px] font-semibold text-ink-700">
                {num(c.yieldTbsTonHa)} t/ha
              </span>
              <span className="text-right text-[9px] font-extrabold text-ink-900">
                {num(c.marginCpoPct)}%
              </span>
              <span className="truncate text-[8.5px] text-ink-500" title={c.catatan}>
                {c.catatan}
              </span>
            </li>
          );
        })}
      </ul>

      <p className="mt-1.5 truncate text-[9px] text-ink-500">
        Margin CPO PTPN tertinggi di peer set — ditopang HPP rendah; gap yield jadi agenda hulu.
      </p>
    </div>
  );
}
