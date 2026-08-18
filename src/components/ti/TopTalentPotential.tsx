import Link from "next/link";
import { tiTopTalent, type Readiness } from "@/lib/ti-data";
import { SectionHead } from "../hc/SectionHead";

const READINESS_TONES: Record<Readiness, string> = {
  "Ready Now": "bg-[#d2ecd9] text-[#0f7a44]",
  "Ready in 1-2 Yrs": "bg-ptpn-greenLight text-ptpn-green",
  "Ready in 3-5 Yrs": "bg-[#fdf3e0] text-[#d98b06]",
};

export function TopTalentPotential() {
  return (
    <section className="card anim-rise flex flex-col p-3.5" style={{ "--d": "120ms" } as React.CSSProperties}>
      <SectionHead
        title="Top Talent by Potential"
        action="Lihat Semua"
        href="/talent-intelligence/top-talent"
      />
      <p className="mt-[3px] text-[9px] text-ink-500">10 Talenta dengan Potential Tertinggi</p>

      <div className="mt-2 min-h-0 flex-1 overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-[#eef2f6] text-left text-[9px] font-bold uppercase tracking-[0.04em] text-ink-500">
              <th className="pb-1.5 pr-1 font-bold">Nama</th>
              <th className="pb-1.5 pr-1 font-bold">Jabatan</th>
              <th className="pb-1.5 pr-1 font-bold">Unit Kerja</th>
              <th className="pb-1.5 pr-1 text-right font-bold">Potential Score</th>
              <th className="pb-1.5 text-right font-bold">Readiness</th>
            </tr>
          </thead>
          <tbody>
            {tiTopTalent.map((t, i) => (
              <tr key={t.nama} className="border-b border-[#f4f7f9] last:border-0">
                <td className="py-[5px] pr-1">
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 shrink-0 text-[8.5px] font-semibold text-ink-400">
                      {i + 1}
                    </span>
                    <Link
                      href="/sdm-talenta/profil-karyawan"
                      className="truncate text-[9.5px] font-bold text-ink-900 hover:text-ptpn-green hover:underline"
                    >
                      {t.nama}
                    </Link>
                  </span>
                </td>
                <td className="truncate py-[5px] pr-1 text-[9px] text-ink-500">{t.jabatan}</td>
                <td className="whitespace-nowrap py-[5px] pr-1 text-[9px] text-ink-500">{t.unit}</td>
                <td className="py-[5px] pr-1 text-right text-[9.5px] font-extrabold text-ink-900">
                  {t.score}
                </td>
                <td className="py-[5px] text-right">
                  <span
                    className={`inline-block whitespace-nowrap rounded-full px-2 py-[2px] text-[9px] font-bold ${READINESS_TONES[t.readiness]}`}
                  >
                    {t.readiness}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
