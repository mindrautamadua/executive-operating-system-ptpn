import { awarenessProgram } from "@/lib/tik-data";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";
import { PALETTE } from "@/lib/chart-palette";

const angka = (v: number) => v.toLocaleString("id-ID");
const pct = (v: number) => `${v.toLocaleString("id-ID", { minimumFractionDigits: 1 })}%`;

const warna = (v: number) => (v >= 80 ? PALETTE.green : v >= 60 ? PALETTE.amber : PALETTE.red);

/** Cakupan program awareness + hasil simulasi phishing. */
export function AwarenessProgram() {
  return (
    <div
      className="card anim-rise flex h-full min-h-0 flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "210ms" } as React.CSSProperties}
    >
      <SectionHead title="Program Awareness & Simulasi Phishing" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Cakupan Peserta terhadap Populasi Sasaran · click rate phishing 6,2% vs ambang ≤3%
      </p>

      <div className="mt-2 flex items-center gap-2 rounded-xl border border-[#f3e3c3] bg-[#fdf9f0] px-3 py-2">
        <span className="text-[19px] font-extrabold leading-none tracking-[-0.01em] text-[#d98b06]">
          6,2%
        </span>
        <p className="text-[8.5px] leading-snug text-ink-500">
          <span className="font-bold text-ink-900">Phishing Click Rate Mei 2026</span> — turun dari
          7,6% pada Q1, namun masih dua kali ambang internal ≤3%.
        </p>
      </div>

      <div className="scroll-thin mt-2 flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto">
        {awarenessProgram.map((p) => (
          <div key={p.program}>
            <div className="flex items-center justify-between gap-2">
              <span className="min-w-0 truncate text-[9.5px] font-bold text-ink-900">
                {p.program}
              </span>
              <span className="shrink-0 text-[8.5px] font-semibold text-ink-500">
                {angka(p.peserta)}/{angka(p.populasiSasaran)} · {p.frekuensi}
              </span>
            </div>

            <div className="mt-1.5 flex items-center gap-1.5">
              <div className="h-[7px] min-w-0 flex-1 overflow-hidden rounded-full bg-[#eef2f6]">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${p.cakupanPct}%`, backgroundColor: warna(p.cakupanPct) }}
                />
              </div>
              <span className="w-[38px] shrink-0 text-right text-[8.5px] font-bold text-ink-700">
                {pct(p.cakupanPct)}
              </span>
            </div>

            <p className="mt-1 text-[9px] leading-snug text-ink-500">{p.hasil}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
