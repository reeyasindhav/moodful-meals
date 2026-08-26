import { Link } from "@tanstack/react-router";
import { Clock, Heart, MapPin, Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { Meal } from "@/lib/moodmeal-data";
import { cn } from "@/lib/utils";

export function MealCard({ meal, saved = false }: { meal: Meal; saved?: boolean }) {
  const [isSaved, setIsSaved] = useState(saved);

  return (
    <article className="card-lift group overflow-hidden rounded-2xl border border-border/70 bg-card shadow-soft">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Link to="/meal/$mealId" params={{ mealId: meal.id }}>
          <img
            src={meal.image}
            alt={meal.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
          />
        </Link>
        {meal.badge && (
          <span className="absolute top-3 left-3 rounded-full bg-card/95 px-3 py-1 text-[11px] font-semibold tracking-wide text-foreground shadow-soft">
            {meal.badge}
          </span>
        )}
        <button
          aria-label={isSaved ? "Remove from saved" : "Save meal"}
          onClick={() => {
            setIsSaved((v) => !v);
            toast(isSaved ? "Removed from saved" : "Saved for later", {
              description: meal.name,
            });
          }}
          className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-card/95 shadow-soft transition-transform hover:scale-110 active:scale-95"
        >
          <Heart
            className={cn(
              "h-4 w-4 transition-colors",
              isSaved ? "fill-primary text-primary" : "text-muted-foreground",
            )}
          />
        </button>
      </div>

      <div className="p-5">
        <p className="text-xs text-muted-foreground">
          {meal.place} · {meal.neighborhood}
        </p>
        <h3 className="mt-1.5 text-2xl leading-tight">
          <Link to="/meal/$mealId" params={{ mealId: meal.id }}>
            {meal.name}
          </Link>
        </h3>
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Star className="h-3.5 w-3.5 fill-primary text-primary" />
            {meal.rating}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {meal.minutes} min
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" />
            {meal.distance}
          </span>
          <span className="ml-auto font-medium text-primary">{meal.match}% match</span>
        </div>
      </div>
    </article>
  );
}
