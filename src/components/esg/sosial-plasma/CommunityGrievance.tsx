import { grievanceCategories, grievanceSummary } from "@/lib/esg-data-detail";
import { PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

/** Grievance komunitas per kategori + capaian SLA 21 hari vs target 30 hari. */
export function CommunityGrievance() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Community Grievance" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {grievanceSummary.total} pengaduan YTD · {grievanceSummary.selesai} selesai ·{" "}
        {grievanceSummary.proses} dalam proses
      </p>

      <div className="mt-2 flex min-h-0 flex-1 flex-col justify-between">
        {grievanceCategories.map((g) => (
          <div key={g.kategori}>
            <div className="flex items-baseline justify-between gap-2">
              <span className="truncate text-[9.5px] font-bold text-ink-900">{g.kategori}</span>
              <span className="shrink-0 text-[9px] tabular-nums text-ink-500">
                <span className="text-[10px] font-extrabold text-ink-900">{g.selesai}</span> /{" "}
                {g.jumlah} selesai
              </span>
            </div>
            <div className="mt-[5px] h-[7px] w-full overflow-hidden rounded-full bg-[#eef2f6]">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${(g.selesai / g.jumlah) * 100}%`,
                  backgroundColor: PALETTE.green,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-2 flex items-center justify-between gap-2 rounded-lg bg-[#f8fafc] px-2.5 py-[6px]">
        <span className="text-[8.5px] font-semibold text-ink-500">
          SLA rata-rata penyelesaian
        </span>
        <span className="text-[9px] tabular-nums text-ink-500">
          <span className="text-[12px] font-extrabold text-ptpn-green">
            {grievanceSummary.avgSlaHari} hari
          </span>{" "}
          · target {grievanceSummary.targetSlaHari} hari
        </span>
      </div>
    </div>
  );
}
