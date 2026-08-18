import { ownerMatrix } from "@/lib/risk-data";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

function Cell({ value, cls }: { value: number; cls: string }) {
  return (
    <span
      className={`mx-auto flex h-[19px] w-[28px] items-center justify-center rounded-md text-[9px] font-extrabold ${
        value === 0 ? "bg-[#f1f5f9] text-ink-400" : cls
      }`}
    >
      {value}
    </span>
  );
}

/** Heat-table sebaran level risiko per direktorat pemilik. */
export function RiskOwnerMatrix() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "240ms" } as React.CSSProperties}
    >
      <SectionHead title="Matriks Pemilik Risiko" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Sebaran Level Risiko per Direktorat Pemilik (Total 142)
      </p>

      <div className="mt-2 grid grid-cols-[minmax(0,1fr)_34px_34px_38px_34px_34px] items-center gap-x-1 border-b border-[#eef2f6] pb-1.5 text-[9px] font-semibold uppercase tracking-[0.04em] text-ink-500">
        <span>Direktorat</span>
        <span className="text-center">Ekst</span>
        <span className="text-center">Tinggi</span>
        <span className="text-center">Meneng</span>
        <span className="text-center">Rendah</span>
        <span className="text-center">Total</span>
      </div>

      <ul className="scroll-thin flex min-h-0 flex-1 flex-col justify-around gap-y-1 overflow-y-auto py-1">
        {ownerMatrix.map((o) => (
          <li
            key={o.direktorat}
            className="grid shrink-0 grid-cols-[minmax(0,1fr)_34px_34px_38px_34px_34px] items-center gap-x-1"
          >
            <span className="truncate text-[9.5px] font-bold text-ink-900" title={o.direktorat}>
              {o.direktorat}
            </span>
            <Cell value={o.ekstrem} cls="bg-[#fdecec] text-[#ef4444]" />
            <Cell value={o.tinggi} cls="bg-[#fdf0e8] text-[#f0662d]" />
            <Cell value={o.menengah} cls="bg-[#fdf3e0] text-[#d98b06]" />
            <Cell value={o.rendah} cls="bg-ptpn-greenLight text-ptpn-green" />
            <span className="text-center text-[9.5px] font-extrabold text-ink-900">{o.total}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
