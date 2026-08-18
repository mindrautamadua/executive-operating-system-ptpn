import { gratifikasiUpg } from "@/lib/risk-data-detail";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

function Tile({ label, value, tone = "neutral" }: { label: string; value: string; tone?: "neutral" | "bad" }) {
  return (
    <div className="flex min-w-0 flex-col rounded-lg border border-[#eef2f6] bg-[#fbfcfd] px-2 py-1.5">
      <span
        className={`text-[13px] font-extrabold leading-none ${tone === "bad" ? "text-[#ef4444]" : "text-ink-900"}`}
      >
        {value}
      </span>
      <span className="mt-1 truncate text-[7.5px] font-semibold uppercase tracking-[0.03em] text-ink-400">
        {label}
      </span>
    </div>
  );
}

/** Kepatuhan LHKPN & penanganan gratifikasi oleh Unit Pengendalian Gratifikasi. */
export function GratifikasiUpg() {
  const g = gratifikasiUpg;
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Gratifikasi & LHKPN (UPG)" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Kepatuhan Pelaporan Harta &amp; Pengendalian Gratifikasi
      </p>

      <div className="mt-2.5 flex items-baseline gap-1">
        <span className="text-[24px] font-extrabold leading-none tracking-[-0.01em] text-ink-900">
          {String(g.lhkpnPct).replace(".", ",")}%
        </span>
        <span className="text-[9px] font-semibold text-ink-500">
          kepatuhan LHKPN ({g.lhkpnLapor.toLocaleString("id-ID")} dari{" "}
          {g.lhkpnWajib.toLocaleString("id-ID")} wajib lapor)
        </span>
      </div>

      <span className="mt-2 h-[10px] w-full overflow-hidden rounded-full bg-[#eef2f6]">
        <span
          className="anim-grow-x block h-full rounded-full bg-ptpn-green"
          style={{ width: `${g.lhkpnPct}%` }}
        />
      </span>

      <div className="mt-2.5 grid min-h-0 flex-1 grid-cols-2 md:grid-cols-3 content-center gap-1.5">
        <Tile label="Laporan Gratifikasi" value={`${g.laporanGratifikasiYtd}`} />
        <Tile label="Diteruskan ke KPK" value={`${g.diteruskanKpk}`} />
        <Tile label="Belum Lapor LHKPN" value={`${g.lhkpnWajib - g.lhkpnLapor}`} tone="bad" />
      </div>

      <p className="mt-1.5 rounded-md bg-[#f8fafc] px-2 py-[5px] text-[9px] leading-[1.4] text-ink-500">
        {g.note}
      </p>
    </div>
  );
}
