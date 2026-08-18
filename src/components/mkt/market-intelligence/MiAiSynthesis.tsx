import { Sparkles } from "lucide-react";
import { ScopeNote } from "@/components/ui/ScopeNote";

const COMMANDS = [
  { cmd: "WHY", label: "Mengapa konsensus CPO 30 hari berubah bullish?" },
  { cmd: "PREDICT", label: "Proyeksi harga KPBN H2 2026 per skenario supply" },
  { cmd: "SIMULATE", label: "Dampak B50 & revisi pungutan ke net-back ekspor" },
  { cmd: "RECOMMEND", label: "Aksi komersial minggu ini dari 18 sinyal aktif" },
] as const;

/** Panel sintesis AI Market Intelligence (pola HcCopilot). */
export function MiAiSynthesis() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-4 pt-3"
      style={{ "--d": "300ms" } as React.CSSProperties}
    >
      <div className="flex items-center justify-between gap-2">
        <h3 className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.05em] text-ink-900">
          MI Synthesis
          <span className="rounded bg-ptpn-greenLight px-1 py-[1px] text-[9px] font-bold normal-case tracking-normal text-ptpn-green">
            AI
          </span>
          {/* Sintesis disusun atas seluruh sinyal grup — bukan per subholding. */}
          <ScopeNote />
        </h3>
        <button className="flex shrink-0 cursor-pointer items-center gap-1 text-[9.5px] font-semibold text-ptpn-green hover:underline">
          Buka Copilot →
        </button>
      </div>

      <div className="mt-3 flex items-start gap-3">
        <span className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#dfeaf8] to-[#c9dcf3] text-[#2f6fe4]">
          <Sparkles size={17} strokeWidth={1.9} />
        </span>
        <p className="min-w-0 text-[9.5px] font-medium leading-[1.5] text-ink-900">
          Sintesis 18 sinyal aktif: struktur pasar <span className="font-bold">bullish</span> —
          stok global 4,1 jt ton (terendah 3 tahun), produksi Malaysia −3%, dan pemangkasan bea
          masuk India menopang permintaan. Pembatas upside: rekor kedelai Brasil. Rekomendasi
          utama: naikkan forward cover H2 ke 38% di harga ≥ Rp 13.400/kg.
        </p>
      </div>

      <div className="mt-3 flex flex-col gap-1.5">
        {COMMANDS.map((c) => {
          const solid = c.cmd === "RECOMMEND";
          return (
            <button
              key={c.cmd}
              className={`flex items-center gap-2 rounded-lg px-2.5 py-[6px] text-left text-[9px] font-medium transition-colors ${
                solid
                  ? "bg-ptpn-green text-white hover:bg-ptpn-greenDark"
                  : "border border-[#e3e9ef] bg-white text-ink-700 hover:bg-[#f5f8fa]"
              }`}
            >
              <span
                className={`w-[58px] shrink-0 rounded px-1.5 py-[2px] text-center text-[7.5px] font-extrabold tracking-[0.04em] ${
                  solid ? "bg-white/20 text-white" : "bg-ptpn-greenLight text-ptpn-green"
                }`}
              >
                {c.cmd}
              </span>
              <span className="min-w-0 truncate">{c.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
