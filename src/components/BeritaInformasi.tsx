import { externalSignals } from "@/lib/ceo-data";
import { STEMPEL_DATA } from "@/lib/group-baseline";

/**
 * Kartu ini dulu memuat judul rilis pers korporat. Sekarang berisi sinyal
 * eksternal (pasar, regulasi, iklim) plus temuan korporat terpilih — dan
 * setiap sinyal diterjemahkan menjadi implikasi bagi PTPN, karena sinyal
 * tanpa terjemahan "artinya apa bagi kita?" tidak mengubah keputusan.
 */
const RELEVANSI: Record<string, { text: string; bg: string }> = {
  Tinggi: { text: "#dc2626", bg: "#fee2e2" },
  Sedang: { text: "#ea9a1a", bg: "#fef3c7" },
  Rendah: { text: "#2f7de1", bg: "#dbeafe" },
};

export function BeritaInformasi() {
  return (
    <div className="card flex min-h-0 flex-1 flex-col px-4 pb-2 pt-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <h3 className="card-title">EXTERNAL SIGNALS</h3>
          {/* Sinyal intelijen berjalan lebih sering dari sinkronisasi feed pasar;
              label ini menjawab "mengapa signal lebih baru dari Market Pulse?". */}
          <span className="rounded bg-[#eef2f6] px-1 py-[1px] text-[7.5px] font-bold uppercase tracking-[0.05em] text-ink-400">
            Sinyal terbaru {STEMPEL_DATA.sinyalTerbaru.replace(" 2026", "")}
          </span>
        </div>
        <button className="link-more">Lihat semua</button>
      </div>

      <div className="mt-0.5 flex flex-1 flex-col justify-around">
        {externalSignals.map((it, i) => {
          const r = RELEVANSI[it.relevansi] ?? RELEVANSI.Rendah;
          return (
            <div
              key={it.title}
              className={`py-[4px] ${i !== 0 ? "border-t border-[#f2f5f8]" : ""}`}
            >
              <div className="flex items-center gap-1.5">
                <span
                  className="h-[7px] w-[7px] shrink-0 rounded-full"
                  style={{ background: `hsl(${it.hue} 55% 45%)` }}
                />
                <span className="text-[9px] text-ink-500">{it.date}</span>
                <span className="rounded bg-[#eef2f6] px-1 py-[1px] text-[9px] font-bold uppercase tracking-[0.03em] text-ink-500">
                  {it.kategori}
                </span>
                <span
                  className="ml-auto shrink-0 rounded px-1 py-[1px] text-[9px] font-bold"
                  style={{ color: r.text, background: r.bg }}
                >
                  RELEVANSI {it.relevansi.toUpperCase()}
                </span>
              </div>

              <p className="mt-[2px] line-clamp-2 text-[10px] font-semibold leading-[1.3] text-ink-900">
                {it.title}
              </p>
              <p className="mt-[2px] text-[9.5px] font-bold" style={{ color: r.text }}>
                {it.dampak}
              </p>
              <p className="mt-[1px] text-[8.5px] italic leading-[1.35] text-ink-500">
                Artinya bagi PTPN: {it.implikasi}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
