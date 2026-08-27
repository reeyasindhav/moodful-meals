import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { moods } from "@/lib/moodmeal-data";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How Moodmeal works — mood to meal in 3 steps" },
      {
        name: "description",
        content:
          "Name the feeling, get matched, eat well. See how Moodmeal turns your mood into curated restaurant and recipe picks.",
      },
      { property: "og:title", content: "How Moodmeal works" },
      {
        property: "og:description",
        content: "Name the feeling, get matched, eat well — emotion-first food discovery.",
      },
    ],
  }),
  component: HowItWorks,
});

const steps = [
  {
    n: "01",
    title: "Name the feeling",
    body: "Six moods, no long questionnaire. Pick the one that's closest and we take it from there.",
    tint: "bg-blush/60",
  },
  {
    n: "02",
    title: "We translate it",
    body: "Each mood maps to textures, temperatures and pacing — brothy and slow, or bright and crunchy.",
    tint: "bg-mint/60",
  },
  {
    n: "03",
    title: "Meet the shortlist",
    body: "A handful of matches — never hundreds. Restaurants nearby, or recipes you can start tonight.",
    tint: "bg-butter/60",
  },
];

export default function _unused() {
  return null;
}

function HowItWorks() {
  return (
    <>
      <section className="border-b border-border/70 bg-background">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
          <p className="eyebrow animate-fade-up">How it works</p>
          <h1 className="display-hero animate-fade-up mt-6 max-w-3xl">
            Mood in. <span className="accent-italic">Dinner</span> out.
          </h1>
          <p className="animate-fade-up mt-6 max-w-md text-muted-foreground">
            Moodmeal starts with the question every other app skips: how are you actually doing
            right now?
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 md:grid-cols-3 lg:px-10">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 110}>
              <div className={`card-lift h-full rounded-3xl ${s.tint} p-8`}>
                <span className="font-display text-5xl leading-none text-primary">{s.n}</span>
                <h2 className="mt-6 text-3xl leading-tight">{s.title}</h2>
                <p className="mt-4 text-sm text-muted-foreground">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-cream py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <Reveal>
            <h2 className="display-section max-w-xl">What each mood tastes like</h2>
          </Reveal>
          <div className="mt-12 divide-y divide-border/70">
            {moods.map((m, i) => (
              <Reveal key={m.id} delay={i * 60}>
                <div className="grid gap-4 py-7 md:grid-cols-[auto_1fr_1fr] md:items-center md:gap-10">
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-full text-xl ${m.swatch}`}
                  >
                    {m.emoji}
                  </span>
                  <div>
                    <h3 className="text-2xl leading-none">{m.label}</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">{m.blurb}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {m.cravings.map((c) => (
                      <span key={c} className="rounded-full bg-card px-3 py-1 text-xs shadow-soft">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-14">
            <Button asChild size="lg" className="rounded-full">
              <Link to="/discover" search={{ mood: "cozy" }}>
                Try it now
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
