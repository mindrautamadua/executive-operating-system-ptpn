"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  CalendarClock,
  ChevronLeft,
  ChevronRight,
  MoveRight,
  RotateCcw,
  Search,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import {
  ESCALATIONS,
  LEVEL_COLOR,
  PRIORITY_CATEGORIES,
  PRIORITY_LEVELS,
  SLA_STATUSES,
  VELOCITIES,
  priorityDecisions,
  priorityOwners,
  priorityRisks,
  type PriorityLevel,
  type PriorityRisk,
  type PriorityTrend,
} from "@/lib/prr-priority";

const PAGE_SIZE = 8;

const LEVEL_BADGE: Record<PriorityLevel, string> = {
  Critical: "border-[#f6c9c9] bg-[#fdecec] text-[#ef4444]",
  High: "border-[#fadfc0] bg-[#fdf0e2] text-[#e07b1f]",
  Medium: "border-[#f6e2b4] bg-[#fdf3e0] text-[#d98b06]",
};

const SLA_BADGE: Record<string, string> = {
  "On Track": "bg-ptpn-greenLight text-ptpn-green",
  "At Risk": "bg-[#fdf0e2] text-[#e07b1f]",
  Overdue: "bg-[#fdecec] text-[#ef4444]",
};

const ESC_BADGE: Record<string, string> = {
  BOD: "bg-[#fdecec] text-[#ef4444]",
  "Komite Risiko": "bg-[#fdf3e0] text-[#d98b06]",
  Direktorat: "bg-[#e8f1fd] text-[#2f6fe4]",
};

const VELOCITY_TONE: Record<string, string> = {
  Cepat: "text-[#ef4444]",
  Sedang: "text-[#d98b06]",
  Lambat: "text-ink-500",
};

function TrendIcon({ trend }: { trend: PriorityTrend }) {
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

/** Antrean kerja: tabel risiko prioritas + filter + panel keputusan menunggu. */
export function PriorityQueue() {
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState("");
  const [category, setCategory] = useState("");
  const [owner, setOwner] = useState("");
  const [sla, setSla] = useState("");
  const [escalation, setEscalation] = useState("");
  const [velocity, setVelocity] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<string[]>([]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return priorityRisks.filter((r) => {
      if (
        q &&
        ![r.id, r.name, r.desc, r.category, r.owner, r.pic].some((f) => f.toLowerCase().includes(q))
      )
        return false;
      if (level && r.level !== level) return false;
      if (category && r.category !== category) return false;
      if (owner && r.owner !== owner) return false;
      if (sla && r.sla !== sla) return false;
      if (escalation && r.escalation !== escalation) return false;
      if (velocity && r.velocity !== velocity) return false;
      return true;
    });
  }, [query, level, category, owner, sla, escalation, velocity]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const rows = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);
  const filteredImpact = filtered.reduce((s, r) => s + r.impactRp, 0);
  const bodCount = filtered.filter((r) => r.escalation === "BOD").length;

  function reset() {
    setQuery("");
    setLevel("");
    setCategory("");
    setOwner("");
    setSla("");
    setEscalation("");
    setVelocity("");
    setPage(1);
  }

  function toggle(id: string) {
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  }

  const allOnPageSelected = rows.length > 0 && rows.every((r) => selected.includes(r.id));

  return (
    <div className="grid grid-cols-[minmax(0,1fr)_248px] items-start gap-3">
      <div className="card anim-rise flex min-w-0 flex-col px-4 pb-3 pt-3">
        {/* baris pencarian & filter cepat */}
        <div className="grid grid-cols-[minmax(0,1fr)_130px_150px_140px_130px_auto] items-center gap-2">
          <label className="flex items-center gap-1.5 rounded-lg border border-[#e3e9ef] bg-white px-2.5 py-[7px]">
            <Search size={12} className="shrink-0 text-ink-400" />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Cari risiko, kategori, owner, atau PIC..."
              className="min-w-0 flex-1 bg-transparent text-[9.5px] text-ink-700 outline-none placeholder:text-ink-400"
            />
          </label>
          <Select
            value={level}
            onChange={(v) => {
              setLevel(v);
              setPage(1);
            }}
            options={PRIORITY_LEVELS}
            allLabel="Semua Level"
          />
          <Select
            value={category}
            onChange={(v) => {
              setCategory(v);
              setPage(1);
            }}
            options={PRIORITY_CATEGORIES}
            allLabel="Semua Kategori"
          />
          <Select
            value={owner}
            onChange={(v) => {
              setOwner(v);
              setPage(1);
            }}
            options={priorityOwners}
            allLabel="Semua Owner"
          />
          <Select
            value={sla}
            onChange={(v) => {
              setSla(v);
              setPage(1);
            }}
            options={SLA_STATUSES}
            allLabel="Semua SLA"
          />
          <button
            onClick={reset}
            className="flex items-center gap-1.5 rounded-lg border border-[#e3e9ef] px-3 py-[7px] text-[9.5px] font-semibold text-ink-700 transition-colors hover:bg-[#f5f8fa]"
          >
            <RotateCcw size={11} />
            Reset
          </button>
        </div>

        {/* tabel antrean prioritas */}
        <div className="scroll-thin mt-2.5 min-w-0 overflow-x-auto">
          <table className="w-full min-w-[1180px] border-collapse">
            <thead>
              <tr className="border-b border-[#eef2f6] text-ink-500">
                <th className="w-[26px] px-1 pb-1.5">
                  <input
                    type="checkbox"
                    checked={allOnPageSelected}
                    onChange={() =>
                      setSelected(
                        allOnPageSelected
                          ? selected.filter((id) => !rows.some((r) => r.id === id))
                          : [...new Set([...selected, ...rows.map((r) => r.id)])],
                      )
                    }
                    className="h-[11px] w-[11px] cursor-pointer accent-[#1a9c5b]"
                  />
                </th>
                {[
                  ["#", "center"],
                  ["Risiko Prioritas", "left"],
                  ["Kategori", "left"],
                  ["Level", "left"],
                  ["Skor", "center"],
                  ["Trend", "center"],
                  ["Dampak (Rp M)", "right"],
                  ["Terdampak", "right"],
                  ["Velocity", "left"],
                  ["Mitigasi", "left"],
                  ["Aksi Terbuka", "center"],
                  ["Owner / PIC", "left"],
                  ["Tenggat", "left"],
                  ["SLA", "left"],
                  ["Eskalasi", "left"],
                ].map(([h, align]) => (
                  <th
                    key={h}
                    className={`px-2 pb-1.5 text-[9px] font-bold ${
                      align === "center" ? "text-center" : align === "right" ? "text-right" : "text-left"
                    }`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r: PriorityRisk) => (
                <tr key={r.id} className="border-b border-[#f3f6f9] hover:bg-[#f8fbfd]">
                  <td className="px-1 py-[7px] text-center">
                    <input
                      type="checkbox"
                      checked={selected.includes(r.id)}
                      onChange={() => toggle(r.id)}
                      className="h-[11px] w-[11px] cursor-pointer accent-[#1a9c5b]"
                    />
                  </td>
                  <td className="px-2 py-[7px] text-center">
                    <span
                      className="inline-flex h-[18px] w-[18px] items-center justify-center rounded-full text-[9px] font-extrabold text-white"
                      style={{ background: LEVEL_COLOR[r.level] }}
                    >
                      {r.rank}
                    </span>
                  </td>
                  <td className="max-w-[248px] px-2 py-[7px]">
                    <span className="block truncate text-[9.5px] font-semibold text-ink-900" title={r.name}>
                      {r.name}
                    </span>
                    <span className="block truncate text-[9px] text-ink-500" title={r.desc}>
                      {r.id} · {r.desc}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-2 py-[7px] text-[9px] text-ink-500">
                    {r.category}
                  </td>
                  <td className="px-2 py-[7px]">
                    <span
                      className={`inline-flex rounded-md border px-1.5 py-[2px] text-[8.5px] font-bold ${LEVEL_BADGE[r.level]}`}
                    >
                      {r.level}
                    </span>
                  </td>
                  <td className="px-2 py-[7px] text-center">
                    <span className="text-[10px] font-extrabold text-ink-900">{r.score}</span>
                    <span
                      className={`ml-1 text-[9px] font-bold ${
                        r.deltaScore > 0
                          ? "text-[#ef4444]"
                          : r.deltaScore < 0
                            ? "text-ptpn-green"
                            : "text-ink-400"
                      }`}
                    >
                      {r.deltaScore > 0 ? "+" : ""}
                      {r.deltaScore !== 0 ? r.deltaScore : "0"}
                    </span>
                  </td>
                  <td className="px-2 py-[7px] text-center">
                    <span className="inline-flex justify-center">
                      <TrendIcon trend={r.trend} />
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-2 py-[7px] text-right text-[9.5px] font-extrabold text-[#ef4444]">
                    {r.impactRp.toString().replace(".", ",")}
                  </td>
                  <td className="whitespace-nowrap px-2 py-[7px] text-right text-[9px] text-ink-700">
                    {r.impacted === 0 ? "—" : r.impacted.toLocaleString("id-ID")}
                    <span className="block text-[9px] text-ink-500">{r.unitCount} unit</span>
                  </td>
                  <td className={`whitespace-nowrap px-2 py-[7px] text-[9px] font-semibold ${VELOCITY_TONE[r.velocity]}`}>
                    {r.velocity}
                    <span className="block text-[9px] font-normal text-ink-500">
                      ~{r.weeksToImpact} mg
                    </span>
                  </td>
                  <td className="px-2 py-[7px]">
                    <span className="flex items-center gap-1.5">
                      <span className="h-[5px] w-[48px] shrink-0 overflow-hidden rounded-full bg-[#eef2f6]">
                        <span
                          className="block h-full rounded-full bg-ptpn-green"
                          style={{ width: `${r.mitigation}%` }}
                        />
                      </span>
                      <span className="text-[9px] font-bold text-ink-900">{r.mitigation}%</span>
                    </span>
                  </td>
                  <td className="px-2 py-[7px] text-center text-[9px] text-ink-700">
                    <span className="font-bold text-ink-900">{r.openActions}</span>
                    <span className="text-ink-400">/{r.totalActions}</span>
                  </td>
                  <td className="whitespace-nowrap px-2 py-[7px] text-[9px] text-ink-700">
                    {r.owner}
                    <span className="block text-[9px] text-ink-500">{r.pic}</span>
                  </td>
                  <td className="whitespace-nowrap px-2 py-[7px] text-[9px] text-ink-700">
                    {r.due}
                    <span className="block text-[9px] text-ink-500">upd {r.lastUpdate}</span>
                  </td>
                  <td className="px-2 py-[7px]">
                    <span
                      className={`inline-flex whitespace-nowrap rounded-md px-1.5 py-[2px] text-[8.5px] font-bold ${SLA_BADGE[r.sla]}`}
                    >
                      {r.sla}
                    </span>
                  </td>
                  <td className="px-2 py-[7px]">
                    <span
                      className={`inline-flex whitespace-nowrap rounded-md px-1.5 py-[2px] text-[8.5px] font-bold ${ESC_BADGE[r.escalation]}`}
                    >
                      {r.escalation}
                    </span>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={16} className="py-6 text-center text-[9.5px] text-ink-400">
                    Tidak ada risiko prioritas yang cocok dengan filter.
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
            {Math.min(current * PAGE_SIZE, filtered.length)} dari {filtered.length} risiko prioritas ·
            eksposur Rp {filteredImpact.toFixed(1).replace(".", ",")} M
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

      {/* panel kanan: filter lanjutan, tampilan tersimpan, keputusan menunggu */}
      <div className="flex flex-col gap-3">
        <div
          className="card anim-rise px-3.5 pb-3.5 pt-3"
          style={{ "--d": "60ms" } as React.CSSProperties}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-[10px] font-extrabold uppercase tracking-[0.05em] text-ink-900">
              Filter Antrean
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
              <div className="mb-1 text-[8.5px] font-semibold text-ink-500">Jalur Eskalasi</div>
              <Select
                value={escalation}
                onChange={(v) => {
                  setEscalation(v);
                  setPage(1);
                }}
                options={ESCALATIONS}
                allLabel="Semua Jalur"
              />
            </div>
            <div>
              <div className="mb-1 text-[8.5px] font-semibold text-ink-500">Velocity Risiko</div>
              <Select
                value={velocity}
                onChange={(v) => {
                  setVelocity(v);
                  setPage(1);
                }}
                options={VELOCITIES}
                allLabel="Semua Velocity"
              />
            </div>
            <div>
              <div className="mb-1 text-[8.5px] font-semibold text-ink-500">Status SLA</div>
              <Select
                value={sla}
                onChange={(v) => {
                  setSla(v);
                  setPage(1);
                }}
                options={SLA_STATUSES}
                allLabel="Semua SLA"
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
                options={priorityOwners}
                allLabel="Semua Owner"
              />
            </div>
            <div>
              <div className="mb-1 text-[8.5px] font-semibold text-ink-500">Periode Tenggat</div>
              <div className="rounded-lg border border-[#e3e9ef] bg-white px-2.5 py-[7px] text-[9.5px] font-semibold text-ink-700">
                01/05/2026 – 31/12/2026
              </div>
            </div>
          </div>
        </div>

        <div
          className="card anim-rise px-3.5 pb-3.5 pt-3"
          style={{ "--d": "100ms" } as React.CSSProperties}
        >
          <h3 className="text-[10px] font-extrabold uppercase tracking-[0.05em] text-ink-900">
            Saved Views
          </h3>
          <div className="mt-2 flex flex-col gap-1.5">
            <button
              onClick={() => {
                reset();
                setEscalation("BOD");
              }}
              className="flex items-center justify-between rounded-lg border border-[#eef2f6] px-2.5 py-[6px] text-[9.5px] font-medium text-ink-700 hover:bg-[#f5f8fa]"
            >
              Agenda Rapat Direksi <ArrowRight size={11} className="text-ink-400" />
            </button>
            <button
              onClick={() => {
                reset();
                setSla("Overdue");
              }}
              className="flex items-center justify-between rounded-lg border border-[#eef2f6] px-2.5 py-[6px] text-[9.5px] font-medium text-ink-700 hover:bg-[#f5f8fa]"
            >
              Lewat Tenggat <ArrowRight size={11} className="text-ink-400" />
            </button>
            <button
              onClick={() => {
                reset();
                setVelocity("Cepat");
              }}
              className="flex items-center justify-between rounded-lg border border-[#eef2f6] px-2.5 py-[6px] text-[9.5px] font-medium text-ink-700 hover:bg-[#f5f8fa]"
            >
              Risiko Bergerak Cepat <ArrowRight size={11} className="text-ink-400" />
            </button>
          </div>
        </div>

        <div
          className="card anim-rise px-3.5 pb-3.5 pt-3"
          style={{ "--d": "140ms" } as React.CSSProperties}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-[10px] font-extrabold uppercase tracking-[0.05em] text-ink-900">
              Keputusan Menunggu
            </h3>
            <CalendarClock size={12} className="text-ink-400" />
          </div>
          <div className="mt-2 flex flex-col gap-1.5">
            {priorityDecisions.map((d) => (
              <div
                key={d.title}
                className="rounded-lg border border-[#eef2f6] bg-[#fbfcfd] px-2.5 py-[7px]"
              >
                <div className="truncate text-[9px] font-extrabold text-ink-900" title={d.title}>
                  {d.title}
                </div>
                <p className="mt-[2px] text-[8.5px] leading-[1.35] text-ink-600">{d.detail}</p>
                <div className="mt-1 flex items-center justify-between text-[9px] text-ink-500">
                  <span>{d.risk}</span>
                  <span className="font-bold text-[#ef4444]">
                    {d.forum} · {d.due}
                  </span>
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
            <span className="font-extrabold text-ink-900">{bodCount} risiko</span> pada hasil filter
            perlu keputusan BOD dengan eksposur Rp{" "}
            {filtered
              .filter((r) => r.escalation === "BOD")
              .reduce((s, r) => s + r.impactRp, 0)
              .toFixed(1)
              .replace(".", ",")}{" "}
            M.
          </p>
          <button
            onClick={() => {
              reset();
              setEscalation("BOD");
            }}
            className="mt-2 w-full rounded-lg bg-white py-[6px] text-[9.5px] font-semibold text-[#ef4444] shadow-card"
          >
            Lihat Eskalasi BOD
          </button>
        </div>
      </div>
    </div>
  );
}
