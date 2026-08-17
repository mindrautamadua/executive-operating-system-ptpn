import { BookOpenCheck } from "lucide-react";
import { decisionPortfolio } from "@/lib/stg-data";
import { SectionHead } from "@/components/hc/SectionHead";

function Stat({ label, value, tone }: { label: string; value: string; tone?: "good" | "bad" }) {
  return (
    <div className="rounded-lg bg-[#f5f8fa] px-2 py-1.5">
      <div className="text-[7.5px] font-semibold uppercase tracking-[0.04em] text-ink-400">
        {label}
      </div>
      <div
        className={`mt-[2px] text-[13px] font-extrabold leading-none tabular-nums ${
          tone === "good" ? "text-ptpn-green" : tone === "bad" ? "text-[#ef4444]" : "text-ink-900"
        }`}
      >
        {value}
      </div>
    </div>
  );
}

/**
 * Decision Portfolio: menilai kualitas pengambilan keputusan sebagai
 * portofolio — berapa nilai menunggu, berapa yang dijanjikan keputusan
 * terukur, dan berapa yang benar-benar terealisasi. Melengkapi register
 * (daftar) dan outcome card (per keputusan) dengan angka agregat.
 */
export function DecisionPortfolioCard() {
  const p = decisionPortfolio;
  return (
    <div className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3" style={{ "--d": "160ms" } as React.CSSProperties}>
      <SectionHead title="Decision Portfolio" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Kualitas pengambilan keputusan sebagai portofolio — bukan sekadar antrian
      </p>

      <div className="mt-2 grid grid-cols-4 gap-1.5">
        <Stat label="Total YTD" value={String(p.total)} />
        <Stat label="Selesai" value={String(p.done)} tone="good" />
        <Stat label="Berjalan" value={String(p.running)} />
        <Stat label="Overdue" value={String(p.overdue)} tone="bad" />
      </div>

      <div className="mt-2 flex min-h-0 flex-1 flex-col justify-center gap-[5px]">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[8.5px] text-ink-500">Nilai menunggu keputusan (3 antrian)</span>
          <span className="text-[10px] font-extrabold tabular-nums text-ink-900">
            Rp {p.valueAtStakeRpT.toLocaleString("id-ID", { minimumFractionDigits: 2 })} T
          </span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="text-[8.5px] text-ink-500">Expected value keputusan terukur</span>
          <span className="text-[10px] font-bold tabular-nums text-ink-900">
            Rp {p.expectedMeasuredRpT.toLocaleString("id-ID", { minimumFractionDigits: 2 })} T
          </span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="text-[8.5px] text-ink-500">Realized value s.d. tanggal potong</span>
          <span className="text-[10px] font-bold tabular-nums text-ptpn-green">
            Rp {p.realizedRpT.toLocaleString("id-ID", { minimumFractionDigits: 2 })} T
          </span>
        </div>

        {/* Realization rate: janji keputusan vs realisasinya. */}
        <div className="mt-[2px]">
          <div className="flex items-center justify-between text-[8px] text-ink-400">
            <span>Realization rate</span>
            <span className="font-bold text-ink-700">{p.realizationPct}%</span>
          </div>
          <div className="mt-[3px] h-[5px] w-full overflow-hidden rounded-full bg-[#eef2f6]">
            <div
              className="h-full rounded-full bg-ptpn-green"
              style={{ width: `${p.realizationPct}%` }}
            />
          </div>
        </div>
      </div>

      <p className="mt-1.5 flex items-start gap-1 border-t border-[#eef2f6] pt-1.5 text-[8px] leading-[1.4] text-ink-400">
        <BookOpenCheck size={10} className="mt-[1px] shrink-0 text-ptpn-green" />
        Basis: pengadaan (FY Rp 0,85 T · realisasi Rp 0,39 T YTD, run-rate on-track) + divestasi
        tahap 0 (Rp 0,90 T · Rp 0,74 T) + cash pooling (Rp 45 M/thn · Rp 38 M). Keputusan
        non-finansial & benefit ERP tertahan tidak dihitung.
      </p>
    </div>
  );
}
