import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Check } from "lucide-react";
import { AuthGate } from "@/components/auth-gate";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/lib/auth";
import { moods, type MoodId } from "@/lib/moodmeal-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Mood profile & preferences — Moodmeal" },
      {
        name: "description",
        content:
          "Tune your default moods, dietary preferences and distance so every Moodmeal match lands closer.",
      },
      { property: "og:title", content: "Mood profile & preferences — Moodmeal" },
      {
        property: "og:description",
        content: "Tune your default moods, diet and distance for sharper matches.",
      },
    ],
  }),
  component: () => (
    <AuthGate title="Sign in to tune your mood profile">
      <Profile />
    </AuthGate>
  ),
});

const dietOptions = ["Vegetarian", "Pescatarian", "Gluten-free", "Dairy-light", "No restrictions"];

function Profile() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name ?? "");
  const [city, setCity] = useState(user?.city ?? "");
  const [favourites, setFavourites] = useState<MoodId[]>(["cozy", "focused"]);
  const [diet, setDiet] = useState<string[]>(["Vegetarian"]);
  const [radius, setRadius] = useState(2);
  const [weekly, setWeekly] = useState(true);
  const [nudges, setNudges] = useState(false);

  const toggle = <T,>(list: T[], v: T, set: (x: T[]) => void) =>
    set(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

  return (
    <>
      <section className="border-b border-border/70 bg-cream">
        <div className="mx-auto max-w-7xl px-5 py-14 lg:px-10 lg:py-20">
          <p className="eyebrow animate-fade-up">Mood profile</p>
          <h1 className="display-section animate-fade-up mt-4">
            Make the matches <span className="accent-italic">yours</span>
          </h1>
        </div>
      </section>

      <section className="py-14 lg:py-20">
        <form
          className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[1fr_1fr] lg:px-10"
          onSubmit={(e) => {
            e.preventDefault();
            toast.success("Preferences saved");
          }}
        >
          <Reveal className="space-y-8">
            <div className="space-y-5 rounded-3xl border border-border/70 bg-card p-8 shadow-soft">
              <h2 className="text-2xl leading-none">Details</h2>
              <div className="space-y-2">
                <Label htmlFor="pname">Name</Label>
                <Input
                  id="pname"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pemail">Email</Label>
                <Input id="pemail" value={user?.email ?? ""} readOnly className="rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pcity">City</Label>
                <Input
                  id="pcity"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-5 rounded-3xl bg-mint/60 p-8">
              <h2 className="text-2xl leading-none">How far will you go?</h2>
              <input
                type="range"
                min={1}
                max={10}
                value={radius}
                onChange={(e) => setRadius(Number(e.target.value))}
                className="w-full accent-primary"
              />
              <p className="text-sm text-muted-foreground">Within {radius} miles</p>
            </div>
          </Reveal>

          <Reveal delay={110} className="space-y-8">
            <div className="rounded-3xl bg-blush/60 p-8">
              <h2 className="text-2xl leading-none">Default moods</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                We'll open Discover on these first.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {moods.map((m) => {
                  const on = favourites.includes(m.id);
                  return (
                    <button
                      type="button"
                      key={m.id}
                      onClick={() => toggle(favourites, m.id, setFavourites)}
                      className={cn(
                        "flex items-center gap-1.5 rounded-full border bg-card/70 px-3.5 py-2 text-sm transition-all duration-300 hover:-translate-y-0.5",
                        on ? "border-primary" : "border-transparent text-muted-foreground",
                      )}
                    >
                      <span>{m.emoji}</span>
                      {m.label}
                      {on && <Check className="h-3.5 w-3.5 text-primary" />}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="rounded-3xl border border-border/70 bg-card p-8 shadow-soft">
              <h2 className="text-2xl leading-none">Dietary preferences</h2>
              <div className="mt-6 flex flex-wrap gap-2">
                {dietOptions.map((d) => (
                  <button
                    type="button"
                    key={d}
                    onClick={() => toggle(diet, d, setDiet)}
                    className={cn(
                      "rounded-full px-3.5 py-2 text-sm transition-colors",
                      diet.includes(d)
                        ? "bg-ink text-ink-foreground"
                        : "bg-secondary text-secondary-foreground",
                    )}
                  >
                    {d}
                  </button>
                ))}
              </div>

              <div className="mt-8 space-y-5">
                <div className="flex items-center justify-between gap-6">
                  <span className="text-sm">
                    Weekly mood recap
                    <span className="block text-xs text-muted-foreground">
                      A short summary every Sunday.
                    </span>
                  </span>
                  <Switch checked={weekly} onCheckedChange={setWeekly} />
                </div>
                <div className="flex items-center justify-between gap-6">
                  <span className="text-sm">
                    Mealtime nudges
                    <span className="block text-xs text-muted-foreground">
                      A gentle check-in around 6pm.
                    </span>
                  </span>
                  <Switch checked={nudges} onCheckedChange={setNudges} />
                </div>
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full rounded-xl">
              Save preferences
            </Button>
          </Reveal>
        </form>
      </section>
    </>
  );
}
