import { ChevronRight, ClipboardList, Info, LayoutGrid, MonitorSmartphone, Rocket } from "lucide-react";
import { tiDevFocus, tiDevRoi, tiDevRoiNote, tiInvestment, type DevFocus } from "@/lib/ti-data";
import { SectionHead } from "../hc/SectionHead";
import { Delta } from "../ui/Delta";

const ICONS = {
  leadership: Rocket,
  technical: MonitorSmartphone,
  cross: LayoutGrid,
  strategic: ClipboardList,
};

const TONES: Record<DevFocus["tone"], string> = {
  blue: "bg-[#e8f1fd] text-[#2f6fe4]",
  purple: "bg-[#f2ecfb] text-[#8b5cf6]",
  green: "bg-ptpn-greenLight text-ptpn-green",
  teal: "bg-[#e6f6f5] text-[#0d9488]",
};

/** Sparkline mini untuk kartu investasi. */
function MiniTrend({ data }: { data: number[] }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const pts = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * 100;
      const y = 30 - ((v - min) / (max - min || 1)) * 26 + 2;
      return `${x},${y}`;
    })
    .join(" ");
  return (
    <svg viewBox="0 0 100 34" className="h-[34px] w-full" preserveAspectRatio="none">
      <polyline
        points={pts}
        fill="none"
        stroke="#1a9c5b"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export function TalentDevelopmentFocus() {
  return (
    <section className="card anim-rise flex flex-col p-3.5">
      <SectionHead
        title="Talent Development Focus"
        action="Lihat Detail"
        href="/talent-intelligence/development"
      />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Prioritas Pengembangan Talenta — Investment → Capability → Readiness → Performance
      </p>

      <div className="mt-3 grid flex-1 grid-cols-[repeat(4,minmax(0,1fr))_150px] gap-3">
        {tiDevFocus.map((d) => {
          const Icon = ICONS[d.icon];
          return (
            <div
              key={d.label}
              className="flex flex-col items-center justify-center rounded-lg border border-[#eef2f6] bg-[#fbfcfd] px-2 py-3 text-center"
            >
              <span
                className={`flex h-[30px] w-[30px] items-center justify-center rounded-lg ${TONES[d.tone]}`}
              >
                <Icon size={15} strokeWidth={1.9} />
              </span>
              <span className="mt-2 min-h-[22px] text-[9px] font-bold leading-[1.25] text-ink-900">
                {d.label}
              </span>
              <span className="mt-1.5 text-[17px] font-extrabold leading-none text-ink-900">
                {d.value}{" "}
                <span className="text-[9px] font-semibold text-ink-500">Talenta</span>
              </span>
              <span className="mt-[3px] text-[9px] text-ink-500">Program aktif</span>
            </div>
          );
        })}

        {/* kartu investasi */}
        <div className="flex flex-col justify-between rounded-lg border border-[#e3efe6] bg-ptpn-greenLight px-3 py-3">
          <span className="text-[8.5px] font-bold text-ink-700">{tiInvestment.label}</span>
          <span className="mt-1 text-[16px] font-extrabold leading-none text-ink-900">
            {tiInvestment.value}
          </span>
          <MiniTrend data={tiInvestment.trend} />
          <span className="flex items-center gap-1.5">
            <Delta value={tiInvestment.delta} trend="up" tone="good" size={9} />
            <span className="text-[9px] text-ink-500">{tiInvestment.compare}</span>
          </span>
        </div>
      </div>

      {/* rantai outcome development */}
      <div className="mt-3 rounded-lg border border-[#eef2f6] bg-[#fbfcfd] px-3 pb-2.5 pt-2">
        <div className="flex items-center gap-2">
          {tiDevRoi.map((step, i) => (
            <div key={step.label} className="flex min-w-0 flex-1 items-center gap-2">
              <div className="min-w-0 flex-1">
                <div className="truncate text-[9px] font-bold uppercase tracking-[0.04em] text-ink-500">
                  {step.label}
                </div>
                <div className="mt-[3px] text-[13px] font-extrabold leading-none text-ink-900">
                  {step.value}
                </div>
                <div className="mt-[3px] truncate text-[7.5px] text-ink-400">{step.sub}</div>
              </div>
              {i < tiDevRoi.length - 1 && (
                <ChevronRight size={12} className="shrink-0 text-ink-300" />
              )}
            </div>
          ))}
        </div>
        <div className="mt-2 flex items-center gap-1.5 border-t border-[#eef2f6] pt-1.5 text-[9px] text-ink-500">
          <Info size={9} className="shrink-0" />
          {tiDevRoiNote}
        </div>
      </div>
    </section>
  );
}
