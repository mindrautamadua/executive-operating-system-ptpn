import { ProdSidebar } from "@/components/prod/ProdSidebar";
import { DataTrustStrip } from "@/components/hc/DataTrustStrip";
import {
  DetailCard,
  DetailHeader,
  DetailNotes,
  Pill,
  TD,
  TH,
} from "@/components/prod/detail/parts";
import {
  prodDataTrust,
  komoditasScoreboard,
  sawitWaterfall,
  gulaGiling,
  gulaGilingNote,
  karetTehSeries,
  karetTehNote,
  seasonality3Tahun,
} from "@/lib/produksi-data";

export const metadata = { title: "Detail Produksi per Komoditas — PTPN Group" };

const num = (v: number, d = 2) =>
  v.toLocaleString("id-ID", { minimumFractionDigits: d, maximumFractionDigits: d });

export default function ProduksiKomoditasDetailPage() {
  const karetTotal = karetTehSeries.reduce((a, p) => a + p.karetRbTon, 0);
  const tehTotal = karetTehSeries.reduce((a, p) => a + p.tehRbTon, 0);

  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <ProdSidebar active="Produksi Komoditas" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <DetailHeader
          backHref="/produksi-operasi/produksi-komoditas"
          backLabel="Kembali ke Produksi Komoditas"
          title="Produksi per Komoditas — Detail"
          subtitle="Rincian di balik kartu ringkas · 5 komoditas (TBS, CPO, Gula, Karet, Teh) · data per 31 Mei 2026 (YTD)"
        />

        <div className="flex flex-col gap-3 px-5 pb-5 pt-3">
          <div className="-mb-3">
            <DataTrustStrip data={prodDataTrust} />
          </div>

          {/* 1. target vs realisasi */}
          <DetailCard
            id="target"
            title="Target vs Realisasi YTD"
            subtitle="Capaian 5 komoditas terhadap target YTD Mei 2026 & target FY RKAP"
          >
            <div className="scroll-thin overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse">
              <thead>
                <tr>
                  <th className={TH}>Komoditas</th>
                  <th className={TH}>Satuan</th>
                  <th className={TH}>Target FY</th>
                  <th className={TH}>Target YTD</th>
                  <th className={TH}>Realisasi YTD</th>
                  <th className={TH}>Capaian</th>
                  <th className={TH}>Status</th>
                  <th className={TH}>Catatan</th>
                </tr>
              </thead>
              <tbody>
                {komoditasScoreboard.map((k) => (
                  <tr key={k.komoditas}>
                    <td className={`${TD} font-bold text-ink-900`}>{k.komoditas}</td>
                    <td className={TD}>{k.satuan}</td>
                    <td className={TD}>{k.targetFy}</td>
                    <td className={TD}>{k.targetYtd}</td>
                    <td className={`${TD} font-bold`}>{k.realisasiYtd}</td>
                    <td className={`${TD} font-bold`}>{num(k.capaianPct, 1)}%</td>
                    <td className={TD}>
                      <Pill
                        tone={
                          k.status === "On Track"
                            ? "good"
                            : k.status === "Waspada"
                              ? "warn"
                              : "bad"
                        }
                      >
                        {k.status}
                      </Pill>
                    </td>
                    <td className={`${TD} text-ink-400`}>{k.note ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </DetailCard>

          {/* 2. waterfall sawit */}
          <DetailCard
            id="sawit"
            title="Sawit Production Waterfall"
            subtitle="Alur volume YTD: TBS inti + plasma − restan → TBS diolah → CPO & palm kernel"
            note="OER 22,4% dan KER 4,6% dihitung terhadap TBS diolah 4,42 jt ton."
          >
            <div className="scroll-thin overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse">
              <thead>
                <tr>
                  <th className={TH}>Langkah</th>
                  <th className={TH}>Volume (jt ton)</th>
                  <th className={TH}>Tipe</th>
                  <th className={TH}>Catatan</th>
                </tr>
              </thead>
              <tbody>
                {sawitWaterfall.map((s) => (
                  <tr key={s.label}>
                    <td className={`${TD} font-bold text-ink-900`}>{s.label}</td>
                    <td className={`${TD} font-bold ${s.value < 0 ? "text-red-600" : ""}`}>
                      {num(s.value, 2)}
                    </td>
                    <td className={TD}>
                      <Pill tone={s.type === "total" ? "good" : s.value < 0 ? "bad" : "warn"}>
                        {s.type === "in" ? "Masukan" : s.type === "out" ? "Keluaran" : "Total"}
                      </Pill>
                    </td>
                    <td className={`${TD} text-ink-400`}>{s.note ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </DetailCard>

          {/* 3. gula giling */}
          <DetailCard
            id="gula"
            title="Kurva Musim Giling Gula"
            subtitle="Tebu digiling, rendemen & produksi gula per bulan giling Mei–Nov 2026"
            note={gulaGilingNote}
          >
            <div className="scroll-thin overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse">
              <thead>
                <tr>
                  <th className={TH}>Bulan</th>
                  <th className={TH}>Tebu Digiling (jt ton)</th>
                  <th className={TH}>Rendemen</th>
                  <th className={TH}>Produksi Gula (rb ton)</th>
                  <th className={TH}>Status</th>
                </tr>
              </thead>
              <tbody>
                {gulaGiling.map((g) => (
                  <tr key={g.bulan}>
                    <td className={`${TD} font-bold text-ink-900`}>{g.bulan}</td>
                    <td className={TD}>{num(g.tebuJtTon, 2)}</td>
                    <td className={TD}>{num(g.rendemenPct, 2)}%</td>
                    <td className={`${TD} font-bold`}>{num(g.gulaRbTon, 1)}</td>
                    <td className={TD}>
                      <Pill tone={g.aktual ? "good" : "warn"}>
                        {g.aktual ? "Realisasi" : "Proyeksi RKAP"}
                      </Pill>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td className={`${TD} font-extrabold text-ink-900`}>Total FY</td>
                  <td className={`${TD} font-extrabold`}>10,50</td>
                  <td className={`${TD} font-extrabold`}>7,45%</td>
                  <td className={`${TD} font-extrabold`}>±780</td>
                  <td className={TD}>—</td>
                </tr>
              </tbody>
            </table>
            </div>
          </DetailCard>

          {/* 4. seasonality CPO */}
          <DetailCard
            id="seasonality"
            title="Seasonality CPO 3 Tahun"
            subtitle="Produksi CPO bulanan (jt ton) 2024–2026 · puncak musiman Agu–Okt"
            note="2026 terisi Jan–Mei (YTD); Mei 2026 = 0,222 jt ton, +8,3% vs Mei 2025."
          >
            <div className="scroll-thin overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse">
              <thead>
                <tr>
                  <th className={TH}>Bulan</th>
                  <th className={TH}>2024</th>
                  <th className={TH}>2025</th>
                  <th className={TH}>2026</th>
                  <th className={TH}>YoY 2026 vs 2025</th>
                </tr>
              </thead>
              <tbody>
                {seasonality3Tahun.map((s) => {
                  const yoy = s.y2026 !== undefined ? ((s.y2026 - s.y2025) / s.y2025) * 100 : null;
                  return (
                    <tr key={s.bulan}>
                      <td className={`${TD} font-bold text-ink-900`}>{s.bulan}</td>
                      <td className={TD}>{num(s.y2024, 3)}</td>
                      <td className={TD}>{num(s.y2025, 3)}</td>
                      <td className={`${TD} font-bold`}>
                        {s.y2026 !== undefined ? num(s.y2026, 3) : "—"}
                      </td>
                      <td className={TD}>
                        {yoy === null ? (
                          "—"
                        ) : (
                          <Pill tone={yoy >= 0 ? "good" : "bad"}>
                            {yoy >= 0 ? "+" : ""}
                            {num(yoy, 1)}%
                          </Pill>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            </div>
          </DetailCard>

          {/* 5. karet & teh */}
          <DetailCard
            id="karet-teh"
            title="Karet & Teh Bulanan"
            subtitle="Produksi karet kering & teh kering (rb ton) Jan–Mei 2026"
            note={karetTehNote}
          >
            <div className="scroll-thin overflow-x-auto">
            <table className="w-full min-w-[420px] border-collapse">
              <thead>
                <tr>
                  <th className={TH}>Bulan</th>
                  <th className={TH}>Karet Kering (rb ton)</th>
                  <th className={TH}>Teh Kering (rb ton)</th>
                </tr>
              </thead>
              <tbody>
                {karetTehSeries.map((p) => (
                  <tr key={p.bulan}>
                    <td className={`${TD} font-bold text-ink-900`}>{p.bulan}</td>
                    <td className={TD}>{num(p.karetRbTon, 1)}</td>
                    <td className={TD}>{num(p.tehRbTon, 1)}</td>
                  </tr>
                ))}
                <tr>
                  <td className={`${TD} font-extrabold text-ink-900`}>Total YTD</td>
                  <td className={`${TD} font-extrabold`}>{num(karetTotal, 1)}</td>
                  <td className={`${TD} font-extrabold`}>{num(tehTotal, 1)}</td>
                </tr>
              </tbody>
            </table>
            </div>
          </DetailCard>

          <DetailNotes
            analitik={[
              "TBS & CPO di atas target YTD (100,8% / 100,5%) — momentum panen kuat menjelang puncak musiman Agu–Okt.",
              "Gula 93,9% target YTD adalah bulan pertama giling; keandalan 17 PG (jam berhenti ≤10%) penentu FY 780 rb ton.",
              "Karet 98,3% target tertekan curah hujan rendah di Sumsel; teh relatif stabil.",
            ]}
            definisi={[
              "OER = CPO / TBS diolah; KER = palm kernel / TBS diolah; rendemen gula = gula / tebu digiling.",
              "Target YTD = prorata kurva produksi RKAP 2026, bukan prorata linear.",
              "Sumber: laporan produksi harian kebun & pabrik (SAP), konsolidasi Divisi Operasional — mockup, angka ilustratif.",
            ]}
          />
        </div>
      </main>
    </div>
  );
}
