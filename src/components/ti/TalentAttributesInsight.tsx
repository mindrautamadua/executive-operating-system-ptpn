import {
  Award,
  Briefcase,
  Crown,
  GraduationCap,
  MonitorSmartphone,
  Wrench,
  Zap,
} from "lucide-react";
import { tiAttributes, tiAttributesNote } from "@/lib/ti-data";
import { SectionHead } from "../hc/SectionHead";

const ICONS = {
  leadership: Crown,
  agility: Zap,
  learning: GraduationCap,
  technical: Wrench,
  digital: MonitorSmartphone,
  business: Briefcase,
};

export function TalentAttributesInsight() {
  return (
    <section className="card anim-rise flex flex-col p-3.5" style={{ "--d": "60ms" } as React.CSSProperties}>
      <SectionHead
        title="Talent Attributes Insight"
        action="Lihat Detail"
        href="/talent-intelligence/atribut-talenta"
      />
      <p className="mt-[3px] text-[9px] text-ink-500">Analisis Atribut Talenta Kritis</p>

      <div className="mt-2 flex-1">
        <div className="grid grid-cols-[minmax(0,1fr)_86px_64px_44px] items-center border-b border-[#eef2f6] pb-1.5 text-[9px] font-bold uppercase tracking-[0.04em] text-ink-500">
          <span>Atribut</span>
          <span className="text-right">Rata-rata Skor</span>
          <span className="text-right">Benchmark</span>
          <span className="text-right">Gap</span>
        </div>
        <ul>
          {tiAttributes.map((a) => {
            const Icon = ICONS[a.icon];
            return (
              <li
                key={a.label}
                className="grid grid-cols-[minmax(0,1fr)_86px_64px_44px] items-center border-b border-[#f4f7f9] py-[7px] last:border-0"
              >
                <span className="flex min-w-0 items-center gap-2">
                  <span className="flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-md bg-[#f1f5f8] text-ink-500">
                    <Icon size={11} strokeWidth={1.9} />
                  </span>
                  <span className="truncate text-[9.5px] font-semibold text-ink-900">{a.label}</span>
                </span>
                <span className="text-right text-[9.5px] font-extrabold text-ink-900">
                  {a.score} <span className="font-medium text-ink-400">/ 5</span>
                </span>
                <span className="text-right text-[9.5px] font-semibold text-ink-500">
                  {a.benchmark}
                </span>
                <span
                  className={`text-right text-[9.5px] font-extrabold ${
                    a.gapTone === "good" ? "text-ptpn-green" : "text-[#ef4444]"
                  }`}
                >
                  {a.gap}
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-2.5 flex items-center gap-2 rounded-lg border border-[#e3efe6] bg-ptpn-greenLight px-2.5 py-[7px]">
        <Award size={12} className="shrink-0 text-ptpn-green" />
        <span className="text-[8.5px] font-medium text-ink-700">{tiAttributesNote}</span>
      </div>
    </section>
  );
}
