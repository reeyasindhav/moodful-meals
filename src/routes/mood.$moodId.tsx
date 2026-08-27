import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { mealsForMood, moodById, moods } from "@/lib/moodmeal-data";
import { MealCard } from "@/components/meal-card";

export const Route = createFileRoute("/mood/$moodId")({
  head: ({ loaderData }) => {
    const mood = loaderData?.mood;
    if (!mood) {
      return {
        meta: [{ title: "Mood not found — Moodmeal" }],
      };
    }
    return {
      meta: [
        { title: `${mood.label} — Moodmeal` },
        { name: "description", content: mood.blurb },
      ],
    };
  },
  loader: ({ params }) => {
    const mood = moodById(params.moodId);
    if (!mood) throw notFound();
    return { mood };
  },
  component: MoodDetail,
});

function MoodDetail() {
  const { mood } = Route.useLoaderData();
  const picks = mealsForMood(mood.id);

  return (
    <div className="min-h-screen bg-background">
      <section className="border-b border-border/70 bg-cream">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-10 lg:py-24">
          <Reveal>
            <Link
              to="/discover"
              search={{ mood: mood.id }}
              className="text-xs text-muted-foreground transition-colors hover:text-primary"
            >
              ← Back to discover
            </Link>
            <div className="mt-8 flex items-start gap-5">
              <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary text-3xl">
                {mood.emoji}
              </span>
              <div>
                <p className="eyebrow">Mood</p>
                <h1 className="display-section mt-3">{mood.label}</h1>
                <p className="mt-2 text-sm text-muted-foreground">{mood.blurb}</p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {mood.cravings.map((c) => (
                <span
                  key={c}
                  className="rounded-full bg-card px-3.5 py-1.5 text-xs text-muted-foreground shadow-soft"
                >
                  {c}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <Reveal>
            <div className="flex items-end justify-between gap-6">
              <div>
                <p className="eyebrow">Curated for you</p>
                <h2 className="display-section mt-5 text-2xl sm:text-3xl">
                  When you feel <span className="accent-italic">{mood.label.toLowerCase()}</span>
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {picks.length} {picks.length === 1 ? "match" : "matches"} for this mood
                </p>
              </div>
              <Button asChild className="rounded-full">
                <Link to="/discover" search={{ mood: mood.id }}>
                  See all matches
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {picks.map((m, i) => (
              <Reveal key={m.id} delay={i * 80}>
                <MealCard meal={m} mood={mood.id} />
              </Reveal>
            ))}
          </div>

          {picks.length === 0 && (
            <Reveal>
              <div className="mt-10 rounded-2xl border border-dashed border-border/70 bg-card p-10 text-center">
                <p className="text-sm text-muted-foreground">
                  No matches yet for this mood. Try switching to a different mood.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  {moods.map((m) => (
                    <Link
                      key={m.id}
                      to={`/mood/${m.id}`}
                      className="rounded-full border border-border/70 bg-card px-4 py-2 text-sm transition-colors hover:border-primary"
                    >
                      {m.emoji} {m.label}
                    </Link>
                  ))}
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </section>
    </div>
  );
}
