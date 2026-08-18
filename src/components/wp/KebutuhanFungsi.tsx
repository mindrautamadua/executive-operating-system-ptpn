import {
  Boxes,
  Factory,
  Handshake,
  Sprout,
  Truck,
  Users,
  Wallet,
  Wrench,
} from "lucide-react";
import { fungsiTotal, kebutuhanFungsi } from "@/lib/wp-data";
import { SectionHead } from "../hc/SectionHead";

const ICONS = {
  kebun: Sprout,
  pabrik: Factory,
  engineering: Wrench,
  supply: Truck,
  sales: Handshake,
  keuangan: Wallet,
  hc: Users,
  lainnya: Boxes,
};

const ribuan = (v: number) => v.toLocaleString("id-ID");

export function KebutuhanFungsi() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "180ms" } as React.CSSProperties}
    >
      <SectionHead title="Kebutuhan Talenta Berdasarkan Fungsi Utama" />

      <div className="scroll-thin mt-2 min-h-0 flex-1 overflow-y-auto">
      <div className="scroll-thin overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-[9px] font-semibold uppercase tracking-[0.03em] text-ink-500">
            <th className="pb-1.5 text-left font-semibold">Fungsi</th>
            <th className="pb-1.5 text-right font-semibold">2026 (F)</th>
            <th className="pb-1.5 text-right font-semibold">2027 (F)</th>
            <th className="pb-1.5 text-right font-semibold">2028 (F)</th>
            <th className="pb-1.5 text-right font-semibold">Kebutuhan Tambahan</th>
          </tr>
        </thead>
        <tbody>
          {kebutuhanFungsi.map((r) => {
            const Icon = ICONS[r.icon];
            const negatif = r.tambahan < 0;
            return (
              <tr key={r.name} className="border-t border-[#f0f3f6] text-[9.5px]">
                <td className="py-[4px]">
                  <span className="flex items-center gap-1.5 font-semibold text-ink-700">
                    <span
                      className={`flex h-[16px] w-[16px] shrink-0 items-center justify-center rounded ${
                        r.icon === "lainnya"
                          ? "bg-[#f0f3f6] text-ink-400"
                          : "bg-ptpn-greenLight text-ptpn-green"
                      }`}
                    >
                      <Icon size={10} strokeWidth={1.9} />
                    </span>
                    <span className="truncate">{r.name}</span>
                  </span>
                </td>
                <td className="py-[4px] text-right text-ink-700">{ribuan(r.y2026)}</td>
                <td className="py-[4px] text-right text-ink-700">{ribuan(r.y2027)}</td>
                <td className="py-[4px] text-right text-ink-700">{ribuan(r.y2028)}</td>
                <td
                  className={`py-[4px] text-right font-bold ${
                    negatif ? "text-[#ef4444]" : "text-ink-900"
                  }`}
                >
                  {ribuan(r.tambahan)}
                </td>
              </tr>
            );
          })}
          <tr className="border-t-2 border-[#e3e9ef] text-[9.5px] font-extrabold text-ink-900">
            <td className="py-[6px]">{fungsiTotal.name}</td>
            <td className="py-[6px] text-right">{ribuan(fungsiTotal.y2026)}</td>
            <td className="py-[6px] text-right">{ribuan(fungsiTotal.y2027)}</td>
            <td className="py-[6px] text-right">{ribuan(fungsiTotal.y2028)}</td>
            <td className="py-[6px] text-right">{ribuan(fungsiTotal.tambahan)}</td>
          </tr>
        </tbody>
      </table>
      </div>
      </div>
    </div>
  );
}
