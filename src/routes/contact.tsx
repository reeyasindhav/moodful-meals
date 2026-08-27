import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Mail, MapPin, MessageSquare } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Moodmeal" },
      {
        name: "description",
        content: "Get in touch with the Moodmeal team.",
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <div className="min-h-screen bg-background">
      <section className="border-b border-border/70 bg-cream">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-10 lg:py-24">
          <Reveal>
            <p className="eyebrow">Contact</p>
            <h1 className="display-section mt-5 max-w-2xl">
              Say <span className="accent-italic">hello</span>
            </h1>
            <p className="mt-4 max-w-lg text-sm text-muted-foreground">
              Questions, feedback, or restaurant recommendations — we read every message.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-2">
            <Reveal className="space-y-6">
              <div className="rounded-3xl border border-border/70 bg-card p-8 shadow-soft">
                <Mail className="h-6 w-6 text-primary" />
                <h3 className="mt-4 text-lg font-semibold">Email</h3>
                <p className="mt-2 text-sm text-muted-foreground">hello@moodmeal.app</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  We aim to reply within one business day.
                </p>
              </div>

              <div className="rounded-3xl border border-border/70 bg-card p-8 shadow-soft">
                <MapPin className="h-6 w-6 text-primary" />
                <h3 className="mt-4 text-lg font-semibold">Based in</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Brooklyn, NY
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Remote-first team, local-first kitchens.
                </p>
              </div>

              <div className="rounded-3xl border border-border/70 bg-card p-8 shadow-soft">
                <MessageSquare className="h-6 w-6 text-primary" />
                <h3 className="mt-4 text-lg font-semibold">Social</h3>
                <p className="mt-2 text-sm text-muted-foreground">@moodmeal on Instagram and TikTok</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Daily mood matches and kitchen stories.
                </p>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <form
                className="rounded-3xl border border-border/70 bg-card p-8 shadow-soft"
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Thanks for reaching out! This is a demo form.");
                }}
              >
                <h2 className="text-2xl">Send a message</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Fill out the form and we'll get back to you.
                </p>

                <div className="mt-8 space-y-5">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      required
                      className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full rounded-full">
                    Send message
                    <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Button>
                </div>
              </form>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
