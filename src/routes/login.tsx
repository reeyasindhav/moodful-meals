import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Log in — Moodmeal" },
      {
        name: "description",
        content: "Log in to Moodmeal to see your saved meals, mood history and personal matches.",
      },
      { property: "og:title", content: "Log in — Moodmeal" },
      { property: "og:description", content: "Back to your saved meals and mood history." },
    ],
  }),
  component: Login,
});

function Login() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("hello@moodmeal.app");
  const [password, setPassword] = useState("moodmeal");

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex items-center justify-center px-5 py-16 lg:px-14">
        <div className="animate-fade-up w-full max-w-sm">
          <Link to="/" className="mb-8 flex items-center gap-2.5">
            <span className="h-3 w-3 rounded-full bg-primary" />
            <span className="font-display text-3xl leading-none tracking-tight">moodmeal</span>
          </Link>

          <p className="eyebrow">Welcome back</p>
          <h1 className="display-section mt-4">Good to see you</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Pick up where you left off — your saved meals are waiting.
          </p>

          <form
            className="mt-9 space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              if (!email.includes("@")) {
                toast.error("Enter a valid email address");
                return;
              }
              signIn(email);
              toast.success("Welcome back to Moodmeal");
              navigate({ to: "/dashboard" });
            }}
          >
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-xl"
              />
            </div>
            <Button type="submit" size="lg" className="w-full rounded-xl">
              Log in
            </Button>
          </form>

          <p className="mt-6 text-sm text-muted-foreground">
            New here?{" "}
            <Link to="/signup" className="font-medium text-primary">
              Create an account
            </Link>
          </p>
        </div>
      </div>

      <div className="relative hidden overflow-hidden bg-blush/60 lg:block">
        <img
          src="https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1200&q=80"
          alt="A steaming bowl of ramen on a wooden counter"
          className="h-full w-full object-cover"
        />
        <div className="absolute bottom-10 left-10 max-w-xs rounded-2xl bg-card/90 p-6 shadow-lift backdrop-blur">
          <p className="text-sm">
            "I stopped scrolling and started eating things I actually wanted."
          </p>
          <p className="mt-3 text-xs text-muted-foreground">Priya · Brooklyn</p>
        </div>
      </div>
    </div>
  );
}
