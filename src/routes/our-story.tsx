import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/our-story")({
  head: () => ({
    meta: [
      { title: "Our story — the team behind Moodmeal" },
      {
        name: "description",
        content:
          "Moodmeal began with a simple frustration: 400 listings and still no idea what to eat. Here's why we build for feelings first.",
      },
      { property: "og:title", content: "Our story — Moodmeal" },
      {
        property: "og:description",
        content: "Why we built an emotion-first food discovery platform.",
      },
    ],
  }),
  component: OurStory,
});

const values = [
  { title: "Fewer options, better ones", body: "A shortlist you can trust beats an endless feed." },
  { title: "Feelings are data", body: "How you feel shapes what will actually satisfy you." },
  { title: "Local first", body: "Small rooms and neighbourhood kitchens over chains." },
];

const team = [
  { name: "Ada Moreau", role: "Design", initials: "AM", tint: "bg-blush" },
  { name: "Ravi Shah", role: "Engineering", initials: "RS", tint: "bg-mint" },
  { name: "Lena Ortiz", role: "Food editorial", initials: "LO", tint: "bg-butter" },
  { name: "Kofi Mensah", role: "Community", initials: "KM", tint: "bg-lilac" },
];

function OurStory() {
  return (
    <>
      <section className="border-b border-border/70 bg-cream">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
          <p className="eyebrow animate-fade-up">Our story</p>
          <h1 className="display-hero animate-fade-up mt-6 max-w-3xl">
            We were tired of <span className="accent-italic">scrolling</span> hungry.
          </h1>
          <p className="animate-fade-up mt-8 max-w-xl text-lg text-muted-foreground">
            Four hundred listings, twenty minutes, and still nothing that felt right. The problem
            was never the number of restaurants — it was that nobody asked how we were doing.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-2 lg:px-10">
          <Reveal>
            <img
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80"
              alt="A small neighbourhood restaurant at dusk"
              loading="lazy"
              className="aspect-[4/5] w-full rounded-3xl object-cover shadow-lift"
            />
          </Reveal>
          <Reveal delay={100} className="self-center">
            <h2 className="display-section">Built around a feeling, not a filter</h2>
            <p className="mt-6 text-muted-foreground">
              Moodmeal started as a shared note between four friends: what do we eat when we're
              wired, or flat, or celebrating something small? Those notes turned into mood profiles,
              and the profiles turned into a product.
            </p>
            <p className="mt-4 text-muted-foreground">
              Today Moodmeal maps six moods to textures, temperatures and pacing — then matches them
              to real kitchens and recipes. No accounts required to start, no infinite feed to get
              lost in.
            </p>
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {[
                ["6", "moods mapped"],
                ["120+", "curated kitchens"],
                ["8s", "average to decide"],
              ].map(([n, l]) => (
                <div key={l}>
                  <p className="font-display text-4xl leading-none text-primary">{n}</p>
                  <p className="mt-2 text-xs tracking-wide text-muted-foreground uppercase">{l}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-ink py-16 text-ink-foreground lg:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <h2 className="display-section">What we believe</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 100}>
                <div className="border-t border-ink-foreground/20 pt-6">
                  <h3 className="text-2xl leading-tight">{v.title}</h3>
                  <p className="mt-3 text-sm text-ink-foreground/70">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <h2 className="display-section">The people</h2>
          <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((t, i) => (
              <Reveal key={t.name} delay={i * 80}>
                <div className="card-lift rounded-3xl border border-border/70 bg-card p-7 text-center shadow-soft">
                  <span
                    className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full text-lg font-semibold ${t.tint}`}
                  >
                    {t.initials}
                  </span>
                  <h3 className="mt-5 text-xl leading-none">{t.name}</h3>
                  <p className="mt-2 text-xs tracking-wide text-muted-foreground uppercase">
                    {t.role}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-16 rounded-3xl bg-lilac/70 p-10 text-center">
            <h2 className="display-section">Come eat with us</h2>
            <p className="mx-auto mt-4 max-w-md text-sm text-lilac-foreground/70">
              Start with a mood. We'll handle the rest.
            </p>
            <Button asChild size="lg" className="mt-8 rounded-full">
              <Link to="/signup">Create your mood profile</Link>
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
