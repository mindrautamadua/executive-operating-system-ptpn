import { Eye, RefreshCcw, Gavel } from "lucide-react";
import { ceoMorningBrief, ceoDecisions, type CeoTone } from "@/lib/ceo-data";
import { hariDashboard, tanggalDashboard } from "@/lib/data";

const DOT: Record<CeoTone, string> = {
  green: "bg-[#22a45d]",
  amber: "bg-[#f5a524]",
  red: "bg-[#ef4444]",
};

/**
 * Ringkasan pagi CEO: status 5 area, apa yang berubah, keputusan yang
 * menunggu, dan satu hal yang harus dipantau. Panel ini menjawab
 * "apa yang harus saya putuskan hari ini?" sebelum pengguna membaca KPI.
 */
export function CeoMorningBrief() {
  return (
    <div className="card anim-rise mb-3 px-4 pb-3 pt-2.5" style={{ "--d": "20ms" } as React.CSSProperties}>
      <div className="flex items-center justify-between gap-2">
        {/*
          "Brief Eksekutif Terkini", bukan "Morning Brief": nama menyatakan
          state (brief termutakhir yang tersedia), bukan jenis konten — bila
          data tidak berubah, sistem tidak berpura-pura menerbitkan brief pagi
          yang baru.
        */}
        <h3 className="text-[10px] font-extrabold uppercase tracking-[0.05em] text-ink-900">
          Brief Eksekutif Terkini
        </h3>
        <span className="text-[8.5px] font-semibold text-ink-400">
          Brief terakhir · {hariDashboard}, {tanggalDashboard}
        </span>
      </div>

      <div className="mt-2 grid grid-cols-1 gap-3 lg:grid-cols-[minmax(0,32fr)_minmax(0,34fr)_minmax(0,34fr)]">
        {/* status 5 area */}
        <div className="flex flex-col gap-[5px]">
          {ceoMorningBrief.trafficLights.map((t) => (
            <div key={t.area} className="flex items-center gap-1.5">
              <span className={`h-[7px] w-[7px] shrink-0 rounded-full ${DOT[t.tone]}`} />
              <span className="w-[52px] shrink-0 text-[9px] font-bold text-ink-900">{t.area}</span>
              <span className="truncate text-[8.5px] text-ink-500" title={t.note}>
                {t.note}
              </span>
            </div>
          ))}
        </div>

        {/* yang berubah */}
        <div className="border-t border-[#f2f5f8] pt-2 lg:border-l lg:border-t-0 lg:pl-3 lg:pt-0">
          <div className="flex items-center gap-1 text-[8.5px] font-extrabold uppercase tracking-[0.05em] text-ink-400">
            <RefreshCcw size={10} strokeWidth={2} />
            3 Hal yang Berubah
          </div>
          <ol className="mt-1.5 space-y-[4px]">
            {ceoMorningBrief.changed.map((c, i) => (
              <li key={c.text} className="flex gap-1.5 text-[8.5px] leading-[1.4] text-ink-700">
                <span className="shrink-0 font-bold text-ink-400">{i + 1}.</span>
                <span>
                  {c.text}{" "}
                  {/* Materialitas relatif: seberapa besar vs enterprise, bukan
                      hanya angka absolut. */}
                  <span
                    className={`ml-0.5 inline-flex items-center gap-1 whitespace-nowrap rounded px-1 py-[1px] text-[9px] font-bold uppercase tracking-[0.03em] ${
                      c.materiality.level === "High"
                        ? "bg-[#fdecec] text-[#ef4444]"
                        : "bg-[#fdf3e0] text-[#d98b06]"
                    }`}
                  >
                    {c.materiality.level} · {c.materiality.basis}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </div>

        {/* keputusan + watch */}
        <div className="border-t border-[#f2f5f8] pt-2 lg:border-l lg:border-t-0 lg:pl-3 lg:pt-0">
          <div className="flex items-center gap-1 text-[8.5px] font-extrabold uppercase tracking-[0.05em] text-[#ef4444]">
            <Gavel size={10} strokeWidth={2} />
            {ceoDecisions.length} Keputusan Diperlukan
          </div>
          <ol className="mt-1.5 space-y-[3px]">
            {ceoDecisions.map((d, i) => (
              <li key={d.title} className="flex gap-1.5 text-[8.5px] leading-[1.35] text-ink-700">
                <span className="shrink-0 font-bold text-ink-400">{i + 1}.</span>
                <span className="truncate" title={`${d.title} — ${d.exposure} · ${d.due}`}>
                  {d.title} · <span className="font-bold text-ink-900">{d.exposure}</span>
                </span>
              </li>
            ))}
          </ol>
          <div className="mt-2 flex items-start gap-1.5 rounded-lg bg-[#fdf9f0] px-2 py-1.5">
            <Eye size={11} strokeWidth={2} className="mt-[1px] shrink-0 text-[#d98b06]" />
            <p className="text-[8.5px] leading-[1.4] text-ink-700">
              <span className="font-bold text-ink-900">Dipantau: </span>
              {ceoMorningBrief.watch}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
