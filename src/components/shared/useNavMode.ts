"use client";

import { useEffect, useState } from "react";

const KEY = "ecc-nav-mode";

export type NavMode = "ceo" | "fungsional" | "komisaris";

/**
 * Mode Komisaris disembunyikan dari UI (pintu masuk toggle) atas pertimbangan
 * adopsi: app ini alat direksi, tab pengawasan permanen bisa memicu resistensi.
 * Kode BOARD_NAV_SECTIONS dkk. tetap utuh — balikkan flag ini untuk mengaktifkan lagi.
 */
export const KOMISARIS_MODE_ENABLED = false;

/**
 * Mode CEO juga disembunyikan — tiga cara masuk dinilai membingungkan pengguna.
 * Kode CEO_NAV_SECTIONS, HomeViewSwitch, dan ModeNavBlock tetap utuh di balik flag ini.
 */
export const CEO_MODE_ENABLED = false;

/**
 * Mode navigasi sidebar utama — tiga perspektif membaca yang berbeda secara
 * fundamental: "ceo" (Act & Decide — what should I know), "fungsional"
 * (Analyze & Execute — what should I analyze), "komisaris" (Oversight &
 * Challenge — did management deliver). Dipersist di localStorage; render
 * awal selalu "fungsional" agar tidak hydration mismatch.
 */
export function useNavMode() {
  const [mode, setMode] = useState<NavMode>("fungsional");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (
        (saved === "ceo" && CEO_MODE_ENABLED) ||
        (saved === "komisaris" && KOMISARIS_MODE_ENABLED)
      )
        setMode(saved);
    } catch {}
  }, []);

  const set = (m: NavMode) => {
    setMode(m);
    try {
      localStorage.setItem(KEY, m);
    } catch {}
  };

  return { mode, set };
}
