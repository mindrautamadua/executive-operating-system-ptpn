import { Gavel } from "lucide-react";
import { sanctionLog } from "@/lib/risk-data-detail";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

/** Log sanksi administratif yang sedang berjalan beserta target pemenuhannya. */
export function SanctionLog() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "360ms" } as React.CSSProperties}
    >
      <SectionHead title="Log Sanksi Regulator" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Sanksi Administratif Berjalan &amp; Progres Pemenuhan
      </p>

      <ul className="mt-2 flex flex-col gap-1.5">
        {sanctionLog.map((s) => (
          <li
            key={s.perkara}
            className="rounded-xl border border-[#f6d5d5] bg-[#fdf5f5] px-2.5 pb-2 pt-2"
          >
            <div className="flex items-center gap-1.5">
              <Gavel size={12} className="shrink-0 text-[#ef4444]" />
              <span className="min-w-0 flex-1 truncate text-[9.5px] font-extrabold text-ink-900">
                {s.instansi}
              </span>
              <span className="shrink-0 text-[9px] font-semibold text-ink-500">
                Target {s.target}
              </span>
            </div>
            <p className="mt-1 text-[8.5px] leading-snug text-ink-700">{s.perkara}</p>
            <div className="mt-1 text-[8.5px] font-semibold text-[#ef4444]">{s.nilai}</div>
            <div className="mt-[2px] text-[9px] text-ink-500">{s.status}</div>
          </li>
        ))}
      </ul>

      <p className="mt-auto pt-2 text-[9px] leading-snug text-ink-500">
        Tidak ada sanksi pidana korporasi maupun pencabutan izin usaha aktif per 31 Mei 2026.
      </p>
    </div>
  );
}
