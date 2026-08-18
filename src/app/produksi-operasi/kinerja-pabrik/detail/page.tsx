import { ProdSidebar } from "@/components/prod/ProdSidebar";
import {
  DetailCard,
  DetailHeader,
  DetailNotes,
  Pill,
  TD,
  TH,
} from "@/components/prod/detail/parts";
import { DataTrustStrip } from "@/components/hc/DataTrustStrip";
import { prodDataTrust } from "@/lib/produksi-data";
import {
  utilisasiByJenis,
  downtimePareto,
  pgDowntimePareto,
  lossesBreakdown,
  gulaLosses,
  pabrikLeagueTop,
  pabrikLeagueBottom,
  pgReadiness,
  pgReadinessNote,
  gulaLossesNote,
  lossesNote,
  revitalisasi,
  PG_JAM_BERHENTI_TARGET_PCT,
  PG_OVERALL_RECOVERY_TARGET_PCT,
} from "@/lib/pabrik-data";

export const metadata = { title: "Detail Kinerja Pabrik & Utilisasi — PTPN Group" };

const num = (v: number, d = 1) =>
  v.toLocaleString("id-ID", { minimumFractionDigits: d, maximumFractionDigits: d });

/* ── halaman ──────────────────────────────────────────────────────── */

export default function KinerjaPabrikDetailPage() {
  const pgSorted = [...pgReadiness].sort((a, b) => b.jamBerhentiPct - a.jamBerhentiPct);
  const totalCapex = revitalisasi.reduce((a, r) => a + r.capexRpM, 0);

  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <ProdSidebar active="Kinerja Pabrik" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <DetailHeader
          backHref="/produksi-operasi/kinerja-pabrik"
          backLabel="Kembali ke Kinerja Pabrik"
          title="Kinerja Pabrik & Utilisasi — Detail"
          subtitle="Rincian per unit di balik kartu ringkas · 64 pabrik aktif (36 PKS · 17 PG · 9 Karet · 5 Teh) · data per 31 Mei 2026 (YTD)"
        />

        <div className="flex flex-col gap-3 px-5 pb-5 pt-3">
          <div className="-mb-3">
            <DataTrustStrip data={prodDataTrust} />
          </div>

          {/* 1. utilisasi per jenis */}
          <DetailCard
            id="utilisasi"
            title="Utilisasi per Jenis Pabrik"
            subtitle="Kapasitas terpasang, utilisasi aktual vs target RKAP per jenis pabrik"
          >
            <div className="scroll-thin overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse">
              <thead>
                <tr>
                  <th className={TH}>Jenis Pabrik</th>
                  <th className={TH}>Unit</th>
                  <th className={TH}>Kapasitas Terpasang</th>
                  <th className={TH}>Utilisasi</th>
                  <th className={TH}>Target</th>
                  <th className={TH}>Gap</th>
                  <th className={TH}>Catatan</th>
                </tr>
              </thead>
              <tbody>
                {utilisasiByJenis.map((u) => {
                  const gap = u.utilisasiPct - u.targetPct;
                  return (
                    <tr key={u.jenis}>
                      <td className={`${TD} font-bold text-ink-900`}>{u.jenis}</td>
                      <td className={TD}>{u.unit}</td>
                      <td className={TD}>{u.kapasitas}</td>
                      <td className={`${TD} font-bold`}>{num(u.utilisasiPct)}%</td>
                      <td className={TD}>{num(u.targetPct)}%</td>
                      <td className={TD}>
                        <Pill tone={gap >= 0 ? "good" : gap > -8 ? "warn" : "bad"}>
                          {gap >= 0 ? "+" : ""}
                          {num(gap)} ppt
                        </Pill>
                      </td>
                      <td className={`${TD} text-ink-400`}>{u.note ?? "—"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            </div>
          </DetailCard>

          {/* 2. register PKS */}
          <DetailCard
            id="pks"
            title="Register PKS — Top & Bottom 5"
            subtitle="Peringkat OER & utilisasi per PKS · menampilkan 10 dari 36 PKS"
            note="Spread OER 3,4 ppt antara PKS terbaik dan terburuk — menaikkan 5 PKS terbawah ke rata-rata grup setara ± Rp 180 M/bln pada volume puncak."
          >
            <div className="scroll-thin overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse">
              <thead>
                <tr>
                  <th className={TH}>#</th>
                  <th className={TH}>PKS</th>
                  <th className={TH}>Regional</th>
                  <th className={TH}>OER</th>
                  <th className={TH}>Utilisasi</th>
                  <th className={TH}>Status</th>
                </tr>
              </thead>
              <tbody>
                {[...pabrikLeagueTop, ...pabrikLeagueBottom].map((p, i) => {
                  const top = i < pabrikLeagueTop.length;
                  return (
                    <tr key={p.pabrik}>
                      <td className={TD}>{top ? i + 1 : 32 + (i - pabrikLeagueTop.length)}</td>
                      <td className={`${TD} font-bold text-ink-900`}>{p.pabrik}</td>
                      <td className={TD}>{p.regional}</td>
                      <td className={`${TD} font-bold`}>{num(p.oerPct)}%</td>
                      <td className={TD}>{num(p.utilisasiPct)}%</td>
                      <td className={TD}>
                        <Pill tone={top ? "good" : "bad"}>{top ? "Top 5" : "Bottom 5"}</Pill>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            </div>
          </DetailCard>

          {/* 3. register 17 PG */}
          <DetailCard
            id="pg"
            title="Register 17 Pabrik Gula"
            subtitle={`Jam berhenti giling (target ≤${PG_JAM_BERHENTI_TARGET_PCT}%) & overall recovery (target ≥${PG_OVERALL_RECOVERY_TARGET_PCT}%) · urut jam berhenti tertinggi`}
            note={pgReadinessNote}
          >
            <div className="scroll-thin overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse">
              <thead>
                <tr>
                  <th className={TH}>#</th>
                  <th className={TH}>Pabrik Gula</th>
                  <th className={TH}>Wilayah</th>
                  <th className={TH}>Jam Berhenti</th>
                  <th className={TH}>Overall Recovery</th>
                  <th className={TH}>Status</th>
                </tr>
              </thead>
              <tbody>
                {pgSorted.map((p, i) => {
                  const merah =
                    p.jamBerhentiPct > PG_JAM_BERHENTI_TARGET_PCT &&
                    p.overallRecoveryPct < PG_OVERALL_RECOVERY_TARGET_PCT;
                  const hijau =
                    p.jamBerhentiPct <= PG_JAM_BERHENTI_TARGET_PCT &&
                    p.overallRecoveryPct >= PG_OVERALL_RECOVERY_TARGET_PCT;
                  return (
                    <tr key={p.pg}>
                      <td className={TD}>{i + 1}</td>
                      <td className={`${TD} font-bold text-ink-900`}>{p.pg}</td>
                      <td className={TD}>{p.wilayah}</td>
                      <td className={`${TD} font-bold`}>{num(p.jamBerhentiPct)}%</td>
                      <td className={`${TD} font-bold`}>{num(p.overallRecoveryPct)}%</td>
                      <td className={TD}>
                        <Pill tone={merah ? "bad" : hijau ? "good" : "warn"}>
                          {merah ? "Merah" : hijau ? "Sehat" : "Waspada"}
                        </Pill>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            </div>
          </DetailCard>

          {/* 4. downtime */}
          <DetailCard
            id="downtime"
            title="Rincian Downtime"
            subtitle="Pareto penyebab: downtime tak terencana konsolidasi (6.400 jam YTD) & jam berhenti giling 17 PG (1.870 jam, Mei)"
          >
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {(
                [
                  ["Konsolidasi PKS + PG (YTD)", downtimePareto],
                  ["Giling 17 PG (bulan pertama)", pgDowntimePareto],
                ] as const
              ).map(([label, rows]) => (
                <div key={label}>
                  <div className="text-[8.5px] font-extrabold uppercase tracking-[0.04em] text-ink-400">
                    {label}
                  </div>
                  <div className="scroll-thin overflow-x-auto">
                  <table className="mt-1 w-full border-collapse">
                    <thead>
                      <tr>
                        <th className={TH}>Penyebab</th>
                        <th className={TH}>Jam</th>
                        <th className={TH}>Porsi</th>
                        <th className={TH}>Kumulatif</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((d) => (
                        <tr key={d.penyebab}>
                          <td className={`${TD} font-bold text-ink-900`}>{d.penyebab}</td>
                          <td className={TD}>{d.jam.toLocaleString("id-ID")}</td>
                          <td className={TD}>{d.pct}%</td>
                          <td className={TD}>{d.kumulatifPct}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  </div>
                </div>
              ))}
            </div>
          </DetailCard>

          {/* 5. losses */}
          <DetailCard
            id="losses"
            title="Rincian Losses"
            subtitle="Losses CPO (% terhadap TBS) & kehilangan gula (% pol tebu) — aktual vs norma per komponen"
          >
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {(
                [
                  ["Losses CPO · total 1,58% vs norma 1,65%", lossesBreakdown, lossesNote],
                  ["Kehilangan Gula · total 2,24% vs norma 2,09%", gulaLosses, gulaLossesNote],
                ] as const
              ).map(([label, rows, catatan]) => (
                <div key={label}>
                  <div className="text-[8.5px] font-extrabold uppercase tracking-[0.04em] text-ink-400">
                    {label}
                  </div>
                  <div className="scroll-thin overflow-x-auto">
                  <table className="mt-1 w-full border-collapse">
                    <thead>
                      <tr>
                        <th className={TH}>Komponen</th>
                        <th className={TH}>Aktual</th>
                        <th className={TH}>Norma</th>
                        <th className={TH}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((l) => (
                        <tr key={l.komponen}>
                          <td className={`${TD} font-bold text-ink-900`}>{l.komponen}</td>
                          <td className={TD}>{num(l.aktualPct, 2)}%</td>
                          <td className={TD}>{num(l.normaPct, 2)}%</td>
                          <td className={TD}>
                            <Pill tone={l.aktualPct > l.normaPct ? "bad" : "good"}>
                              {l.aktualPct > l.normaPct ? "Di atas norma" : "Terkendali"}
                            </Pill>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  </div>
                  <p className="mt-1.5 text-[9px] leading-snug text-ink-500">{catatan}</p>
                </div>
              ))}
            </div>
          </DetailCard>

          {/* 6. capex revitalisasi */}
          <DetailCard
            id="capex"
            title="Program Capex Revitalisasi"
            subtitle={`6 pabrik prioritas · total capex Rp ${totalCapex.toLocaleString("id-ID")} M — bagian RKAP capex pabrik`}
          >
            <div className="scroll-thin overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse">
              <thead>
                <tr>
                  <th className={TH}>Pabrik</th>
                  <th className={TH}>Lingkup</th>
                  <th className={TH}>Capex (Rp M)</th>
                  <th className={TH}>Progress</th>
                  <th className={TH}>Target</th>
                  <th className={TH}>Status</th>
                </tr>
              </thead>
              <tbody>
                {revitalisasi.map((r) => (
                  <tr key={r.pabrik}>
                    <td className={`${TD} font-bold text-ink-900`}>{r.pabrik}</td>
                    <td className={`${TD} text-ink-500`}>{r.lingkup}</td>
                    <td className={TD}>{r.capexRpM.toLocaleString("id-ID")}</td>
                    <td className={TD}>
                      <div className="flex items-center gap-2">
                        <div className="h-[6px] w-[90px] overflow-hidden rounded-full bg-[var(--surface-3)]">
                          <div
                            className={`h-full rounded-full ${
                              r.status === "Terlambat"
                                ? "bg-red-500"
                                : r.status === "Waspada"
                                  ? "bg-amber-500"
                                  : "bg-ptpn-green"
                            }`}
                            style={{ width: `${r.progressPct}%` }}
                          />
                        </div>
                        <span className="text-[8.5px] font-bold">{r.progressPct}%</span>
                      </div>
                    </td>
                    <td className={TD}>{r.target}</td>
                    <td className={TD}>
                      <Pill
                        tone={
                          r.status === "On Track"
                            ? "good"
                            : r.status === "Waspada"
                              ? "warn"
                              : "bad"
                        }
                      >
                        {r.status}
                      </Pill>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </DetailCard>

          <DetailNotes
            analitik={[
              "Downtime mekanikal (38%) terkonsentrasi pada 9 PKS berumur >25 tahun — beririsan dengan daftar Bottom 5 OER.",
              "7 PG merah menyumbang 68% jam berhenti giling grup; jendela perbaikan sebelum puncak giling Jul–Sep sangat pendek.",
              "Kehilangan gula di tetes 1,52% di atas norma — kualitas masakan & kristalisasi jadi pengungkit recovery terbesar.",
            ]}
            definisi={[
              "OER = CPO / TBS diolah; norma losses mengacu standar teknis internal.",
              "Jam berhenti giling = % jam berhenti terhadap jam giling tersedia; overall recovery = gula dihasilkan / pol tebu.",
              "Sumber: laporan harian pabrik (SAP PM & MES), konsolidasi Divisi Operasional — mockup, angka ilustratif.",
            ]}
          />
        </div>
      </main>
    </div>
  );
}
