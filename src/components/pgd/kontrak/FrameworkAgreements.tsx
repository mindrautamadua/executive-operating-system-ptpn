import { frameworkAgreements } from "@/lib/pgd-data-detail";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const TOTAL_KONTRAK = frameworkAgreements.reduce((s, r) => s + r.jumlah, 0);
const TOTAL_HEMAT = frameworkAgreements.reduce((s, r) => s + r.hematRpM, 0);

/** Kontrak payung per kategori: cakupan belanja & penghematan YTD. */
export function FrameworkAgreements() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Kontrak Payung per Kategori" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {TOTAL_KONTRAK} Kontrak Payung · Hemat YTD{" "}
        <span className="font-bold text-ptpn-green">Rp {TOTAL_HEMAT} M</span>
      </p>

      <div className="scroll-thin mt-2 min-h-0 flex-1 overflow-y-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-[#eef2f6] text-left">
              {["Kategori", "Jml", "Cakupan", "Hemat", "Berlaku s.d."].map((h) => (
                <th
                  key={h}
                  className="py-[5px] text-[9px] font-extrabold uppercase tracking-[0.04em] text-ink-500"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {frameworkAgreements.map((r) => (
              <tr key={r.kategori} className="border-b border-[#f4f7f9] last:border-0">
                <td className="py-[6px] pr-2 text-[9px] font-bold text-ink-900">{r.kategori}</td>
                <td className="py-[6px] pr-2 text-[8.5px] text-ink-500">{r.jumlah}</td>
                <td className="py-[6px] pr-2">
                  <span className="flex items-center gap-1.5">
                    <span className="h-[5px] w-[40px] shrink-0 overflow-hidden rounded-full bg-[#eef2f6]">
                      <span
                        className="anim-grow-x block h-full rounded-full bg-[#3b7ded]"
                        style={{ width: `${r.cakupanPct}%` }}
                      />
                    </span>
                    <span className="text-[8.5px] font-semibold text-ink-700">
                      {r.cakupanPct.toLocaleString("id-ID", { minimumFractionDigits: 1 })}%
                    </span>
                  </span>
                </td>
                <td className="py-[6px] pr-2 text-[9.5px] font-extrabold text-ptpn-green">
                  Rp {r.hematRpM} M
                </td>
                <td className="py-[6px] text-[8.5px] text-ink-500">{r.berlakuSampai}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-1.5 rounded-md bg-ptpn-greenLight px-2 py-[5px] text-[9px] leading-[1.4] text-ptpn-greenDark">
        Rp {TOTAL_HEMAT} M dari total penghematan Rp 386 M berasal dari 42 kontrak payung — 43,5%
        hasil dari 3,4% kontrak.
      </p>
    </div>
  );
}
