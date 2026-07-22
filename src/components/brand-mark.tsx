import { cn } from "@/lib/utils";

export function BrandMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "relative grid h-9 w-9 place-items-center border border-edge-strong bg-elevated font-mono text-[11px] font-semibold tracking-[-0.08em] text-primary",
        "before:absolute before:-left-px before:top-2 before:h-3 before:w-px before:bg-accent",
        "after:absolute after:-bottom-px after:right-2 after:h-px after:w-3 after:bg-accent",
        className
      )}
    >
      LK
    </span>
  );
}
