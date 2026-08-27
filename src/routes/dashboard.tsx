import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";
import { AuthGate } from "@/components/auth-gate";
import { MealCard } from "@/components/meal-card";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import {
  mealById,
  mealsForMood,
  moodById,
  moodHistory,
  moods,
  savedSeed,
  type MoodId,
} from "@/lib/moodmeal-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Your dashboard — Moodmeal" },
      {
        name: "description",
        content:
          "Check in with today's mood, review your week of mood history and jump back into your latest matches.",
      },
      { property: "og:title", content: "Your dashboard — Moodmeal" },
      {
        property: "og:description",
        content: "Today's mood check-in, your week in moods, and your latest matches.",
      },
    ],
  }),
  component: () => (
    <AuthGate title="Your dashboard is behind a quick sign-in">
      <Dashboard />
    </AuthGate>
  ),
});

function Dashboard() {
  const { user } = useAuth();
  const [today, setToday] = useState<MoodId>("cozy");
  const picks = mealsForMood(today).slice(0, 3);
  const best = Math.max(...moodHistory.map((h) => h.score));

  return (
    <>
      <section className="border-b border-border/70 bg-cream">
        <div className="mx-auto max-w-7xl px-5 py-14 lg:px-10 lg:py-16">
          <p className="eyebrow animate-fade-up">Dashboard</p>
          <h1 className="display-section animate-fade-up mt-4">
            Hello, <span className="accent-italic">{user?.name.split(" ")[0]}</span>
          </h1>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              ["Meals saved", String(savedSeed.length)],
              ["Check-ins this week", String(moodHistory.length)],
              ["Best match", `${best}%`],
            ].map(([label, value], i) => (
              <Reveal key={label} delay={i * 90}>
                <div className="rounded-2xl border border-border/70 bg-card p-6 shadow-soft">
                  <p className="text-xs tracking-wide text-muted-foreground uppercase">{label}</p>
                  <p className="font-display mt-3 text-4xl leading-none">{value}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
          <Reveal>
            <div className="rounded-3xl bg-butter/60 p-8">
              <h2 className="text-3xl leading-tight">How are you today?</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Check in and we'll refresh your picks below.
              </p>
              <div className="mt-6 grid gap-2 sm:grid-cols-2">
                {moods.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => {
                      setToday(m.id);
                      toast(`Checked in as ${m.label.toLowerCase()}`, {
                        description: m.tagline,
                      });
                    }}
                    className={cn(
                      "flex items-center gap-2.5 rounded-xl border bg-card/70 p-3 text-left text-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-card",
                      today === m.id ? "border-primary shadow-soft" : "border-transparent",
                    )}
                  >
                    <span>{m.emoji}</span>
                    {m.label}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={110}>
            <h2 className="display-section text-4xl!">Your week in moods</h2>
            <div className="mt-8 flex items-end gap-3">
              {moodHistory.map((h) => (
                <div key={h.day} className="flex flex-1 flex-col items-center gap-2">
                  <span className="text-xs text-muted-foreground">{h.score}</span>
                  <div
                    className="w-full rounded-t-lg bg-primary/80 transition-all duration-700"
                    style={{ height: `${h.score * 1.7}px` }}
                  />
                  <span className="text-lg">{moodById(h.mood)?.emoji}</span>
                  <span className="text-xs text-muted-foreground">{h.day}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="display-section">Today's picks</h2>
            <Button asChild variant="outline" className="rounded-full">
              <Link to="/discover" search={{ mood: today }}>
                See all matches <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {picks.map((m, i) => (
              <Reveal key={m.id} delay={i * 80}>
                <MealCard meal={m} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <h2 className="display-section">Recently saved</h2>
          <div className="mt-8 divide-y divide-border/70">
            {savedSeed.map((s) => {
              const meal = mealById(s.mealId);
              if (!meal) return null;
              return (
                <Link
                  key={s.mealId}
                  to="/meal/$mealId"
                  params={{ mealId: meal.id }}
                  className="flex items-center gap-5 py-4 transition-colors hover:bg-cream/60"
                >
                  <img
                    src={meal.image}
                    alt={meal.name}
                    loading="lazy"
                    className="h-14 w-14 rounded-xl object-cover"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-lg leading-tight">{meal.name}</span>
                    <span className="block text-xs text-muted-foreground">
                      {meal.place} · saved {s.savedAt}
                    </span>
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {moodById(s.mood)?.emoji} {moodById(s.mood)?.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
