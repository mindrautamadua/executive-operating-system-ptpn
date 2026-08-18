import { ArrowRight, BadgeCheck } from "lucide-react";
import { ddCategories, ddEntries, ddTotalMetrics, type DdStatus } from "@/lib/dd-data";
import { SectionHead } from "../hc/SectionHead";

const FREQ_CLS: Record<string, string> = {
  Harian: "bg-ptpn-greenLight text-ptpn-green",
  Bulanan: "bg-[#e8f1fd] text-[#2f6fe4]",
  Triwulanan: "bg-[#f1ecfd] text-[#8b5cf6]",
};

/**
 * Status Certified sengaja tampil tanpa latar agar tidak menjadi 13 blok warna identik;
 * yang perlu menarik perhatian eksekutif adalah pengecualiannya.
 */
const STATUS_CLS: Record<DdStatus, string> = {
  Certified: "text-ptpn-green",
  Provisional: "bg-[#fdf3e0] px-1.5 py-[2px] text-[#d98b06]",
  Deprecated: "bg-[#fdecec] px-1.5 py-[2px] text-[#ef4444]",
};

const catColor = (name: string) =>
  ddCategories.find((c) => c.name === name)?.color ?? "#94a3b8";

const trustColor = (v: number) =>
  v >= 95 ? "text-ptpn-green" : v >= 90 ? "text-[#2f6fe4]" : "text-[#d98b06]";

const certified = ddEntries.filter((e) => e.status === "Certified").length;
const provisional = ddEntries.length - certified;

export function DdTable() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Katalog Istilah & Metrik" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {ddEntries.length} metrik inti eksekutif dari {ddTotalMetrics} istilah tergovernance
        · {certified} certified · {provisional} provisional
      </p>

      <div className="scroll-thin mt-2 min-h-0 flex-1 overflow-y-auto">
        <div className="scroll-thin overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 bg-[var(--surface,#fff)]">
            <tr className="border-b border-[#eef2f6] text-left text-[9px] font-semibold uppercase tracking-[0.04em] text-ink-500">
              <th className="pb-1.5 pr-2 font-semibold">Istilah / Status</th>
              <th className="pb-1.5 pr-2 font-semibold">Definisi</th>
              <th className="pb-1.5 pr-2 font-semibold">Formula</th>
              <th className="pb-1.5 pr-2 font-semibold">Sumber / Update</th>
              <th className="pb-1.5 pr-2 font-semibold">Pemilik Metrik</th>
              <th className="pb-1.5 text-center font-semibold">Trust</th>
            </tr>
          </thead>
          <tbody>
            {ddEntries.map((e) => (
              <tr key={e.term} className="border-b border-[#f5f8fa] align-top last:border-0">
                <td className="w-[152px] py-[7px] pr-2">
                  <span className="flex items-start gap-1.5">
                    <span
                      className="mt-[3px] h-[7px] w-[7px] shrink-0 rounded-[2px]"
                      style={{ background: catColor(e.category) }}
                      title={e.category}
                    />
                    <span className="min-w-0">
                      <span className="block text-[9px] font-extrabold leading-[1.3] text-ink-900">
                        {e.term}
                      </span>
                      <span
                        className={`mt-[3px] inline-flex items-center gap-[3px] rounded-md text-[7.5px] font-extrabold uppercase tracking-[0.03em] ${STATUS_CLS[e.status]}`}
                      >
                        {e.status === "Certified" && <BadgeCheck size={9} strokeWidth={2.4} />}
                        {e.status}
                      </span>
                    </span>
                  </span>
                </td>
                <td className="py-[7px] pr-2 text-[8.5px] leading-[1.4] text-ink-500">
                  {e.definition}
                </td>
                <td className="w-[142px] py-[7px] pr-2 text-[8.5px] italic leading-[1.4] text-ink-700">
                  {e.formula}
                </td>
                <td className="w-[96px] py-[7px] pr-2">
                  <span className="block text-[8.5px] font-semibold leading-[1.3] text-ink-700">
                    {e.source}
                  </span>
                  <span
                    className={`mt-[3px] inline-flex items-center rounded-md px-1.5 py-[2px] text-[7.5px] font-extrabold ${FREQ_CLS[e.frequency]}`}
                  >
                    {e.frequency}
                  </span>
                </td>
                <td className="w-[104px] py-[7px] pr-2 text-[8.5px] font-semibold leading-[1.35] text-ink-700">
                  {e.owner}
                </td>
                <td
                  className={`w-[52px] py-[7px] text-center text-[10px] font-extrabold tabular-nums ${trustColor(e.trust)}`}
                >
                  {e.trust}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>

      <button className="mt-2 flex w-full shrink-0 items-center justify-center gap-1 rounded-lg border border-[#e3e9ef] bg-[#f8fafc] py-[7px] text-[9.5px] font-semibold text-ptpn-greenDark transition-colors hover:bg-[#eef4f0]">
        Lihat Seluruh {ddTotalMetrics} Istilah <ArrowRight size={11} />
      </button>
    </div>
  );
}
