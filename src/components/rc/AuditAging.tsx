import { auditAging, auditStats } from "@/lib/rc-data";
import { SectionHead } from "../hc/SectionHead";

const TOTAL = auditAging.reduce((s, b) => s + b.count, 0);
const MAX = Math.max(...auditAging.map((b) => b.count));

function Stat({ label, value, danger }: { label: string; value: string; danger?: boolean }) {
  return (
    <div className="flex min-w-0 flex-col items-center rounded-lg border border-[#eef2f6] bg-[#fbfcfd] px-1.5 py-1.5">
      <span
        className={`text-[13px] font-extrabold leading-none ${danger ? "text-[#ef4444]" : "text-ink-900"}`}
      >
        {value}
      </span>
      <span className="mt-1 truncate text-center text-[7.5px] font-semibold uppercase tracking-[0.03em] text-ink-400">
        {label}
      </span>
    </div>
  );
}

/**
 * Aging Intelligence temuan audit: bukan hanya berapa yang terbuka,
 * tetapi seberapa lama terbuka dan seberapa cepat ditutup.
 */
export function AuditAging() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "360ms" } as React.CSSProperties}
    >
      <SectionHead title="Audit Finding Aging" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Umur {TOTAL} Temuan Terbuka per 31 Mei 2026
      </p>

      <ul className="mt-2.5 flex min-h-0 flex-1 flex-col justify-around gap-y-1">
        {auditAging.map((b) => (
          <li key={b.label} className="flex shrink-0 items-center gap-2">
            <span className="w-[64px] shrink-0 text-[8.5px] font-semibold text-ink-700">
              {b.label}
            </span>
            <span className="h-[9px] min-w-0 flex-1 overflow-hidden rounded-full bg-[#eef2f6]">
              <span
                className="anim-grow-x block h-full rounded-full"
                style={{ width: `${(b.count / MAX) * 100}%`, background: b.color }}
              />
            </span>
            <span className="w-[18px] shrink-0 text-right text-[10px] font-extrabold text-ink-900">
              {b.count}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-2 grid grid-cols-3 gap-1.5">
        <Stat label="Overdue" value={`${auditStats.overdue}`} danger />
        <Stat label="Avg Terbuka" value={`${auditStats.avgDaysOpen} hr`} />
        <Stat label="Closure Rate" value={`${auditStats.closureRate}%`} />
      </div>

      <p className="mt-1.5 rounded-md bg-[#fdecec] px-2 py-[5px] text-[9px] leading-[1.4] text-[#b91c1c]">
        3 temuan berumur &gt;180 hari — seluruhnya terkait tata kelola data PDP. Eskalasi ke
        BOD Decision Center.
      </p>
    </div>
  );
}
