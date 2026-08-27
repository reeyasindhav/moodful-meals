import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { journal, moodById } from "@/lib/moodmeal-data";

export const Route = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { title: "The Moodmeal Journal — food, feelings, appetite" },
      {
        name: "description",
        content:
          "Essays on comfort food, focus meals and the science of appetite from the Moodmeal editorial team.",
      },
      { property: "og:title", content: "The Moodmeal Journal" },
      {
        property: "og:description",
        content: "Essays on comfort food, focus meals and the science of appetite.",
      },
    ],
  }),
  component: Journal,
});

function Journal() {
  const [lead, ...rest] = journal;

  return (
    <>
      <section className="border-b border-border/70 bg-background">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-24">
          <p className="eyebrow animate-fade-up">Journal</p>
          <h1 className="display-hero animate-fade-up mt-6 max-w-2xl">
            Notes on <span className="accent-italic">appetite</span>
          </h1>
        </div>
      </section>

      {lead && (
        <section className="bg-cream py-16 lg:py-20">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 lg:grid-cols-2 lg:px-10">
            <Reveal>
              <img
                src={lead.image}
                alt={lead.title}
                loading="lazy"
                className="aspect-[4/3] w-full rounded-3xl object-cover shadow-lift"
              />
            </Reveal>
            <Reveal delay={100}>
              <p className="eyebrow">
                Featured · {moodById(lead.mood)?.label} · {lead.read}
              </p>
              <h2 className="display-section mt-5">{lead.title}</h2>
              <p className="mt-5 text-muted-foreground">{lead.excerpt}</p>
              <Link
                to="/discover"
                search={{ mood: lead.mood }}
                className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-primary"
              >
                Eat this mood <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </section>
      )}

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((a, i) => (
              <Reveal key={a.id} delay={i * 90}>
                <article className="card-lift overflow-hidden rounded-3xl border border-border/70 bg-card shadow-soft">
                  <img
                    src={a.image}
                    alt={a.title}
                    loading="lazy"
                    className="aspect-[3/2] w-full object-cover"
                  />
                  <div className="p-7">
                    <p className="text-xs text-muted-foreground">
                      {moodById(a.mood)?.label} · {a.read}
                    </p>
                    <h3 className="mt-2 text-2xl leading-tight">{a.title}</h3>
                    <p className="mt-3 text-sm text-muted-foreground">{a.excerpt}</p>
                    <Link
                      to="/discover"
                      search={{ mood: a.mood }}
                      className="mt-5 inline-flex items-center gap-1.5 text-sm text-primary"
                    >
                      Matching meals <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
