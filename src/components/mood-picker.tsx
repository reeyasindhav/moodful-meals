import { useNavigate } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { useState } from "react";
import { moods, type MoodId } from "@/lib/moodmeal-data";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function MoodPicker({ initial }: { initial?: MoodId }) {
  const [selected, setSelected] = useState<MoodId>(initial ?? "cozy");
  const navigate = useNavigate();

  return (
    <div className="rounded-3xl bg-lilac/70 p-6 shadow-soft sm:p-8">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-lilac-foreground/70">
            Start here
          </p>
          <h2 className="mt-2 text-3xl leading-none sm:text-4xl">Pick your mood</h2>
        </div>
        <span className="text-[11px] tracking-[0.2em] text-lilac-foreground/50">01 — 01</span>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {moods.map((mood) => {
          const active = selected === mood.id;
          return (
            <button
              key={mood.id}
              onClick={() => setSelected(mood.id)}
              className={cn(
                "flex items-center gap-3 rounded-xl border bg-card/70 p-3.5 text-left transition-all duration-300",
                "hover:-translate-y-0.5 hover:bg-card hover:shadow-soft",
                active
                  ? "border-primary bg-card shadow-soft ring-1 ring-primary/30"
                  : "border-transparent",
              )}
            >
              <span
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-base",
                  mood.swatch,
                )}
              >
                {mood.emoji}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold">{mood.label}</span>
                <span className="block truncate text-xs text-muted-foreground">
                  {mood.tagline}
                </span>
              </span>
              {active && <Check className="ml-auto h-4 w-4 shrink-0 text-primary" />}
            </button>
          );
        })}
      </div>

      <Button
        size="lg"
        className="mt-6 w-full rounded-xl text-base"
        onClick={() => navigate({ to: "/discover", search: { mood: selected } })}
      >
        Find my meal
        <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Button>
      <p className="mt-3 text-center text-xs text-lilac-foreground/60">
        Your mood stays yours. No account needed.
      </p>
    </div>
  );
}
