import { useSyncExternalStore } from "react";
import type { SavedItem, MoodId } from "@/lib/moodmeal-data";
import type { Meal } from "@/lib/moodmeal-data";

const STORAGE_KEY = "moodmeal.saved";

function read(): SavedItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as SavedItem[]) : [];
  } catch {
    return [];
  }
}

function write(items: SavedItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    /* ignore */
  }
}

let cached: SavedItem[] = [];
const listeners = new Set<() => void>();

function emit() {
  const next = read();
  if (next !== cached) {
    cached = next;
    listeners.forEach((cb) => cb());
  }
}

export const savedStore = {
  getSnapshot(): SavedItem[] {
    return typeof window === "undefined" ? [] : cached;
  },
  subscribe(cb: () => void): () => void {
    if (typeof window === "undefined") return () => {};
    listeners.add(cb);
    return () => listeners.delete(cb);
  },
  add(meal: Meal, mood: MoodId): void {
    const current = read();
    if (current.some((i) => i.mealId === meal.id)) return;
    const item: SavedItem = { mealId: meal.id, savedAt: "just now", mood };
    const next = [item, ...current];
    write(next);
    cached = next;
    listeners.forEach((cb) => cb());
  },
  remove(mealId: string): void {
    const next = read().filter((i) => i.mealId !== mealId);
    write(next);
    cached = next;
    listeners.forEach((cb) => cb());
  },
  has(mealId: string): boolean {
    return read().some((i) => i.mealId === mealId);
  },
  all(): SavedItem[] {
    return read();
  },
  hydrate(): void {
    if (typeof window === "undefined") return;
    emit();
  },
};

export function useSaved() {
  const items = useSyncExternalStore(
    savedStore.subscribe,
    savedStore.getSnapshot,
    () => [],
  );
  return {
    items,
    add: (meal: Meal, mood: MoodId = meal.moods[0] ?? ("cozy" as MoodId)) =>
      savedStore.add(meal, mood),
    remove: (mealId: string) => savedStore.remove(mealId),
    has: (mealId: string) => savedStore.has(mealId),
    count: items.length,
  };
}

export function useIsSaved(mealId: string) {
  return useSyncExternalStore(
    savedStore.subscribe,
    () => savedStore.has(mealId),
    () => false,
  );
}
