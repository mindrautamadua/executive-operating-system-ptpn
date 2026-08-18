import { SEVERITY_STYLE, severityCases, severityDist } from "@/lib/ir-intel-data";
import { SectionHead } from "../hc/SectionHead";
import { PanelFooterLink } from "./PanelFooterLink";

/**
 * Case Severity: 24 kasus aktif dipilah menurut tingkat bahaya —
 * satu kasus kritis bisa lebih penting dari banyak grievance ringan.
 */
export function CaseSeverity() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <div className="flex items-baseline gap-1.5">
        <SectionHead title="Case Severity" />
        <span className="shrink-0 text-[8.5px] text-ink-400">(24 Kasus Aktif)</span>
      </div>

      <div className="mt-2 flex h-[8px] w-full overflow-hidden rounded-full">
        {severityDist.map((s) => (
          <span
            key={s.level}
            className="h-full"
            style={{ width: `${(s.count / 24) * 100}%`, background: s.color }}
            title={`${s.level}: ${s.count}`}
          />
        ))}
      </div>
      <div className="mt-1 flex items-center gap-3">
        {severityDist.map((s) => (
          <span key={s.level} className="flex items-center gap-1 text-[9px] text-ink-500">
            <span className="h-[7px] w-[7px] rounded-full" style={{ background: s.color }} />
            {s.level} <span className="font-extrabold text-ink-900">{s.count}</span>
          </span>
        ))}
      </div>

      <div className="mt-2 grid grid-cols-[minmax(0,1fr)_50px_40px_84px] items-center gap-x-2 border-b border-[#eef2f6] pb-1.5 text-[9px] font-semibold uppercase tracking-[0.04em] text-ink-500">
        <span>Kasus · Lokasi</span>
        <span>Severity</span>
        <span className="text-center">Umur</span>
        <span className="text-right">Risiko Utama</span>
      </div>

      <ul className="flex min-h-0 flex-1 flex-col justify-around">
        {severityCases.map((c) => (
          <li
            key={c.id}
            className="grid grid-cols-[minmax(0,1fr)_50px_40px_84px] items-center gap-x-2 border-b border-[#f4f7fa] py-1 last:border-0"
          >
            <span className="min-w-0">
              <span className="block truncate text-[9px] font-semibold text-ink-800">
                {c.lokasi}
              </span>
              <span className="block truncate text-[7.5px] text-ink-500">
                {c.id} · {c.kategori}
              </span>
            </span>
            <span>
              <span
                className={`inline-block rounded-md px-1.5 py-[3px] text-[9px] font-bold ${SEVERITY_STYLE[c.severity]}`}
              >
                {c.severity}
              </span>
            </span>
            <span className="text-center text-[9px] font-extrabold tabular-nums text-ink-900">
              {c.umur}
            </span>
            <span className="truncate text-right text-[8.5px] font-semibold text-ink-600">
              {c.risiko}
            </span>
          </li>
        ))}
      </ul>

      <PanelFooterLink label="Lihat Semua Kasus" />
    </div>
  );
}
