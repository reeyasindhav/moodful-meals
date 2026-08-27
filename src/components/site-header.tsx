import { Link, useNavigate } from "@tanstack/react-router";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Bookmark, MapPin, Menu, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const nav = [
  { to: "/discover", label: "Discover" },
  { to: "/how-it-works", label: "How it works" },
  { to: "/journal", label: "Journal" },
  { to: "/our-story", label: "Our story" },
];

export function SiteHeader() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [signOutOpen, setSignOutOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50">
      <div className="border-b border-border/70 bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-10">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-primary" />
            <span className="font-display text-2xl leading-none tracking-tight">moodmeal</span>
          </Link>

          <nav className="hidden items-center gap-8 text-sm md:flex">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-muted-foreground transition-colors hover:text-foreground"
                activeProps={{ className: "text-foreground font-medium" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <span className="hidden items-center gap-1.5 rounded-full px-3 py-1.5 text-sm text-muted-foreground lg:flex">
              <MapPin className="h-3.5 w-3.5" />
              {user?.city ?? "Brooklyn, NY"}
            </span>

            {user ? (
              <>
                <Link
                  to="/saved"
                  className="hidden items-center gap-1.5 rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground sm:flex"
                >
                  <Bookmark className="h-3.5 w-3.5" />
                  Saved
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-secondary-foreground transition-transform hover:scale-105">
                    {user.initials}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-52">
                    <DropdownMenuLabel className="font-normal">
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate({ to: "/dashboard" })}>
                      Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate({ to: "/saved" })}>
                      Saved meals
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate({ to: "/profile" })}>
                      Mood profile
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => setSignOutOpen(true)}
                      className="text-destructive focus:text-destructive"
                    >
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
                  <Link to="/login">Log in</Link>
                </Button>
                <Button asChild size="sm" className="rounded-full">
                  <Link to="/signup">Get started</Link>
                </Button>
              </>
            )}

            <button
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
              className="ml-1 flex h-9 w-9 items-center justify-center rounded-full border border-border md:hidden"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="animate-fade-up border-t border-border bg-background px-5 py-4 md:hidden">
            <div className="flex flex-col gap-3 text-sm">
              {nav.map((item) => (
                <Link key={item.to} to={item.to} onClick={() => setOpen(false)}>
                  {item.label}
                </Link>
              ))}
              <Link to={user ? "/dashboard" : "/login"} onClick={() => setOpen(false)}>
                {user ? "Dashboard" : "Log in"}
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>

    <AlertDialog open={signOutOpen} onOpenChange={setSignOutOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Sign out of Moodmeal?</AlertDialogTitle>
          <AlertDialogDescription>
            You will need to sign back in to save meals and access your dashboard.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              signOut();
              navigate({ to: "/" });
            }}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Sign out
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </>
  );
}
