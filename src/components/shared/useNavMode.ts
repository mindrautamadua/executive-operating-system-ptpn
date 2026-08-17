"use client";

import { useEffect, useState } from "react";

const KEY = "ecc-nav-mode";

export type NavMode = "ceo" | "fungsional" | "komisaris";

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
      if (saved === "ceo" || saved === "komisaris") setMode(saved);
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
