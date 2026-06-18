import { cn } from "@/lib/utils";

// Monospace pill for tech, skills, and tags. "accent" is emerald, "neutral"
// is zinc. Pass `className` to adjust size per use; it overrides the defaults.
const TAG_VARIANTS = {
  neutral: "rounded-sm border border-zinc-700 bg-zinc-800 text-zinc-300",
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
