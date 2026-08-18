import { ArrowRight } from "lucide-react";
import { sumberData } from "@/lib/data-analytics";

export function SumberDataTerhubung() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "180ms" } as React.CSSProperties}
    >
      <h3 className="card-title-navy">
        Sumber Data Terhubung{" "}
        <span className="text-[9.5px] font-medium normal-case tracking-normal text-ink-400">
          (8 dari 18 sumber utama)
        </span>
      </h3>

      <div className="mt-2 grid min-h-0 flex-1 grid-cols-4 grid-rows-2 gap-2">
        {sumberData.map((s, i) => {
          const tertunda = s.status === "tertunda";
          return (
            <div
              key={s.nama}
              className="anim-rise flex flex-col justify-between rounded-lg border border-[#eef2f6] bg-white px-2.5 py-2 transition-all duration-150 hover:-translate-y-[1px] hover:shadow-cardHover"
              style={{ "--d": `${i * 40}ms` } as React.CSSProperties}
            >
              <div>
                <div className="truncate text-[9.5px] font-bold text-ink-900" title={s.nama}>
                  {s.nama}
                </div>
                <div className="mt-[2px] truncate text-[9px] text-ink-500">{s.kategori}</div>
              </div>
              <span
                className={`${
                  tertunda ? "tone-amber" : "tone-green"
                } mt-1.5 inline-flex w-fit max-w-full items-center gap-1 rounded-md px-1.5 py-[2px] text-[9px] font-semibold`}
                title={tertunda ? "Sinkronisasi tertunda" : "Tersinkron"}
              >
                <span
                  className={`h-[4px] w-[4px] shrink-0 rounded-full ${
                    tertunda ? "" : "animate-pulseDot"
                  }`}
                  style={{ background: "currentColor" }}
                />
                <span className="truncate">
                  {tertunda ? "Sinkronisasi tertunda" : "Tersinkron"}
                </span>
              </span>
              <div className="mt-1.5 border-t border-[#f2f5f8] pt-1 text-[9px] text-ink-500">
                Update: {s.update}
              </div>
            </div>
          );
        })}
      </div>

      <button className="link-more mt-2 flex items-center gap-1">
        Kelola sumber data <ArrowRight size={11} />
      </button>
    </div>
  );
}
