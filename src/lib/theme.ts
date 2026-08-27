import { useSyncExternalStore } from "react";

const STORAGE_KEY = "moodmeal.theme";

const listeners = new Set<() => void>();

function getSystemPrefersDark(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
}

function readTheme(): boolean {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === "dark") return true;
    if (raw === "light") return false;
    return getSystemPrefersDark();
  } catch {
    return getSystemPrefersDark();
  }
}

function applyTheme(dark: boolean) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  if (dark) {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
}

function writeTheme(dark: boolean) {
  try {
    localStorage.setItem(STORAGE_KEY, dark ? "dark" : "light");
  } catch {
    /* ignore */
  }
  applyTheme(dark);
}

export const themeStore = {
  isDark: readTheme(),
  toggle(): void {
    const next = !readTheme();
    writeTheme(next);
    listeners.forEach((cb) => cb());
  },
  set(dark: boolean): void {
    writeTheme(dark);
    listeners.forEach((cb) => cb());
  },
  subscribe(cb: () => void): () => void {
    if (typeof window === "undefined") return () => {};
    listeners.add(cb);
    return () => listeners.delete(cb);
  },
  getSnapshot(): boolean {
    return typeof window === "undefined" ? false : readTheme();
  },
};

export function useTheme() {
  const dark = useSyncExternalStore(
    themeStore.subscribe,
    themeStore.getSnapshot,
    () => readTheme(),
  );
  return {
    dark,
    toggle: () => themeStore.toggle(),
    set: (v: boolean) => themeStore.set(v),
  };
}
