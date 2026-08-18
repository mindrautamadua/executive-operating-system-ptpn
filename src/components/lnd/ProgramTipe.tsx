import { ArrowRight } from "lucide-react";
import { modalityNote, programTipe } from "@/lib/lnd-data";

/**
 * Bukan hanya komposisi tipe program — outcome per modalitas (Kirkpatrick
 * L3/L4) supaya terlihat modalitas mana yang benar-benar mentransfer.
 */
export function ProgramTipe() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "400ms" } as React.CSSProperties}
    >
      <h3 className="card-title-navy">Outcome per Modalitas Program</h3>

      {/* komposisi share sebagai bar bertumpuk */}
      <div className="mt-1.5 flex h-[10px] w-full overflow-hidden rounded-md">
        {programTipe.map((d, i) => (
          <span
            key={d.name}
            title={`${d.name} ${d.pct}`}
            className="anim-grow-x h-full"
            style={
              {
                width: `${d.share}%`,
                background: d.color,
                "--d": `${80 * i}ms`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      <div className="mt-1.5 min-h-0 flex-1">
        <div className="scroll-thin overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-[9px] font-semibold uppercase tracking-[0.03em] text-ink-500">
              <th className="pb-[2px] text-left">Modalitas</th>
              <th className="pb-[2px] text-right">Program</th>
              <th className="pb-[2px] text-right">Behavior L3</th>
              <th className="pb-[2px] text-right">Result L4</th>
            </tr>
          </thead>
          <tbody>
            {programTipe.map((d) => {
              const best = d.name === "Blended";
              return (
                <tr key={d.name} className={best ? "font-semibold" : ""}>
                  <td className="py-[1px]">
                    <span className="flex items-center gap-1.5">
                      <span
                        className="h-[7px] w-[7px] shrink-0 rounded-[2px]"
                        style={{ background: d.color }}
                      />
                      <span className="text-[9px] text-ink-700">{d.name}</span>
                      {best && (
                        <span className="rounded bg-[#eaf7ef] px-1 py-[1px] text-[9px] font-extrabold text-[#0f7a44]">
                          BEST
                        </span>
                      )}
                    </span>
                  </td>
                  <td className="text-right text-[9px] tabular-nums text-ink-900">
                    {d.jumlah}
                  </td>
                  <td className="text-right text-[9px] tabular-nums text-ink-900">
                    {d.behavior !== null ? `${d.behavior}%` : "—"}
                  </td>
                  <td className="text-right text-[9px] tabular-nums text-ink-900">
                    {d.result !== null ? `${d.result}%` : "—"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
      </div>

      <p className="mt-1 truncate text-[8.5px] text-ink-400" title={modalityNote}>
        {modalityNote}
      </p>

      <button className="link-more mt-1 flex items-center gap-1">
        Lihat detail program <ArrowRight size={11} />
      </button>
    </div>
  );
}
