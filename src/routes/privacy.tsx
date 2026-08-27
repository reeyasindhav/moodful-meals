import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy — Moodmeal" },
      {
        name: "description",
        content: "How Moodmeal handles your data and your mood.",
      },
    ],
  }),
  component: Privacy,
});

function Privacy() {
  const sections = [
    {
      title: "What we collect",
      body: "Moodmeal keeps things light. We store the mood you pick, the meals you save, and the email you use to sign in. We don't ask for payment details, and we never sell your data.",
    },
    {
      title: "How we use it",
      body: "Your saved meals and mood history help us show better matches over time. Everything is used only to improve your experience inside the app.",
    },
    {
      title: "Local first",
      body: "Your account lives in your browser's local storage on this demo build. Clearing your browser data removes it. When we add a real backend, you'll control export and deletion.",
    },
    {
      title: "Your control",
      body: "You can sign out at any time to clear your session. Because matches are tied to your mood, not your identity, there's very little to tie back to you.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <section className="border-b border-border/70 bg-cream">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-10 lg:py-24">
          <Reveal>
            <p className="eyebrow">Privacy</p>
            <h1 className="display-section mt-5 max-w-2xl">
              Your mood, <span className="accent-italic">yours</span>
            </h1>
            <p className="mt-4 max-w-lg text-sm text-muted-foreground">
              A short, plain-language note on what we keep and why.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-5 lg:px-10">
          <div className="space-y-10">
            {sections.map((s, i) => (
              <Reveal key={s.title} delay={i * 80}>
                <div>
                  <h2 className="text-2xl">{s.title}</h2>
                  <p className="mt-3 text-sm text-muted-foreground">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-14 flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="rounded-full">
              <Link to="/discover" search={{ mood: "cozy" }}>
                Start exploring
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full">
              <Link to="/our-story">Our story</Link>
            </Button>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
