import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-10">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <Link to="/" className="flex items-center gap-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-primary" />
              <span className="font-display text-2xl leading-none">moodmeal</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-ink-foreground/60">
              Good food for every feeling. Emotion-first discovery instead of endless menus.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <FooterCol
              title="Discover"
              links={[
                { to: "/discover", label: "Mood search" },
                { to: "/journal", label: "Journal" },
                { to: "/how-it-works", label: "How it works" },
              ]}
            />
            <FooterCol
              title="Account"
              links={[
                { to: "/dashboard", label: "Dashboard" },
                { to: "/saved", label: "Saved meals" },
                { to: "/profile", label: "Mood profile" },
              ]}
            />
            <FooterCol
              title="Company"
              links={[
                { to: "/our-story", label: "Our story" },
                { to: "/signup", label: "Create account" },
                { to: "/login", label: "Log in" },
              ]}
            />
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-ink-foreground/12 pt-6 text-xs text-ink-foreground/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Moodmeal. All moods welcome.</p>
          <p>Made for how you feel, not just what you crave.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { to: string; label: string }[];
}) {
  return (
    <div>
      <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-ink-foreground/45">
        {title}
      </p>
      <ul className="mt-4 space-y-2.5 text-sm">
        {links.map((l) => (
          <li key={l.to}>
            <Link
              to={l.to}
              className="text-ink-foreground/75 transition-colors hover:text-primary"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
