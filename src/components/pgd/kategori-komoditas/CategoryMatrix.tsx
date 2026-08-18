import { categoryMatrix, type KraljicQuadrant } from "@/lib/pgd-data";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const QUADRANTS: {
  key: KraljicQuadrant;
  caption: string;
  wrap: string;
  chip: string;
}[] = [
  {
    key: "Leverage",
    caption: "Dampak profit tinggi · risiko pasokan rendah — tender kompetitif",
    wrap: "border-[#d3e3f6] bg-[#f1f7fd]",
    chip: "bg-[#e8f1fd] text-[#2f6fe4]",
  },
  {
    key: "Strategic",
    caption: "Dampak profit tinggi · risiko pasokan tinggi — kemitraan jangka panjang",
    wrap: "border-[#f6d5d5] bg-[#fdf5f5]",
    chip: "bg-[#fdecec] text-[#ef4444]",
  },
  {
    key: "Routine",
    caption: "Dampak profit rendah · risiko rendah — otomatisasi e-Catalog",
    wrap: "border-[#e3e9ef] bg-[#f8fafc]",
    chip: "bg-[#eef2f6] text-ink-500",
  },
  {
    key: "Bottleneck",
    caption: "Dampak profit rendah · risiko pasokan tinggi — amankan pasokan",
    wrap: "border-[#f3e3c3] bg-[#fdf9f0]",
    chip: "bg-[#fdf3e0] text-[#d98b06]",
  },
];

const rp = (v: number) => `Rp ${v.toLocaleString("id-ID", { minimumFractionDigits: 2 })} T`;

/** Matriks Kraljic 2×2: nilai belanja & jumlah vendor per kuadran. */
export function CategoryMatrix() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "30ms" } as React.CSSProperties}
    >
      <SectionHead title="Matriks Kraljic Kategori" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Posisi 7 Kelompok Belanja · sumbu dampak profit × risiko pasokan
      </p>

      <div className="mt-2 grid min-h-0 flex-1 grid-cols-2 grid-rows-2 gap-2">
        {QUADRANTS.map((q) => {
          const rows = categoryMatrix.filter((c) => c.kuadran === q.key);
          const spend = rows.reduce((a, c) => a + c.valueRpT, 0);
          const vendor = rows.reduce((a, c) => a + c.vendor, 0);
          return (
            <div key={q.key} className={`flex flex-col rounded-xl border px-3 pb-2 pt-2 ${q.wrap}`}>
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-extrabold text-ink-900">{q.key}</span>
                <span
                  className={`shrink-0 rounded px-1.5 py-[2px] text-[9px] font-bold ${q.chip}`}
                >
                  {rp(spend)} · {vendor.toLocaleString("id-ID")} vendor
                </span>
              </div>
              <p className="mt-[3px] text-[9px] leading-snug text-ink-500">{q.caption}</p>

              <div className="mt-1.5 flex min-h-0 flex-1 flex-col gap-[3px]">
                {rows.map((c) => (
                  <div key={c.kategori} className="flex items-center justify-between gap-2">
                    <span className="truncate text-[8.5px] font-semibold text-ink-700">
                      {c.kategori}
                    </span>
                    <span className="shrink-0 text-[9px] font-bold text-ink-500">
                      {rp(c.valueRpT)} · {c.vendor.toLocaleString("id-ID")}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-2 text-[9px] leading-snug text-ink-500">
        Strategic (Rp 5,71 T) &amp; Bottleneck (Rp 2,15 T dengan hanya 24 vendor) mencakup 63,4%
        belanja — fokus utama kapasitas category manager.
      </p>
    </div>
  );
}
