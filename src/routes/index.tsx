import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Compass, CornerDownRight } from "lucide-react";
import { MoodPicker } from "@/components/mood-picker";
import { MealCard } from "@/components/meal-card";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { mealsForMood, moods, restaurants } from "@/lib/moodmeal-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Moodmeal — Eat based on your mood" },
      {
        name: "description",
        content:
          "Tell Moodmeal how you feel and get curated restaurant and recipe picks in seconds. Emotion-first food discovery, no endless scrolling.",
      },
      { property: "og:title", content: "Moodmeal — Eat based on your mood" },
      {
        property: "og:description",
        content:
          "Emotion-first food discovery: name the feeling, meet the meal. Curated restaurants and recipes for how you feel right now.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const cozy = mealsForMood("cozy").slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/70 bg-background">
        <div className="pointer-events-none absolute -top-32 -right-24 h-[30rem] w-[30rem] rounded-full bg-lilac/50 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:py-28">
          <div className="animate-fade-up">
            <p className="eyebrow">A better way to decide</p>
            <h1 className="display-hero mt-6">
              What are you <br />
              <span className="accent-italic">feeling</span> like?
            </h1>
            <p className="mt-6 max-w-sm text-base text-muted-foreground">
              Tell us your mood. We'll find the meal that meets you there — from a bowl down the
              block to a recipe already in your kitchen.
            </p>

            <div className="mt-10 flex items-start gap-3 pl-2 text-sm text-muted-foreground">
              <CornerDownRight className="mt-0.5 h-4 w-4 text-primary" />
              <span>
                No endless scrolling.
                <br />
                Just the right thing.
              </span>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild size="lg" variant="outline" className="rounded-full">
                <Link to="/how-it-works">How it works</Link>
              </Button>
              <Button asChild size="lg" variant="ghost" className="rounded-full">
                <Link to="/discover" search={{ mood: "adventurous" }}>
                  Surprise me
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="animate-fade-up [animation-delay:150ms]">
            <MoodPicker />
          </div>
        </div>
      </section>

      {/* Curated picks */}
      <section className="bg-cream py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="eyebrow">Your mood, plated</p>
                <h2 className="display-section mt-5">
                  Good things for feeling <span className="accent-italic">cozy</span>
                </h2>
                <p className="mt-3 text-sm text-muted-foreground">
                  A few handpicked ideas to meet your slow &amp; warm energy.
                </p>
              </div>
              <Link
                to="/discover"
                search={{ mood: "cozy" }}
                className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                <Compass className="h-4 w-4" />
                Explore all matches
              </Link>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {cozy.map((meal, i) => (
              <Reveal key={meal.id} delay={i * 110}>
                <MealCard meal={meal} />
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12 text-center">
            <Link
              to="/discover"
              search={{ mood: "cozy" }}
              className="inline-flex items-center gap-2 text-sm font-medium text-primary"
            >
              Show me more
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Moods strip */}
      <section className="border-y border-border/70 bg-background py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <Reveal>
            <p className="eyebrow">Six feelings to start</p>
            <h2 className="display-section mt-5 max-w-2xl">
              Because appetite is an <span className="accent-italic">emotion</span>, not a filter.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {moods.map((mood, i) => (
              <Reveal key={mood.id} delay={i * 80}>
                <Link
                  to="/discover"
                  search={{ mood: mood.id }}
                  className="card-lift flex h-full flex-col rounded-2xl border border-border/70 bg-card p-6 shadow-soft"
                >
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-full text-lg ${mood.swatch}`}
                  >
                    {mood.emoji}
                  </span>
                  <h3 className="mt-5 text-2xl">{mood.label}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{mood.blurb}</p>
                  <span className="mt-5 flex items-center gap-1.5 text-xs font-medium text-primary">
                    See matches <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="bg-cream py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 lg:grid-cols-2 lg:px-10">
          <Reveal className="relative flex justify-center">
            <div className="absolute h-72 w-72 rounded-full bg-lilac/60 blur-2xl" />
            <div className="animate-float relative w-64 rounded-2xl border border-border/70 bg-card p-6 shadow-lift">
              <span className="text-primary">✦</span>
              <p className="mt-4 text-xs text-muted-foreground">Comforted</p>
              <h3 className="mt-1 text-2xl leading-tight">Tomato soup &amp; grilled cheese</h3>
              <span className="mt-5 inline-block rounded-full bg-mint px-3 py-1 text-xs font-medium text-foreground">
                98% mood match
              </span>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <p className="eyebrow">The moodmeal way</p>
            <h2 className="display-section mt-5">
              Because food is more than a <span className="accent-italic">filter</span>.
            </h2>
            <p className="mt-5 max-w-lg text-muted-foreground">
              We believe the best meal isn't always the one with the most stars. It's the one that
              fits this exact moment — your energy, your appetite, your little corner of the day.
            </p>
            <div className="mt-10 grid gap-8 sm:grid-cols-3">
              {[
                {
                  n: "01",
                  t: "Name the feeling",
                  d: "Start with where you are, not what you want.",
                },
                {
                  n: "02",
                  t: "Meet your match",
                  d: "We connect the dots to something delicious.",
                },
                { n: "03", t: "Make it yours", d: "Save, swap, or discover a new favourite." },
              ].map((s) => (
                <div key={s.n} className="border-t border-border pt-4">
                  <p className="text-xs text-primary">{s.n}</p>
                  <p className="mt-2 text-sm font-semibold">{s.t}</p>
                  <p className="mt-1.5 text-xs text-muted-foreground">{s.d}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Places */}
      <section className="border-t border-border/70 bg-background py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <Reveal>
            <p className="eyebrow">Rooms we love</p>
            <h2 className="display-section mt-5">Places with a feeling attached</h2>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {restaurants.map((r, i) => (
              <Reveal key={r.id} delay={i * 90}>
                <div className="card-lift group overflow-hidden rounded-2xl border border-border/70 bg-card shadow-soft">
                  <div className="aspect-[5/4] overflow-hidden">
                    <img
                      src={r.image}
                      alt={r.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-xs text-muted-foreground">
                      {r.cuisine} · {r.neighborhood}
                    </p>
                    <h3 className="mt-1 text-xl">{r.name}</h3>
                    <p className="mt-2 text-xs text-muted-foreground">{r.note}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink py-24 text-ink-foreground">
        <Reveal className="mx-auto max-w-2xl px-5 text-center">
          <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-primary">
            Ready when you are
          </p>
          <h2 className="display-section mt-5 text-ink-foreground">
            Stop scrolling. Start <span className="accent-italic">feeling</span>.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-ink-foreground/65">
            Create a free account to save meals, track your moods and get better matches every week.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="rounded-full">
              <Link to="/signup">Create free account</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-ink-foreground/25 bg-transparent text-ink-foreground hover:bg-ink-foreground/10"
            >
              <Link to="/discover" search={{ mood: "cozy" }}>
                Try it first
              </Link>
            </Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}
