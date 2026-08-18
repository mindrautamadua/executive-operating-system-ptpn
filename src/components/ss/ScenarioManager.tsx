import { ArrowRight, Plus } from "lucide-react";
import { scenarios } from "@/lib/ss-data";
import { SectionHead } from "../hc/SectionHead";

function StatusBadge({ status }: { status: "Aktif" | "Draft" }) {
  const cls =
    status === "Aktif"
      ? "bg-ptpn-greenLight text-ptpn-green"
      : "bg-[#eef2f6] text-ink-500";
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full px-2 py-[2px] text-[9px] font-bold ${cls}`}
    >
      {status}
    </span>
  );
}

export function ScenarioManager() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <SectionHead title="Pilih & Kelola Skenario" />
          <p className="mt-[3px] text-[9px] text-ink-500">
            Buat, kelola dan bandingkan berbagai skenario strategi
          </p>
        </div>
        <button className="flex shrink-0 items-center gap-1 rounded-lg border border-[#cfe0f7] bg-[#f2f7fe] px-2.5 py-[6px] text-[9px] font-bold text-[#2f6fe4] transition-colors hover:border-[#2f6fe4]">
          <Plus size={11} strokeWidth={2.4} />
          Buat Skenario Baru
        </button>
      </div>

      <div className="mt-2 grid grid-cols-[86px_minmax(0,1fr)_78px_44px_84px] items-center gap-x-2 border-b border-[#eef2f6] pb-1.5 text-[9px] font-semibold uppercase tracking-[0.04em] text-ink-500">
        <span>Skenario</span>
        <span>Deskripsi</span>
        <span>Tipe</span>
        <span className="text-center">Status</span>
        <span className="text-right">Terakhir Diperbarui</span>
      </div>

      <ul className="scroll-thin flex min-h-0 flex-1 flex-col justify-between gap-y-1 overflow-y-auto py-1">
        {scenarios.map((s) => (
          <li
            key={s.name}
            className={`grid shrink-0 grid-cols-[86px_minmax(0,1fr)_78px_44px_84px] items-center gap-x-2 rounded-md px-1 py-[3px] ${
              s.selected ? "bg-ptpn-greenLight/60 ring-1 ring-inset ring-ptpn-green/25" : ""
            }`}
          >
            <span className="truncate text-[9.5px] font-extrabold text-ink-900">{s.name}</span>
            <span className="truncate text-[9px] text-ink-600">{s.desc}</span>
            <span className="truncate text-[9px] font-semibold text-ink-500">{s.type}</span>
            <span className="text-center">
              <StatusBadge status={s.status} />
            </span>
            <span className="text-right text-[8.5px] text-ink-500">{s.updated}</span>
          </li>
        ))}
      </ul>

      <button className="mt-1.5 flex w-full items-center justify-center gap-1 rounded-lg border border-[#e3e9ef] bg-[#f8fafc] py-[7px] text-[9.5px] font-semibold text-ptpn-greenDark transition-colors hover:bg-[#eef4f0]">
        Lihat Semua Skenario <ArrowRight size={11} />
      </button>
    </div>
  );
}
