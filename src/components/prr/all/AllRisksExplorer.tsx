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
  allRisks,
  riskOwners,
  RISK_CATEGORIES,
  RISK_LEVELS,
  RISK_STATUSES,
  type RiskLevelAll,
  type RiskRecord,
  type RiskTrendDir,
} from "@/lib/prr-registry";

const PAGE_SIZE = 10;

const LEVEL_BADGE: Record<RiskLevelAll, string> = {
  Critical: "border-[#f6c9c9] bg-[#fdecec] text-[#ef4444]",
  High: "border-[#fadfc0] bg-[#fdf0e2] text-[#e07b1f]",
  Medium: "border-[#f6e2b4] bg-[#fdf3e0] text-[#d98b06]",
  Low: "border-[#c6e8d4] bg-ptpn-greenLight text-ptpn-green",
};

const STATUS_BADGE: Record<string, string> = {
  Active: "bg-ptpn-greenLight text-ptpn-green",
  Mitigating: "bg-[#e8f1fd] text-[#2f6fe4]",
  Monitoring: "bg-[#fdf3e0] text-[#d98b06]",
  Closed: "bg-[#f1f4f7] text-ink-500",
};

function scoreTone(score: number) {
  if (score >= 15) return "bg-[#fdecec] text-[#ef4444]";
  if (score >= 10) return "bg-[#fdf0e2] text-[#e07b1f]";
  if (score >= 5) return "bg-[#fdf3e0] text-[#d98b06]";
  return "bg-ptpn-greenLight text-ptpn-green";
}

function TrendIcon({ trend }: { trend: RiskTrendDir }) {
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
  options: string[];
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

export function AllRisksExplorer() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [owner, setOwner] = useState("");
  const [status, setStatus] = useState("");
  const [level, setLevel] = useState("");
  const [trend, setTrend] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<string[]>([]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allRisks.filter((r) => {
      if (q && ![r.id, r.title, r.category, r.owner].some((f) => f.toLowerCase().includes(q)))
        return false;
      if (category && r.category !== category) return false;
      if (owner && r.owner !== owner) return false;
      if (status && r.status !== status) return false;
      if (level && r.level !== level) return false;
      if (trend && r.trend !== trend) return false;
      return true;
    });
  }, [query, category, owner, status, level, trend]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const rows = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);
  const criticalCount = filtered.filter((r) => r.level === "Critical").length;

  function reset() {
    setQuery("");
    setCategory("");
    setOwner("");
    setStatus("");
    setLevel("");
    setTrend("");
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
        <div className="grid grid-cols-[minmax(0,1fr)_140px_140px_130px_140px_auto] items-center gap-2">
          <label className="flex items-center gap-1.5 rounded-lg border border-[#e3e9ef] bg-white px-2.5 py-[7px]">
            <Search size={12} className="shrink-0 text-ink-400" />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Search risk by name, category, owner..."
              className="min-w-0 flex-1 bg-transparent text-[9.5px] text-ink-700 outline-none placeholder:text-ink-400"
            />
          </label>
          <Select
            value={category}
            onChange={(v) => {
              setCategory(v);
              setPage(1);
            }}
            options={RISK_CATEGORIES}
            allLabel="All Categories"
          />
          <Select
            value={owner}
            onChange={(v) => {
              setOwner(v);
              setPage(1);
            }}
            options={riskOwners}
            allLabel="All Owners"
          />
          <Select
            value={status}
            onChange={(v) => {
              setStatus(v);
              setPage(1);
            }}
            options={RISK_STATUSES}
            allLabel="All Status"
          />
          <Select
            value={level}
            onChange={(v) => {
              setLevel(v);
              setPage(1);
            }}
            options={RISK_LEVELS}
            allLabel="All Risk Levels"
          />
          <button
            onClick={reset}
            className="flex items-center gap-1.5 rounded-lg border border-[#e3e9ef] px-3 py-[7px] text-[9.5px] font-semibold text-ink-700 transition-colors hover:bg-[#f5f8fa]"
          >
            <RotateCcw size={11} />
            Reset
          </button>
        </div>

        {/* tabel registri */}
        <div className="scroll-thin mt-2.5 min-w-0 overflow-x-auto">
          <table className="w-full min-w-[1000px] border-collapse">
            <thead>
              <tr className="border-b border-[#eef2f6] text-ink-500">
                <th className="w-[26px] px-1 pb-1.5" rowSpan={2}>
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
                <th className="px-2 pb-1.5 text-left text-[9px] font-bold" rowSpan={2}>
                  Risk ID
                </th>
                <th className="px-2 pb-1.5 text-left text-[9px] font-bold" rowSpan={2}>
                  Risk Title
                </th>
                <th className="px-2 pb-1.5 text-left text-[9px] font-bold" rowSpan={2}>
                  Category
                </th>
                <th
                  className="border-x border-[#eef2f6] px-2 pb-1 text-center text-[9px] font-bold"
                  colSpan={3}
                >
                  Inherent Risk
                </th>
                <th
                  className="border-r border-[#eef2f6] px-2 pb-1 text-center text-[9px] font-bold"
                  colSpan={3}
                >
                  Residual Risk
                </th>
                <th className="px-2 pb-1.5 text-left text-[9px] font-bold" rowSpan={2}>
                  Risk Level
                </th>
                <th className="px-2 pb-1.5 text-center text-[9px] font-bold" rowSpan={2}>
                  Trend
                </th>
                <th className="px-2 pb-1.5 text-left text-[9px] font-bold" rowSpan={2}>
                  Risk Owner
                </th>
                <th className="px-2 pb-1.5 text-left text-[9px] font-bold" rowSpan={2}>
                  Status
                </th>
                <th className="px-2 pb-1.5 text-left text-[9px] font-bold" rowSpan={2}>
                  Last Review
                </th>
              </tr>
              <tr className="border-b border-[#eef2f6] text-ink-400">
                {["Likelihood", "Impact", "Score", "Likelihood", "Impact", "Score"].map((h, i) => (
                  <th
                    key={`${h}-${i}`}
                    className={`px-1 pb-1.5 text-center text-[9px] font-semibold ${
                      i === 0 ? "border-l border-[#eef2f6]" : ""
                    } ${i === 2 || i === 5 ? "border-r border-[#eef2f6]" : ""}`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r: RiskRecord) => (
                <tr key={r.id} className="border-b border-[#f3f6f9] hover:bg-[#f8fbfd]">
                  <td className="px-1 py-[7px] text-center">
                    <input
                      type="checkbox"
                      checked={selected.includes(r.id)}
                      onChange={() => toggle(r.id)}
                      className="h-[11px] w-[11px] cursor-pointer accent-[#1a9c5b]"
                    />
                  </td>
                  <td className="whitespace-nowrap px-2 py-[7px] text-[9px] font-semibold text-[#2f6fe4] underline decoration-dotted underline-offset-2">
                    {r.id}
                  </td>
                  <td className="max-w-[260px] px-2 py-[7px] text-[9.5px] text-ink-700">
                    <span className="block truncate" title={r.title}>
                      {r.title}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-2 py-[7px] text-[9px] text-ink-500">
                    {r.category}
                  </td>
                  <td className="px-1 py-[7px] text-center text-[9px] text-ink-700">
                    {r.inherent.likelihood}
                  </td>
                  <td className="px-1 py-[7px] text-center text-[9px] text-ink-700">
                    {r.inherent.impact}
                  </td>
                  <td className="px-1 py-[7px] text-center">
                    <span
                      className={`inline-flex min-w-[22px] justify-center rounded px-1 py-[2px] text-[8.5px] font-bold ${scoreTone(
                        r.inherent.score,
                      )}`}
                    >
                      {r.inherent.score}
                    </span>
                  </td>
                  <td className="px-1 py-[7px] text-center text-[9px] text-ink-700">
                    {r.residual.likelihood}
                  </td>
                  <td className="px-1 py-[7px] text-center text-[9px] text-ink-700">
                    {r.residual.impact}
                  </td>
                  <td className="px-1 py-[7px] text-center">
                    <span
                      className={`inline-flex min-w-[22px] justify-center rounded px-1 py-[2px] text-[8.5px] font-bold ${scoreTone(
                        r.residual.score,
                      )}`}
                    >
                      {r.residual.score}
                    </span>
                  </td>
                  <td className="px-2 py-[7px]">
                    <span
                      className={`inline-flex rounded-md border px-1.5 py-[2px] text-[8.5px] font-bold ${LEVEL_BADGE[r.level]}`}
                    >
                      {r.level}
                    </span>
                  </td>
                  <td className="px-2 py-[7px] text-center">
                    <span className="inline-flex justify-center">
                      <TrendIcon trend={r.trend} />
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-2 py-[7px] text-[9px] text-ink-700">
                    {r.owner}
                  </td>
                  <td className="px-2 py-[7px]">
                    <span
                      className={`inline-flex rounded-md px-1.5 py-[2px] text-[8.5px] font-bold ${STATUS_BADGE[r.status]}`}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-2 py-[7px] text-[9px] text-ink-500">
                    {r.lastReview}
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={14} className="py-6 text-center text-[9.5px] text-ink-400">
                    Tidak ada risiko yang cocok dengan filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* paginasi */}
        <div className="mt-2.5 flex items-center justify-between">
          <span className="text-[9px] text-ink-500">
            Showing {filtered.length === 0 ? 0 : (current - 1) * PAGE_SIZE + 1} to{" "}
            {Math.min(current * PAGE_SIZE, filtered.length)} of {filtered.length} risks
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

      {/* panel filter kanan */}
      <div className="flex flex-col gap-3">
        <div className="card anim-rise px-3.5 pb-3.5 pt-3" style={{ "--d": "60ms" } as React.CSSProperties}>
          <div className="flex items-center justify-between">
            <h3 className="text-[10px] font-extrabold uppercase tracking-[0.05em] text-ink-900">
              Filter Risiko
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
              <div className="mb-1 text-[8.5px] font-semibold text-ink-500">Risk Level</div>
              <Select
                value={level}
                onChange={(v) => {
                  setLevel(v);
                  setPage(1);
                }}
                options={RISK_LEVELS}
                allLabel="All Risk Levels"
              />
            </div>
            <div>
              <div className="mb-1 text-[8.5px] font-semibold text-ink-500">Category</div>
              <Select
                value={category}
                onChange={(v) => {
                  setCategory(v);
                  setPage(1);
                }}
                options={RISK_CATEGORIES}
                allLabel="All Categories"
              />
            </div>
            <div>
              <div className="mb-1 text-[8.5px] font-semibold text-ink-500">Risk Owner</div>
              <Select
                value={owner}
                onChange={(v) => {
                  setOwner(v);
                  setPage(1);
                }}
                options={riskOwners}
                allLabel="All Owners"
              />
            </div>
            <div>
              <div className="mb-1 text-[8.5px] font-semibold text-ink-500">Status</div>
              <Select
                value={status}
                onChange={(v) => {
                  setStatus(v);
                  setPage(1);
                }}
                options={RISK_STATUSES}
                allLabel="All Status"
              />
            </div>
            <div>
              <div className="mb-1 text-[8.5px] font-semibold text-ink-500">Trend</div>
              <select
                value={trend}
                onChange={(e) => {
                  setTrend(e.target.value);
                  setPage(1);
                }}
                className="w-full cursor-pointer rounded-lg border border-[#e3e9ef] bg-white px-2.5 py-[7px] text-[9.5px] font-semibold text-ink-700 outline-none focus:border-ptpn-green"
              >
                <option value="">All Trends</option>
                <option value="up">Memburuk</option>
                <option value="flat">Stabil</option>
                <option value="down">Membaik</option>
              </select>
            </div>
            <div>
              <div className="mb-1 text-[8.5px] font-semibold text-ink-500">Last Review</div>
              <div className="rounded-lg border border-[#e3e9ef] bg-white px-2.5 py-[7px] text-[9.5px] font-semibold text-ink-700">
                01/04/2026 – 31/05/2026
              </div>
            </div>
          </div>
        </div>

        <div className="card anim-rise px-3.5 pb-3.5 pt-3" style={{ "--d": "100ms" } as React.CSSProperties}>
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
                setLevel("Critical");
              }}
              className="flex items-center justify-between rounded-lg border border-[#eef2f6] px-2.5 py-[6px] text-[9.5px] font-medium text-ink-700 hover:bg-[#f5f8fa]"
            >
              Critical Only <ArrowRight size={11} className="text-ink-400" />
            </button>
            <button
              onClick={() => {
                reset();
                setTrend("up");
              }}
              className="flex items-center justify-between rounded-lg border border-[#eef2f6] px-2.5 py-[6px] text-[9.5px] font-medium text-ink-700 hover:bg-[#f5f8fa]"
            >
              Risiko Memburuk <ArrowRight size={11} className="text-ink-400" />
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
          className="anim-rise rounded-xl border border-[#f6c9c9] bg-[#fdecec] px-3.5 py-3"
          style={{ "--d": "140ms" } as React.CSSProperties}
        >
          <div className="text-[8.5px] font-extrabold uppercase tracking-[0.05em] text-[#ef4444]">
            Quick Insight
          </div>
          <p className="mt-1.5 text-[10px] leading-[1.45] text-ink-700">
            <span className="font-extrabold text-ink-900">{criticalCount} risiko Critical</span> pada
            hasil filter saat ini butuh penanganan segera.
          </p>
          <button
            onClick={() => {
              reset();
              setLevel("Critical");
            }}
            className="mt-2 w-full rounded-lg bg-white py-[6px] text-[9.5px] font-semibold text-[#ef4444] shadow-card"
          >
            Lihat Critical Risks
          </button>
        </div>
      </div>
    </div>
  );
}
