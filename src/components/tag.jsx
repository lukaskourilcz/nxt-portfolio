import { cn } from "@/lib/utils";

// Small monospace pill used for tech stacks, skills, and category labels.
// - "accent"  → emerald, for things we want to highlight (tech, course topics)
// - "neutral" → muted zinc, for longer/secondary lists (skills, job tags)
// Per-instance sizing tweaks (e.g. a smaller font for long lists) can be passed
// through `className`, which wins over the defaults via tailwind-merge.
const TAG_VARIANTS = {
  neutral: "rounded-full border border-zinc-700 bg-zinc-800 text-zinc-300",
  accent:
    "rounded-md border border-emerald-500/20 bg-emerald-500/10 text-emerald-300",
};

export function Tag({ variant = "neutral", className, children }) {
  return (
    <span
      className={cn(
        "px-2 py-0.5 font-mono text-[0.7rem]",
        TAG_VARIANTS[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
