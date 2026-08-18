import { ArrowRight } from "lucide-react";
import { analitikPrediktif } from "@/lib/data";
import { Sparkline } from "./ui/Sparkline";
import { Delta } from "./ui/Delta";

export function AnalitikPrediktif() {
  return (
    <div className="card flex h-full flex-col px-4 pb-2 pt-2">
      <h3 className="card-title">ANALITIK PREDIKTIF</h3>

      <div className="mt-1.5 grid min-h-0 flex-1 grid-cols-3 gap-2.5">
        {analitikPrediktif.map((a) => (
          <div
            key={a.label}
            className="flex min-h-0 flex-col rounded-lg border border-[#eef2f6] bg-[#fbfdfe] px-2.5 py-1.5"
          >
            <div className="min-h-[20px] text-[9px] leading-[1.25] text-ink-500">
              {a.label}
            </div>
            <div className="mt-0.5 flex items-baseline gap-1 whitespace-nowrap">
              <span className="text-[15px] font-extrabold leading-none text-ink-900">
                {a.value}
              </span>
              {a.unit && (
                <span className="text-[9px] font-medium text-ink-500">{a.unit}</span>
              )}
            </div>
            <Delta value={a.delta} trend="up" size={9.5} className="mt-1" />
            {/* Rentang P10–P90 + keyakinan — forecast bukan angka pasti.
                Definisi confidence dieksplisitkan supaya bukan angka dekoratif. */}
            <div
              className="mt-[3px] cursor-help truncate text-[9px] text-ink-500 underline decoration-dotted decoration-[#c6cfd8] underline-offset-2"
              title={`Rentang P10–P90 ${a.range}. Keyakinan ${a.confidencePct}% = kalibrasi historis model: probabilitas realisasi jatuh di dalam rentang ini, dihitung dari akurasi forecast periode-periode sebelumnya.`}
            >
              {a.range} · {a.confidencePct}%
            </div>
            <div className="-mx-1 mt-auto">
              <Sparkline data={a.series} color={a.color} height={16} />
            </div>
          </div>
        ))}
      </div>

      <button className="mt-1 flex items-center gap-1 text-[10px] font-semibold text-ptpn-green hover:underline">
        Lihat analitik lengkap <ArrowRight size={11} />
      </button>
    </div>
  );
}
