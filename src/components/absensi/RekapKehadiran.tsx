import { ArrowRight, ChevronDown } from "lucide-react";
import { rekapKehadiran, type RisikoLevel } from "@/lib/absensi-data";
import { PALETTE } from "@/lib/chart-palette";

const HEAD = [
  "Unit Organisasi",
  "Karyawan",
  "Tingkat Kehadiran",
  "Tepat Waktu",
  "Lembur",
  "Izin",
  "Sakit",
  "Alpha",
  "Risiko",
];

const RISIKO_CHIP: Record<RisikoLevel, string> = {
  Rendah: "tone-green",
  Waspada: "tone-amber",
  Tinggi: "tone-red",
};

const angka = (s: string) => parseFloat(s.replace(",", "."));

export function RekapKehadiran() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "420ms" } as React.CSSProperties}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="card-title-navy">Matriks Risiko Kehadiran per Unit</h3>
          <p
            className="mt-[3px] cursor-help text-[9.5px] text-ink-500"
            title="Kehadiran tinggi + lembur tinggi tetap berisiko: indikasi understaffed, bukan sekadar disiplin."
          >
            Risiko komposit: kehadiran × alpha × lembur × on-time ⓘ
          </p>
        </div>
        <button className="select-chip whitespace-nowrap px-2.5 py-[5px] text-[9.5px]">
          Semua Unit <ChevronDown size={11} />
        </button>
      </div>

      <div className="scroll-thin overflow-x-auto">
      <table className="mt-2 w-full">
        <thead>
          <tr className="border-b border-[#eef2f6]">
            {HEAD.map((h, i) => (
              <th
                key={h}
                className={`whitespace-nowrap px-2 pb-2 text-[9px] font-semibold text-ink-500 ${
                  i === 0 ? "text-left" : "text-right"
                }`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rekapKehadiran.map((r, ri) => {
            const alphaTinggi = angka(r.alpha) > 4;
            return (
              <tr
                key={r.unit}
                className="border-b border-[#f4f7fa] transition-colors last:border-0 hover:bg-[#f5f8fa]"
              >
                <td className="whitespace-nowrap px-2 py-[4px] text-[10px] text-ink-900">
                  {r.unit}
                </td>
                <td className="whitespace-nowrap px-2 text-right text-[10px] tabular-nums text-ink-700">
                  {r.karyawan}
                </td>
                {/* Tingkat kehadiran: angka + bar mini */}
                <td className="whitespace-nowrap px-2 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <span className="h-[5px] w-[44px] overflow-hidden rounded-full bg-[#f1f5f8]">
                      <span
                        className="anim-grow-x block h-full rounded-full"
                        style={
                          {
                            width: `${angka(r.kehadiran)}%`,
                            background: PALETTE.green,
                            "--d": `${ri * 60}ms`,
                          } as React.CSSProperties
                        }
                      />
                    </span>
                    <span className="text-[10px] font-semibold tabular-nums text-ink-700">
                      {r.kehadiran}
                    </span>
                  </div>
                </td>
                {[r.tepatWaktu, r.lembur, r.izin, r.sakit].map((v, i) => (
                  <td
                    key={i}
                    className="whitespace-nowrap px-2 text-right text-[10px] tabular-nums text-ink-700"
                  >
                    {v}
                  </td>
                ))}
                {/* Alpha > 4% diberi tint merah */}
                <td className="whitespace-nowrap px-2 text-right">
                  <span
                    className={`inline-block rounded px-1 text-[10px] tabular-nums ${
                      alphaTinggi ? "tone-red font-semibold" : "text-ink-700"
                    }`}
                  >
                    {r.alpha}
                  </span>
                </td>
                <td className="whitespace-nowrap px-2 text-right">
                  <span
                    className={`${RISIKO_CHIP[r.risiko]} inline-block rounded px-1.5 py-[1px] text-[9px] font-bold`}
                  >
                    {r.risiko}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>

      <button className="link-more mt-auto flex items-center gap-1 pt-2">
        Lihat seluruh data <ArrowRight size={11} />
      </button>
    </div>
  );
}
