"use client";

import type { ReactNode } from "react";
import { Bell, CalendarDays, ChevronDown, Download } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SubholdingFilter } from "@/components/ui/SubholdingFilter";
import { ScopeBanner } from "@/components/ui/ScopeNote";

/**
 * Label filter yang bermakna "pilih subholding". Header modul memakai beberapa
 * penamaan berbeda untuk maksud yang sama, jadi semuanya dipetakan ke satu
 * kontrol filter subholding yang benar-benar berfungsi.
 */
const SUBHOLDING_LABELS = [
  "Subholding",
  "Level Organisasi",
  "Unit Organisasi",
  "Segmen",
  "Entitas",
];

/**
 * Kontrol dropdown standar pada header modul (pola Tipe A).
 *
 * Untuk filter subholding, kontrol statis diganti otomatis oleh
 * <SubholdingFilter /> sehingga pilihan berlaku lintas dimensi.
 */
export function SelectBox({
  label,
  value,
  width,
}: {
  label: string;
  value: string;
  width: string;
}) {
  if (SUBHOLDING_LABELS.includes(label)) {
    return <SubholdingFilter width={width} />;
  }

  /* Selain filter subholding, nilai bersifat informasional (belum ada dropdown);
     render sebagai display statis tanpa chevron agar tidak menjanjikan interaksi. */
  return (
    <div
      className="flex w-full min-w-0 shrink items-center justify-between rounded-lg border border-[#e3e9ef] bg-white px-3 py-1.5 text-left shadow-card"
      style={{ maxWidth: width }}
    >
      <span className="min-w-0 leading-tight">
        <span className="block truncate text-[8.5px] font-medium text-ink-500">{label}</span>
        <span className="mt-[2px] block truncate text-[11px] font-bold text-ink-900">{value}</span>
      </span>
    </div>
  );
}

/** Tombol export standar (hijau solid) pada secondary bar. */
export function ExportButton({ label = "Export" }: { label?: string }) {
  /* Fitur export belum ada; tampilkan sebagai disabled jujur, bukan tombol hidup. */
  return (
    <button
      disabled
      aria-disabled="true"
      title="Segera hadir"
      className="flex cursor-not-allowed items-center gap-1.5 rounded-lg bg-ptpn-green px-3 py-[7px] text-[10px] font-semibold text-white opacity-60 shadow-pill"
    >
      <Download size={12} />
      {label}
    </button>
  );
}

/**
 * Header modul standar (pola Tipe A): baris utama ber-border dengan judul,
 * subtitle, kontrol kanan (ThemeToggle + notifikasi + avatar), lalu secondary
 * bar berisi timestamp data dan aksi (default: tombol Export).
 */
export function ModuleHeader({
  title,
  subtitle,
  icon,
  titleExtra,
  controls,
  dataAsOf,
  secondaryLeft,
  actions,
  showSecondary = true,
}: {
  title: ReactNode;
  subtitle: ReactNode;
  /** Icon lucide untuk badge 9x9 di kiri judul, mis. `<Scale size={19} strokeWidth={1.9} />`. */
  icon?: ReactNode;
  /** Elemen tambahan di samping judul, mis. tombol info metodologi. */
  titleExtra?: ReactNode;
  /** Kontrol spesifik modul (SelectBox, search, dsb.) sebelum ThemeToggle. */
  controls?: ReactNode;
  /** Teks "Data per ..." di kiri secondary bar. */
  dataAsOf?: string;
  /** Konten kustom kiri secondary bar; menggantikan `dataAsOf`. */
  secondaryLeft?: ReactNode;
  /** Aksi kanan secondary bar; default tombol Export standar. */
  actions?: ReactNode;
  showSecondary?: boolean;
}) {
  return (
    <>
      <header className="flex items-center gap-4 border-b border-[#eef2f6] px-5 pb-3.5 pt-3.5">
        <div className="flex min-w-0 shrink items-center gap-2.5">
          {icon && (
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#e8f1fd] text-[#1b3a6b]">
              {icon}
            </span>
          )}
          <div className="min-w-0">
            <div className="flex min-w-0 items-center gap-2">
              <h1 className="truncate text-[20px] font-extrabold leading-none tracking-[-0.01em] text-[#1b3a6b]">
                {title}
              </h1>
              {titleExtra}
            </div>
            <p className="mt-[5px] truncate text-[10.5px] font-semibold text-ink-500">{subtitle}</p>
          </div>
        </div>

        <div className="ml-auto flex min-w-0 shrink items-center gap-3">
          {controls}

          <ThemeToggle />
          <button
            className="relative shrink-0 text-ink-500 transition-colors hover:text-ptpn-green"
            aria-label="Notifikasi"
          >
            {/* -m/p memperluas area sentuh ke ≥24px tanpa menggeser layout */}
            <span className="-m-1.5 flex p-1.5">
              <Bell size={18} strokeWidth={1.7} />
            </span>
            <span className="absolute -right-[7px] -top-[6px] flex h-[15px] min-w-[15px] items-center justify-center rounded-full bg-[#ef4444] px-[3px] text-[9px] font-bold text-white">
              12
            </span>
          </button>

          <div className="flex shrink-0 items-center gap-2.5">
            {/* Foto resmi Dirut dari ptpn.id (dewan-direksi), disimpan lokal di public/. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/direktur-utama-avatar.png"
              alt="Denaldy Mulino Mauna"
              loading="lazy"
              decoding="async"
              width={36}
              height={36}
              className="shrink-0 rounded-full bg-slate-200 object-cover ring-2 ring-[#e6ecf2]"
              style={{ width: 36, height: 36 }}
            />
            {/* Identitas teks disembunyikan di bawah xl agar header tetap satu baris di tablet. */}
            <div className="hidden leading-tight xl:block">
              <div className="text-[11px] font-bold text-ink-900">Denaldy Mulino Mauna</div>
              <div className="text-[9.5px] text-ink-500">Direktur Utama</div>
            </div>
            <ChevronDown size={13} className="hidden text-ink-400 xl:block" />
          </div>
        </div>
      </header>

      {showSecondary && (
        <div className="flex items-center justify-between px-5 pb-3 pt-3">
          <div className="flex items-center gap-1.5 text-[10px] font-semibold text-ink-500">
            {secondaryLeft ??
              (dataAsOf ? (
                <>
                  <CalendarDays size={13} className="text-ink-400" />
                  {dataAsOf}
                </>
              ) : null)}
          </div>
          <div className="flex items-center gap-2.5">{actions ?? <ExportButton />}</div>
        </div>
      )}

      {/* Bilah cakupan muncul otomatis di seluruh modul saat filter subholding aktif. */}
      <div className="px-5">
        <ScopeBanner />
      </div>
    </>
  );
}
