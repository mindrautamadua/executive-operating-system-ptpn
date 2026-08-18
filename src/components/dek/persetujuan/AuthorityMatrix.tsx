import { authorityMatrix, authorityNote } from "@/lib/dek-data-detail";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

/** Ambang kewenangan Direksi / Dewan Komisaris / RUPS menurut Anggaran Dasar. */
export function AuthorityMatrix() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "180ms" } as React.CSSProperties}
    >
      <SectionHead title="Matriks Ambang Kewenangan" action="Lihat Anggaran Dasar" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Tujuh Jenis Aksi Korporasi · Ambang Bersifat Ilustratif untuk Dashboard Pengawasan
      </p>

      <div className="scroll-thin mt-1.5 min-h-0 flex-1 overflow-y-auto">
        <div className="scroll-thin overflow-x-auto">
        <table className="w-full border-separate border-spacing-0">
          <thead className="sticky top-0 bg-[var(--surface)]">
            <tr className="text-left text-[7.5px] font-extrabold uppercase tracking-[0.05em] text-ink-400">
              <th className="border-b border-[#eef2f6] pb-1.5 pr-2">Jenis Aksi</th>
              <th className="border-b border-[#eef2f6] pb-1.5 pr-2">Cukup Direksi</th>
              <th className="border-b border-[#eef2f6] pb-1.5 pr-2">Perlu Dewan Komisaris</th>
              <th className="border-b border-[#eef2f6] pb-1.5 pr-2">Perlu RUPS</th>
              <th className="border-b border-[#eef2f6] pb-1.5">Dasar</th>
            </tr>
          </thead>
          <tbody>
            {authorityMatrix.map((a) => (
              <tr key={a.jenisAksi} className="align-top">
                <td className="border-b border-[#f3f6f9] py-[5px] pr-2 text-[8.5px] font-bold leading-snug text-ink-900">
                  {a.jenisAksi}
                </td>
                <td className="border-b border-[#f3f6f9] py-[5px] pr-2 text-[9px] leading-snug text-ink-500">
                  {a.cukupDireksi}
                </td>
                <td className="border-b border-[#f3f6f9] py-[5px] pr-2 text-[9px] font-semibold leading-snug text-ptpn-green">
                  {a.perluDekom}
                </td>
                <td className="border-b border-[#f3f6f9] py-[5px] pr-2 text-[9px] leading-snug text-ink-500">
                  {a.perluRups}
                </td>
                <td className="border-b border-[#f3f6f9] py-[5px] text-[7.5px] leading-snug text-ink-400">
                  {a.dasar}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>

      <p className="mt-1.5 border-t border-[#f0f3f6] pt-1.5 text-[8.5px] leading-snug text-ink-500">
        {authorityNote}
      </p>
    </div>
  );
}
