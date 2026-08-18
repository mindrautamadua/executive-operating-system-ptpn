import { ArrowRight } from "lucide-react";
import { insidenMeta, insidenRows, insidenStatus, totalAnomali } from "@/lib/data-analytics";
import { SEMANTIC } from "@/lib/chart-palette";

/**
 * Lifecycle 156 anomali terdeteksi: siapa owner-nya, SLA remediasi,
 * dan progres penyelesaian — governance bukan "ada masalah", tetapi
 * "siapa yang bertanggung jawab menyelesaikannya".
 */
export function DqIncidents() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "660ms" } as React.CSSProperties}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="card-title-navy">DQ Incident Management</h3>
        <span className="text-[9px] text-ink-500">{totalAnomali} terdeteksi</span>
      </div>

      <div className="mt-1.5 flex gap-1.5">
        {insidenStatus.map((s) => (
          <span
            key={s.label}
            className={`${s.tone} flex-1 rounded-md px-1.5 py-[3px] text-center text-[9px] font-bold`}
          >
            {s.value} {s.label}
          </span>
        ))}
      </div>

      <div className="mt-1.5 flex min-h-0 flex-1 flex-col justify-around">
        {insidenRows.map((r) => {
          const pctSelesai = (r.resolved / r.total) * 100;
          return (
            <div key={r.jenis} className="flex items-center gap-2 whitespace-nowrap">
              <span className="w-[92px] shrink-0 truncate text-[9.5px] text-ink-700">
                {r.jenis}
              </span>
              <span className="w-[74px] shrink-0 truncate text-[9px] text-ink-500" title="Owner">
                {r.owner}
              </span>
              <span className="w-[36px] shrink-0 text-[9px] tabular-nums text-ink-500" title="SLA remediasi">
                {r.sla}
              </span>
              <div className="relative h-[7px] min-w-0 flex-1 rounded-full bg-[#eef2f6]">
                <div
                  className="anim-grow-x h-full rounded-full"
                  style={{
                    width: `${pctSelesai}%`,
                    background: pctSelesai >= 80 ? SEMANTIC.good : SEMANTIC.warn,
                  }}
                />
              </div>
              <span className="w-[42px] shrink-0 text-right text-[9.5px] font-semibold tabular-nums text-ink-900">
                {r.resolved}/{r.total}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-1 border-t border-[#f0f3f6] pt-1.5 text-[9px] text-ink-500">
        Tertua belum selesai: {insidenMeta.tertuaHari} hari · SLA breach: {insidenMeta.slaBreach}{" "}
        kasus
      </div>

      <button className="link-more mt-1 flex items-center gap-1">
        Lihat semua insiden <ArrowRight size={11} />
      </button>
    </div>
  );
}
