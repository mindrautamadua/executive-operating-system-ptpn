import { SectionHead } from "@/components/hc/SectionHead";
import { growthContribution, ytdNet } from "@/lib/wa-headcount-trend";

const MAX = Math.max(...growthContribution.map((r) => r.net));

/** Kontribusi net growth YTD per subholding — dari mana tambahan headcount datang. */
export function GrowthContribution() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "200ms" } as React.CSSProperties}
    >
      <SectionHead title="Kontribusi Net Growth YTD" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Total <span className="font-bold text-ptpn-green">+{ytdNet.toLocaleString("id-ID")}</span>{" "}
        pekerja sejak Des 2025
      </p>

      <div className="mt-2 flex min-h-0 flex-1 flex-col justify-between gap-1">
        {growthContribution.map((r) => (
          <div key={r.name} className="shrink-0">
            <div className="flex items-center justify-between gap-2">
              <span className="min-w-0 truncate text-[9px] font-medium text-ink-700">{r.name}</span>
              <span className="flex shrink-0 items-center gap-1.5">
                <span className="text-[9px] font-extrabold text-ink-900">
                  +{r.net.toLocaleString("id-ID")}
                </span>
                <span className="w-[30px] text-right text-[8.5px] text-ink-400">
                  {r.growth.toString().replace(".", ",")}%
                </span>
              </span>
            </div>
            <div className="mt-[3px] h-[5px] w-full overflow-hidden rounded-full bg-[#eef2f6]">
              <div
                className="anim-grow-x h-full rounded-full bg-ptpn-green"
                style={{ width: `${(r.net / MAX) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <p className="mt-2 border-t border-[#eef2f6] pt-1.5 text-[9px] leading-[1.4] text-ink-500">
        PTPN IV &amp; III menyumbang 61% pertumbuhan — sejalan dengan perluasan area tanam dan
        pembukaan 2 pabrik baru.
      </p>
    </div>
  );
}
