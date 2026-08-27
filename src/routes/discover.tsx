import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { fallback, zodValidator } from "@tanstack/zod-adapter";
import { z } from "zod";
import { useState } from "react";
import { SlidersHorizontal, UtensilsCrossed } from "lucide-react";
import { MealCard } from "@/components/meal-card";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { moodById, moods, meals, mealsForMood, type MoodId } from "@/lib/moodmeal-data";
import { cn } from "@/lib/utils";

const searchSchema = z.object({
  mood: fallback(z.string(), "cozy").default("cozy"),
});

export const Route = createFileRoute("/discover")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "Discover meals by mood — Moodmeal" },
      {
        name: "description",
        content:
          "Browse restaurant and recipe matches curated for your current mood, filtered by time, diet and price.",
      },
      { property: "og:title", content: "Discover meals by mood — Moodmeal" },
      {
        property: "og:description",
        content: "Curated restaurant and recipe matches for exactly how you feel right now.",
      },
    ],
  }),
  component: Discover,
});

const times = ["Any time", "Under 30 min", "Under 45 min"] as const;
const diets = ["All", "Vegetarian", "Protein"] as const;
const prices = ["All", "$", "$$", "$$$"] as const;
const kinds = ["Near me", "Recipes", "Everything"] as const;

function Discover() {
  const { mood } = Route.useSearch();
  const navigate = useNavigate();
  const activeMood = (moodById(mood)?.id ?? "cozy") as MoodId;

  const [time, setTime] = useState<(typeof times)[number]>("Any time");
  const [diet, setDiet] = useState<(typeof diets)[number]>("All");
  const [price, setPrice] = useState<(typeof prices)[number]>("All");
  const [kind, setKind] = useState<(typeof kinds)[number]>("Everything");

  const base = mealsForMood(activeMood);
  const pool = base.length ? base : meals;

  const results = pool.filter((m) => {
    if (time === "Under 30 min" && m.minutes >= 30) return false;
    if (time === "Under 45 min" && m.minutes >= 45) return false;
    if (diet !== "All" && !m.tags.includes(diet)) return false;
    if (price !== "All" && m.price !== price) return false;
    if (kind === "Near me" && m.type !== "restaurant") return false;
    if (kind === "Recipes" && m.type !== "recipe") return false;
    return true;
  });

  const detail = moodById(activeMood);

  return (
    <>
      <section className="border-b border-border/70 bg-cream">
        <div className="mx-auto max-w-7xl px-5 py-14 lg:px-10 lg:py-20">
          <p className="eyebrow animate-fade-up">Discover</p>
          <h1 className="display-section animate-fade-up mt-4 max-w-2xl">
            Feeling <span className="accent-italic">{detail?.label.toLowerCase()}</span> — here's
            where to eat
          </h1>
          <p className="animate-fade-up mt-5 max-w-lg text-muted-foreground">{detail?.blurb}</p>

          <div className="mt-9 flex flex-wrap gap-2">
            {moods.map((m) => (
              <button
                key={m.id}
                onClick={() => navigate({ to: "/discover", search: { mood: m.id } })}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm transition-all duration-300 hover:-translate-y-0.5",
                  m.id === activeMood
                    ? "border-primary bg-primary text-primary-foreground shadow-soft"
                    : "border-border bg-card text-muted-foreground hover:text-foreground",
                )}
              >
                <span className="mr-1.5">{m.emoji}</span>
                {m.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border/70 bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-6 px-5 py-5 lg:px-10">
          <span className="flex items-center gap-2 text-xs tracking-[0.16em] text-muted-foreground uppercase">
            <SlidersHorizontal className="h-3.5 w-3.5" /> Filters
          </span>
          <FilterRow label="Time" options={times} value={time} onChange={setTime} />
          <FilterRow label="Diet" options={diets} value={diet} onChange={setDiet} />
          <FilterRow label="Price" options={prices} value={price} onChange={setPrice} />
          <FilterRow label="Show" options={kinds} value={kind} onChange={setKind} />
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <p className="text-sm text-muted-foreground">
            {results.length} {results.length === 1 ? "match" : "matches"}
          </p>
          <div className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((m, i) => (
              <Reveal key={m.id} delay={i * 70}>
                <MealCard meal={m} />
              </Reveal>
            ))}
          </div>

          {results.length === 0 && (
            <div className="mt-10 rounded-2xl border border-dashed border-border bg-card p-12 text-center">
              <h2 className="text-2xl">Nothing fits those filters</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Loosen a filter or try a different mood.
              </p>
              <div className="mt-4">
                <p className="text-xs text-muted-foreground">
                  Based on the time of day, you might enjoy{" "}
                  <span className="font-medium text-primary">{timeSuggestion()}</span>
                </p>
              </div>
              <Button
                variant="outline"
                className="mt-6 rounded-full"
                onClick={() => {
                  setTime("Any time");
                  setDiet("All");
                  setPrice("All");
                  setKind("Everything");
                }}
              >
                Reset filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function timeSuggestion(): string {
  const hour = new Date().getHours();
  const id =
    hour >= 5 && hour < 11
      ? "energized"
      : hour >= 11 && hour < 14
        ? "focused"
        : hour >= 14 && hour < 17
          ? "adventurous"
          : hour >= 17 && hour < 20
            ? "celebratory"
            : "cozy";
  return moodById(id)?.label ?? "Cozy";
}

function FilterRow<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted-foreground">{label}</span>
      <div className="flex gap-1.5">
        {options.map((o) => (
          <button
            key={o}
            onClick={() => onChange(o)}
            className={cn(
              "rounded-full px-3 py-1.5 text-xs transition-colors",
              value === o
                ? "bg-ink text-ink-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/70",
            )}
          >
            {(o === "All" || o === "Everything") && (
              <UtensilsCrossed className="mr-1.5 inline h-3.5 w-3.5" />
            )}
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}
