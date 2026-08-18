"use client";

import { useMemo, useState } from "react";
import { RotateCcw, Search } from "lucide-react";
import {
  insightCategories,
  insightRows,
  type InsightRow,
} from "@/lib/wa-detail-dinamika";

const STATUS_BADGE: Record<string, string> = {
  Berjalan: "bg-[#e8f1fd] text-[#2f6fe4]",
  "Perlu Keputusan": "bg-[#fdecec] text-[#ef4444]",
  Rencana: "bg-[#fdf3e0] text-[#d98b06]",
  Selesai: "bg-ptpn-greenLight text-ptpn-green",
};

const URGENCY_BADGE: Record<string, string> = {
  Tinggi: "border-[#f6c9c9] bg-[#fdecec] text-[#ef4444]",
  Sedang: "border-[#f6e2b4] bg-[#fdf3e0] text-[#d98b06]",
  Rendah: "border-[#c6e8d4] bg-ptpn-greenLight text-ptpn-green",
};

const OWNERS = [...new Set(insightRows.map((i) => i.owner))].sort();
const STATUSES = ["Perlu Keputusan", "Berjalan", "Rencana", "Selesai"];

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

/** Daftar lengkap insight analitik workforce dengan filter dan ringkasan eksposur. */
export function InsightExplorer() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [urgency, setUrgency] = useState("");
  const [owner, setOwner] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return insightRows.filter((r) => {
      if (
        q &&
        ![r.id, r.title, r.finding, r.action, r.owner].some((f) => f.toLowerCase().includes(q))
      )
        return false;
      if (category && r.category !== category) return false;
      if (status && r.status !== status) return false;
      if (urgency && r.urgency !== urgency) return false;
      if (owner && r.owner !== owner) return false;
      return true;
    });
  }, [query, category, status, urgency, owner]);

  const exposure = filtered.reduce((s, r) => s + r.impactRp, 0);

  function reset() {
    setQuery("");
    setCategory("");
    setStatus("");
    setUrgency("");
    setOwner("");
  }

  return (
    <div className="card anim-rise flex min-w-0 flex-col px-4 pb-3 pt-3">
      <div className="flex items-center justify-between gap-2">
        <div>
          <h3 className="text-[10px] font-extrabold uppercase tracking-[0.05em] text-ink-900">
            Daftar Insight &amp; Rekomendasi
          </h3>
          <p className="mt-[3px] text-[9px] text-ink-500">
            Temuan analitik siklus Mei 2026 beserta rekomendasi, pemilik, dan forum keputusan
          </p>
        </div>
        <span className="text-[9px] text-ink-500">
          {filtered.length} insight · eksposur{" "}
          <span className="font-bold text-[#ef4444]">
            Rp {exposure.toFixed(1).replace(".", ",")} M
          </span>
        </span>
      </div>

      <div className="mt-2.5 grid grid-cols-[minmax(0,1fr)_140px_150px_120px_140px_auto] items-center gap-2">
        <label className="flex items-center gap-1.5 rounded-lg border border-[#e3e9ef] bg-white px-2.5 py-[7px]">
          <Search size={12} className="shrink-0 text-ink-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari temuan, rekomendasi, atau pemilik..."
            className="min-w-0 flex-1 bg-transparent text-[9.5px] text-ink-700 outline-none placeholder:text-ink-400"
          />
        </label>
        <Select value={category} onChange={setCategory} options={insightCategories} allLabel="Semua Kategori" />
        <Select value={status} onChange={setStatus} options={STATUSES} allLabel="Semua Status" />
        <Select value={urgency} onChange={setUrgency} options={["Tinggi", "Sedang", "Rendah"]} allLabel="Semua Urgensi" />
        <Select value={owner} onChange={setOwner} options={OWNERS} allLabel="Semua Pemilik" />
        <button
          onClick={reset}
          className="flex items-center gap-1.5 rounded-lg border border-[#e3e9ef] px-3 py-[7px] text-[9.5px] font-semibold text-ink-700 transition-colors hover:bg-[#f5f8fa]"
        >
          <RotateCcw size={11} />
          Reset
        </button>
      </div>

      <div className="mt-2.5 flex flex-col gap-2">
        {filtered.map((r: InsightRow) => (
          <div
            key={r.id}
            className="grid grid-cols-[minmax(0,1fr)_180px] gap-3 rounded-xl border border-[#eef2f6] bg-[#fbfcfd] px-3 py-2.5"
          >
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[8.5px] font-bold text-ink-400">{r.id}</span>
                <span className="text-[10px] font-extrabold text-ink-900">{r.title}</span>
                <span
                  className={`rounded-md border px-1.5 py-[1px] text-[9px] font-bold ${URGENCY_BADGE[r.urgency]}`}
                >
                  Urgensi {r.urgency}
                </span>
                <span className="rounded-md bg-[#eef2f6] px-1.5 py-[1px] text-[9px] font-bold text-ink-500">
                  {r.category}
                </span>
              </div>
              <p className="mt-1 text-[9px] leading-[1.45] text-ink-600">{r.finding}</p>
              <p className="mt-1 text-[9px] leading-[1.45] text-ink-700">
                <span className="font-bold text-ptpn-green">Rekomendasi: </span>
                {r.action}
              </p>
            </div>

            <div className="flex flex-col justify-between gap-1.5 border-l border-[#eef2f6] pl-3">
              <div>
                <div className="text-[9px] font-semibold uppercase tracking-[0.04em] text-ink-500">
                  Eksposur
                </div>
                <div className="text-[13px] font-extrabold leading-none text-[#ef4444]">
                  {r.impactRp === 0 ? "—" : `Rp ${r.impactRp.toString().replace(".", ",")} M`}
                </div>
              </div>
              <div className="text-[8.5px] leading-[1.4] text-ink-500">
                <div className="font-bold text-ink-700">{r.owner}</div>
                <div>
                  {r.forum} · {r.due}
                </div>
                <div>Keyakinan {r.confidence}%</div>
              </div>
              <span
                className={`inline-flex w-fit rounded-md px-1.5 py-[2px] text-[8.5px] font-bold ${STATUS_BADGE[r.status]}`}
              >
                {r.status}
              </span>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="py-8 text-center text-[9.5px] text-ink-400">
            Tidak ada insight yang cocok dengan filter.
          </div>
        )}
      </div>
    </div>
  );
}
