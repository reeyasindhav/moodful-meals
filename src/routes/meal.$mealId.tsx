import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Clock, Heart, MapPin, Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { MealCard } from "@/components/meal-card";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { mealById, meals, moodById } from "@/lib/moodmeal-data";

export const Route = createFileRoute("/meal/$mealId")({
  loader: ({ params }) => {
    const meal = mealById(params.mealId);
    if (!meal) throw notFound();
    return { meal };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Meal not found — Moodmeal" }, { name: "robots", content: "noindex" }],
      };
    }
    const { meal } = loaderData;
    return {
      meta: [
        { title: `${meal.name} — Moodmeal` },
        { name: "description", content: meal.why },
        { property: "og:title", content: `${meal.name} — Moodmeal` },
        { property: "og:description", content: meal.why },
        { property: "og:image", content: meal.image },
        { name: "twitter:image", content: meal.image },
      ],
    };
  },
  component: MealDetail,
  notFoundComponent: MealMissing,
});

function MealMissing() {
  return (
    <div className="mx-auto max-w-xl px-5 py-28 text-center">
      <h1 className="display-section">We lost that plate</h1>
      <p className="mt-4 text-muted-foreground">This meal isn't on the menu anymore.</p>
      <Button asChild className="mt-8 rounded-full">
        <Link to="/discover" search={{ mood: "cozy" }}>
          Back to discover
        </Link>
      </Button>
    </div>
  );
}

function MealDetail() {
  const { meal } = Route.useLoaderData();
  const { user } = useAuth();
  const [saved, setSaved] = useState(false);
  const related = meals.filter((m) => m.id !== meal.id && m.moods[0] === meal.moods[0]).slice(0, 3);

  return (
    <>
      <section className="border-b border-border/70 bg-cream">
        <div className="mx-auto max-w-7xl px-5 py-10 lg:px-10">
          <Link
            to="/discover"
            search={{ mood: meal.moods[0]! }}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Back to matches
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="animate-fade-up">
              <p className="eyebrow">
                {meal.type === "recipe" ? "Recipe" : "Restaurant"} · {meal.match}% match
              </p>
              <h1 className="display-section mt-4">{meal.name}</h1>
              <p className="mt-4 text-muted-foreground">
                {meal.place} · {meal.neighborhood}
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  {meal.rating}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {meal.minutes} min
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" />
                  {meal.distance}
                </span>
                <span>{meal.price}</span>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                {user ? (
                  <Button
                    size="lg"
                    className="rounded-full"
                    onClick={() => {
                      setSaved((v) => !v);
                      toast(saved ? "Removed from saved" : "Saved for later", {
                        description: meal.name,
                      });
                    }}
                  >
                    <Heart className={saved ? "mr-1.5 h-4 w-4 fill-current" : "mr-1.5 h-4 w-4"} />
                    {saved ? "Saved" : "Save this"}
                  </Button>
                ) : (
                  <Button asChild size="lg" className="rounded-full">
                    <Link to="/login">Sign in to save</Link>
                  </Button>
                )}
                <Button asChild size="lg" variant="outline" className="rounded-full">
                  <Link to="/discover" search={{ mood: meal.moods[0]! }}>
                    More like this
                  </Link>
                </Button>
              </div>
            </div>

            <div className="animate-fade-up overflow-hidden rounded-3xl shadow-lift [animation-delay:120ms]">
              <img
                src={meal.image}
                alt={meal.name}
                className="aspect-[4/3] w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-3 lg:px-10">
          <Reveal className="rounded-3xl bg-blush/60 p-8">
            <p className="eyebrow">Why it matches</p>
            <p className="mt-4 text-xl leading-snug">{meal.why}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {meal.moods.map((m) => (
                <span key={m} className="rounded-full bg-card px-3 py-1 text-xs">
                  {moodById(m)?.emoji} {moodById(m)?.label}
                </span>
              ))}
              {meal.tags.map((t) => (
                <span key={t} className="rounded-full bg-card/60 px-3 py-1 text-xs">
                  {t}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={80}>
            <p className="eyebrow">
              {meal.type === "recipe" ? "What you'll need" : "What's in it"}
            </p>
            <ul className="mt-5 space-y-3 text-sm">
              {meal.ingredients.map((i) => (
                <li key={i} className="flex gap-3 border-b border-border/70 pb-3">
                  <span className="text-primary">—</span>
                  {i}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={160}>
            <p className="eyebrow">How it comes together</p>
            <ol className="mt-5 space-y-5 text-sm">
              {meal.steps.map((s, i) => (
                <li key={s} className="flex gap-4">
                  <span className="font-display text-2xl leading-none text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-muted-foreground">{s}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-cream py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-10">
            <h2 className="display-section">In the same mood</h2>
            <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((m, i) => (
                <Reveal key={m.id} delay={i * 80}>
                  <MealCard meal={m} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
