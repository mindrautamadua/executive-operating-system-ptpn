"use client";

import { useEffect, useState } from "react";
import { Check, X, Users, FileSearch, Clock } from "lucide-react";

const KEY = "ecc-decision-log";

export type DecisionAction = "Approve" | "Reject" | "Delegasi" | "Analisis" | "Tunda";

interface LogEntry {
  action: DecisionAction;
  at: string;
}

const ACTIONS: { action: DecisionAction; icon: typeof Check; cls: string }[] = [
  { action: "Approve", icon: Check, cls: "text-ptpn-green hover:bg-ptpn-greenLight" },
  { action: "Reject", icon: X, cls: "text-[#ef4444] hover:bg-[#fdecec]" },
  { action: "Delegasi", icon: Users, cls: "text-[#2f6fe4] hover:bg-[#e7f0fe]" },
  { action: "Analisis", icon: FileSearch, cls: "text-[#8b5cf6] hover:bg-[#f1ecfe]" },
  { action: "Tunda", icon: Clock, cls: "text-[#d98b06] hover:bg-[#fdf3e0]" },
];

const readLog = (): Record<string, LogEntry> => {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "{}");
  } catch {
    return {};
  }
};

/**
 * Siklus keputusan melekat pada kartunya: Direksi tidak hanya membaca
 * rekomendasi tetapi merekam disposisinya (approve/reject/delegasi/analisis/
 * tunda) — dicatat ke decision log lokal dengan stempel waktu. Ini yang
 * membedakan decision center dari daftar bacaan.
 */
export function DecisionActions({ id }: { id: string }) {
  const [entry, setEntry] = useState<LogEntry | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setEntry(readLog()[id] ?? null);
    setReady(true);
  }, [id]);

  const record = (action: DecisionAction) => {
    const at = new Date().toLocaleString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    const log = readLog();
    log[id] = { action, at };
    try {
      localStorage.setItem(KEY, JSON.stringify(log));
    } catch {}
    setEntry(log[id]);
  };

  const reset = () => {
    const log = readLog();
    delete log[id];
    try {
      localStorage.setItem(KEY, JSON.stringify(log));
    } catch {}
    setEntry(null);
  };

  if (!ready) return null;

  if (entry) {
    return (
      <div className="mt-1.5 flex items-center gap-1.5 border-t border-black/5 pt-1.5">
        <span className="rounded bg-ptpn-green px-1.5 py-[2px] text-[7.5px] font-bold uppercase tracking-[0.04em] text-white">
          {entry.action}
        </span>
        <span className="min-w-0 flex-1 truncate text-[9px] text-ink-500">
          Dicatat {entry.at} · decision log
        </span>
        <button
          type="button"
          onClick={reset}
          className="shrink-0 text-[9px] font-semibold text-ink-500 hover:text-ink-700"
        >
          Ubah
        </button>
      </div>
    );
  }

  return (
    <div className="mt-1.5 flex items-center gap-1 border-t border-black/5 pt-1.5">
      {ACTIONS.map(({ action, icon: Icon, cls }) => (
        <button
          key={action}
          type="button"
          onClick={() => record(action)}
          title={action}
          className={`flex flex-1 items-center justify-center gap-1 rounded-md py-[4px] text-[7.5px] font-bold transition-colors ${cls}`}
        >
          <Icon size={10} strokeWidth={2.4} />
          {action}
        </button>
      ))}
    </div>
  );
}
