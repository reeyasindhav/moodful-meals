import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms — Moodmeal" },
      {
        name: "description",
        content: "Terms of use for Moodmeal.",
      },
    ],
  }),
  component: Terms,
});

function Terms() {
  return (
    <div className="min-h-screen bg-background">
      <section className="border-b border-border/70 bg-cream">
        <div className="mx-auto max-w-3xl px-5 py-16 lg:px-10 lg:py-24">
          <Reveal>
            <p className="eyebrow">Terms</p>
            <h1 className="display-section mt-5 max-w-2xl">
              The <span className="accent-italic">fine print</span>, but short
            </h1>
            <p className="mt-4 text-sm text-muted-foreground">
              Last updated: today. These apply when you use Moodmeal.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-5 lg:px-10">
          <div className="prose prose-sm max-w-none text-muted-foreground">
            <Reveal>
              <h2 className="text-xl font-semibold text-foreground">1. Use at your own pace</h2>
              <p className="mt-3">
                Moodmeal is a discovery tool, not a booking service. We point you toward recipes
                and restaurants; you decide what, where, and when to eat.
              </p>
            </Reveal>

            <Reveal delay={60}>
              <h2 className="mt-8 text-xl font-semibold text-foreground">2. No guarantees</h2>
              <p className="mt-3">
                Our matches are suggestions, not promises. Restaurants move, recipes change, and
                moods shift. We update the data, but we can't guarantee availability.
              </p>
            </Reveal>

            <Reveal delay={120}>
              <h2 className="mt-8 text-xl font-semibold text-foreground">3. Your data</h2>
              <p className="mt-3">
                In this demo build, your account is stored in local storage on your device. It goes
                nowhere else and is removed when you clear your browser data. Read the{" "}
                <Link to="/privacy" className="text-primary">
                  privacy note
                </Link>{" "}
                for details.
              </p>
            </Reveal>

            <Reveal delay={180}>
              <h2 className="mt-8 text-xl font-semibold text-foreground">4. Open source imagery</h2>
              <p className="mt-3">
                All photography comes from open-source Unsplash libraries. No generated images.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <h2 className="mt-8 text-xl font-semibold text-foreground">5. Keep it friendly</h2>
              <p className="mt-3">
                Be kind to the people and places we celebrate. Report issues through the app.
              </p>
            </Reveal>
          </div>

          <Reveal className="mt-14 border-t border-border pt-6">
            <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
              <Separator className="hidden md:block" />
              <span>Moodmeal · © 2026 All moods welcome.</span>
            </div>
          </Reveal>

          <Reveal className="mt-10 flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-full">
              <Link to="/discover" search={{ mood: "cozy" }}>
                Start exploring
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full">
              <Link to="/privacy">Privacy</Link>
            </Button>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
