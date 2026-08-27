import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";

export function AuthGate({ title, children }: { title: string; children: ReactNode }) {
  const { user, ready } = useAuth();

  if (!ready) {
    return (
      <div className="mx-auto max-w-7xl px-5 py-24 lg:px-10">
        <div className="h-8 w-40 animate-pulse rounded-full bg-secondary" />
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-32 animate-pulse rounded-2xl bg-secondary" />
          ))}
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-xl px-5 py-24 text-center lg:py-32">
        <p className="eyebrow">Members only</p>
        <h1 className="display-section mt-4">{title}</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Create a free mood profile to save meals and keep your history.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg" className="rounded-full">
            <Link to="/signup">Create account</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-full">
            <Link to="/login">Log in</Link>
          </Button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
