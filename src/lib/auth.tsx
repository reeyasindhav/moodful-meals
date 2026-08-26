import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type User = { name: string; email: string; city: string; initials: string };

type AuthState = {
  user: User | null;
  ready: boolean;
  signIn: (email: string, name?: string) => void;
  signOut: () => void;
};

const KEY = "moodmeal.user";

const AuthContext = createContext<AuthState | null>(null);

const initialsOf = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]!.toUpperCase())
    .join("") || "MM";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setUser(JSON.parse(raw) as User);
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  const signIn = useCallback((email: string, name?: string) => {
    const display = name?.trim() || email.split("@")[0]!.replace(/[._-]/g, " ");
    const next: User = {
      name: display.replace(/\b\w/g, (c) => c.toUpperCase()),
      email,
      city: "Brooklyn, NY",
      initials: initialsOf(display),
    };
    setUser(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
    try {
      localStorage.removeItem(KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo(() => ({ user, ready, signIn, signOut }), [user, ready, signIn, signOut]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
