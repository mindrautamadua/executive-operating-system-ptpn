import { Sparkles } from "lucide-react";
import { jenjangNote, jenjangTotal, kebutuhanJenjang } from "@/lib/wp-data";
import { SectionHead } from "../hc/SectionHead";
import { NotePill } from "./NotePill";

const ribuan = (v: number) => v.toLocaleString("id-ID");

export function KebutuhanJenjang() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Kebutuhan Talenta Berdasarkan Jenjang" />

      <div className="scroll-thin mt-2 min-h-0 flex-1 overflow-y-auto">
      <table className="w-full">
        <thead>
          <tr className="text-[9px] font-semibold uppercase tracking-[0.03em] text-ink-500">
            <th className="pb-1.5 text-left font-semibold">Jenjang</th>
            <th className="pb-1.5 text-right font-semibold">2026 (F)</th>
            <th className="pb-1.5 text-right font-semibold">2027 (F)</th>
            <th className="pb-1.5 text-right font-semibold">2028 (F)</th>
            <th className="pb-1.5 text-right font-semibold leading-tight">
              Kebutuhan Tambahan
              <br />
              (2026-2028)
            </th>
          </tr>
        </thead>
        <tbody>
          {kebutuhanJenjang.map((r) => (
            <tr key={r.name} className="border-t border-[#f0f3f6] text-[9.5px]">
              <td className="py-[5px] font-semibold text-ink-700">{r.name}</td>
              <td className="py-[5px] text-right text-ink-700">{ribuan(r.y2026)}</td>
              <td className="py-[5px] text-right text-ink-700">{ribuan(r.y2027)}</td>
              <td className="py-[5px] text-right text-ink-700">{ribuan(r.y2028)}</td>
              <td className="py-[5px] text-right font-bold text-ink-900">{ribuan(r.tambahan)}</td>
            </tr>
          ))}
          <tr className="border-t-2 border-[#e3e9ef] text-[9.5px] font-extrabold text-ink-900">
            <td className="py-[6px]">{jenjangTotal.name}</td>
            <td className="py-[6px] text-right">{ribuan(jenjangTotal.y2026)}</td>
            <td className="py-[6px] text-right">{ribuan(jenjangTotal.y2027)}</td>
            <td className="py-[6px] text-right">{ribuan(jenjangTotal.y2028)}</td>
            <td className="py-[6px] text-right">{ribuan(jenjangTotal.tambahan)}</td>
          </tr>
        </tbody>
      </table>
      </div>

      <div className="shrink-0 pt-2">
        <NotePill icon={Sparkles} text={jenjangNote} tone="gray" />
      </div>
    </div>
  );
}
