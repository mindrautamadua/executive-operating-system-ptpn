"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  MoveRight,
  RotateCcw,
  Search,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import {
  allDrivers,
  CONTROLLABILITY,
  DRIVER_FAMILIES,
  DRIVER_STATUSES,
  driverActions,
  driverOwners,
  FAMILY_COLOR,
  type DriverFamily,
  type DriverRecord,
  type DriverTrendDir,
} from "@/lib/prr-drivers";

const PAGE_SIZE = 10;
const MAX_PCT = 11;

const STATUS_BADGE: Record<string, string> = {
  Active: "bg-[#fdecec] text-[#ef4444]",
  Mitigating: "bg-[#e8f1fd] text-[#2f6fe4]",
  Monitoring: "bg-[#fdf3e0] text-[#d98b06]",
  Controlled: "bg-ptpn-greenLight text-ptpn-green",
};

const CONTROLLABILITY_BADGE: Record<string, string> = {
  Tinggi: "border-[#c6e8d4] bg-ptpn-greenLight text-ptpn-green",
  Sedang: "border-[#f6e2b4] bg-[#fdf3e0] text-[#d98b06]",
  Rendah: "border-[#f6c9c9] bg-[#fdecec] text-[#ef4444]",
};

function controlTone(v: number) {
  if (v >= 65) return "bg-ptpn-greenLight text-ptpn-green";
  if (v >= 50) return "bg-[#fdf3e0] text-[#d98b06]";
  return "bg-[#fdecec] text-[#ef4444]";
}

function TrendIcon({ trend }: { trend: DriverTrendDir }) {
  if (trend === "up") return <TrendingUp size={12} className="text-[#ef4444]" />;
  if (trend === "down") return <TrendingDown size={12} className="text-ptpn-green" />;
  return <MoveRight size={12} className="text-[#d98b06]" />;
}

function Select({
  value,
  onChange,
  options,
  allLabel,
}: {
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
  allLabel: string;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full cursor-pointer rounded-lg border border-[#e3e9ef] bg-white px-2.5 py-[7px] text-[9.5px] font-semibold text-ink-700 outline-none focus:border-ptpn-green"
    >
      <option value="">{allLabel}</option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}

/** Tabel registri driver + filter, paginasi, dan panel aksi prioritas. */
export function DriversExplorer() {
  const [query, setQuery] = useState("");
  const [family, setFamily] = useState("");
  const [owner, setOwner] = useState("");
  const [status, setStatus] = useState("");
  const [controllability, setControllability] = useState("");
  const [trend, setTrend] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<string[]>([]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allDrivers.filter((d) => {
      if (q && ![d.id, d.name, d.family, d.owner, d.signal].some((f) => f.toLowerCase().includes(q)))
        return false;
      if (family && d.family !== family) return false;
      if (owner && d.owner !== owner) return false;
      if (status && d.status !== status) return false;
      if (controllability && d.controllability !== controllability) return false;
      if (trend && d.trend !== trend) return false;
      return true;
    });
  }, [query, family, owner, status, controllability, trend]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const rows = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);
  const filteredPct = filtered.reduce((s, d) => s + d.pct, 0);
  const worseningCount = filtered.filter((d) => d.trend === "up").length;

  function reset() {
    setQuery("");
    setFamily("");
    setOwner("");
    setStatus("");
    setControllability("");
    setTrend("");
    setPage(1);
  }

  function toggle(id: string) {
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  }

  const allOnPageSelected = rows.length > 0 && rows.every((d) => selected.includes(d.id));

  return (
    <div className="grid grid-cols-[minmax(0,1fr)_248px] items-start gap-3">
      <div className="card anim-rise flex min-w-0 flex-col px-4 pb-3 pt-3">
        {/* baris pencarian & filter cepat */}
        <div className="grid grid-cols-[minmax(0,1fr)_150px_140px_130px_130px_auto] items-center gap-2">
          <label className="flex items-center gap-1.5 rounded-lg border border-[#e3e9ef] bg-white px-2.5 py-[7px]">
            <Search size={12} className="shrink-0 text-ink-400" />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Cari driver, family, owner, atau indikator dini..."
              className="min-w-0 flex-1 bg-transparent text-[9.5px] text-ink-700 outline-none placeholder:text-ink-400"
            />
          </label>
          <Select
            value={family}
            onChange={(v) => {
              setFamily(v);
              setPage(1);
            }}
            options={DRIVER_FAMILIES}
            allLabel="Semua Family"
          />
          <Select
            value={owner}
            onChange={(v) => {
              setOwner(v);
              setPage(1);
            }}
            options={driverOwners}
            allLabel="Semua Owner"
          />
          <Select
            value={status}
            onChange={(v) => {
              setStatus(v);
              setPage(1);
            }}
            options={DRIVER_STATUSES}
            allLabel="Semua Status"
          />
          <Select
            value={controllability}
            onChange={(v) => {
              setControllability(v);
              setPage(1);
            }}
            options={CONTROLLABILITY}
            allLabel="Semua Kendali"
          />
          <button
            onClick={reset}
            className="flex items-center gap-1.5 rounded-lg border border-[#e3e9ef] px-3 py-[7px] text-[9.5px] font-semibold text-ink-700 transition-colors hover:bg-[#f5f8fa]"
          >
            <RotateCcw size={11} />
            Reset
          </button>
        </div>

        {/* tabel registri driver */}
        <div className="scroll-thin mt-2.5 min-w-0 overflow-x-auto">
          <table className="w-full min-w-[1120px] border-collapse">
            <thead>
              <tr className="border-b border-[#eef2f6] text-ink-500">
                <th className="w-[26px] px-1 pb-1.5">
                  <input
                    type="checkbox"
                    checked={allOnPageSelected}
                    onChange={() =>
                      setSelected(
                        allOnPageSelected
                          ? selected.filter((id) => !rows.some((d) => d.id === id))
                          : [...new Set([...selected, ...rows.map((d) => d.id)])],
                      )
                    }
                    className="h-[11px] w-[11px] cursor-pointer accent-[#1a9c5b]"
                  />
                </th>
                {[
                  "Driver ID",
                  "Nama Driver",
                  "Family",
                  "Kontribusi",
                  "Δ vs Q1",
                  "Trend",
                  "Risiko Terkait",
                  "Unit",
                  "Pekerja Terpapar",
                  "Owner",
                  "Efektivitas Kontrol",
                  "Kendali",
                  "Status",
                  "Review Terakhir",
                ].map((h) => (
                  <th
                    key={h}
                    className={`px-2 pb-1.5 text-[9px] font-bold ${
                      ["Trend", "Unit", "Efektivitas Kontrol", "Δ vs Q1"].includes(h)
                        ? "text-center"
                        : "text-left"
                    }`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((d: DriverRecord) => (
                <tr key={d.id} className="border-b border-[#f3f6f9] hover:bg-[#f8fbfd]">
                  <td className="px-1 py-[7px] text-center">
                    <input
                      type="checkbox"
                      checked={selected.includes(d.id)}
                      onChange={() => toggle(d.id)}
                      className="h-[11px] w-[11px] cursor-pointer accent-[#1a9c5b]"
                    />
                  </td>
                  <td className="whitespace-nowrap px-2 py-[7px] text-[9px] font-semibold text-[#2f6fe4] underline decoration-dotted underline-offset-2">
                    {d.id}
                  </td>
                  <td className="max-w-[230px] px-2 py-[7px]">
                    <span className="block truncate text-[9.5px] text-ink-700" title={d.name}>
                      {d.name}
                    </span>
                    <span className="block truncate text-[9px] text-ink-500" title={d.signal}>
                      {d.signal}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-2 py-[7px]">
                    <span className="flex items-center gap-1.5 text-[9px] text-ink-500">
                      <span
                        className="h-[6px] w-[6px] shrink-0 rounded-full"
                        style={{ background: FAMILY_COLOR[d.family as DriverFamily] }}
                      />
                      {d.family}
                    </span>
                  </td>
                  <td className="px-2 py-[7px]">
                    <span className="flex items-center gap-1.5">
                      <span className="h-[6px] w-[54px] shrink-0 overflow-hidden rounded-full bg-[#eef2f6]">
                        <span
                          className="block h-full rounded-full"
                          style={{
                            width: `${(d.pct / MAX_PCT) * 100}%`,
                            background: FAMILY_COLOR[d.family as DriverFamily],
                          }}
                        />
                      </span>
                      <span className="text-[9px] font-extrabold text-ink-900">{d.pct}%</span>
                    </span>
                  </td>
                  <td
                    className={`whitespace-nowrap px-2 py-[7px] text-center text-[9px] font-bold ${
                      d.deltaPp > 0
                        ? "text-[#ef4444]"
                        : d.deltaPp < 0
                          ? "text-ptpn-green"
                          : "text-ink-400"
                    }`}
                  >
                    {d.deltaPp > 0 ? "+" : ""}
                    {d.deltaPp.toFixed(1).replace(".", ",")} pp
                  </td>
                  <td className="px-2 py-[7px] text-center">
                    <span className="inline-flex justify-center">
                      <TrendIcon trend={d.trend} />
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-2 py-[7px] text-[9px] text-ink-700">
                    {d.linkedRisks} risiko
                    {d.criticalLinked > 0 && (
                      <span className="ml-1 rounded bg-[#fdecec] px-1 py-[1px] text-[9px] font-bold text-[#ef4444]">
                        {d.criticalLinked} critical
                      </span>
                    )}
                  </td>
                  <td className="px-2 py-[7px] text-center text-[9px] text-ink-700">{d.units}</td>
                  <td className="whitespace-nowrap px-2 py-[7px] text-[9px] text-ink-700">
                    {d.headcount === 0 ? "—" : d.headcount.toLocaleString("id-ID")}
                  </td>
                  <td className="whitespace-nowrap px-2 py-[7px] text-[9px] text-ink-700">
                    {d.owner}
                  </td>
                  <td className="px-2 py-[7px] text-center">
                    <span
                      className={`inline-flex min-w-[30px] justify-center rounded px-1 py-[2px] text-[8.5px] font-bold ${controlTone(
                        d.control,
                      )}`}
                    >
                      {d.control}%
                    </span>
                  </td>
                  <td className="px-2 py-[7px]">
                    <span
                      className={`inline-flex rounded-md border px-1.5 py-[2px] text-[8.5px] font-bold ${CONTROLLABILITY_BADGE[d.controllability]}`}
                    >
                      {d.controllability}
                    </span>
                  </td>
                  <td className="px-2 py-[7px]">
                    <span
                      className={`inline-flex rounded-md px-1.5 py-[2px] text-[8.5px] font-bold ${STATUS_BADGE[d.status]}`}
                    >
                      {d.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-2 py-[7px] text-[9px] text-ink-500">
                    {d.lastReview}
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={15} className="py-6 text-center text-[9.5px] text-ink-400">
                    Tidak ada driver yang cocok dengan filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* paginasi */}
        <div className="mt-2.5 flex items-center justify-between">
          <span className="text-[9px] text-ink-500">
            Menampilkan {filtered.length === 0 ? 0 : (current - 1) * PAGE_SIZE + 1}–
            {Math.min(current * PAGE_SIZE, filtered.length)} dari {filtered.length} driver ·{" "}
            {filteredPct}% eksposur
            {selected.length > 0 && ` · ${selected.length} dipilih`}
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
                className={`h-[24px] min-w-[24px] rounded-md border px-1 text-[9px] font-semibold ${
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

      {/* panel kanan: filter lanjutan, tampilan tersimpan, aksi prioritas */}
      <div className="flex flex-col gap-3">
        <div
          className="card anim-rise px-3.5 pb-3.5 pt-3"
          style={{ "--d": "60ms" } as React.CSSProperties}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-[10px] font-extrabold uppercase tracking-[0.05em] text-ink-900">
              Filter Driver
            </h3>
            <button
              onClick={reset}
              className="text-[9px] font-semibold text-[#2f6fe4] hover:underline"
            >
              Clear All
            </button>
          </div>

          <div className="mt-2.5 flex flex-col gap-2">
            <div>
              <div className="mb-1 text-[8.5px] font-semibold text-ink-500">Family Driver</div>
              <Select
                value={family}
                onChange={(v) => {
                  setFamily(v);
                  setPage(1);
                }}
                options={DRIVER_FAMILIES}
                allLabel="Semua Family"
              />
            </div>
            <div>
              <div className="mb-1 text-[8.5px] font-semibold text-ink-500">Owner</div>
              <Select
                value={owner}
                onChange={(v) => {
                  setOwner(v);
                  setPage(1);
                }}
                options={driverOwners}
                allLabel="Semua Owner"
              />
            </div>
            <div>
              <div className="mb-1 text-[8.5px] font-semibold text-ink-500">Status Mitigasi</div>
              <Select
                value={status}
                onChange={(v) => {
                  setStatus(v);
                  setPage(1);
                }}
                options={DRIVER_STATUSES}
                allLabel="Semua Status"
              />
            </div>
            <div>
              <div className="mb-1 text-[8.5px] font-semibold text-ink-500">Tingkat Kendali</div>
              <Select
                value={controllability}
                onChange={(v) => {
                  setControllability(v);
                  setPage(1);
                }}
                options={CONTROLLABILITY}
                allLabel="Semua Kendali"
              />
            </div>
            <div>
              <div className="mb-1 text-[8.5px] font-semibold text-ink-500">Arah Tren</div>
              <select
                value={trend}
                onChange={(e) => {
                  setTrend(e.target.value);
                  setPage(1);
                }}
                className="w-full cursor-pointer rounded-lg border border-[#e3e9ef] bg-white px-2.5 py-[7px] text-[9.5px] font-semibold text-ink-700 outline-none focus:border-ptpn-green"
              >
                <option value="">Semua Tren</option>
                <option value="up">Memburuk</option>
                <option value="flat">Stabil</option>
                <option value="down">Membaik</option>
              </select>
            </div>
            <div>
              <div className="mb-1 text-[8.5px] font-semibold text-ink-500">Periode Review</div>
              <div className="rounded-lg border border-[#e3e9ef] bg-white px-2.5 py-[7px] text-[9.5px] font-semibold text-ink-700">
                01/04/2026 – 31/05/2026
              </div>
            </div>
          </div>
        </div>

        <div
          className="card anim-rise px-3.5 pb-3.5 pt-3"
          style={{ "--d": "100ms" } as React.CSSProperties}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-[10px] font-extrabold uppercase tracking-[0.05em] text-ink-900">
              Saved Views
            </h3>
            <Bookmark size={12} className="text-ink-400" />
          </div>
          <div className="mt-2 flex flex-col gap-1.5">
            <button
              onClick={() => {
                reset();
                setTrend("up");
              }}
              className="flex items-center justify-between rounded-lg border border-[#eef2f6] px-2.5 py-[6px] text-[9.5px] font-medium text-ink-700 hover:bg-[#f5f8fa]"
            >
              Driver Memburuk <ArrowRight size={11} className="text-ink-400" />
            </button>
            <button
              onClick={() => {
                reset();
                setControllability("Tinggi");
              }}
              className="flex items-center justify-between rounded-lg border border-[#eef2f6] px-2.5 py-[6px] text-[9.5px] font-medium text-ink-700 hover:bg-[#f5f8fa]"
            >
              Quick Win (Kendali Tinggi) <ArrowRight size={11} className="text-ink-400" />
            </button>
            <button
              onClick={() => {
                reset();
                setOwner("Group CHRO");
              }}
              className="flex items-center justify-between rounded-lg border border-[#eef2f6] px-2.5 py-[6px] text-[9.5px] font-medium text-ink-700 hover:bg-[#f5f8fa]"
            >
              Milik Group CHRO <ArrowRight size={11} className="text-ink-400" />
            </button>
          </div>
        </div>

        <div
          className="card anim-rise px-3.5 pb-3.5 pt-3"
          style={{ "--d": "140ms" } as React.CSSProperties}
        >
          <h3 className="text-[10px] font-extrabold uppercase tracking-[0.05em] text-ink-900">
            Aksi Prioritas
          </h3>
          <div className="mt-2 flex flex-col gap-1.5">
            {driverActions.map((a) => (
              <div key={a.driver} className="rounded-lg border border-[#eef2f6] bg-[#fbfcfd] px-2.5 py-[7px]">
                <div className="truncate text-[9px] font-extrabold text-ink-900" title={a.driver}>
                  {a.driver}
                </div>
                <p className="mt-[2px] text-[8.5px] leading-[1.35] text-ink-600">{a.action}</p>
                <div className="mt-1 flex items-center justify-between text-[9px] text-ink-500">
                  <span>
                    {a.owner} · {a.due}
                  </span>
                  <span className="font-bold text-ptpn-green">{a.impact}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className="anim-rise rounded-xl border border-[#f6c9c9] bg-[#fdecec] px-3.5 py-3"
          style={{ "--d": "180ms" } as React.CSSProperties}
        >
          <div className="text-[8.5px] font-extrabold uppercase tracking-[0.05em] text-[#ef4444]">
            Quick Insight
          </div>
          <p className="mt-1.5 text-[10px] leading-[1.45] text-ink-700">
            <span className="font-extrabold text-ink-900">{worseningCount} driver memburuk</span> pada
            hasil filter saat ini — arahkan mitigasi ke driver kendali tinggi lebih dulu.
          </p>
          <button
            onClick={() => {
              reset();
              setTrend("up");
            }}
            className="mt-2 w-full rounded-lg bg-white py-[6px] text-[9.5px] font-semibold text-[#ef4444] shadow-card"
          >
            Lihat Driver Memburuk
          </button>
        </div>
      </div>
    </div>
  );
}
