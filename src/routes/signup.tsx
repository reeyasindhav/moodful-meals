import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { moods, type MoodId } from "@/lib/moodmeal-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create your mood profile — Moodmeal" },
      {
        name: "description",
        content:
          "Sign up for Moodmeal to save meals, track your mood history and get sharper matches every week.",
      },
      { property: "og:title", content: "Create your mood profile — Moodmeal" },
      {
        property: "og:description",
        content: "Save meals, track mood history and get sharper matches every week.",
      },
    ],
  }),
  component: Signup,
});

function Signup() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [picked, setPicked] = useState<MoodId[]>(["cozy"]);

  const toggle = (id: MoodId) =>
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  return (
    <div className="grid min-h-[calc(100vh-6.5rem)] lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-mint/60 lg:block">
        <img
          src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80"
          alt="A colourful grain bowl seen from above"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex items-center justify-center px-5 py-16 lg:px-14">
        <div className="animate-fade-up w-full max-w-md">
          <p className="eyebrow">Get started</p>
          <h1 className="display-section mt-4">Build your mood profile</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Two fields and a few taps. No credit card, no questionnaire.
          </p>

          <form
            className="mt-9 space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              if (!email.includes("@")) {
                toast.error("Enter a valid email address");
                return;
              }
              if (picked.length === 0) {
                toast.error("Pick at least one mood you eat for");
                return;
              }
              signIn(email, name);
              toast.success("Your mood profile is ready");
              navigate({ to: "/dashboard" });
            }}
          >
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ada Moreau"
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="rounded-xl"
              />
            </div>

            <div className="space-y-3">
              <Label>Moods you eat for</Label>
              <div className="flex flex-wrap gap-2">
                {moods.map((m) => {
                  const on = picked.includes(m.id);
                  return (
                    <button
                      type="button"
                      key={m.id}
                      onClick={() => toggle(m.id)}
                      className={cn(
                        "flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm transition-all duration-300 hover:-translate-y-0.5",
                        on
                          ? "border-primary bg-primary/10 text-foreground"
                          : "border-border text-muted-foreground",
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

            <Button type="submit" size="lg" className="w-full rounded-xl">
              Create account
            </Button>
          </form>

          <p className="mt-6 text-sm text-muted-foreground">
            Already with us?{" "}
            <Link to="/login" className="font-medium text-primary">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
