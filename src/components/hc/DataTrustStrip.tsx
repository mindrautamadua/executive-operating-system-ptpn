"use client";

import { Activity, Database, Gauge, ShieldCheck } from "lucide-react";
import { dataTrust } from "@/lib/hc-data";
import { STEMPEL_DATA } from "@/lib/group-baseline";
import { dataQualityBreakdown } from "@/lib/profil-data";

function Metric({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Database;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <Icon size={12} strokeWidth={1.9} className="shrink-0 text-ink-400" />
      <span className="text-[8.5px] text-ink-500">{label}</span>
      <span className="text-[9.5px] font-bold text-ink-900">{value}</span>
    </div>
  );
}

/* Popover dibuka via hover ATAU focus (Tab/tap). Klik memaksa focus karena Safari
   tidak memfokuskan button saat klik; Escape menutup dengan melepas focus. */
const popoverTriggerProps = {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => e.currentTarget.focus(),
  onKeyDown: (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Escape") e.currentTarget.blur();
  },
} as const;

/** Strip Data Trust: kesegaran, cakupan, kualitas, dan sumber data dashboard. */
export function DataTrustStrip({ data = dataTrust }: { data?: typeof dataTrust }) {
  return (
    <div className="card anim-rise mb-3 flex items-center gap-4 px-4 py-2">
      <span className="text-[8.5px] font-extrabold uppercase tracking-[0.05em] text-ink-400">
        Data Trust{data.domain ? ` · ${data.domain}` : ""}
      </span>

      {/*
        Periode bisnis dibuat paling dominan di strip: tanpa hierarki tegas,
        pembaca menganggap "refresh Agustus" berarti "data Agustus" — padahal
        angka mewakili periode s.d. tanggal efektif. Hover menjelaskan bedanya.
      */}
      <button
        type="button"
        aria-haspopup="dialog"
        aria-label={`Rincian lapisan waktu data — data bisnis per ${data.asOf}`}
        {...popoverTriggerProps}
        className="asof-badge group relative flex cursor-help items-center gap-1.5 rounded bg-[#1b3a6b] px-2 py-[3px]"
      >
        <span className="asof-label text-[9px] font-bold uppercase tracking-[0.05em] text-[#b9c7dd]">
          Data Bisnis Per
        </span>
        <span className="asof-value text-[10px] font-extrabold uppercase tracking-[0.02em] text-white underline decoration-dotted decoration-[#5f7396] underline-offset-2">
          {data.asOf}
        </span>
        <div className="invisible absolute left-0 top-full z-30 mt-1.5 w-[248px] rounded-xl border border-[#e3e9ef] bg-white p-3 opacity-0 shadow-cardHover transition-opacity duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
          {/* Lapisan waktu: historis, sistem, pasar tersinkron, sinyal eksternal, model forecast. */}
          <div className="space-y-1.5 text-[9px]">
            <div className="flex justify-between gap-2">
              <span className="text-ink-500">Data bisnis (as-of)</span>
              <span className="font-bold text-ink-900">{data.asOf}</span>
            </div>
            <div className="flex justify-between gap-2">
              <span className="text-ink-500">Sinkronisasi sistem</span>
              <span className="font-bold text-ink-900">{data.lastRefresh}</span>
            </div>
            <div className="flex justify-between gap-2">
              <span className="text-ink-500">Pasar tersinkron (Market Pulse)</span>
              <span className="font-bold text-ink-900">{STEMPEL_DATA.pasarSinkron}</span>
            </div>
            <div className="flex justify-between gap-2">
              <span className="text-ink-500">Sinyal eksternal terbaru</span>
              <span className="font-bold text-ink-900">{STEMPEL_DATA.sinyalTerbaru}</span>
            </div>
            <div className="flex justify-between gap-2">
              <span className="text-ink-500">Model forecast (run)</span>
              <span className="font-bold text-ink-900">{STEMPEL_DATA.forecastRun}</span>
            </div>
            <div className="flex justify-between gap-2">
              <span className="text-ink-500">Source</span>
              <span className="font-bold text-ink-900">{data.sources.slice(0, 2).join(", ")}</span>
            </div>
          </div>
          <p className="mt-1.5 border-t border-[#eef2f6] pt-1.5 text-[9px] leading-snug text-ink-500">
            Angka kinerja merepresentasikan periode bisnis s.d. tanggal efektif. Sinkronisasi
            sistem, feed pasar, dan model forecast berjalan lebih sering tanpa mengubah
            periode data kinerja.
          </p>
        </div>
      </button>

      <div className="flex items-center gap-1.5">
        <span className="relative flex h-[7px] w-[7px]">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ptpn-green opacity-60" />
          <span className="relative inline-flex h-[7px] w-[7px] rounded-full bg-ptpn-green" />
        </span>
        <span className="text-[8.5px] text-ink-500">Refresh Sistem</span>
        <span className="text-[8.5px] font-medium text-ink-500">{data.lastRefresh}</span>
      </div>

      <Metric icon={Gauge} label="Coverage" value={data.coverage} />

      {/* Quality bisa di-hover untuk rincian dimensi kualitas data. */}
      <button
        type="button"
        aria-haspopup="dialog"
        aria-label={`Rincian Data Trust Index ${data.quality}`}
        {...popoverTriggerProps}
        className="group relative flex cursor-help items-center gap-1.5"
      >
        <ShieldCheck size={12} strokeWidth={1.9} className="shrink-0 text-ink-400" />
        <span className="text-[8.5px] text-ink-500">Trust</span>
        <span className="text-[9.5px] font-bold text-ink-900 underline decoration-dotted decoration-[#c6cfd8] underline-offset-2">
          {data.quality}
        </span>
        <div className="invisible absolute left-0 top-full z-30 mt-1.5 w-[190px] rounded-xl border border-[#e3e9ef] bg-white p-3 opacity-0 shadow-cardHover transition-opacity duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
          <div className="text-[8.5px] font-extrabold uppercase tracking-[0.05em] text-ink-500">
            Data Trust Index{data.domain ? ` — ${data.domain}` : ""}
          </div>
          {/* Rincian milik domain ini; default HC hanya fallback lama. */}
          <div className="mt-1.5 space-y-1.5">
            {(data.qualityBreakdown ?? dataQualityBreakdown).map((d) => (
              <div key={d.label} className="flex items-center justify-between gap-2">
                <span className="text-[9px] text-ink-500">{d.label}</span>
                <span className="text-[9.5px] font-bold text-ink-900">{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </button>

      <div className="flex min-w-0 items-center gap-1.5">
        <Database size={12} strokeWidth={1.9} className="shrink-0 text-ink-400" />
        <span className="text-[8.5px] text-ink-500">Sumber</span>
        <div className="flex min-w-0 items-center gap-1 overflow-hidden">
          {data.sources.map((s) => (
            <span
              key={s}
              className="shrink-0 rounded bg-[#eef2f6] px-1.5 py-[2px] text-[9px] font-semibold text-ink-700"
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/*
        Status governance diturunkan dari threshold kontrol, bukan label bebas:
        TRUSTED bila semua komponen ≥85%, TRUSTED WITH WATCH bila ada yang di
        bawahnya. Eligibility menjadikan Data Trust kontrol keputusan, bukan
        sekadar informasi: skor tinggi = angka layak dipakai memutus; skor
        sedang = analisis saja; rendah = validasi dulu.
      */}
      {(() => {
        const skorMin = Math.min(
          ...(data.qualityBreakdown ?? dataQualityBreakdown).map((d) => parseInt(d.value)),
        );
        const trustPct = parseFloat(data.quality.replace(",", "."));
        const trusted = skorMin >= 85;
        const eligibility =
          trustPct >= 90
            ? trusted
              ? { label: "Decision Eligible", cls: "bg-ptpn-greenLight text-ptpn-green" }
              : // Trust tinggi tapi ada komponen governance < 85%: tetap eligible,
                // dengan catatan — bukan hijau polos.
                { label: "Decision Eligible · with caution", cls: "bg-[#fdf3e0] text-[#d98b06]" }
            : trustPct >= 80
              ? { label: "Analysis Only", cls: "bg-[#fdf3e0] text-[#d98b06]" }
              : { label: "Validate Before Decision", cls: "bg-[#fdecec] text-[#ef4444]" };
        return (
          <div className="ml-auto flex shrink-0 items-center gap-1.5">
            <div
              className={`flex items-center gap-1 ${
                trusted ? "text-ptpn-green" : "text-[#d98b06]"
              }`}
            >
              <Activity size={11} strokeWidth={1.9} />
              <span className="text-[8.5px] font-semibold">
                {trusted ? "Trusted" : "Trusted with Watch"}
              </span>
            </div>
            <span
              className={`rounded px-1.5 py-[2px] text-[7.5px] font-bold uppercase tracking-[0.03em] ${eligibility.cls}`}
              title={`Ambang eligibility: Trust ≥90% = Decision Eligible · 80–90% = Analysis Only · <80% = Validate Before Decision. Trust saat ini ${data.quality}${trusted ? "" : `; komponen terendah ${skorMin}% (<85%) memicu status Watch`}.`}
            >
              {eligibility.label}
            </span>
          </div>
        );
      })()}
    </div>
  );
}
