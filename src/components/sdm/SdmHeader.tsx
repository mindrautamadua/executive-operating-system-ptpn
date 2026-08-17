"use client";

import { useState } from "react";
import { Check, ChevronDown, LayoutDashboard } from "lucide-react";
import { orgNodes } from "@/lib/hc-data";
import { ExportButton, ModuleHeader, SelectBox } from "@/components/ui/ModuleHeader";

/** Dropdown drill-down: Enterprise → Subholding → Region → Business Unit. */
function OrgLevelSelect() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(0);
  const node = orgNodes[selected];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-[200px] items-center justify-between rounded-lg border border-[#e3e9ef] bg-white px-3 py-1.5 text-left shadow-card"
      >
        <span className="min-w-0 leading-tight">
          <span className="block text-[8.5px] font-medium text-ink-400">{node.level}</span>
          <span className="mt-[2px] block truncate text-[11px] font-bold text-ink-900">
            {node.label}
          </span>
        </span>
        <ChevronDown
          size={13}
          className={`ml-2 shrink-0 text-ink-400 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <>
          <button
            className="fixed inset-0 z-40 cursor-default"
            aria-label="Tutup pilihan level organisasi"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 z-50 mt-1.5 w-[248px] rounded-xl border border-[#e3e9ef] bg-white py-1.5 shadow-card">
            {orgNodes.map((n, i) => (
              <button
                key={n.label}
                onClick={() => {
                  setSelected(i);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between gap-2 px-3 py-[6px] text-left transition-colors hover:bg-[#f5f8fa] ${
                  i === selected ? "bg-ptpn-greenLight/50" : ""
                }`}
                style={{ paddingLeft: `${12 + n.depth * 14}px` }}
              >
                <span className="min-w-0">
                  <span className="block truncate text-[10px] font-semibold text-ink-900">
                    {n.label}
                  </span>
                  <span className="block text-[8px] text-ink-400">{n.level}</span>
                </span>
                {i === selected && <Check size={12} className="shrink-0 text-ptpn-green" />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export function SdmHeader() {
  return (
    <ModuleHeader
      icon={<LayoutDashboard size={19} strokeWidth={1.9} />}
      title="HC Executive Operating System"
      subtitle="Human Capital Intelligence for Sustainable Growth"
      controls={
        <>
          <SelectBox label="Periode" value="Mei 2026 (YTD)" width="170px" />
          <OrgLevelSelect />
        </>
      }
      dataAsOf="Data per 31 Mei 2026 (YTD)"
      actions={<ExportButton label="Export Dashboard" />}
    />
  );
}
