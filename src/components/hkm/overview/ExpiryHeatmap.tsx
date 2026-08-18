import { expiryHeatmap } from "@/lib/hkm-data";
import { PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

/** Bulan puncak yang disorot (jendela ≤90 hari). */
const SOROT = new Set(["Jun 2026", "Jul 2026", "Agu 2026"]);

const maxKontrak = Math.max(...expiryHeatmap.map((c) => c.kontrak));
const maxIzin = Math.max(...expiryHeatmap.map((c) => c.izin));

/** Intensitas sel 0,12–0,58 mengikuti rasio terhadap nilai tertinggi. */
function cellStyle(value: number, max: number, base: string): React.CSSProperties {
  const rasio = max > 0 ? value / max : 0;
  const alpha = Math.round((0.12 + rasio * 0.46) * 255)
    .toString(16)
    .padStart(2, "0");
  return { backgroundColor: `${base}${alpha}` };
}

/** Heat-table gabungan kedaluwarsa kontrak + izin, 6 bulan ke depan. */
export function ExpiryHeatmap() {
  const totalKontrak = expiryHeatmap.reduce((a, c) => a + c.kontrak, 0);
  const totalIzin = expiryHeatmap.reduce((a, c) => a + c.izin, 0);

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "90ms" } as React.CSSProperties}
    >
      <SectionHead title="Heatmap Kedaluwarsa Gabungan" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Kontrak &amp; Izin Berakhir 6 Bulan ke Depan · {totalKontrak} kontrak · {totalIzin} izin
      </p>

      <div className="mt-2 min-h-0 flex-1 overflow-hidden">
        <div className="scroll-thin overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-[#eef2f6] text-[8.5px] font-semibold text-ink-500">
              <th className="pb-[6px] text-left font-semibold">Kategori</th>
              {expiryHeatmap.map((c) => (
                <th
                  key={c.bulan}
                  className={`pb-[6px] text-center font-semibold ${
                    SOROT.has(c.bulan) ? "text-[#d98b06]" : ""
                  }`}
                >
                  {c.bulan.replace(" 20", " ")}
                </th>
              ))}
              <th className="pb-[6px] pl-3 text-right font-semibold">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-[#f5f8fa]">
              <td className="whitespace-nowrap py-[7px] text-[9.5px] font-bold text-ink-900">
                Kontrak
              </td>
              {expiryHeatmap.map((c) => (
                <td key={c.bulan} className="px-[3px] py-[5px]">
                  <div
                    className={`rounded-md py-[6px] text-center text-[10px] font-extrabold tabular-nums text-ink-900 ${
                      SOROT.has(c.bulan) ? "ring-1 ring-[#f5a524]" : ""
                    }`}
                    style={cellStyle(c.kontrak, maxKontrak, PALETTE.blue)}
                  >
                    {c.kontrak}
                  </div>
                </td>
              ))}
              <td className="py-[7px] pl-3 text-right text-[9.5px] font-extrabold tabular-nums text-ink-900">
                {totalKontrak}
              </td>
            </tr>
            <tr>
              <td className="whitespace-nowrap py-[7px] text-[9.5px] font-bold text-ink-900">
                Izin &amp; Lisensi
              </td>
              {expiryHeatmap.map((c) => (
                <td key={c.bulan} className="px-[3px] py-[5px]">
                  <div
                    className={`rounded-md py-[6px] text-center text-[10px] font-extrabold tabular-nums text-ink-900 ${
                      SOROT.has(c.bulan) ? "ring-1 ring-[#f5a524]" : ""
                    }`}
                    style={cellStyle(c.izin, maxIzin, PALETTE.teal)}
                  >
                    {c.izin}
                  </div>
                </td>
              ))}
              <td className="py-[7px] pl-3 text-right text-[9.5px] font-extrabold tabular-nums text-ink-900">
                {totalIzin}
              </td>
            </tr>
          </tbody>
        </table>
        </div>
      </div>

      <p className="mt-1 border-t border-[#f5f8fa] pt-1.5 text-[9px] leading-snug text-ink-500">
        Jendela Jun–Agu 2026 (disorot) menampung 112 kontrak dan 25 izin — beban perpanjangan
        tertinggi jatuh pada Juli dan Agustus.
      </p>
    </div>
  );
}
