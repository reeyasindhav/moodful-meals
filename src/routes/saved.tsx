import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import { AuthGate } from "@/components/auth-gate";
import { MealCard } from "@/components/meal-card";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { mealById, moodById, savedSeed } from "@/lib/moodmeal-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/saved")({
  head: () => ({
    meta: [
      { title: "Saved meals — Moodmeal" },
      {
        name: "description",
        content:
          "Everything you've saved, grouped by the mood you were in when you found it. Come back whenever you need it.",
      },
      { property: "og:title", content: "Saved meals — Moodmeal" },
      {
        property: "og:description",
        content: "Your saved restaurants and recipes, grouped by mood.",
      },
    ],
  }),
  component: () => (
    <AuthGate title="Sign in to see your saved meals">
      <Saved />
    </AuthGate>
  ),
});

function Saved() {
  const [items, setItems] = useState(savedSeed);
  const [filter, setFilter] = useState<string>("All");

  const moodsPresent = ["All", ...new Set(savedSeed.map((s) => s.mood))];
  const visible = items.filter((s) => filter === "All" || s.mood === filter);

  return (
    <>
      <section className="border-b border-border/70 bg-cream">
        <div className="mx-auto max-w-7xl px-5 py-14 lg:px-10 lg:py-20">
          <p className="eyebrow animate-fade-up">Saved</p>
          <h1 className="display-section animate-fade-up mt-4">
            Your <span className="accent-italic">keepers</span>
          </h1>
          <p className="animate-fade-up mt-4 max-w-md text-muted-foreground">
            {items.length} saved · grouped by the mood you were in.
          </p>

          <div className="mt-9 flex flex-wrap gap-2">
            {moodsPresent.map((m) => (
              <button
                key={m}
                onClick={() => setFilter(m)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm transition-colors",
                  filter === m
                    ? "bg-ink text-ink-foreground"
                    : "bg-card text-muted-foreground hover:text-foreground",
                )}
              >
                {m === "All" ? "All moods" : `${moodById(m)?.emoji} ${moodById(m)?.label}`}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          {visible.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-border bg-card p-14 text-center">
              <h2 className="text-3xl">Nothing here yet</h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Save a meal and it'll land right here.
              </p>
              <Button asChild className="mt-7 rounded-full">
                <Link to="/discover" search={{ mood: "cozy" }}>
                  Find something
                </Link>
              </Button>
            </div>
          ) : (
            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((s, i) => {
                const meal = mealById(s.mealId);
                if (!meal) return null;
                return (
                  <Reveal key={s.mealId} delay={i * 80}>
                    <div className="relative">
                      <MealCard meal={meal} saved />
                      <button
                        aria-label={`Remove ${meal.name}`}
                        onClick={() => {
                          setItems((prev) => prev.filter((x) => x.mealId !== s.mealId));
                          toast("Removed from saved", { description: meal.name });
                        }}
                        className="absolute top-3 right-14 flex h-9 w-9 items-center justify-center rounded-full bg-card/95 shadow-soft transition-transform hover:scale-110"
                      >
                        <Trash2 className="h-4 w-4 text-muted-foreground" />
                      </button>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
