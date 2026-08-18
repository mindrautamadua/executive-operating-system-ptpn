import { ArrowRight } from "lucide-react";
import { AMBANG_KUALITAS, unitKualitas } from "@/lib/data-analytics";

const angka = (s: string) => parseFloat(s.replace(",", "."));

/**
 * Heat 3 tingkat dihitung dari AMBANG_KUALITAS — bukan flag hardcode:
 * hijau ≥ ambang, amber < 1 poin di bawah ambang, merah di bawahnya lagi.
 */
function toneSkor(value: string) {
  const v = angka(value);
  if (v >= AMBANG_KUALITAS) return "tone-green";
  if (v >= AMBANG_KUALITAS - 1) return "tone-amber";
  return "tone-red";
}

function SkorCell({ value }: { value: string }) {
  return (
    <td className="py-[5px] text-center">
      <span
        className={`inline-block min-w-[38px] rounded-md px-1.5 py-[2px] text-[9.5px] font-semibold tabular-nums ${toneSkor(
          value,
        )}`}
      >
        {value}
      </span>
    </td>
  );
}

export function PerbandinganUnit() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "300ms" } as React.CSSProperties}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="card-title-navy">Perbandingan Kualitas Data per Unit Organisasi</h3>
        <span className="whitespace-nowrap text-[9px] text-ink-500">
          Ambang: {AMBANG_KUALITAS.toFixed(1).replace(".", ",")}
        </span>
      </div>

      <div className="mt-1.5 min-h-0 flex-1">
        <div className="scroll-thin overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-[#eef2f6] text-[9px] font-semibold text-ink-500">
              <th className="pb-[5px] text-left font-semibold">Unit Organisasi</th>
              <th className="pb-[5px] text-center font-semibold">DQ Score</th>
              <th className="pb-[5px] text-center font-semibold">Kelengkapan</th>
              <th className="pb-[5px] text-center font-semibold">Akurasi</th>
              <th className="pb-[5px] text-center font-semibold">Konsistensi</th>
            </tr>
          </thead>
          <tbody>
            {unitKualitas.map((u) => (
              <tr
                key={u.unit}
                className="border-b border-[#f5f8fa] transition-colors last:border-0 hover:bg-[#f5f8fa]"
              >
                <td className="whitespace-nowrap py-[5px] text-[9.5px] font-semibold text-ink-900">
                  {u.unit}
                </td>
                <SkorCell value={u.dq} />
                <SkorCell value={u.kelengkapan} />
                <SkorCell value={u.akurasi} />
                <SkorCell value={u.konsistensi} />
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>

      <button className="link-more mt-1 flex items-center gap-1">
        Lihat perbandingan lengkap <ArrowRight size={11} />
      </button>
    </div>
  );
}
