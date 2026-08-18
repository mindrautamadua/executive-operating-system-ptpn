import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { aiUseCases } from "@/lib/tik-data-detail";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";
import { ToneBadge, type BadgeTone } from "@/components/shared/ToneBadge";

const TAHAP_TONE: Record<string, BadgeTone> = {
  Produksi: "good",
  Pilot: "info",
  Pengembangan: "neutral",
};

const RISIKO_TONE: Record<string, string> = {
  Tinggi: "text-[#ef4444]",
  Sedang: "text-[#d98b06]",
  Rendah: "text-ink-500",
};

export function AiUseCases() {
  return (
    <div
      className="card anim-rise flex h-full min-h-0 flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "90ms" } as React.CSSProperties}
    >
      <SectionHead title="Portofolio AI Use Case" action="Lihat Semua" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        7 Use Case · 3 Produksi, 2 Pilot, 2 Pengembangan · Dampak &amp; Risiko Model
      </p>

      <div className="scroll-thin mt-2 min-h-0 flex-1 overflow-y-auto">
        <div className="scroll-thin overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 bg-[var(--surface)]">
            <tr className="border-b border-[#eef2f6] text-left">
              <th className="pb-1.5 text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
                Use Case
              </th>
              <th className="pb-1.5 text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
                Domain
              </th>
              <th className="pb-1.5 text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
                Tahap
              </th>
              <th className="pb-1.5 text-right text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
                Dampak/Thn
              </th>
              <th className="pb-1.5 text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
                Risiko
              </th>
              <th className="pb-1.5 text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
                Catatan
              </th>
            </tr>
          </thead>
          <tbody>
            {aiUseCases.map((u) => (
              <tr key={u.useCase} className="border-b border-[#f4f7fa]">
                <td className="py-[7px] pr-2">
                  {u.href ? (
                    <Link
                      href={u.href}
                      className="flex items-center gap-1 text-[9.5px] font-bold text-ptpn-green hover:underline"
                    >
                      {u.useCase}
                      <ArrowUpRight size={10} className="shrink-0" />
                    </Link>
                  ) : (
                    <span className="text-[9.5px] font-bold text-ink-900">{u.useCase}</span>
                  )}
                </td>
                <td className="py-[7px] pr-2 text-[9px] text-ink-700">{u.domain}</td>
                <td className="py-[7px] pr-2">
                  <ToneBadge label={u.tahap} tone={TAHAP_TONE[u.tahap]} />
                </td>
                <td className="whitespace-nowrap py-[7px] pr-2 text-right text-[9px] font-semibold text-ink-700">
                  {u.dampakRpM === null ? "—" : `Rp ${u.dampakRpM} M`}
                </td>
                <td
                  className={`py-[7px] pr-2 text-[9px] font-semibold ${RISIKO_TONE[u.risikoModel]}`}
                >
                  {u.risikoModel}
                </td>
                <td className="py-[7px] text-[8.5px] text-ink-500">{u.dampakNaratif}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>

      <p className="pt-1.5 text-[9px] leading-snug text-ink-500">
        3 use case produksi bernilai Rp 154 M/tahun; AI HR Assistant dikelola modul SDM namun tetap
        tercatat di portofolio AI grup.
      </p>
    </div>
  );
}
