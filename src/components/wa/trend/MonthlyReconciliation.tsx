"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Download, RotateCcw, Search } from "lucide-react";
import { monthlyRecent, trendNotes, trendYears, type MonthlyRow } from "@/lib/wa-headcount-trend";

const PAGE_SIZE = 12;

const NOTE_TONE = {
  amber: "border-[#f6e2b4] bg-[#fdf3e0] text-[#d98b06]",
  blue: "border-[#cfe0fb] bg-[#e8f1fd] text-[#2f6fe4]",
  red: "border-[#f6c9c9] bg-[#fdecec] text-[#ef4444]",
};

const num = (v: number) => v.toLocaleString("id-ID");

/** Rekonsiliasi bulanan: headcount awal + arus masuk − arus keluar = headcount akhir. */
export function MonthlyReconciliation() {
  const [query, setQuery] = useState("");
  const [year, setYear] = useState("");
  const [direction, setDirection] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return monthlyRecent.filter((r) => {
      if (q && !r.month.toLowerCase().includes(q)) return false;
      if (year && !r.month.endsWith(year)) return false;
      if (direction === "up" && r.net <= 0) return false;
      if (direction === "down" && r.net >= 0) return false;
      return true;
    });
  }, [query, year, direction]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const rows = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  const sum = filtered.reduce(
    (a, r) => ({
      masuk: a.masuk + r.newHire + r.mobilityIn + r.rehire,
      keluar: a.keluar + r.turnover + r.mobilityOut + r.lainnya,
      net: a.net + r.net,
    }),
    { masuk: 0, keluar: 0, net: 0 },
  );

  function reset() {
    setQuery("");
    setYear("");
    setDirection("");
    setPage(1);
  }

  return (
    <div className="grid grid-cols-[minmax(0,1fr)_248px] items-start gap-3">
      <div className="card anim-rise flex min-w-0 flex-col px-4 pb-3 pt-3">
        <div className="flex items-center justify-between gap-2">
          <div>
            <h3 className="text-[10px] font-extrabold uppercase tracking-[0.05em] text-ink-900">
              Rekonsiliasi Headcount Bulanan
            </h3>
            <p className="mt-[3px] text-[9px] text-ink-500">
              Headcount awal + arus masuk − arus keluar = headcount akhir · 24 bulan terakhir
            </p>
          </div>
          <button className="flex items-center gap-1.5 rounded-lg border border-[#e3e9ef] px-2.5 py-[6px] text-[9.5px] font-semibold text-ink-700 transition-colors hover:bg-[#f5f8fa]">
            <Download size={11} />
            Unduh CSV
          </button>
        </div>

        {/* filter */}
        <div className="mt-2.5 grid grid-cols-[minmax(0,1fr)_130px_150px_auto] items-center gap-2">
          <label className="flex items-center gap-1.5 rounded-lg border border-[#e3e9ef] bg-white px-2.5 py-[7px]">
            <Search size={12} className="shrink-0 text-ink-400" />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Cari bulan, mis. Des 2025..."
              className="min-w-0 flex-1 bg-transparent text-[9.5px] text-ink-700 outline-none placeholder:text-ink-400"
            />
          </label>
          <select
            value={year}
            onChange={(e) => {
              setYear(e.target.value);
              setPage(1);
            }}
            className="w-full cursor-pointer rounded-lg border border-[#e3e9ef] bg-white px-2.5 py-[7px] text-[9.5px] font-semibold text-ink-700 outline-none focus:border-ptpn-green"
          >
            <option value="">Semua Tahun</option>
            {trendYears.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
          <select
            value={direction}
            onChange={(e) => {
              setDirection(e.target.value);
              setPage(1);
            }}
            className="w-full cursor-pointer rounded-lg border border-[#e3e9ef] bg-white px-2.5 py-[7px] text-[9.5px] font-semibold text-ink-700 outline-none focus:border-ptpn-green"
          >
            <option value="">Semua Arah</option>
            <option value="up">Net Bertambah</option>
            <option value="down">Net Berkurang</option>
          </select>
          <button
            onClick={reset}
            className="flex items-center gap-1.5 rounded-lg border border-[#e3e9ef] px-3 py-[7px] text-[9.5px] font-semibold text-ink-700 transition-colors hover:bg-[#f5f8fa]"
          >
            <RotateCcw size={11} />
            Reset
          </button>
        </div>

        {/* tabel */}
        <div className="scroll-thin mt-2.5 min-w-0 overflow-x-auto">
          <table className="w-full min-w-[980px] border-collapse">
            <thead>
              <tr className="border-b border-[#eef2f6] text-ink-500">
                <th className="px-2 pb-1.5 text-left text-[9px] font-bold" rowSpan={2}>
                  Bulan
                </th>
                <th className="px-2 pb-1.5 text-right text-[9px] font-bold" rowSpan={2}>
                  Headcount Awal
                </th>
                <th
                  className="border-x border-[#eef2f6] px-2 pb-1 text-center text-[9px] font-bold"
                  colSpan={3}
                >
                  Arus Masuk
                </th>
                <th
                  className="border-r border-[#eef2f6] px-2 pb-1 text-center text-[9px] font-bold"
                  colSpan={3}
                >
                  Arus Keluar
                </th>
                <th className="px-2 pb-1.5 text-right text-[9px] font-bold" rowSpan={2}>
                  Net
                </th>
                <th className="px-2 pb-1.5 text-right text-[9px] font-bold" rowSpan={2}>
                  Headcount Akhir
                </th>
                <th className="px-2 pb-1.5 text-right text-[9px] font-bold" rowSpan={2}>
                  % MoM
                </th>
                <th className="px-2 pb-1.5 text-right text-[9px] font-bold" rowSpan={2}>
                  % YoY
                </th>
              </tr>
              <tr className="border-b border-[#eef2f6] text-ink-400">
                {["New Hire", "Mobility In", "Rehire", "Turnover", "Mobility Out", "Lainnya"].map(
                  (h, i) => (
                    <th
                      key={h}
                      className={`px-1 pb-1.5 text-right text-[9px] font-semibold ${
                        i === 0 ? "border-l border-[#eef2f6]" : ""
                      } ${i === 2 || i === 5 ? "border-r border-[#eef2f6]" : ""}`}
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {rows.map((r: MonthlyRow) => (
                <tr key={r.month} className="border-b border-[#f3f6f9] hover:bg-[#f8fbfd]">
                  <td className="whitespace-nowrap px-2 py-[7px] text-[9.5px] font-semibold text-ink-900">
                    {r.month}
                  </td>
                  <td className="px-2 py-[7px] text-right text-[9px] text-ink-700">{num(r.awal)}</td>
                  <td className="border-l border-[#f3f6f9] px-1 py-[7px] text-right text-[9px] text-ptpn-green">
                    {num(r.newHire)}
                  </td>
                  <td className="px-1 py-[7px] text-right text-[9px] text-ptpn-green">
                    {num(r.mobilityIn)}
                  </td>
                  <td className="border-r border-[#f3f6f9] px-1 py-[7px] text-right text-[9px] text-ptpn-green">
                    {num(r.rehire)}
                  </td>
                  <td className="px-1 py-[7px] text-right text-[9px] text-[#ef4444]">
                    {num(r.turnover)}
                  </td>
                  <td className="px-1 py-[7px] text-right text-[9px] text-[#ef4444]">
                    {num(r.mobilityOut)}
                  </td>
                  <td className="border-r border-[#f3f6f9] px-1 py-[7px] text-right text-[9px] text-[#ef4444]">
                    {num(r.lainnya)}
                  </td>
                  <td
                    className={`px-2 py-[7px] text-right text-[9px] font-bold ${
                      r.net > 0 ? "text-ptpn-green" : r.net < 0 ? "text-[#ef4444]" : "text-ink-400"
                    }`}
                  >
                    {r.net > 0 ? "+" : ""}
                    {num(r.net)}
                  </td>
                  <td className="px-2 py-[7px] text-right text-[9px] font-semibold text-ink-900">
                    {num(r.akhir)}
                  </td>
                  <td
                    className={`px-2 py-[7px] text-right text-[9px] ${
                      r.mom > 0 ? "text-ptpn-green" : r.mom < 0 ? "text-[#ef4444]" : "text-ink-400"
                    }`}
                  >
                    {r.mom > 0 ? "+" : ""}
                    {r.mom.toFixed(2).replace(".", ",")}%
                  </td>
                  <td className="px-2 py-[7px] text-right text-[9px] text-ink-700">
                    {r.yoy === null ? "—" : `${r.yoy.toFixed(1).replace(".", ",")}%`}
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={12} className="py-6 text-center text-[9.5px] text-ink-400">
                    Tidak ada bulan yang cocok dengan filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ringkasan & paginasi */}
        <div className="mt-2.5 flex items-center justify-between">
          <span className="text-[9px] text-ink-500">
            {filtered.length} bulan · masuk{" "}
            <span className="font-bold text-ptpn-green">{num(sum.masuk)}</span> · keluar{" "}
            <span className="font-bold text-[#ef4444]">{num(sum.keluar)}</span> · net{" "}
            <span className="font-bold text-ink-900">
              {sum.net > 0 ? "+" : ""}
              {num(sum.net)}
            </span>
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage(Math.max(1, current - 1))}
              disabled={current === 1}
              className="flex h-[22px] w-[22px] items-center justify-center rounded-md border border-[#e3e9ef] text-ink-500 disabled:opacity-40"
            >
              <ChevronLeft size={12} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`h-[22px] min-w-[22px] rounded-md border px-1 text-[9px] font-semibold ${
                  p === current
                    ? "border-ptpn-green bg-ptpn-greenLight text-ptpn-green"
                    : "border-[#e3e9ef] text-ink-500 hover:bg-[#f5f8fa]"
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage(Math.min(totalPages, current + 1))}
              disabled={current === totalPages}
              className="flex h-[22px] w-[22px] items-center justify-center rounded-md border border-[#e3e9ef] text-ink-500 disabled:opacity-40"
            >
              <ChevronRight size={12} />
            </button>
          </div>
        </div>
      </div>

      {/* panel kanan: catatan analitik + definisi */}
      <div className="flex flex-col gap-3">
        <div
          className="card anim-rise px-3.5 pb-3.5 pt-3"
          style={{ "--d": "60ms" } as React.CSSProperties}
        >
          <h3 className="text-[10px] font-extrabold uppercase tracking-[0.05em] text-ink-900">
            Catatan Analitik
          </h3>
          <div className="mt-2 flex flex-col gap-1.5">
            {trendNotes.map((n) => (
              <div key={n.title} className={`rounded-lg border px-2.5 py-[7px] ${NOTE_TONE[n.tone]}`}>
                <div className="text-[9px] font-extrabold">{n.title}</div>
                <p className="mt-[2px] text-[8.5px] leading-[1.4] text-ink-700">{n.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div
          className="card anim-rise px-3.5 pb-3.5 pt-3"
          style={{ "--d": "100ms" } as React.CSSProperties}
        >
          <h3 className="text-[10px] font-extrabold uppercase tracking-[0.05em] text-ink-900">
            Definisi &amp; Sumber
          </h3>
          <dl className="mt-2 flex flex-col gap-1.5 text-[8.5px] leading-[1.4]">
            <div>
              <dt className="font-bold text-ink-700">Headcount</dt>
              <dd className="text-ink-500">
                Pekerja aktif per akhir bulan, termasuk PKWT dan BHL; tidak termasuk vendor.
              </dd>
            </div>
            <div>
              <dt className="font-bold text-ink-700">Net Growth</dt>
              <dd className="text-ink-500">Arus masuk dikurangi arus keluar pada bulan berjalan.</dd>
            </div>
            <div>
              <dt className="font-bold text-ink-700">Proyeksi</dt>
              <dd className="text-ink-500">
                Model tren 12 bulan + rencana rekrutmen disetujui; rentang keyakinan 80%.
              </dd>
            </div>
            <div>
              <dt className="font-bold text-ink-700">Sumber</dt>
              <dd className="text-ink-500">
                HRIS konsolidasi 7 subholding, tarikan 01 Jun 2026 pukul 02.00 WIB.
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
