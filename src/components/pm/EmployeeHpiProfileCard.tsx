import { AlertTriangle } from "lucide-react";
import { SectionHead } from "../hc/SectionHead";
import { PersonAvatar } from "../ui/PersonAvatar";
import { contohProfil } from "@/lib/pm-data";

const IMPACT_BADGE: Record<string, string> = {
  "High Impact": "bg-ptpn-greenLight text-ptpn-green",
  "Medium Impact": "bg-[#fdf3e0] text-[#d98b06]",
  "Low Impact": "bg-[#eef2f6] text-ink-500",
};

export function EmployeeHpiProfileCard() {
  const p = contohProfil;
  return (
    <div
      className="card anim-rise px-4 pb-3.5 pt-3"
      style={{ "--d": "100ms" } as React.CSSProperties}
    >
      <SectionHead title="Employee HPI Profile (Contoh)" />

      <div className="mt-2.5 grid grid-cols-[minmax(0,270fr)_minmax(0,150fr)_minmax(0,430fr)_minmax(0,260fr)_minmax(0,330fr)] items-stretch gap-4">
        {/* Identitas */}
        <div className="flex items-center gap-3">
          <PersonAvatar seed={4} size={58} name={contohProfil.nama} className="ring-2 ring-[#e6ecf2]" />
          <div className="min-w-0 leading-tight">
            <div className="text-[12.5px] font-extrabold text-ink-900">{p.nama}</div>
            <div className="mt-[3px] text-[9.5px] text-ink-500">{p.jabatan}</div>
            <div className="mt-[2px] text-[9px] text-ink-500">{p.unit}</div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              <span className="rounded-md bg-ptpn-greenLight px-1.5 py-[3px] text-[9px] font-bold text-ptpn-green">
                {p.badges[0]}
              </span>
              <span className="rounded-md bg-[#e8f1fd] px-1.5 py-[3px] text-[9px] font-bold text-[#2f6fe4]">
                {p.badges[1]}
              </span>
            </div>
          </div>
        </div>

        {/* Performance */}
        <div className="flex flex-col items-center justify-center rounded-xl border border-[#eef2f6] px-3 py-3 text-center">
          <div className="text-[8.5px] font-semibold text-ink-500">Performance Score</div>
          <div className="mt-1.5 text-[19px] font-extrabold leading-none text-ink-900">
            {p.performance.skor}
            <span className="ml-[2px] text-[10px] font-semibold text-ink-500">
              {p.performance.maks}
            </span>
          </div>
          <div className="mt-[3px] text-[8.5px] font-bold text-ptpn-greenDark">
            ({p.performance.kategori})
          </div>
          <div className="mt-2.5 border-t border-[#f0f3f6] pt-2 text-[8.5px] font-semibold text-ink-500">
            Opportunity Gap
          </div>
          <div className="mt-1 text-[15px] font-extrabold leading-none text-[#d98b06]">
            {p.performance.gap}
          </div>
          <div className="mt-[2px] text-[9px] text-ink-500">{p.performance.gapCaption}</div>
        </div>

        {/* HPI BEM Detail */}
        <div>
          <div className="text-[9.5px] font-bold text-ink-900">
            HPI BEM Detail — 6 Sel (Environmental Supports · Person&apos;s Repertory)
          </div>
          <div className="mt-2.5 grid grid-cols-2 md:grid-cols-3 gap-x-3 gap-y-2.5">
            {p.bem.map((b) => (
              <div key={b.label} className="text-center">
                <div className="text-[8.5px] font-semibold" style={{ color: b.color }}>
                  {b.label}
                </div>
                <div className="mt-1.5 text-[15px] font-extrabold leading-none text-ink-900">
                  {b.nilai}
                  <span className="ml-[2px] text-[9px] font-semibold text-ink-500">/ 5</span>
                </div>
                <div className="mt-2 h-[6px] overflow-hidden rounded-full bg-[#eef2f6]">
                  <div
                    className="anim-grow-x h-full rounded-full"
                    style={{ width: `${b.skor}%`, background: b.color }}
                  />
                </div>
                <div className="mt-1.5 text-[8.5px] font-bold text-ink-700">
                  {b.skor} <span className="font-medium text-ink-400">/100</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Root cause */}
        <div className="rounded-xl border border-[#f8e3bd] bg-[#fefaf1] px-3 py-2.5">
          <div className="flex items-center gap-1.5 text-[9px] font-bold text-[#b97407]">
            <AlertTriangle size={12} /> Root Cause Utama
          </div>
          <div className="mt-1.5 text-[9.5px] font-bold text-ink-900">{p.rootCause.judul}</div>
          <ul className="mt-1.5 space-y-1">
            {p.rootCause.poin.map((poin) => (
              <li key={poin} className="flex items-start gap-1.5 text-[8.5px] leading-snug text-ink-700">
                <span className="mt-[4px] h-[4px] w-[4px] shrink-0 rounded-full bg-ink-400" />
                {poin}
              </li>
            ))}
          </ul>
          <div className="mt-2 border-t border-[#f4e6c6] pt-1.5" title={p.rootCause.estimasiTooltip}>
            <div className="text-[9px] font-semibold uppercase tracking-[0.04em] text-ink-500">
              Estimated Improvement Potential
            </div>
            <div className="mt-[2px] text-[9.5px] font-extrabold text-ptpn-greenDark">
              {p.rootCause.estimasi}
              <span className="ml-1 text-[9px] font-medium text-ink-500">(estimasi model)</span>
            </div>
          </div>
        </div>

        {/* Rekomendasi */}
        <div>
          <div className="text-[9.5px] font-bold text-ink-900">Rekomendasi Intervensi</div>
          <div className="mt-2 space-y-1.5">
            {p.rekomendasi.map((r, i) => (
              <div
                key={r.aksi}
                className="flex items-center gap-2 rounded-lg border border-[#eef2f6] px-2.5 py-[7px]"
              >
                <span className="flex h-[16px] w-[16px] shrink-0 items-center justify-center rounded-full bg-[#e8f1fd] text-[8.5px] font-bold text-[#2f6fe4]">
                  {i + 1}
                </span>
                <span className="min-w-0 flex-1 truncate text-[9px] font-medium text-ink-700">
                  {r.aksi}
                </span>
                <span
                  className={`shrink-0 rounded-md px-1.5 py-[2px] text-[9px] font-bold ${IMPACT_BADGE[r.impact]}`}
                >
                  {r.impact}
                </span>
                <span className="shrink-0 text-[8.5px] font-semibold text-ink-500">{r.periode}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
