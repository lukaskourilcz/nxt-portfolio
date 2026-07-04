"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

// Flips the .light/.dark class the pre-paint script put on <html>. The theme
// state only exists client-side (it's random per load), so the icon renders
// after mount to avoid a hydration mismatch.
export function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light" | null>(null);

  useEffect(() => {
    setTheme(
      document.documentElement.classList.contains("light") ? "light" : "dark"
    );
  }, []);

  function toggle() {
    const next = theme === "light" ? "dark" : "light";
    const el = document.documentElement;
    el.classList.remove("dark", "light");
    el.classList.add(next);
    setTheme(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
      className="flex h-8 w-8 items-center justify-center rounded-md text-zinc-400 transition-colors hover:text-zinc-100 light:text-zinc-500 light:hover:text-zinc-900"
    >
      {theme === "light" ? (
        <Moon className="h-4 w-4" />
      ) : theme === "dark" ? (
        <Sun className="h-4 w-4" />
      ) : null}
    </button>
  );
}
