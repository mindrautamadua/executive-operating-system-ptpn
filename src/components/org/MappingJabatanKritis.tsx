import { ChevronRight } from "lucide-react";
import {
  mappingJabatanKritis,
  RISIKO_TONE,
  rencanaColor,
  riskScoreColor,
} from "@/lib/org-data";
import { READINESS } from "@/lib/chart-palette";

const HEAD = [
  "Jabatan Kritis",
  "Unit",
  "Level",
  "Karyawan Saat Ini",
  "Risiko Kehilangan",
  "Skor Risiko Posisi",
  "Kesiapan (Now / 1-2 / 3+ Thn)",
  "Rencana Suksesi",
];

/* skala bar kesiapan disamakan antar-baris (dibanding total terbesar) */
const maxReady = Math.max(
  ...mappingJabatanKritis.map((r) => r.readyNow + r.ready12 + r.ready3),
);

function ReadinessBar({
  now,
  r12,
  r3,
  delay,
}: {
  now: number;
  r12: number;
  r3: number;
  delay: number;
}) {
  const segs = [
    { n: now, color: READINESS[0], label: "Ready Now" },
    { n: r12, color: READINESS[1], label: "Ready 1-2 Thn" },
    { n: r3, color: READINESS[2], label: "Ready 3+ Thn" },
  ];
  return (
    <span
      className="flex items-center gap-1.5"
      title={`Ready Now: ${now} · Ready 1-2 Thn: ${r12} · Ready 3+ Thn: ${r3}`}
    >
      <span
        className="anim-grow-x flex h-[7px] w-[96px] shrink-0 overflow-hidden rounded-full bg-[#eef2f6]"
        style={{ "--d": `${delay}ms` } as React.CSSProperties}
      >
        {segs.map(
          (s) =>
            s.n > 0 && (
              <span
                key={s.label}
                className="h-full"
                style={{ width: `${(s.n / maxReady) * 100}%`, background: s.color }}
              />
            ),
        )}
      </span>
      <span className="whitespace-nowrap text-[9px] tabular-nums text-ink-700">
        <span className="font-semibold" style={{ color: READINESS[0] }}>{now}</span>
        {" / "}
        <span className="font-semibold" style={{ color: READINESS[1] }}>{r12}</span>
        {" / "}
        <span className="font-semibold" style={{ color: READINESS[2] }}>{r3}</span>
      </span>
    </span>
  );
}

export function MappingJabatanKritis() {
  return (
    <div className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3">
      <h3 className="card-title-navy">Mapping Jabatan Kritis &amp; Suksesi</h3>

      <table className="mt-2 w-full">
        <thead>
          <tr className="border-b border-[#eef2f6] bg-[#f7f9fb]">
            {HEAD.map((h) => (
              <th
                key={h}
                className="whitespace-nowrap px-2 py-[5px] text-left text-[9px] font-semibold text-ink-500"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {mappingJabatanKritis.map((r, i) => (
            <tr
              key={r.jabatan}
              className="border-b border-[#f4f7fa] transition-colors last:border-0 hover:bg-[#f7f9fb]"
            >
              <td className="whitespace-nowrap px-2 py-[6px] text-[9.5px] text-ink-900">
                {r.jabatan}
                {r.spof && (
                  <span
                    className="tone-red ml-1.5 inline-block rounded-md px-1.5 py-[1px] text-[9px] font-bold"
                    title="Single Point of Failure: 1 pemegang jabatan, 0 suksesor siap"
                  >
                    SPOF
                  </span>
                )}
              </td>
              <td className="whitespace-nowrap px-2 text-[9.5px] text-ink-700">{r.unit}</td>
              <td className="whitespace-nowrap px-2 text-[9.5px] text-ink-700">{r.level}</td>
              <td className="whitespace-nowrap px-2 text-[9.5px] text-ink-700">{r.karyawan}</td>
              <td className="px-2">
                <span className="inline-flex items-center gap-1.5">
                  <span
                    className={`${RISIKO_TONE[r.risiko]} inline-block whitespace-nowrap rounded-md px-2.5 py-[2px] text-[9px] font-semibold`}
                  >
                    {r.risiko}
                  </span>
                  {r.risiko === "Tinggi" && (
                    <span className="h-[6px] w-[6px] shrink-0 animate-pulseDot rounded-full bg-[#ef4444]" />
                  )}
                </span>
              </td>
              <td
                className="px-2"
                title="Kritikalitas × vacancy × kesiapan suksesi × ketersediaan talenta (0–100)"
              >
                <span
                  className="text-[10px] font-bold tabular-nums"
                  style={{ color: riskScoreColor(r.riskScore) }}
                >
                  {r.riskScore}
                </span>
                <span className="text-[8.5px] text-ink-400"> /100</span>
              </td>
              <td className="px-2">
                <ReadinessBar now={r.readyNow} r12={r.ready12} r3={r.ready3} delay={i * 60} />
              </td>
              <td className="px-2">
                <span className="flex items-center gap-1.5">
                  <span className="h-[6px] w-[100px] shrink-0 overflow-hidden rounded-full bg-[#eef2f6]">
                    <span
                      className="anim-grow-x block h-full rounded-full"
                      style={
                        {
                          width: `${r.rencana}%`,
                          background: rencanaColor(r.rencana),
                          "--d": `${i * 60}ms`,
                        } as React.CSSProperties
                      }
                    />
                  </span>
                  <span className="text-[9px] font-semibold tabular-nums text-ink-700">
                    {r.rencana}%
                  </span>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="link-more mt-auto flex items-center gap-1 self-end pt-2">
        Lihat seluruh talent pool &amp; suksesi <ChevronRight size={11} />
      </button>
    </div>
  );
}
