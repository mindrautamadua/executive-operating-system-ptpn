"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

/**
 * Bingkai responsif untuk sidebar: di ≥lg sidebar tampil statis seperti biasa;
 * di bawah lg sidebar menjadi drawer overlay dengan tombol hamburger mengambang.
 * Escape dan klik backdrop menutup; navigasi (ganti rute) juga menutup.
 */
export function MobileSidebarFrame({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // tutup drawer saat pindah halaman
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Buka menu navigasi"
        aria-expanded={open}
        className="fixed bottom-4 left-4 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-[#e3e9ef] bg-white text-ink-700 shadow-cardHover lg:hidden"
      >
        <Menu size={18} strokeWidth={1.9} />
      </button>

      {open && (
        <div
          aria-hidden
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-[#0f1b2d]/45 lg:hidden"
        />
      )}

      <div
        className={`fixed inset-y-0 left-0 z-50 h-full transition-transform duration-200 motion-reduce:transition-none lg:static lg:z-auto lg:shrink-0 lg:translate-x-0 lg:transition-none ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {children}
      </div>
    </>
  );
}
