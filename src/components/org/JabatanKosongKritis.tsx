import { jabatanKosongKritis, SEVERITY_TONE } from "@/lib/org-data";

export function JabatanKosongKritis() {
  return (
    <div
      className="card anim-rise shrink-0 px-4 pb-2.5 pt-2.5"
      style={{ "--d": "180ms" } as React.CSSProperties}
    >
      <div className="flex items-center justify-between gap-2">
        <h3 className="card-title-navy">Jabatan Kosong Kritis</h3>
        <button className="link-more">Lihat semua</button>
      </div>

      <div className="mt-1.5 flex flex-col">
        {jabatanKosongKritis.map((r, i) => (
          <div
            key={r.jabatan}
            className={`flex items-center gap-2 rounded-md py-[5px] transition-colors hover:bg-[#f7f9fb] ${
              i !== 0 ? "border-t border-[#f4f7fa]" : ""
            }`}
          >
            <span className="w-[13px] shrink-0 text-[9px] tabular-nums text-ink-500">{i + 1}.</span>
            <span className="min-w-0 flex-1 truncate text-[9.5px] font-medium text-ink-900">
              {r.jabatan}
            </span>
            <span className="w-[100px] shrink-0 truncate text-[9px] text-ink-500">{r.unit}</span>
            <span className="w-[14px] shrink-0 text-right text-[9.5px] font-bold tabular-nums text-ink-900">
              {r.jumlah}
            </span>
            <span
              className={`${SEVERITY_TONE[r.severity]} w-[46px] shrink-0 rounded-md px-2 py-[2px] text-center text-[9px] font-semibold`}
            >
              {r.severity}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
